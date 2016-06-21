var jwt       = require('express-jwt');
var Report    = require('./models/report.js');
var sendgrid  = require('sendgrid')('15min', '15min12345');

module.exports = function(app) {

  // =====================================
  // auth0 Check =========================
  // =====================================
  var authCheck = jwt({
    secret: new Buffer('8Gy8N84TkXWuC2md96FxRxftf4axHap9O4GeXlC_FrvaffTffuygDbaS0Z3VoutH', 'base64'),
    audience: 'wMiaGVcupBYebZC5whqoyYAwtz8k04E1'
  });

  // app.get('/api/public', function(req, res){
  //   res.json({message: 'public endpoint, you dont need to be authenticated to see this.'})
  // });

  // app.get('/api/private', authCheck, function(req, res){
  //   res.json({message: 'private endpoint, you DO need to be authenticated to see this.'})
  // });

  // =====================================
  // REPORT Seed =========================
  // =====================================
  // app.get('/seed', function(req, res, next){
  //   console.log("Start Seeding....");

  //   for(var i = 0; i < 50; i++){
  //     var seedObj = {
  //       "description" : "#" + (i+1) +" - Report " + (i+1),
  //       "createdAt" : new Date(),
  //       "date" : new Date(),
  //       "time" : new Date(),
  //       "busLine" : null,
  //       "transportCompany" : "",
  //       "location" : "",
  //       "complaint" : "",
  //       "name" : "",
  //       "email" : "report" + (i+1) + "@hotmail.com",
  //       "telephone" : "",
  //       "note" : "",
  //       "images" : []
  //     };
  //     Report.create(seedObj, function(err, item){
  //       if(err){
  //         return console.log("Erorr!! Seeding...");
  //       }
  //     });
  //   }
  //   console.log("Done.");
  //   next();
  // });

	// =====================================
  // REPORT API ==========================
  // =====================================

  // Get the Reports with sort limit and skip
	app.post('/api/v1/getreport/', function(req, res){
    console.log(">> Sort: " + req.body.order + ", limit: " + req.body.limit + ", Page Number: " + req.body.page);
    console.log(">> Complaint Filter: " + req.body.filter.complaint);
    console.log(">> Transport Company Filter: " + req.body.filter.transportCompany);

    var perPage = req.body.limit;
    var page = Math.max(0, (req.body.page - 1));
    var sort = req.body.order;
    var cmpFilter = req.body.filter.complaint;
    var trsFilter = req.body.filter.transportCompany;
    var filterQuery = {};

    // filter check
    if(cmpFilter == 'all' && trsFilter == 'all'){
      console.log("==> Filter: None Filter");
    }
    else if(cmpFilter != 'all' && trsFilter == 'all'){
      console.log("==> Filter: Complaint");
      filterQuery = {complaint: cmpFilter};
    }
    else if(cmpFilter == 'all' && trsFilter != 'all'){
      console.log("==> Filter: Transport Company");
      filterQuery = {transportCompany: trsFilter};
    }
    else{
      console.log("==> Filter: Filter Both");
      filterQuery = {complaint: cmpFilter, transportCompany: trsFilter};
    }

		Report
    .find(filterQuery)
    .sort("-createdAt")
    .skip(perPage * page)
    .limit(perPage)
    .exec(function(err, reports){
      Report.count().exec(function(err, count){
        res.json({
          reports: reports,
          page: page,
          pages: count / perPage,
          count: count
        });
      });
		});
	});

  // Search for a report
  app.post('/api/v1/searchreport/', function(req, res, next){
    console.log("Search: " + req.body.query + ", Field: " + req.body.field);
    var field = req.body.field;

    var reqx = new RegExp(req.body.query, 'i');

    var query = {};
    query[field] = { $regex: reqx };

    Report
    .find(query)
    .limit(15)
    .exec(function(err, reports) {
      if(err){
        console.log("Error Searching... ", err);
      }
      Report.count().exec(function(err, count){
        res.json({
          reports: reports,
          count: count
        });
      });
    });
  });

  // get bus line by count
  app.post('/api/v1/buslinereport/', function(req, res){
    Report.aggregate([
    	{ 
    		$match : {"busLine": {"$ne":null}} 
    	},
    	{
    		$group:{ 
	        _id: '$busLine', 
	        count: { $sum: 1 } 
	      }
	    },
	    {
	    	$sort: {'count': -1}
	  	},
	    {
	    	$limit: 10
	    }
    ],function (err, doc) {
        if (err){
          console.log(err);
        }
        console.log(doc);
        res.json(doc);
      }
    );
  });

  // get all report location by lat and long
  app.post('/api/v1/locationreport/', function(req, res){
    Report.find({}, 'location').exec(function(err, reportLocation){
      console.log(reportLocation);
      res.json(reportLocation);
    });
  });

  // Save a new Report to mongo
	app.post('/api/v1/report', function(req, res){
		console.log("Post Requests.");
    console.log(req.body);

		Report.create(req.body, function(err, item){
			if(err){
				return console.log("Erorr Post Requests!.");
			}

      // Send Email to 15 minutes
      var email = new sendgrid.Email(); 
      email.addTo("abdalhadi.m92@gmail.com");
      email.setFrom(req.body.email);
      email.setSubject('Report');
      email.setHtml(
      	'<h2 style="text-align: right;">' + req.body.description + '</h2>' +
      	'<div style="text-align: right;"><h3>מספר קו</h3><h4>' + req.body.busLine + '</h4></div>' +
      	'<div style="text-align: right;"><h3>חברת התחבורה</h3><h4>' + req.body.transportCompany + '</h4></div>' +
      	'<div style="text-align: right;"><h3>מיקום</h3><h4>' + req.body.location.address + '</h4></div>' +
      	'<div style="text-align: right;"><h3>מהות התלונה</h3><h4>' + req.body.complaint + '</h4></div>' +
      	'<div style="text-align: right;"><h3>שם</h3><h4>' + req.body.name + '</h4></div>' +
      	'<div style="text-align: right;"><h3>טלפון</h3><h4>' + req.body.telephone + '</h4></div>'
      );
      // Sending the email
      sendgrid.send(email, function(err, json) {
        if(err){
          return console.log("Erorr Send Email!."); 
        }
        console.log("Okay Send Email.");
      });

      // Send Email to client
      var email = new sendgrid.Email(); 
      email.setTos([req.body.email]);
      email.setFrom('15minutes.co.il@gmail.com');
      email.setSubject('15 Minutes - תודה על הדיווח למוקד שלנו');
      email.setHtml(
      `<p style="text-align: right;">תודה על הדיווח למוקד שלנו! הפנייה שלך ועוד פניות רבות אחרות מסייעות לנו להבין מה המצב בשטח ולהוכיח למשרד התחבורה ומפעילי התחבורה הציבורית שיש עוד הרבה עבודה בדרך לתחבורה ציבורית מהירה, יעילה ואטרקטיבית.</p>
      <p style="text-align: right;">
      כמה שיותר תלונות ודיווחים- יותר טוב!! 
      גם אם התלוננת עכשיו, חשוב להמשיך ולדווח..
      ​</p>
      ​​<p style="text-align: right;">
      בנוסף, אם המתנת לאוטובוס זמן רב מדי​ או שהאוטובוס דילג על התחנה​
      ונגרמו לך נזקים כספיים בשל כך אנו ממליצים לך לקרוא את המדריך לתביעות קטנות, כי תביעה קטנה זה ממש בקטנה!
      ​</p>
      <p style="text-align: right;">נשמח לסייע לך​ ​
      לפעול למען התחבורה הציבורית​,</p>
      <p style="text-align: right;">המון תודה על האיכפתיות ושיתוף הפעולה :)</p>
      <p style="text-align: right;">מוקד 15 דקות</p>
      <a style="text-align: right;" href="http://www.15minutes.co.il​">www.15minutes.co.il​</a>`);

      sendgrid.send(email, function(err, json) {
        if (err) {
          return console.log("Erorr Send Email!."); 
        }
        console.log("Okay Send Email.");
      });

      // Response
      res.json(item);
		})
	});

  // Get Report
	app.post('/api/v1/report/:id', function(req, res){
		console.log(req.params.id);
		Report.find({'_id': req.params.id}).exec(function(err, item){
			res.json(item);
		});
	});

  // Update Report
  app.put('/api/v1/report/:id', function(req, res){
    console.log("id: " + req.params.id + ", Note:" + req.body[0].note);
    Report.findById(req.params.id, function(err, report) {
      if (!report){
        return next(new Error('Could not load Document'));
      }
      else {
        // do your updates here
        //report.modified = new Date();
        report.note = req.body[0].note;

        report.save(function(err) {
          if (err)
            console.log('Update error');
          else
            console.log('Update success');
        });
      }
    });
  });

  app.delete('/api/v1/report/:id', function(req, res){
    console.log("Delete Report id: " + req.params.id);
    Report.findById(req.params.id).remove().exec(function(err, item){
      if(err){
        console.log("Can't remove report ", req.params.id);
      }
      res.json(item);
    })
  });

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('*', function (req, res) {
     res.sendFile(__dirname + '/public/index.html');
  });

};

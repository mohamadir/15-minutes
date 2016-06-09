// app/routes.js

var Report = require('./models/report.js');
var User = require('./models/user.js');
var passwordHash = require('password-hash');
var sendgrid  = require('sendgrid')('15min', '15min12345');
// var WP = require( 'wordpress-rest-api' );
// var wp = new WP({
//     endpoint: 'http://www.15minutes.co.il/',
//     // This assumes you are using basic auth, as described further below
//     username: 'hadiab',
//     password: 'hadi12345'
// });

var wordpress = require("wordpress");
var client = wordpress.createClient({
    url: "www.15minutes.co.il",
    username: "hadiab",
    password: "hadi12345"
});

module.exports = function(app, passport) {

	// =====================================
	// CORS (Cross-Origin Resource Sharing) 
	// headers to support Cross-site HTTP requests
	// =====================================
	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	    next();
	});

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  // app.get('/signup', function(req, res) {
  //   // render the page and pass in any flash data if it exists
  //   res.render('signup.ejs', { message: req.flash('signupMessage') });
  // });

  // // process the signup form
  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect : '/#/reports', // redirect to the secure profile section
  //   failureRedirect : '/signup', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  // app.get('/login', function(req, res) {
  //   console.log('> Get Login');
  //   console.log(req.flash('loginMessage'));
  //   // render the page and pass in any flash data if it exists
  //   res.json({ message: req.flash('loginMessage') }); 
  // });

  // // process the login form
  // app.post('/api/v1/login', passport.authenticate('local-login', {
  //   successRedirect : '/#/reports', // redirect to the secure profile section
  //   failureRedirect : '/#/', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

  // process the login form
  app.post('/api/v1/login', function(req, res, next){
    console.log("Email: ", req.body.email);
    console.log("Pass: ", req.body.password);
    User.find({'local.email': req.body.email}).exec(function(err, item){
      console.log("Item: ", item);

      // if the exec failed
      if(err){
        console.log("Server Login error.");
        return next(err);
      }

      // Check if the email exist.
      if(item.length == 0){
        console.log('Email not match.');
        return next(err);
      }

      // set the hashed password
      var hashedPassword = item[0].local.password;
      console.log(passwordHash.verify(req.body.password, hashedPassword));

      // check the password
      if(!passwordHash.verify(req.body.password, hashedPassword)){
        console.log('Password not match.');
        return next(err);
      }else{
        console.log("Server Login success.");
        res.json(item);
      }
      
    });
  });

	// =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    //req.logout();
    res.redirect('/');
  });

  // =====================================
  // Wordpress ===========================
  // =====================================
  app.get('/wordpress', function(req, res){
    client.getPosts(function( error, posts ) {
      if(error){
        console.log("Error!");
        res.send(error);
      }
      console.log("Found " + posts.length + " posts!");
      console.log(posts);
      res.json(posts);
    });
  });

	// =====================================
  // REPORT API ==========================
  // =====================================
	app.get('/api/v1/report', function(req, res){
		Report.find().exec(function(err, item){
			res.json(item);
		});
	});

	app.post('/api/v1/report', function(req, res){
		console.log("Post Requests.");
    console.log(req.body);
		Report.create(req.body, function(err, item){
			if(err){
				return console.log("Erorr Post Requests!.");
			}

      // Send Email to 15 minutes
      var email = new sendgrid.Email(); 
      email.setTos(['abdalhadi.m92@gmail.com']);
      email.setFrom(req.body.email);
      email.setSubject('Report');
      email.setHtml('<h1>' + req.body.description + '</h1>');
      sendgrid.send(email, function(err, json) {
        if (err) {
          return console.log("Erorr Send Email!."); 
        }
        console.log("Okay Send Email.");
      });

      // Send Email to client
      var email = new sendgrid.Email(); 
      email.setTos([req.body.email]);
      email.setFrom('15minutes.co.il@gmail.com');
      email.setSubject('15 Minutes - תודה על הדיווח למוקד שלנו');
      email.setHtml(`<p>תודה על הדיווח למוקד שלנו! הפנייה שלך ועוד פניות רבות אחרות מסייעות לנו להבין מה המצב בשטח ולהוכיח למשרד התחבורה ומפעילי התחבורה הציבורית שיש עוד הרבה עבודה בדרך לתחבורה ציבורית מהירה, יעילה ואטרקטיבית.</p>
      <p>
      כמה שיותר תלונות ודיווחים- יותר טוב!! 
      גם אם התלוננת עכשיו, חשוב להמשיך ולדווח..
      ​</p>
      ​​<p>
      בנוסף, אם המתנת לאוטובוס זמן רב מדי​ או שהאוטובוס דילג על התחנה​
      ונגרמו לך נזקים כספיים בשל כך אנו ממליצים לך לקרוא את המדריך לתביעות קטנות, כי תביעה קטנה זה ממש בקטנה!
      ​</p>
      <p>נשמח לסייע לך​ ​
      לפעול למען התחבורה הציבורית​,</p>
      <p>המון תודה על האיכפתיות ושיתוף הפעולה :)</p>
      <p>מוקד 15 דקות</p>
      <p>www.15minutes.co.il​</p>`);
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
	app.get('/api/v1/report/:id', function(req, res){
		console.log(req.params.id);
		Report.find({'_id': req.params.id}).exec(function(err, item){
			res.json(item);
		});
	});

  // Edit Report
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

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/*', function(req, res){
    console.log("Ever request.");  
    var email = '';
    if(req.user) {
      console.log("Found User: ", req.user.email);
      email = req.user.email;
    }

    res.cookie('user', JSON.stringify({'email': email}));

    res.render('index');
  });

};

// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//   // if user is authenticated in the session, carry on 
//   if (req.isAuthenticated())
//       return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }
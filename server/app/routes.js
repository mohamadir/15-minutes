// app/routes.js

var Report = require('./models/report.js');
var sendgrid  = require('sendgrid')('15min', '15min12345');

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
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
      res.render('index.html'); // load the index.ejs file
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
  app.get('/login', function(req, res) {
    console.log(req.flash('loginMessage'));
    // render the page and pass in any flash data if it exists
    res.render('login.ejs', { message: req.flash('loginMessage') }); 
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/#/reports', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

	// =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

	// =====================================
  // REPORT ==============================
  // =====================================
  app.get('/reports', isLoggedIn, function(){
  	console.log('> GET Report');
  	res.render('index.html');
  });

	// =====================================
  // REPORT API ==========================
  // =====================================
	app.get('/api/v1/report', isLoggedIn, function(req, res){
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

	app.get('/api/v1/report/:id', isLoggedIn, function(req, res){
		console.log(req.params.id);
		Report.find({'_id': req.params.id}).exec(function(err, item){
			res.json(item);
		});
	});

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}
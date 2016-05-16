// app/routes.js

var Report = require('./models/report.js');

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
				console.log("Erorr!! Post Requests.");
			}
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
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
  // LOGIN ===============================
  // =====================================
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('index.html', { message: req.flash('loginMessage') });  
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '#/report',
    failureRedirect : '#/login'
  }));

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  // app.get('/signupuser', function(req, res, next) {
  // 	console.log("==> GET Signup");
  //   // render the page and pass in any flash data if it exists
  //   //res.render('index.html');
  //   next();
  // });


  // process the signup form
  app.post('/signupuser', passport.authenticate('local-signup', {
    successRedirect : '#/reports', 
    failureRedirect : '#/signup'
  }));

  app.post('/signupuser',passport.authenticate('local-signup', 
  	{ failureRedirect: '/signupuser' }),
    function(req, res) {
      res.redirect('/');
    });

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
				console.log("Erorr!! Post Requests.");
			}
			res.json(item);
		})
	});

	app.get('/api/v1/report/:id', function(req, res){
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
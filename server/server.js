var express = require("express");
var app = express();
var path = require("path");
var mongoose = require('mongoose');
var cors = require('cors');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = require('./config/config.js');

// set database setup
mongoose.connect(config.url);

// Port
app.set('port', process.env.PORT || 8000);

app.use(cors());

app.use(express.static(path.join(__dirname + '/public')));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
	secret: 'dfjkhjksdhsdhjhs456d4fgs3d4',
	saveUninitialized: true,
	resave: true
}));
app.use(bodyParser.urlencoded({ extended: true })); //app.use(bodyParser.json({ extended: true }));// get information from html forms
app.use(bodyParser.json({ extended: true }));


// routes ======================================================================
// load our routes and pass in our app and fully configured passport
require('./app/routes.js')(app); 

app.listen(app.get('port'), function(){
	console.log("Server Running on localhost:" + app.get('port'));
});
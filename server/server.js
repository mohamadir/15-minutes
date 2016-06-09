var express = require("express");
var app = express();
var path = require("path");
var mongoose = require('mongoose');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// set database setup
mongoose.connect(configDB.url);

// Port
app.set('port', process.env.PORT || 3000);

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true })); //app.use(bodyParser.json({ extended: true }));// get information from html forms
app.use(bodyParser.json({ extended: true }));

// templating
app.use(express.static(path.join(__dirname + '/public')));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

app.listen(app.get('port'), function(){
	console.log("Server Running on localhost:" + app.get('port'));
});



// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var path = require('path');

// var database = require('./config/database');

// // set database setup
// mongoose.connect(database.url);
// var Report = require('./models/report');

// app params
// app.set('port', process.env.PORT || 1337);
// app.use(express.static(path.join(__dirname + '/public')));
// app.use(bodyParser.json());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//     next();
// });

// // home page
// app.get('/', function(req, res){
// 	res.send("Hello World to Express");
// });

// app.get('/api/v1/report', function(req, res){
// 	Report.find().exec(function(err, item){
// 		res.json(item);
// 	});
// });

// app.post('/api/v1/report', function(req, res){
// 	console.log("Post Requests.");
// 	console.log(req.body);
// 	Report.create(req.body, function(err, item){
// 		if(err){
// 			console.log("Erorr!! Post Requests.");
// 		}
// 		res.json(item);
// 	})
// });

// app.get('/api/v1/report/:id', function(req, res){
// 	console.log(req.params.id);
// 	Report.find({'_id': req.params.id}).exec(function(err, item){
// 		res.json(item);
// 	});
// });

// // // Delete requset
// // app.delete('/personlist/:id', function(req, res){
// // 	console.log("Delete Requests: ", req.params.id);
// // 	db.personlist.remove({"_id": mongojs.ObjectId(req.params.id)}, function(err, docs){
// // 		console.log("Deleted Successfully!!");
// // 		res.json(docs);
// // 	});
// // });

// app.listen(app.get('port'), function(){
// 	console.log("localhost:" + app.get('port'));
// });

// var http = require('http');
// var port = process.env.PORT || 1337;
// http.createServer(function(req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World\n');
// }).listen(port);

var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

var database = require('./config/database.js');

// set database setup
mongoose.connect(database.url);
var Report = require('./models/report.js');

// port
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname + '/public')));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
});

app.get('/', function(req, res){
	res.render("index.html");
});

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

app.listen(app.get('port'), function(){
	console.log("Server Running on localhost:" + app.get('port'));
});



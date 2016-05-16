var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
	// id: Schema.ObjectId,
	description: String,
	date: Date,
	time: Date,
	busLine: Number,
	transportCompany: String,
	location: String,
	complaint: String,
	name: String,
	email: String,
	telephone: String,
	file: String
});

module.exports = mongoose.model('Report', reportSchema);
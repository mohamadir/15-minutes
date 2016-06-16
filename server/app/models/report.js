var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
	// id: Schema.ObjectId,
	description: String,
	createdAt: Date,
	date: Date,
	time: Date,
	busLine: String,
	transportCompany: String,
	location: {
		coords:{
			lat: Number,
			lon: Number,
		},
		city: String,
		address: String
	},
	complaint: String,
	name: String,
	email: String,
	telephone: String,
	images: [String],
	note: String
});

module.exports = mongoose.model('Report', reportSchema);
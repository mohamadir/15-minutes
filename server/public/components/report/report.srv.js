(function(){

	"use strict";

	angular
	.module('15min')
	.service('Report', function($http, $q){

		var self = {
			'results': [],
			'total': 0,
			'BusLineCount': [],
			// Get all the report
			'load': function(query){
				var defer = $q.defer();
				$http.post('/api/v1/getreport/', query).success(function(res){
					console.log("New Query: ", res);
					self.results = res.reports;
					self.total = res.count;
					defer.resolve(res.reports);
				});
				return defer.promise;
			},
			// Get specific report
			'getReport': function(id){
				var defer = $q.defer();
				$http.post('/api/v1/report/' + id).success(function(res){
					console.log("==> Get the report");
					defer.resolve(res);
				});
				return defer.promise;
			},
			// Search Report
			'searchReport': function(searchObj){
				var defer = $q.defer();
				$http.post('/api/v1/searchreport/', searchObj).success(function(res){
					self.results = res.reports;
					self.total = res.count;
					defer.resolve(res.reports);
				});
				return defer.promise;
			},
			// Bus Line Count
			'getBusLineCount': function(){
				var defer = $q.defer();
				$http.post('/api/v1/buslinereport/').success(function(res){
					console.log(res);
					defer.resolve(res);
				});
				return defer.promise;
			},
			// Get report location
			'getReportLocation': function(){
				var defer = $q.defer();
				$http.post('/api/v1/locationreport/').success(function(res){
					//console.log(res);
					defer.resolve(res);
				});
				return defer.promise;
			},
			// Update Report
			'UpdateReport': function(id, report){
				var defer = $q.defer();
				console.log("id: " + id + ", report: ");
				console.log(report);
				$http.put('/api/v1/report/' + id, report).success(function(res){
					console.log("==> Update the report");
					defer.resolve(res);
				});
				return defer.promise;
			},
			'deleteReport': function(id){
				var defer = $q.defer();
				$http.delete('/api/v1/report/' + id).success(function(res){
					console.log("==> Delete the report");
					defer.resolve(res);
				});
				return defer.promise;
			}
		};

		return self;
	});

})();
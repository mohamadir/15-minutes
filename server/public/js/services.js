angular.module('services', [])

.service('Report', function($http, $q){

	var self = {
		'results': [],
		'load': function(){
			var defer = $q.defer();
			$http.get('/api/v1/report').success(function(res){
				self.results = res;
				defer.resolve(res);
			});
			return defer.promise;
		},
		'getReport': function(id){
			var defer = $q.defer();
			$http.get('/api/v1/report/' + id).success(function(res){
				console.log("==> Get the report");
				defer.resolve(res);
			});
			return defer.promise;
		},
		'UpdateReport': function(id, report){
			var defer = $q.defer();
			console.log("id: " + id + ", report: ");
			console.log(report);
			$http.put('/api/v1/report/' + id, report).success(function(res){
				console.log("==> Update the report");
				defer.resolve(res);
			});
			return defer.promise;
		}
	};

	self.load();

	return self;
});
angular.module('services', [])

.service('Report', function($http, $q){

	var self = {
		'results': [],
		'load': function(){
			$http.get('/api/v1/report').success(function(res){
				console.log("==> Get the reports");
				console.log(res);
				self.results = res;
			});
		},
		'getReport': function(id){
			var defer = $q.defer();
			$http.get('/api/v1/report/' + id).success(function(res){
				console.log("==> Get the report");
				defer.resolve(res);
			});
			return defer.promise;
		}
	};

	self.load();

	return self;
});
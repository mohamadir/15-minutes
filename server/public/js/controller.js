var mod = angular.module('controller', []);

mod.controller('HomeCtrl', function(){});

mod.controller('LoginCtrl', function($scope, $http){

	$scope.form = {
		email: '',
		password: ''
	}

	$scope.login = function(){
		$http.post('localhost:3000/login', $scope.form).success(function(res){
			console.log(res);
		});
	}

});

mod.controller('SignupCtrl', function($scope, $http){

	console.log("::SignupCtrl");

	$scope.form = {
		email: '',
		password: ''
	}

	$scope.signup = function(){
		console.log("Signup function");
		$http.post('/signupuser', $scope.form)
		.success(function(res){
			console.log("POST Success!!");
			console.log(res);
		})
		.error(function(){
			console.log("POST Failed!!");
		});
	}

});

mod.controller('ReportsCtrl', function($scope, Report){
	console.log('> ReportsCtrl');
	$scope.reports = Report;
});

mod.controller('ReportDetailsCtrl', function($scope, $routeParams, Report){
	console.log('> ReportDetailsCtrl');
	console.log('==> Route Params id: ', $routeParams.id);
	Report.getReport($routeParams.id).then(function(res){
		$scope.report = res;
		console.log("report: ", $scope.report);
	});
	
});

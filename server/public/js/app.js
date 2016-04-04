var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	})
	.otherwise('/');
});

app.controller('HomeCtrl', function($scope, $http){

	$http.get('/api/v1/report').success(function(res){
		$scope.reports = res;
	});

});
var app = angular.module('app', [
	'ngRoute',
	'controller',
	'services'
]);

// Routes
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	})
	.when('/reports', {
		templateUrl: 'templates/reports.html',
		controller: 'ReportsCtrl'
	})
	.when('/reports/:id', {
		templateUrl: 'templates/reportDetails.html',
		controller: 'ReportDetailsCtrl'
	})
	.otherwise('/');
});


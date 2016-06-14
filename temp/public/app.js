var app = angular.module('15min', [
	'auth0',
	'angular-storage',
	'angular-jwt',
	'ngMaterial',
	'ui.router'
]);

app.config(function
	($provide, 
	authProvider, 
	$urlRouterProvider, 
	$stateProvider, 
	$httpProvider, 
	jwtInterceptorProvider) {
	
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'components/home/home.tpl.html'
		})
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'components/dashboard/dashboard.tpl.html',
			controller: 'dashboardController'
		})

})
'use srtict';

var app = angular.module('app', [
	'auth0',
	'angular-storage',
	'angular-jwt',
	'ngMaterial',
	'ui.router',
	// 'ngCookies',
	'relativeDate',
	'chart.js',
	'ui.bootstrap',
	'controller',
	'services',
	'directives',
	'filters'
]);

// Check auth
// app.run(function ($rootScope, $cookieStore, $location, Auth) {

//   $rootScope.$on("$routeChangeStart", function (event, next, current) {
//   	console.log(">> Route Change");
//   	// if not logged in
//     if(Auth.isLoggedIn()){
//     	console.log(">> logged In");
//     	$rootScope.loggedIn = true;
//     	if($location.url() == '/'){
//     		$location.path('/dashboard');
//     	}
//     }
//     // if logged in
//     else{
//     	console.log(">> Not logged In");
//     	$rootScope.loggedIn = false;
//     	$location.path('/');
//     }
    
//   });

// });

// Routes
app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	})
	.when('/dashboard', {
		templateUrl: 'templates/dashboard.html',
		controller: 'DashboardCtrl',
		resolve: {
			'check': function($location, Auth){
				if(!Auth.isLoggedIn()){	
					$location.path('/');
				}
			}
		}
	})
	.when('/report/:id', {
		templateUrl: 'templates/report.html',
		controller: 'ReportCtrl',
		resolve: {
			'check': function($location, Auth){
				if(!Auth.isLoggedIn()){	
					$location.path('/');
				}
			}
		}
	})
	.otherwise({
		redirectTo: '/'
	});
});

// Date translate
app.value('relativeDateTranslations', {
  just_now: 'עכשיו',
  seconds_ago: 'לפני {{time}} שניות',
  a_minute_ago: 'לפני דקה',
  minutes_ago: 'לפני {{time}} דקות',
  an_hour_ago: 'לפני שעה',
  hours_ago: 'לפני {{time}} שעות',
  a_day_ago: 'אתמול',
  days_ago: 'לפני {{time}} ימים',
  a_week_ago: 'לפני שבוע',
  weeks_ago: 'לפני {{time}} שבועות',
  a_month_ago: 'לפני חודש',
  months_ago: 'לפני {{time}} חודשים',
  a_year_ago: 'לפני שנה',
  years_ago: 'לפני {{time}} שנים',
  over_a_year_ago: 'יותר משנה',
});





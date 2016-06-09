var app = angular.module('app', [
	'ngRoute',
	'ngCookies',
	'relativeDate',
	'chart.js',
	'ui.bootstrap',
	'controller',
	'services'
]);

// Check auth
app.run(function ($rootScope, $cookieStore, Auth) {

  $rootScope.$on("$routeChangeStart", function (event, next, current) {
  
    if(!Auth.isLoggedIn($cookieStore.get('user'))){
    	$rootScope.loggedIn = false;
    	$location.path('/');
    }
    else{
    	$rootScope.loggedIn = true;
    }
    
  });

});

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
			'check': function($location, $cookieStore){
				if(!$cookieStore.get('user')){	
					$location.path('/');
				}
			}
		}
	})
	.when('/report/:id', {
		templateUrl: 'templates/report.html',
		controller: 'ReportCtrl',
		resolve: {
			'check': function($location, $cookieStore){
				if(!$cookieStore.get('user')){	
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

// Page start filter
app.filter('startFrom', function(){
	return function(data, start){
		return data.slice(start);
	}
});



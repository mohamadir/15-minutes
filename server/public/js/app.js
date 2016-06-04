var app = angular.module('app', [
	'ngRoute',
	'relativeDate',
	'controller',
	'services'
]);

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
})

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


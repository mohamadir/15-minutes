"use strict";

angular.module("15min", [
	"auth0", 
	"angular-storage", 
	"angular-jwt", 
	"ngMaterial",
	"md.data.table",
	"ui.router",
	"relativeDate",
	"chart.js",
	"uiGmapgoogle-maps"
	])

	.config(function
		($provide, 
		authProvider, 
		$urlRouterProvider, 
		$stateProvider, 
		$httpProvider, 
		jwtInterceptorProvider,
		ChartJsProvider,
		$compileProvider) {

		// image href Sanitization
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);

		// Chart.js
		ChartJsProvider.setOptions(
			{ colours : 
				['#803690', 
				'#00ADF9', 
				'#DCDCDC', 
				'#46BFBD', 
				'#FDB45C', 
				'#949FB1', 
				'#4D5360'] 
		});
		
		// Auth
		authProvider.init({
			domain: '15min.auth0.com',
			clientID: 'wMiaGVcupBYebZC5whqoyYAwtz8k04E1'
		});

		jwtInterceptorProvider.tokenGetter = function(store){
			return store.get('id_token');
		}

		// Route
		$urlRouterProvider.otherwise("/home");

		$stateProvider
			.state("home", {
				url: "/home",
				templateUrl: "components/home/home.tpl.html",
				controller: "homeController"
			})
			.state("dashboard", {
				url: "/dashboard",
				templateUrl: "components/dashboard/dashboard.tpl.html",
				controller: "dashboardController"
			})
			.state("report", {
				url: "/report",
				templateUrl: "components/report/report.tpl.html",
				controller: "reportController"
			})
			.state("oneReport", {
				url: "/report/:id",
				templateUrl: "components/oneReport/oneReport.tpl.html",
				controller: "oneReportController"
			})
			.state("map", {
				url: "/map",
				templateUrl: "components/map/map.tpl.html",
				controller: "mapController"
			});

		// check if token expire
		function redirect($q, $injector, $timeout, store, $location){

			var auth;
      $timeout(function() {
        auth = $injector.get('auth');
			});

			return{
				responseError: function(rejection){

					if(rejection.status === 401){
						auth.signout();
						store.remove('profile');
						store.remove('id_token');
						$location.path('/home');
					}

					return $q.reject(rejection);
				}
			}
		}

		$provide.factory('redirect', redirect);

		$httpProvider.interceptors.push('redirect');
		$httpProvider.interceptors.push('jwtInterceptor');

	})

	// Check every state change
	.run(function($rootScope, auth, store, jwtHelper, $location){
		$rootScope.$on('$locationChangeStart', function(){

			var token = store.get('id_token');

			// if token exist
			if(token){
				// if token not expired
				if(!jwtHelper.isTokenExpired(token)){
					// if token exist and not expired and the admin not Authenticated
					if(!auth.isAuthenticated){
						auth.authenticate(store.get('profile'), token);
					}
					// if Authenticated and went to home
					if($location.url() == '/home'){
		    		$location.path('/dashboard');
		    	}
				}
				// if token expired
				else{
					$location.path('/home');
				}
			}else{
				$location.path('/home');
			}

		});
	})

	// Date translate
	.value('relativeDateTranslations', {
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

(function(){

	"use strict";

	angular
		.module("15min")
		.controller("dashboardController", dashboardController);

		function dashboardController($scope, $http, store, auth, Report){

			console.log('> DashboardCtrl');

			$scope.profile = store.get('profile');

			$scope.reset = function(){
				auth.reset({
		      popup: true,
		      connection: 'Username-Password-Authentication'

		      // popup: true to use popup instead of redirect
		    });
			}

			// Chart.js
			$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
		  $scope.series = ['Series A', 'Series B'];

		  $scope.data = [
		    [65, 59, 80, 81, 56, 55, 40],
		    [28, 48, 40, 19, 86, 27, 90]
		  ];

		  $scope.onClick = function (points, evt) {
		    console.log(points, evt);
		  };

		  // Get top line Bus
		  $scope.loading = true;
		  Report.getBusLineCount().then(function(res){
		  	console.log("New Bus Line Table: ", res);
		  	$scope.topBusLine = res;
		  	$scope.loading = false;
		  });
		  
		  
		}

})();

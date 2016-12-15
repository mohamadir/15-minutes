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
			// $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
			// $scope.data = [300, 500, 100];

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

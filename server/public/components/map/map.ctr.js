(function(){

	"use strict";

	angular
		.module("15min")
		.controller("mapController", mapController);

		function mapController($scope, Report){

			$scope.loading = true;

			$scope.map = { center: { latitude: 31.7683, longitude: 35.2137 }, zoom: 6 };

			$scope.options = {icon:'img/busicon.png'};

			Report.getReportLocation().then(function(res){
				console.log("Report Location: ", res);
				$scope.markerList = res;
				console.log($scope.markerList);
				$scope.loading = false;
			});

		}

})();

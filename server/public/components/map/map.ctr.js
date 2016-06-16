(function(){

	"use strict";

	angular
		.module("15min")
		.controller("mapController", mapController);

		function mapController($scope, Report){

			$scope.loading = true;

			$scope.map = { center: { latitude: 31.768319, longitude: 35.213710 }, zoom: 7 };

			$scope.options = {icon:'img/busicon.png'};

			Report.getReportLocation().then(function(res){
				console.log("Report Location: ", res);
				$scope.markerList = res;
				console.log($scope.markerList);
				$scope.loading = false;
			});

		}

})();

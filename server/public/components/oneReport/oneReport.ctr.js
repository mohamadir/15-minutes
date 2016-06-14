(function(){

	"use strict";

	angular
	.module("15min")
	.controller("oneReportController", oneReportController)

	function oneReportController($scope, Report, $stateParams){
		console.log('> OneReportCtrl');
		console.log('==> Route Params id: ', $stateParams.id);

		// Get the Report
		Report.getReport($stateParams.id).then(function(res){
			$scope.report = res;
			console.log("report: ", $scope.report);
		});

		$scope.formMode = false;

		// Edit 
		$scope.edit = function(id){
			console.log("Edit: ", id);
			$scope.formMode = !$scope.formMode;
		};

		// Update
		$scope.update = function(id){
			console.log("Update: ", id);
			Report.UpdateReport(id, $scope.report).then(function(res){
				console.log("Update report: ", res);
			});
			$scope.formMode = !$scope.formMode;
		};
	}

})();
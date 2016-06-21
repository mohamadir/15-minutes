(function(){

	"use strict";

	angular
	.module("15min")
	.controller("oneReportController", oneReportController)

	function oneReportController($scope, Report, $state, $stateParams, $mdDialog){
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

		// Update Note
		$scope.update = function(id){
			console.log("Update: ", id);
			Report.UpdateReport(id, $scope.report).then(function(res){
				console.log("Update report: ", res);
			});
			$scope.formMode = !$scope.formMode;
		};

		// Delete Confirm
		$scope.DeleteConfirm = function(ev, id) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
	          .title('Would you like to delete the report?')
	          .textContent("Once you delete it, it's not going back")
	          .ariaLabel('Delete')
	          .targetEvent(ev)
	          .ok('Delete')
	          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {
	    	console.log("Delete: ", id);
	      Report.deleteReport(id).then(function(res){
	      	console.log("Delete report successfuly.");
	      	$state.go('report');
	      }, function(err){
	      	console.log("Delete report field! " + err);
	      });
	    }, function() {
	      console.log('Cancel');
	    });
	  };

	}

})();
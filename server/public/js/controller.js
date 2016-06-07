var mod = angular.module('controller', []);

mod.controller('HomeCtrl', function(){});

mod.controller('ReportsCtrl', function($scope, Report){
	console.log('> ReportsCtrl');
	$scope.reports = Report;

	$scope.exportData = function(){
    var blob = new Blob([document.getElementById('reports-table').innerHTML], {
       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
    });
  	saveAs(blob, "Reports.xls");
  };

});

mod.controller('ReportDetailsCtrl', function($scope, $routeParams, Report){
	console.log('> ReportDetailsCtrl');
	console.log('==> Route Params id: ', $routeParams.id);

	// Get the Report
	Report.getReport($routeParams.id).then(function(res){
		$scope.report = res;
		console.log("report: ", $scope.report);
	});

	$scope.formMode = false;

	// Edit 
	$scope.edit = function(id){
		console.log("Edit: ", id);
		$scope.formMode = !$scope.formMode;
	}

	// Update
	$scope.update = function(id){
		console.log("Update: ", id);
		Report.UpdateReport(id, $scope.report).then(function(res){
			console.log("Update report: ", res);
		});
		$scope.formMode = !$scope.formMode;
	}
	
});

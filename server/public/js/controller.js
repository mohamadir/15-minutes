var mod = angular.module('controller', ['ui.bootstrap']);

mod.controller('HomeCtrl', function(){});

mod.controller('ReportsCtrl', function($scope, Report){
	console.log('> ReportsCtrl');

	// Get all the report
	$scope.reports = Report;

	// Set the total report after the loading the data
	Report.load().then(function(){
		$scope.total = $scope.reports.results.length;
		console.log("Total: ", $scope.total);
		console.log("Reports: ", $scope.reports.results);
	});

	// Set the pagination params
	$scope.currentPage = 1;
	$scope.pageSize = 10;

	// Export to excel
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
	};

	// Update
	$scope.update = function(id){
		console.log("Update: ", id);
		Report.UpdateReport(id, $scope.report).then(function(res){
			console.log("Update report: ", res);
		});
		$scope.formMode = !$scope.formMode;
	};

});

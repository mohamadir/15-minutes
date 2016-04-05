var mod = angular.module('controller', []);

mod.controller('HomeCtrl', function(){});

mod.controller('ReportsCtrl', function($scope, Report){
	console.log('> ReportsCtrl');
	$scope.reports = Report;
});

mod.controller('ReportDetailsCtrl', function($scope, $routeParams, Report){
	console.log('> ReportDetailsCtrl');
	console.log('==> Route Params id: ', $routeParams.id);
	Report.getReport($routeParams.id).then(function(res){
		$scope.report = res;
		console.log("report: ", $scope.report);
	});
	
});

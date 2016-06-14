(function(){

	"use strict";

	angular
	.module("15min")
	.controller("reportController", reportController)
	.filter('startFrom', function(){
		return function(data, start){
			return data.slice(start);
		}
	});

	function reportController($scope, $timeout, Report){
		console.log('> ReportCtrl');

	  // Material Data table
	  $scope.query = {
	    order: '-createdAt',
	    limit: 15,
	    page: 1
	  };

	  $scope.search = {
	  	query: ""
	  }

    // load report according to the page number
	  $scope.loadReports = function (query) {
      // Set the total report after the loading the data
  	  $scope.promise = Report.load(query).then(function(res){
  	  	$scope.reports = res;
  	  	$scope.total = Report.total;
  	  	console.log("Reports: ", $scope.reports);
  	  	console.log("Count: ", $scope.total);
  	  });
    };

    $scope.loadReports($scope.query);

    // Pagination with the server
    $scope.reportPagination = function (page, limit) {
      console.log('page: ', page);
      console.log('limit: ', limit);
      $scope.query.page = page;
      $scope.query.limit = limit;
      $scope.loadReports($scope.query);
    }

    // Reorder the reports
    $scope.reportReorder = function (order) {
      console.log('order: ', order);
      $scope.query.order = order;
      $scope.loadReports($scope.query);
    };

    // search 
    $scope.reportSearch = function(searchquery){
    	if(searchquery.length > 0){

    		console.log("search query: " +  searchquery + ", length: " + searchquery.length);
    		$scope.search.query = searchquery;

  			$scope.promise = Report.searchReport($scope.search).then(function(res){
  				$scope.reports = res;
  				$scope.total = Report.total;
  				console.log("Reports: ", $scope.reports);
  				console.log("Count: ", $scope.total);
  			}, function(err){
  				console.log(err);
  			});

    	}else{
    		$scope.loadReports($scope.query);
    	}
    }

    // Limit Option
	  $scope.toggleLimitOptions = function () {
      $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };

    $scope.toggleLimitOptions();

  	// Export to excel
  	$scope.exportData = function(){
      var blob = new Blob([document.getElementById('table-data-export').innerHTML], {
         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
    	saveAs(blob, "Reports.xls");
    };

	}

})();
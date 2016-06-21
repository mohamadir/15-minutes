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
	    page: 1,
      filter: {
        complaint: "all",
        transportCompany: "all"
      }
	  };

    // Search object
	  $scope.search = {
	  	query: "",
      field: ""
	  }

    // highlight after the search
    $scope.isHighligthed = false;

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
    $scope.reportSearch = function(searchQuery){

      // Check if search box is dirty then do the work
    	if(searchQuery.length > 0){

        console.log("search query: " +  searchQuery + ", length: " + searchQuery.length);
    		console.log("search field: " +  $scope.search.field);
        $scope.search.query = searchQuery;

  			$scope.promise = Report.searchReport($scope.search).then(function(res){
  				$scope.reports = res;
  				$scope.total = Report.total;
          $scope.isHighligthed = true;
  				console.log("Reports: ", $scope.reports);
  				console.log("Count: ", $scope.total);
  			}, function(err){
  				console.log(err);
  			});

    	}else{
        $scope.isHighligthed = false;
        $scope.search.query = "";
    		$scope.loadReports($scope.query);
    	}
    }

    // On Select Change
    $scope.reportSelect = function(field){
      console.log(">> Field is: ", field);
      if($scope.search.query.length > 0){
        console.log("Bigger than zero.");
        $scope.reportSearch($scope.search.query);
      }
    }

    // filter
    $scope.reprotFilter = function(filter, field){
      
      // Set the complaint filter
      if(field == 'complaint'){
        $scope.query.filter.complaint = filter;
      }
      // Set the transport company filter
      if(field == 'transportCompany'){
        $scope.query.filter.transportCompany = filter;
      }

      $scope.loadReports($scope.query);

      console.log(">> Filter Complaint is: " + $scope.query.filter.complaint);
      console.log(">> Filter Transport Company is: " + $scope.query.filter.transportCompany);

    }

    // Limit Option
	  $scope.toggleLimitOptions = function () {
      $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };
    $scope.toggleLimitOptions();

  	// Export to excel
  	$scope.exportData = function(){
      var blob = new Blob([document.getElementById('table-data-export').innerHTML], {
         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
    	saveAs(blob, "Reports.xls");
    };

	}

})();
var mod = angular.module('controller', []);

mod.controller('HomeCtrl', function(
	$scope, 
	$rootScope, 
	$cookieStore,
	$location, 
	Auth){

	console.log('> HomeCtrl');

	// cookie user
  console.log("Cookies.user: ", $cookieStore.get('user'));
	// current user
  console.log("currentUser: ", Auth.currentUser);
  // logged in bool
  console.log("loggedIn: ", $rootScope.loggedIn);

  // User data 
	$scope.user = {
		email: '',
		password: ''
	};

	// Error param
	$scope.hasError = false;

	// Login 
	$scope.login = function(){

		console.log("> Login");

		// Check validaiton
		if($scope.loginForm.$valid){
			console.log("> 1 - Form Input: ", $scope.user);
			Auth.login($scope.user).then(function(){
				$scope.hasError = false;
				$location.path('/dashboard');
			}, function(err){
				console.log("> Server Error: ", err);
				$scope.hasError = true;
			});
		}else{
			$scope.loginForm.submitted = true;
		}

	};

});

mod.controller('DashboardCtrl', function(
	$scope, 
	$rootScope, 
	$location, 
	$cookieStore,
	Report, 
	Auth){

	console.log('> DashboardCtrl');

	// cookie user
  console.log("Cookies.user: ", $cookieStore.get('user'));
	// current user
  console.log("currentUser: ", Auth.currentUser);
  // logged in bool
  console.log("loggedIn: ", $rootScope.loggedIn);

	// Get all the report
	$scope.reports = Report;

	// Get current user
	$scope.currentUser = Auth.currentUser;

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

  // Logout
  $scope.logout = function(){
  	Auth.logout().then(function(){
  		$location.path('/');
  	});
  };

});

mod.controller('ReportCtrl', function($scope, $routeParams, Report){

	console.log('> ReportCtrl');
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

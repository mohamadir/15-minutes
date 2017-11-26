(function(){

	"use strict";

	angular
		.module("15min")
		.controller("homeController", homeController);

		function homeController($scope, auth, store, $location){
			$scope.showMessage=false;
			$scope.login = login;
			$scope.wrongMessage="";
			function login(){

				if($scope.email=='15min@15min.com' && $scope.password=='15min' )
					$location.path('/dashboard');
				else{
					$scope.showMessage=true;
					$scope.wrongMessage="wrong inputs !"
				}
				console.log($location);
			}
		}

})();

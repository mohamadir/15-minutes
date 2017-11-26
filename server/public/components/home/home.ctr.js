(function(){

	"use strict";

	angular
		.module("15min")
		.controller("homeController", homeController);

		function homeController($scope, auth, store, $location){

			$scope.login = login;

			function login(){

				if($scope.email=='15min@15min.com' && $scope.password=='15min' )
					$location.path('/dashboard');
				console.log($location);
			}
		}

})();

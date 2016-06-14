(function(){

	"use strict";

	angular
		.module("15min")
		.directive("toolbar", toolbar);

		function toolbar(){
			return{
				templateUrl: "components/toolbar/toolbar.tpl.html",
				controller: toolbarController,
				controllerAs: "toolbar",
			}
		}

		function toolbarController($scope, auth, store, $location){
			
			$scope.logout = logout;
			$scope.auth = auth;

			function logout(){
				store.remove('profile');
				store.remove('id_token');
				auth.signout();
				$location.path('/home');
			}
		}

})();



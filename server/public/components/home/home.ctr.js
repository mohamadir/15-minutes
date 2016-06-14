(function(){

	"use strict";

	angular
		.module("15min")
		.controller("homeController", homeController);

		function homeController($scope, auth, store, $location){

			$scope.login = login;

			function login(){
				var options = {
					connections:['Username-Password-Authentication'],
					primaryColor: '#252525',
					dict: 'EN',
					closable: true,
					gravatar: false,
					disableSignupAction: true,
					disableResetAction: true
				};
				auth.signin(options, function(profile, token){
					store.set('profile', profile);
					store.set('id_token', token);
					console.log(profile);
					$location.path('/dashboard');
				}, function(err){
					console.log(err);
				});
			}
		}

})();

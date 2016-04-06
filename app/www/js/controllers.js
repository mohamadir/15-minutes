var app = angular.module('starter.controllers', [])

// Home Controller
app.controller('HomeCtrl', function($scope, $ionicLoading, Report) {});

// Report Controller
app.controller('ReportCtrl', function($scope, $state, $ionicLoading, $ionicPopup, Report) {
	$scope.formData = {
		description: "",
		date: "",
		time: "",
		busLine: "",
		transportCompany: "",
		location: "",
		complaint: "",
		name: "",
		email: "",
		telephone: "",
		file: ""
	}

	$scope.addReport = function(){
		console.log("Add New Reprot");
		console.log($scope.formData);

		// Show Loading 
		$ionicLoading.show({
		    template: '<p>Loading...</p><ion-spinner icon="ripple"></ion-spinner>'
		});


		Report.addReport($scope.formData).then(function(){ // Success
			console.log("Success!!");

			// Hide Loading
			$ionicLoading.hide();

			// Alert
			$ionicPopup.show({
				title: 'Success',
				subTitle: 'The report sent Successfully.',
				buttons: [{
				    text: 'OK',
				    type: 'button-positive',
				    onTap: function(e) {
				    	$state.go("tab.home");
				    }
				}]
			});

			// Reset the form data
			$scope.formData = "";

		}, function(){ // Failed
			console.log("Failed!!");

			// Hide Loading
			$ionicLoading.hide();

			// Alert
			$ionicPopup.show({
				title: 'Failed',
				subTitle: 'Error with sending the report try again later.',
				buttons: [{
				    text: 'OK',
				    type: 'button-positive',
				    onTap: function(e) {
				    	$state.go("tab.report");
				    }
				}]
			});
		}); 
	} // End AddReport()
});

// Setting Controller
app.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableSound: true
  };
});

var app = angular.module('starter.controllers', [])

app.controller('HomeCtrl', function($scope, $ionicLoading, Report) {

	//$ionicLoading.show();
	//$scope.personlist = Person;
	//$scope.personlist.load().then(function(){
	//	$ionicLoading.hide();
	//});
    
	//$scope.removePerson = function(person){
	//	Person.removePerson(person);
	//	console.log("Remove Person: ", person);
	//}
});

app.controller('ReportCtrl', function($scope, Report) {
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
		Report.addReport($scope.formData).then(function(){
			console.log("Success!!");
			$scope.formData = "";
		});
	}
});

app.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableSound: true
  };
});

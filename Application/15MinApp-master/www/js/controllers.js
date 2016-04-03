var app = angular.module('starter.controllers', [])

app.controller('HomeCtrl', function($scope, $http, $ionicLoading, Person) {

	//$scope.formData = {
	//	name: "",
	//	age: ""
	//}
    //
	//$ionicLoading.show();
	//$scope.personlist = Person;
	//$scope.personlist.load().then(function(){
	//	$ionicLoading.hide();
	//});
    //
	//$scope.addPerson = function(){
	//	console.log("Add New Person");
	//	Person.addPerson($scope.formData).then(function(){
	//		console.log("Success!!");
	//		$scope.formData.name = "";
	//		$scope.formData.age = "";
	//	});
	//}
    //
	//$scope.removePerson = function(person){
	//	Person.removePerson(person);
	//	console.log("Remove Person: ", person);
	//}
});

app.controller('ReportCtrl', function($scope) {});

app.controller('SettingCtrl', function($scope) {
  $scope.settings = {
    enableSound: true
  };
});

var app = angular.module('starter.controllers', [])

// ======================================================//
// Home Controller ======================================//
// ======================================================//
app.controller('HomeCtrl', function($scope, $ionicPlatform) {});

app.directive('hideTabs', function($rootScope, $state) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      scope.$state = $state;
      scope.currentstate = $state.current;
      scope.$on("$stateChangeSuccess", function(evt, to) {
        scope.currentstate = $state.current
        console.log(scope.currentstate.name);
        if($state.includes('tab.home')){
          element.addClass("hide-tabs");
        }else{
          element.removeClass("hide-tabs");
        }
      });
    }
  };
});

// ======================================================//
// Report Controller ====================================//
// ======================================================//
app.controller('ReportCtrl', function(
  $scope,
  $rootScope, 
  $state, 
  $cordovaCamera,
  $cordovaCapture, 
  $ionicLoading, 
  $ionicPopup, 
  Report) {

  // images counter
  var imgCount = 0;
	
  // Form Data
  $scope.formData = {
    description: "",
    createdAt: "",
    date: "",
    time: "",
    busLine: "",
    transportCompany: "",
    location: {
      coords:{
        lat: Number,
        lon: Number,
      },
      city: String,
      address: ""
    },
    complaint: "",
    name: "",
    email: "",
    telephone: "",
    images: [],
    note: ""
  };
  // Reset Form
  $scope.reset = function(){
    console.log("Reset Form");
    $scope.formData = {
      description: "",
      createdAt: "",
      date: "",
      time: "",
      busLine: "",
      transportCompany: "",
      location: {
        coords:{
          lat: Number,
          lon: Number,
        },
        city: String,
        address: ""
      },
      complaint: "",
      name: "",
      email: "",
      telephone: "",
      images: [],
      note: ""
    };
  }

  // Get Location
	$scope.getPostion = function(){
		// Show Loading 
		$ionicLoading.show({
		  template: '<p>Loading...</p><ion-spinner icon="dots"></ion-spinner>'
		});

		Report.getPostion().then(function(res){
			$ionicLoading.hide();
			$scope.results = res;
      $scope.formData.location.coords.lat = Report.lat;
      $scope.formData.location.coords.lon = Report.lon;
      $scope.formData.location.city = $scope.results.results[0].address_components[2].long_name;
      $scope.formData.location.address = $scope.results.results[0].formatted_address;
      console.log("lat: ", $scope.formData.location.coords.lat);
      console.log("lon: ", $scope.formData.location.coords.lon);
      console.log("city: ", $scope.formData.location.city);
      console.log("address: ", $scope.formData.location.address);
			console.log(res);
		}, function(){
      $ionicLoading.hide();
      // Location Error Msg
      $ionicPopup.show({
        title: 'אופס !',
        subTitle: 'אנא כנס להגדרות והפעל את הרשאות המיקום במכשירך',
        buttons: [{
          text: 'OK',
          type: 'button-assertive',
        }]
      });
    });

	};

  // Open Camera function
  function openCamera(srcType){
    console.log("Open Camera function and the type is ", srcType);
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: srcType,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 400,
      targetHeight: 400,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation: false
    };

    // check if more than 10 pic
    if(imgCount == 4){
      // Report success Msg
      $ionicPopup.show({
        title: 'אופס!',
        subTitle: 'אפשר לצרף רק 4 תמונות.',
        buttons: [{
          text: 'OK',
          type: 'button-positive',
        }]
      });
      return;
    }

    $cordovaCamera.getPicture(options).then(function(imageData) {
      console.log("image counter: ", imgCount);
      // Adding new image
      $scope.formData.images.push("data:image/jpeg;base64," + imageData);
      imgCount++;
      console.log($scope.formData.images);

    }, function(err) {
      // Camera Error Msg
      $ionicPopup.show({
        title: 'אופס !',
        subTitle: 'לא הצלחתה תנסה שוב.',
        buttons: [{
          text: 'OK',
          type: 'button-assertive',
        }]
      });
    });

  }

  // Get Picture
  $scope.getPicture = function(){
    openCamera(1);
  }

  // Get Picture
  $scope.pickPicture = function(){
    openCamera(0);
  }

  // delete Picture
  $scope.deletePicture = function(index){
    console.log("Delete Picture index: ", index);
    $scope.formData.images.splice(index, 1);
    imgCount--;
  }

  // Add Report
	$scope.addReport = function(){
		console.log("Add New Reprot");

    var date = new Date();    
    var dateStr = JSON.stringify(date);
    var dateNow = JSON.parse(dateStr);
    $scope.formData.createdAt = dateNow;

		console.log($scope.formData);

		// Show Loading 
		$ionicLoading.show({
		    template: '<p>Loading...</p><ion-spinner icon="ripple"></ion-spinner>'
		});

		Report.addReport($scope.formData).then(function(){ // Success
			console.log("Success!!");

			// Hide Loading
			$ionicLoading.hide();

			// Report success Msg
			$ionicPopup.show({
				title: 'תודה',
				subTitle: 'הדיווח התקבל בהצלחה!<span class="delete-text">א</span><br/>ביחד נשפר את התחבורה הציבורית',
				buttons: [{
			    text: 'OK',
			    type: 'button-positive',
			    onTap: function(e) {
			    	$state.go("tab.home");
			    }
				}]
			});

			// Reset the form data
      $scope.reset();

		}, function(err){ // Failed
			console.log("Failed!!");

			// Hide Loading
			$ionicLoading.hide();

			// Report Error Msg
			$ionicPopup.show({
				title: 'אופס !',
				subTitle: 'ישנה בעיה בשרת<br>אנא נסה בעוד כמה דקות<br>',
				buttons: [{
				    text: 'OK',
				    type: 'button-assertive',
				    onTap: function(e){
				    	$state.go("tab.report");
				    }
				}]
			});
		}); 
	} // End AddReport()

});

// ======================================================//
// Info Controller ======================================//
// ======================================================//
app.controller('InfoCtrl', function(){});

app.controller('SuccessCtrl', function($scope, $ionicSlideBoxDelegate, $state){

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('tab.more');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    console.log(index);
    $scope.slideIndex = index;
  };

});

// ======================================================//
// More Controller ======================================//
// ======================================================//
app.controller('MoreCtrl', function($scope, $state) {

  $scope.toSuccess = function(){
    $state.go('success');
  }

});

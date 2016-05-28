var app = angular.module('starter.controllers', [])

// Home Controller
app.controller('HomeCtrl', function($scope, $ionicLoading, Report, $cordovaSplashscreen) {
	
	//  $cordovaSplashscreen.show();
	//  $cordovaSplashscreen.hide();

	
});

// Report Controller
app.controller('ReportCtrl', function(
  $scope, 
  $state, 
  $cordovaCamera,
  $cordovaCapture, 
  $ionicLoading, 
  $ionicPopup, 
  Report) {
	
  // Form Data
	$scope.formData = {
		description: "",
    createdAt: "",
		date: "",
		time: "",
		busLine: "",
		transportCompany: "",
		location: "",
		complaint: "",
		name: "",
		email: "",
		telephone: "",
		images: []
	}

  // set time
  $scope.time = Date.now();

  // Get Location
	$scope.getPostion = function(){
		// Show Loading 
		$ionicLoading.show({
		  template: '<p>Loading...</p><ion-spinner icon="dots"></ion-spinner>'
		});

		Report.getPostion().then(function(res){
			$ionicLoading.hide();
			$scope.results = res;
      $scope.formData.location = $scope.results.results[0].formatted_address;
      console.log("location: ", $scope.formData.location);
			console.log(res);
		});

	};

  // Get Picture
  $scope.getPicture = function(){
    console.log("Get Picture");
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 440,
      targetHeight: 440,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.formData.images.push("data:image/jpeg;base64," + imageData);
      console.log($scope.formData.images);
    }, function(err) {
      console.log("Camera Error!!");
    });

  }

  // delete Picture
  $scope.deletePicture = function(){
    console.log("Delete Picture");
    $scope.formData.images = [];
    $cordovaCamera.cleanup(function(){
      alert("Delete");
    }, function(){
      alert("Error Delete!!");
    });
  }

  // Add Report
	$scope.addReport = function(){
		console.log("Add New Reprot");
		console.log($scope.formData);

		// Show Loading 
		$ionicLoading.show({
		    template: '<p>Loading...</p><ion-spinner icon="ripple"></ion-spinner>'
		});

    // Get Report Created At Date 
    var date = new Date();    
    var dateStr = JSON.stringify(date);
    var dateNow = JSON.parse(dateStr);
    $scope.formData.createdAt = dateNow;

		Report.addReport($scope.formData).then(function(){ // Success
			console.log("Success!!");

			// Hide Loading
			$ionicLoading.hide();

			// Alert
			$ionicPopup.show({
				title: 'תודה',
				subTitle: 'תלונתך התקבלה בהצלחה ,<br> מייד תקבל הודעה למייל בה מפורטת תלונך <br> ',
				buttons: [{
					
				    text: 'OK',
				    type: 'button-positive',
				    onTap: function(e) {
				    	$state.go("tab.home");
				    }
				}]
			});

			// Reset the form data
      $scope.formData = {
        description: "",
        createdAt: "",
        date: "",
        time: "",
        busLine: "",
        transportCompany: "",
        location: "",
        complaint: "",
        name: "",
        email: "",
        telephone: "",
        images: []
      }

		}, function(err){ // Failed
			console.log("Failed!!");

			// Hide Loading
			$ionicLoading.hide();

			// Alert
			$ionicPopup.show({
				title: 'אופס !',
				subTitle: 'ישנה בעיה בשרת <br> אנא נסה בעוד כמה דקות ' + err,
				buttons: [{
				    text: 'OK',
				    type: 'button-positive',
				    onTap: function(e) 
					{
				    	$state.go("tab.report");
				    }
				}]
			});
		}); 
	} // End AddReport()

});


// More Controller
app.controller('MoreCtrl', function($scope) {});

// Info Controller
app.controller('InfoCtrl', ['$scope', '$ionicModal','$cordovaSocialSharing', '$ionicSlideBoxDelegate', function ($scope, $ionicModal,$cordovaSocialSharing, $ionicSlideBoxDelegate) {
		
		
		
		
	$scope.shareAnyWhere=function(){
		$cordovaSocialSharing.share("This is message to share","This is subject",null
		,"https://www.google.com");		
	};
  	$scope.aImages = [{
      	'src' : 'img/suc1.png', 
      	'msg' : 'החלק ימינה לאות עוד או תגע כדי לצאת'
    	}, {
        'src' : 'img/suc2.png', 
        'msg' : ''
      }, { 
        'src' : 'img/suc4.png', 
        'msg' : ''
    }, { 
        'src' : 'img/suc5.png', 
        'msg' : ''
    }, { 
        'src' : 'img/suc6.png', 
        'msg' : ''
    }          
                     ];
  
    
    $scope.exit=function() {
      
        ionic.Platform.exitApp();
    };
    
    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $ionicSlideBoxDelegate.slide(0);
      $scope.modal.show();
    };
    
    $scope.openModal4 = function() {
      $ionicSlideBoxDelegate.slide(0);
       $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
  
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
  
  	$scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    }
  
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  }
]);

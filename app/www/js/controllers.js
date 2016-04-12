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

	$scope.getPostion = function(){
		// Show Loading 
		$ionicLoading.show({
		    template: '<p>Loading...</p><ion-spinner icon="dots"></ion-spinner>'
		});

		Report.getPostion().then(function(res){
			$ionicLoading.hide();
			$scope.results = res;
			console.log(res);
		});

	};

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




///////////////////////////////////////////
app.controller('MainCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate) {
		
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

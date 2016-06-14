angular.module('services', [])

.service('Report', function($http, $q){

	var self = {
		'results': [],
		'load': function(){
			var defer = $q.defer();
			$http.get('/api/v1/report').success(function(res){
				self.results = res;
				defer.resolve(res);
			});
			return defer.promise;
		},
		'getReport': function(id){
			var defer = $q.defer();
			$http.get('/api/v1/report/' + id).success(function(res){
				console.log("==> Get the report");
				defer.resolve(res);
			});
			return defer.promise;
		},
		'UpdateReport': function(id, report){
			var defer = $q.defer();
			console.log("id: " + id + ", report: ");
			console.log(report);
			$http.put('/api/v1/report/' + id, report).success(function(res){
				console.log("==> Update the report");
				defer.resolve(res);
			});
			return defer.promise;
		}
	};

	self.load();

	return self;
})

.service('Auth', function($http, $rootScope, $cookies, $q){
	var self = {
		'currentUser': $cookies.get('user') || null,
    'isLoggedIn': function() {
      if($cookies.get('user')){
        console.log("Cookies is Found.");
        return true;
      }else{
        console.log("Cookies not Found.");
        return false;
      }
    },
    // 'login': function(user) {
    // 	var defer = $q.defer();
    // 	console.log("> 2 - Service Login: ", user);
    //   $http.post('/api/v1/login', user).success(function(res){
    //   	console.log("Login success.");
    //   	console.log("res: ",res);
    //     // cookie user
    //     var date = new Date();
    //     var minutes = 1;
    //     date.setTime(date.getTime() + (minutes * 60 * 1000));
    //     $cookies.put('user', user, {expires: date});
    //     // current user
    //     self.currentUser = $cookies.get('user');
    //     console.log(self.currentUser);
    //     // logged in bool
    //     $rootScope.loggedIn = true;
    //     console.log("loggedIn: ", $rootScope.loggedIn);
    //     // promise
    //     defer.resolve(res);
    //   }).error(function(err){
    //   	console.log("Login error.");
    //   	defer.reject(err);
    //   });
    //   return defer.promise;
    // },
    // 'authenticate': function(user, $cookies) {
    //   var defer = $q.defer();
    //   console.log("=> Service Login: ", user);
    //   $http.post('/authenticate', user).success(function(res){
    //     console.log("res: ",res);
    //     if(res.success){
    //       console.log("authenticate success. Auth token: ", res.token);
    //       $cookies.put('token', res.token);
    //       //$cookies.put('user', user, {expires: date});
    //       defer.resolve(res);
    //     }else{
    //       console.log("authenticate error.");
    //       defer.reject(res);
    //     }
    //     // promise
    //     defer.resolve(res);
    //   }).error(function(err){
    //     console.log("Login error.");
    //     defer.reject(err);
    //   });
    //   return defer.promise;
    // },
    'logout': function() {
    	var defer = $q.defer();
      $http.get('/logout').success(function(res){
      	console.log("logout success.");
				// cookie user
        $cookies.remove('user');
        console.log("Cookies.user: ", $cookies.get('user'));
				// current user
        self.currentUser = null;
        console.log("currentUser: ", self.currentUser);
        // logged in bool
        $rootScope.loggedIn = false;
        console.log("loggedIn: ", $rootScope.loggedIn);
        // promise
        defer.resolve(res);
      }).error(function(err){
      	console.log("Logout error.");
      	defer.reject(err);
      });
      return defer.promise;
    }
	};

	return self;
});
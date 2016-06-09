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

.service('Auth', function($http, $rootScope, $cookieStore, $q){
	var self = {
		'currentUser': $cookieStore.get('user') || {email: ''},
    'isLoggedIn': function(user) {
      if(user === undefined)
        return false;
      return true;
      // if(user === undefined)
      //     user = $rootScope.user;
      // return user;
    },
    // 'register': function(user, success, error) {
    //     $http.post('/register', user).success(success).error(error);
    // },
    'login': function(user) {
    	var defer = $q.defer();
    	console.log("> 2 - Service Login: ", user);
      $http.post('/api/v1/login', user).success(function(res){
      	console.log("Login success.");
      	console.log("res: ",res);
        // cookie user
        // Find tomorrow's date.
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);
        // Setting a cookie
        $cookieStore.put('user', user, {'expires': expireDate});
        console.log("Cookies.user: ", $cookieStore.get('user'));
        // current user
        self.currentUser = $cookieStore.get('user');
        console.log("currentUser: ", self.currentUser);
        // logged in bool
        $rootScope.loggedIn = true;
        console.log("loggedIn: ", $rootScope.loggedIn);
        // promise
        defer.resolve(res);
      }).error(function(err){
      	console.log("Login error.");
      	defer.reject(err);
      });
      return defer.promise;
    },
    'logout': function() {
    	var defer = $q.defer();
      $http.get('/logout').success(function(res){
      	console.log("Login error.");
				// cookie user
        $cookieStore.remove('user');
        console.log("Cookies.user: ", $cookieStore.get('user'));
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
//var serverUrl = 'http://server-15min.appspot.com/';

angular.module('starter.services', [])

.service('Report', function($http, $q, $cordovaGeolocation) {
    var self = {
        'lat': 0,
        'lon': 0,
        'addReport': function(formData){
            var defer = $q.defer();
            $http.post('http://server-15min.appspot.com/api/v1/report', formData)
            .success(function(response) {
                console.log("Post http: ", formData);
                defer.resolve(response);
            })
            .error(function(response){
                defer.reject(response);
            });
            return defer.promise;
        },
        'getPostion': function(){
            var posOptions = {timeout: 10000, enableHighAccuracy: false};
            var defer = $q.defer();
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
            .then(function (position) {
                self.lat  = position.coords.latitude
                self.lon  = position.coords.longitude
                $http.get('http://maps.googleapis.com/maps/api/geocode/json?language=he&latlng='+self.lat+','+self.lon+'&sensor=true')
                .success(function (res){
                    defer.resolve(res);
                });
            }, function(err) {
                defer.reject();
            });
            return defer.promise;
        }
    }

    return self;
});

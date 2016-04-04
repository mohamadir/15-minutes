angular.module('starter.services', [])

.service('Report', function($http, $q) {
    var self = {
        'results': [],
        'load': function () {
            // var defer = $q.defer();
            // $http.get('http://localhost:1337/personlist').success(function(response) {
            //     self.results = response;
            //     console.log(response);
            //     defer.resolve(response);
            // });
            // return defer.promise;
        },
        'addReport': function(formData){
            var defer = $q.defer();
            $http.post('http://localhost:1337/api/v1/report', formData).success(function(response) {
                console.log("Post http: ", formData);
                self.load();
                defer.resolve(response);
            });
            return defer.promise;
        },
        'removePerson': function(person){
            $http.delete('http://localhost:1337/personlist/' + person._id).then(function(res){
                console.log("Delete Success");
                self.load();
            },function(res){
                console.log("Delete Error");
            });
        }
    }

    self.load();

    return self;
});

var mod = angular.module('filters', []);

// Page start filter
mod.filter('startFrom', function(){
	return function(data, start){
		return data.slice(start);
	}
});
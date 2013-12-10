'use strict';

angular.module('Walkscape')
	.controller('TravelListCtrl', function($scope, $http) {
		$http.get('data/travels.json').success(function(data) {
			$scope.travels = data;
		});
	});
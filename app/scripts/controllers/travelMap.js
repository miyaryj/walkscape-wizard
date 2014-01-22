'use strict';

angular.module('Walkscape')
	.controller('TravelMapCtrl', function($scope, $routeParams, $http) {
		$scope.title = $routeParams.travel;
		$scope.index = 0;

		$scope.proceed = function() {
			if($scope.travel == undefined) {
				return;
			}
			if($scope.index >= $scope.travel.getTracks().length - 1) {
				return;
			}
			$scope.index = $scope.index + 1;
		};

		$scope.back = function() {
			if($scope.index <= 0) {
				return;
			}
			$scope.index = $scope.index - 1;
		};

		$http.get('data/' + $scope.title + '.json').success(function(data) {
			$scope.travel = new Travel(data);
		});
	});

function TrackPoint(latLng, time, duration) {
	this.latLng = latLng;
	this.time = time;
	this.duration = duration;
};

function Travel(tracks) {
	var idx = 0;

	this.tracks = tracks;

	this.setTracks = function(tracks) {
		this.tracks = tracks;
	};

	this.getTracks = function() {
		return this.tracks;
	};

	this.getTrackBounds = function() {
		var north = -90;
		var south = 90;
		var east = -180;
		var west = 180;

		for (var i = 0; i < this.tracks.length; i++) {
			var track = this.tracks[i];
			if (track.lat > north) {
				north = track.lat;
			}
			if (track.lat < south) {
				south = track.lat;
			}
			if (track.lng > east) {
				east = track.lng;
			}
			if (track.lng < west) {
				west = track.lng;
			}
		}

		console.log(north + ', ' + south + ', ' + west + ', ' + east);

		return {
			north: north,
			south: south,
			west: west,
			east: east
		};
	};

	this.getNext = function() {
		idx += 1;
		var lat = this.tracks[idx].lat;
		var lng = this.tracks[idx].lng;
		var time = this.tracks[idx].time;
		var duration = this.tracks[idx].time - this.tracks[idx - 1].time;
		var ret = new TrackPoint(
			new google.maps.LatLng(lat, lng),
			time,
			duration
		);
		return ret;
	};

	this.getStartTime = function() {
		return this.tracks[0].time;
	};

	this.getFinishTime = function() {
		return this.tracks[this.tracks.length - 1].time;
	};
};
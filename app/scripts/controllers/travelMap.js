'use strict';

angular.module('Walkscape')
	.controller('TravelMapCtrl', function($scope, $routeParams, $http) {
		$scope.title = $routeParams.travel;

		$http.get('data/' + $scope.title + '.json').success(function(data) {
			$scope.travel = new Travel(data);
		});

		// var mapView = new MapView();
		// mapView.initialize();

		// $http.get('data/' + $routeParams.travel + '.json').success(function(data) {
		// 	var travel = new Travel();
		// 	travel.setTracks(data);
		// 	mapView.setTravel(travel);
		// });
	});

function MapView() {
	this.map;
	this.travel;
	this.track;

	this.initialize = function() {
		var mapOptions = {
			center: new google.maps.LatLng(-34.397, 150.644),
			zoom: 20,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		this.map = new google.maps.Map(document.getElementById("map_canvas"),
			mapOptions);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(-34.397, 150.644),
			map: this.map,
			title: 'Hello!'
		});
	};

	this.setTravel = function(travel) {
		this.travel = travel;

		var polyOptions = {
			strokeColor: '#00AAFF',
			strokeOpacity: 1.0,
			strokeWeight: 5
		};

		this.track = new google.maps.Polyline(polyOptions);
		this.track.setMap(this.map);
		var path = this.track.getPath();

		this.map.panToBounds(this.travel.getTrackBounds());
		var tracks = this.travel.getTracks();
		for (var i = 0; i < tracks.length; i++) {
			var trackPoint = tracks[i];
			path.push(new google.maps.LatLng(trackPoint.lat, trackPoint.lng));
		}
	};
}

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
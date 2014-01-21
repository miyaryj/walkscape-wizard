'use strict';

angular.module('Walkscape.directives', [])
  .directive('mapView', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var mapView = new MapView(element[0]);

        scope.$watch('travel', function(travel) {
          mapView.setTravel(travel);
        });
      }
    };
  });

var MAP_OPTIONS = {
  center: new google.maps.LatLng(35.7, 139.7),
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

var POLY_OPTIONS = {
  strokeColor: '#00AAFF',
  strokeOpacity: 1.0,
  strokeWeight: 5
};

function MapView(element) {
  this.map = new google.maps.Map(element, MAP_OPTIONS);

  this.setTravel = function(travel) {
    if(travel === undefined) {
      return;
    }
    var bounds = travel.getTrackBounds();
    var sw = new google.maps.LatLng(bounds.south, bounds.west);
    var ne = new google.maps.LatLng(bounds.north, bounds.east);
    this.map.fitBounds(new google.maps.LatLngBounds(sw, ne));

    var track = new google.maps.Polyline(POLY_OPTIONS);
    track.setMap(this.map);
    var path = track.getPath();

    var tracks = travel.getTracks();
    for (var i = 0; i < tracks.length; i++) {
      var trackPoint = tracks[i];
      path.push(new google.maps.LatLng(trackPoint.lat, trackPoint.lng));
    }

    var position = new google.maps.LatLng(tracks[0].lat, tracks[0].lng);
    this.marker = new Marker(this.map, position)
  };

  this.moveTo = function(index) {
    var position = new google.maps.LatLng(tracks[index].lat, tracks[index].lng);
    this.marker.setPosition(position);
  };
}

function Marker(map, position) {
  this.marker = new google.maps.Marker({
    position: position,
    map: map,
    title:'Hello World!'
  });

  this.setPosition = function(position) {
    this.marker.setPosition(position);
  }
}
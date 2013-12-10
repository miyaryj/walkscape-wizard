'use strict';

angular.module('Walkscape.directives', [])
  .directive('mapView', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var mapOptions = {
          center: new google.maps.LatLng(35.7, 139.7),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(element[0], mapOptions);

        scope.$watch('travel', function(travel) {
          if(travel !== undefined) {
            var bounds = travel.getTrackBounds();
            var sw = new google.maps.LatLng(bounds.south, bounds.west);
            var ne = new google.maps.LatLng(bounds.north, bounds.east);
            map.fitBounds(new google.maps.LatLngBounds(sw, ne));

            var polyOptions = {
              strokeColor: '#00AAFF',
              strokeOpacity: 1.0,
              strokeWeight: 5
            };
            var track = new google.maps.Polyline(polyOptions);
            track.setMap(map);
            var path = track.getPath();

            var tracks = travel.getTracks();
            for (var i = 0; i < tracks.length; i++) {
              var trackPoint = tracks[i];
              path.push(new google.maps.LatLng(trackPoint.lat, trackPoint.lng));
            }
          }
        });
      }
    };
  });
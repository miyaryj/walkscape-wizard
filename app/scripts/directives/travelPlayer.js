'use strict';

angular.module('Walkscape.directives')
  .directive('travelPlayer', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var travelPlayer = new TravelPlayer();

        scope.$watch('travel', function(travel) {
          travelPlayer.setTravel(travel);
          scope.timetext = travelPlayer.getTimeText(0);
        });

        scope.$watch('index', function(index) {
          scope.timetext = travelPlayer.getTimeText(index);
        });
      }
    };
  });

var TravelPlayer = function() {

  this.setTravel = function(travel) {
    if (travel === undefined) {
      return;
    }

    this.travel = travel;
  };

  this.getTime = function(index) {
    if(this.travel === undefined) {
      return;
    }

    var trackPoint = this.travel.getTracks()[index];
    return trackPoint.time;
  };

  this.getTimeText = function(index) {
    var time = this.getTime(index);
    return new Date(time).toLocaleString();
  }
};
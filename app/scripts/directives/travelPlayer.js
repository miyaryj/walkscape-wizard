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

        scope.$watch('isPlaying', function(isPlaying) {
          if(isPlaying) {
            travelPlayer.startPlayback(scope);
          } else {
            travelPlayer.stopPlayback();
          }
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
  };

  this.startPlayback = function(scope) {
    this.loop(scope);
  };

  this.loop = function(scope) {
    var player = this;
    this.timer = setTimeout(function() {
      scope.proceed();
      player.loop(scope);
    }, 500);
  };

  this.stopPlayback = function() {
    if(this.timer !== undefined) {
      clearTimeout(this.timer);
    }
  };
};
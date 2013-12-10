'use strict';

angular.module('Walkscape', ['Walkscape.directives'])
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
      when('/travels', {
        templateUrl: 'views/travel-list.html',
        controller: 'TravelListCtrl'
      }).
      when('/travels/:travel', {
        templateUrl: 'views/travel-map.html',
        controller: 'TravelMapCtrl'
      }).
      otherwise({
        redirectTo: '/travels'
      });
    }
  ]);

angular.module('Walkscape')
  .value('travel', {
    'lat':0,
    'lng':0
  });

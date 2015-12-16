'use strict';

// Declare app level module which depends on views, and components
angular.module('movieInfo', [
  'ngRoute',
  'movieInfo.view1',
  'movieInfo.version',
  'movieInfo.movies'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

'use strict';

angular.module('movieInfo.movies', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'movies/index.html',
    controller: 'MoviesCtrl'
  })
  .when('/description', {
    templateUrl: 'movies/description.html',
    controller: 'MoviesCtrl'
  });

}])
//factory to pass imdbID across routes
.factory('imdbID', function(){

  var values = {
    id: ''
  };

  return{
    getValues: function(){
      return values;
    },

    setID: function(id){
      values.id = id;
    }
  };

})
//factory to pass movie name across routes
.factory('movieName', function(){

  var values = {
    movieName: ''
  };

  return{
    getValues: function(){
      return values;
    },

    setMovieName: function(name){
      console.log('this is firing');
      values.movieName = name;
    }
  };

})

.controller('MoviesCtrl', ['$scope', '$http', 'imdbID', 'movieName', function($scope, $http, imdbID, movieName) {

  if(imdbID.getValues()){
    $scope.ID = imdbID;
    $scope.values = $scope.ID.getValues();
    $scope.searchID = $scope.values.id;
    console.log($scope.searchID);
    console.log($scope.ID);
  }

  if(movieName.getValues()){
    $scope.movieName = movieName;
    $scope.nameValues = $scope.movieName.getValues();
    $scope.movieNameVal = $scope.nameValues.movieName;
  }


  $scope.name = null;
  $scope.title = null;
  $scope.img = null;
  $scope.results = [];
  $scope.idResult = null;
  $scope.tomatoes = null;
  $scope.netflix = false;

  $scope.sameId = function(id){
    return id === $scope.id;
  };

  $scope.getMovieByName = function() {

    $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?s=' + $scope.name
    }).then(function successCallback(response) {
      $scope.results = response.data.Search;
      $scope.title = $scope.results[0].Title;
      $scope.img = $scope.results[0].Poster;
      $scope.id = $scope.results[0].imdbID;
      $scope.ID.setID($scope.id);
      $scope.movieName.setMovieName($scope.name);

    }, function errorCallback(response) {

    });

  };

  $scope.getMovieById = function(id){

    $http({
      method: 'GET',
      url: 'http://www.omdbapi.com/?i=' + id + '&tomatoes=true&plot=full'
    }).then(function successCallback(response) {
      $scope.idResult = response.data;

      $scope.title = $scope.idResult.Title;
      $scope.img = $scope.idResult.Poster;
      $scope.id = $scope.idResult.imdbID;
      $scope.ID.setID($scope.id);
      $scope.tomatoes = $scope.idResult.tomatoRating;
      $scope.year = $scope.idResult.Year;
      $scope.rated = $scope.idResult.Rated;
      $scope.runtime = $scope.idResult.Runtime;
      $scope.genre = $scope.idResult.Genre;
      $scope.director = $scope.idResult.Director;
      $scope.writer = $scope.idResult.Writer;
      $scope.actors = $scope.idResult.Actors;
      $scope.plot = $scope.idResult.Plot;
      $scope.awards = $scope.idResult.Awards;
      $scope.imdbRating = $scope.idResult.imdbRating;
      $scope.metaScore = $scope.idResult.Metascore;


    }, function errorCallback(response) {

    });
  };


  $scope.checkNetflix = function(){
    $scope.name = $scope.movieNameVal;
    console.log($scope.name);
    $http({
      method: 'GET',
      url: 'http://netflixroulette.net/api/api.php?title=' + $scope.name
    }).then(function successCallback(response){
      $scope.netflix = true;
      console.log(response);
      $scope.netflixId = response.data.show_id;
      console.log('netflix ID: ' + $scope.netflixId);
    }, function errorCallback(response){
      $scope.netflix = false;
    });
  };

}]);

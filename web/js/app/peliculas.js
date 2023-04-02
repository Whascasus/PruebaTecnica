angular.module('myApp', [])
  app.controller("PeliculasController", [
  "$scope",
  "$http",

  function($scope, $http) {
    var comment= "";
    var baseUrl = 'http://localhost:8000/';
    $scope.serch= false;

    function getMovies() {
      $scope.listGenres = [];
      $scope.listMovies = [];
      $scope.listComments = [];
      $http.get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: "047a61fa0c214fcb16917710b6f78146",
          language: "es-ES",
        }
      }).then(function(response) {
        $scope.listGenres = $scope.listGenres.concat(response.data.genres);
        console.log($scope.listGenres )
      });

      $http.get("https://api.themoviedb.org/3/movie/now_playing", {
        params: {
          api_key: "047a61fa0c214fcb16917710b6f78146",
          language: "es-ES",
          page: $scope.page
        }
      }).then(function(response) {
        $scope.listMovies = $scope.listMovies.concat(response.data.results);
        console.log($scope.listMovies)
      });

      $scope.searchMovies = function(){
        $scope.listMovies = [];
        $scope.serch= true;
        query = $scope.query;
        $http ({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie',
            params: {
              api_key: "047a61fa0c214fcb16917710b6f78146",
              language: "es-ES",
              query: query,
              page: $scope.page,
              include_adult: false,
            }
        }).then(function(response) {
          $scope.listMovies = $scope.listMovies.concat(response.data.results);
          console.log($scope.listMovies)
        });
    
      }

      $scope.getMovieComments = function(movieId) {
        $scope.listComments = [];
        $http.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=047a61fa0c214fcb16917710b6f78146&language=en-US&page=1`, {
        }).then(function(response) {
          $scope.listComments = $scope.listComments.concat(response.data.results);
          console.log($scope.listComments);
        });
      }

      $scope.changePage = function(page) {
        if (page > 0 && page <= 83) { 
          console.log(page)
          $scope.page = page; 
          console.log($scope.page)

          getMovies();
        }
      }

    }

    $scope.getGenre = function(genreIds) {
      var genres = $scope.listGenres;
      var genreNames = [];

      for (var i = 0; i < genreIds.length; i++) {
        for (var j = 0; j < genres.length; j++) {
          if (genreIds[i] === genres[j].id) {
            genreNames.push(genres[j].name);
            break;
          }
        }
      }
      return genreNames.join(', ');
    };


    getMovies();

   

  },

]);


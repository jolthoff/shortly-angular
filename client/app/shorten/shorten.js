angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = '';

  $scope.addAndReroute = function() {
    
    Links.save($scope.link, function(error, saved) {

      if (error) { 

        throw error; 

      }

      $location.path('/links');

    });

  }
});

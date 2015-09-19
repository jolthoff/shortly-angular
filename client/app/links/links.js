angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.filterString = '';
  //whitespace
  $scope.allLinks = [];
  //imagine the space
  (function() { //fetch all links from mongoDB
    //so pretty
    Links.fetch(function(error, links) {

      if (error) {

        throw error;

      }

      console.log( links );

      $scope.allLinks = links.sort(function(linkA, linkB) {

        return linkA.visits - linkB.visits;

      });

    });
    //more whitespace
  })();

  $scope.filteredArray = function() {

    return $scope.allLinks.filter(function(link) {

      return link.title.match(new RegExp($scope.filterString)) || 

      link.url.match(new RegExp($scope.filterString)) ||

      link.code.match(new RegExp($scope.filterString));

    });

  };

  $scope.redirect = function( path ) {

    Links.request( 'GET', function( ) {}, null, path );

  };

});

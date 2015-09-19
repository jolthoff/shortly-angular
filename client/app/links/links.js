angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.filterString = '';
  //whitespace
  $scope.allLinks = [];
  //imagine the space
  (function() { //fetch all links from mongoDB
    //so pretty
    $scope.allLinks = Links.fetch().sort(function(linkA, linkB) {

      return linkA.visits - linkB.visits;
      
    });
    //more whitespace
  })();

  $scope.filteredArray = function() {

    return allLinks.filter(function(link) {

      return link.title.test(new RegExp($scope.filterString)) || 

      link.url.test(new RegExp($scope.filterString)) ||

      link.link.test(new RegExp($scope.filterString));

    });

  };

});

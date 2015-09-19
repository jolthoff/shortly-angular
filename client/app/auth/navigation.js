angular.module('shortly.navigation', [])

.controller( 'NavigationController', function( $scope, $location ) {

  if( $location.path( ) === '/' ) {

    $location.path( '/links' );

  }

  $scope.updateLocation = function( path ) {

    $location.path(path);

  };

});
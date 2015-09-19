angular.module('shortly.services', [])

.factory('Links', function ($http, $window, AttachTokens ) {

  var request = function( method, callback, data, url ) {

    url = url || '/';

    var request = {

      'method': method,

      url: '/api/links' + url,

      'data': data

    };

    $http(request).then( function( response ) {

      callback( null, response.data );

    }).catch( function( error ) {

      callback( error, null );

    });

  };
  
  return {

    fetch: function( callback ) {

      // callback has the form callback( error, links )

      request( 'GET', callback );

    },

    save: function( link, callback ) {

      // callback has the form: callback( error, saved )

      request( 'POST', callback, { url: link } );

    },

    'request': request

  };
  
})

.factory('Auth', function ($http, $location, $window, $rootScope) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      $rootScope.isAuth = true;
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      $rootScope.isAuth = true;
      return resp.data.token;
    });
  };

  var isAuth = function () {
    $rootScope.isAuth = !!$window.localStorage.getItem('com.shortly');
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

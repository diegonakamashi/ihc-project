angular.module('ihc')
.service('$request', function ($http, $localStorage) {
  return function (endpoint, options) {
    var apiUrl = 'http://mysterious-taiga-9334.herokuapp.com/api/';
    var accessToken = $localStorage.get('accessToken');
    var url = apiUrl + endpoint;
    options.url  = url;
    options.headers = { AccessToken: accessToken };
    return $http(options);
  };
});

angular.module('ihc')
.service('$request', function ($http, apiUrl, $localStorage) {
  return function (endpoint, options) {
    var accessToken = $localStorage.get('accessToken');
    var url = apiUrl + endpoint;
    options.url  = url;
    options.headers = { AccessToken: accessToken };
    return $http(options);
  };
});

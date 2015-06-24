angular.module('ihc')
.service('$request', function ($http, $localStorage, $config) {
  return function (endpoint, options) {
    var apiUrl = $config.api.url;
    var accessToken = $localStorage.get('accessToken');
    var url = apiUrl + endpoint;
    options.url = url;
    options.headers = { AccessToken: accessToken };
    return $http(options);
  };
});

angular.module('ihc')
.service('$request', function ($http, apiUrl) {
  return function (endpoint, options) {
    options.url = apiUrl + endpoint;
    return $http(options);
  };
});

angular.module('ihc-project')
.factory('authenticationFactory', function($http, storageService, APPCONFIG, $q) {
  var ENDPOINT = '/authentication';

  var authenticationStorage = storageService.storage('authentication');

  var authenticate = function(email, password) {
    return $q(function (resolve, reject) {
      $http.post(APPCONFIG.baseApiUrl + ENDPOINT, {
        email: email,
        password: password
      })
      .success(function (data, status, headers, config) {
        authenticationStorage.set('token', data.token);
        resolve(data.token);
      })
      .error(function (data) {
        reject(data.errors || false);
      });
    });
  };

  var getToken = function () {
    return authenticationStorage.get('token') || false;
  };

  return {
    authenticate: authenticate,
    getToken: getToken
  };
});

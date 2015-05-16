angular.module('ihc-project')
.service('authenticationService', function($http, authenticationFactory, $q) {
  return {
    authenticate: function(email, password, callback) {
      return $q(function (resolve, reject) {
        authenticationFactory.authenticate(email, password)
        .success(callback)
        .error(callback);
      });
    },

    isAuthenticated: function() {
      var token = authenticationFactory.getToken();
      return token ? true : false;
    },

    getToken: authenticationFactory.getToken
  };
});

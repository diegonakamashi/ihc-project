angular.module('ihc')
.service('$user', function ($request, $localStorage, $q) {
  return {

    login: function (authData) {
      return $q(function (resolve, reject) {
        var auth = {
          email: authData.email,
          password: authData.password
        };
        $request('users/login', {
          method: 'POST',
          data: auth
        }).success(function (data) {
          $localStorage.set('accessToken', data.token.id);
          resolve(data.token);
        }).error(reject);
      });
    }

  };
});

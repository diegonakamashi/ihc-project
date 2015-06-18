angular.module('ihc')
.service('$user', function ($request, $localStorage, $q) {
  return {

    get: function () {
      var userId = $localStorage.get('userId');
      return $request('users/' + userId, {
        method: 'GET'
      });
    },

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
          $localStorage.set('userId', data.token.userId);
          resolve(data.token);
        }).error(reject);
      });
    },

    register: function (userData) {
      var data = {
        name: userData.name,
        email: userData.email,
        password: userData.password
      };
      return $request('users', {
        method: 'POST',
        data: data
      });
    },

    update: function (userData) {
      var data = {
        name: userData.name,
        password: userData.password
      };
      var userId = $localStorage.get('userId');
      return $request('users/' + userId, {
        method: 'PUT',
        data: data
      });
    },

    logout: function () {
      return $q(function (resolve, reject) {
        var accessToken = $localStorage.get('accessToken');
        $request('users/logoff/' + accessToken, {
          method: 'DELETE'
        }).success(function (data) {
          $localStorage.set('accessToken', null);
          $localStorage.set('userId', null);
          resolve({ success: true });
        }).error(reject);
      });
    }

  };
});

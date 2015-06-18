angular.module('ihc')
.controller('AccountCtrl', function($scope, $user, $loadingBox, $alert, $state) {

  var account = $scope.account = {};

  account.load = function () {
    $loadingBox.show();
    $user.get().success(function (data) {
      account.email = data.email;
      account.name = data.name;
      $loadingBox.hide();
    }).error(function (data) {
      $loadingBox.hide();
      $alert(data.error.message);
    });
  };

  account.confirm = function () {
    var user = {};
    user.name = account.name;
    if (account.password && account.password.length > 0) {
      user.password = account.password;
    }
    $loadingBox.show();
    $user.update(user).success(function () {
      $loadingBox.hide();
      $alert('Saved with success!', 'Success');
      account.load();
    }).error(function (data) {
      $loadingBox.hide();
      $alert(data.error.message);
    });
  };

  account.logout = function () {
    $loadingBox.show();
    $user.logout().then(function () {
      $loadingBox.hide();
      $state.go('login');
    }).catch(function (data) {
      $loadingBox.hide();
      $alert(data.error.message);
    });
  };

  account.load();

});

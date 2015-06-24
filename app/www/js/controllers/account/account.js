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
      $alert('Erro ao tentar carregar conteúdo, tente novamente mais tarde.');
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
      $alert('Erro ao tentar enviar conteúdo, tente novamente mais tarde.');
    });
  };

  account.logout = function () {
    $loadingBox.show();
    $user.logout().then(function () {
      $loadingBox.hide();
      account.name = '';
      account.password = '';
      account.email = '';
      $state.go('login');
    }).catch(function (data) {
      $loadingBox.hide();
      $alert('Erro inesperado, tente novamente mais tarde.');
    });
  };

  account.load();

});

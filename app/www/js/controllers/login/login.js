angular.module('ihc')
.controller('LoginCtrl', function($scope, $state, $ionicModal, $alert, $user, $loadingBox) {

  $ionicModal.fromTemplateUrl('js/templates/new-user-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });

  var login = $scope.login = {};
  var register = $scope.register = {};

  login.confirm = function (auth) {
    auth = auth || {
      email: login.email,
      password: login.password
    };
    if (!auth.email || !auth.password) {
      $alert('Preencha corretamente os campos de e-mail e senha.');
      return;
    }
    $loadingBox.show();
    $user.login(auth).then(function (data) {
      $loadingBox.hide();
      $state.go('app.pulse');
    }).catch(function (data) {
      $loadingBox.hide();
      $alert('Erro na autenticação, verifique se o e-mail e senha informados está correto.');
    });
  };

  register.confirm = function () {
    var data = {
      name: register.name,
      email: register.email,
      password: register.password
    };
    if (!data.name || !data.email || !data.password) {
      $alert('Favor, preencha todos os campos.');
      return;
    }
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!regex.test(data.email)) {
      $alert('O e-mail digitado não é valido, favor verifique.');
      return;
    }
    $loadingBox.show();
    $user.register(data).success(function (data) {
      var auth = {
        email: register.email,
        password: register.password
      };
      login.confirm(auth);
      $loadingBox.hide();
      $scope.modal.hide();
    }).error(function (data) {
      $loadingBox.hide();
      if (data.error.status === 422) {
        $alert('Já existe uma conta com este e-mail.');
      } else {
        $alert('Não foi possível se registrar, tente novamente.');
      }
    });
  };

});

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
    $loadingBox.show();
    $user.login(auth).then(function (data) {
      $loadingBox.hide();
      $state.go('app.pulse');
    }).catch(function (data) {
      $loadingBox.hide();
      $alert(data.error.message);
    });
  };

  register.confirm = function () {
    var data = {
      name: register.name,
      email: register.email,
      password: register.password
    };
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
      $alert(data.error.message);
    });
  };

});

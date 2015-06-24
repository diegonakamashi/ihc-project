angular.module('ihc')
.controller('ThreadsCtrl', function($scope, $ionicModal, $localStorage, $languages, $threads, $loadingBox, $alert) {

  var languages = $scope.languages = {};
  var threads = $scope.threads = {};
  var compose = $scope.compose = {};
  languages.current = $localStorage.get('currentLanguage');

  $ionicModal.fromTemplateUrl('js/templates/languages-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.languageModal = modal;
    if (!languages.current) {
      $scope.languageModal.show();
    }
  });

  $ionicModal.fromTemplateUrl('js/templates/compose-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.composeModal = modal;
  });

  languages.load = function () {
    $languages.get().success(function (data) {
      languages.all = data;
    }).error(function () {
      $alert('Erro ao tentar carregar conteúdo, tente novamente mais tarde.');
    });
  };

  languages.save = function () {
    $localStorage.set('currentLanguage', languages.current);
    threads.load();
    $scope.languageModal.hide();
  };

  compose.post = function () {
    var thread = {
      content: compose.content,
      languageId: languages.current,
      userId: $localStorage.get('userId')
    };
    if (!thread.content) {
      $scope.composeModal.hide();
      return;
    }
    $loadingBox.show();
    $threads.create(thread).success(function (data) {
      $loadingBox.hide();
      $scope.composeModal.hide();
      compose.content = '';
      threads.load();
    }).error(function (error) {
      $loadingBox.hide();
      $alert('Erro ao tentar enviar conteúdo, tente novamente mais tarde.');
    });
  };

  threads.filterPagination = function (options) {
    // TODO (infinite scroll)
  };

  threads.load = function () {
    var options = {
      where: {
        languageId: languages.current
      },
      include: 'user',
      order: 'updated desc'
    };
    threads.filterPagination(options);
    $loadingBox.show();
    $threads.get(options).success(function (data) {
      threads.all = data;
      $loadingBox.hide();
    }).error(function (error) {
      $loadingBox.hide();
      $alert('Erro ao tentar carregar conteúdo, tente novamente mais tarde.');
    });
  };

  threads.refresh = function () {
    threads.load();
    $scope.$broadcast('scroll.refreshComplete');
  };

  languages.load();
  threads.load();

});

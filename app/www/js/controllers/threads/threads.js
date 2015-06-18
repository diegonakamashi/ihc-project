angular.module('ihc')
.controller('ThreadsCtrl', function($scope, $ionicModal, $localStorage, $languages, $threads, $loadingBox, $alert) {

  var languages = $scope.languages = {};
  var threads = $scope.threads = {};
  var compose = $scope.compose = {};
  languages.current = $localStorage.getObject('currentLanguage');

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
    }).error(console.log);
  };

  languages.save = function () {
    $localStorage.setObject('currentLanguage', languages.current);
    threads.load();
    $scope.languageModal.hide();
  };

  compose.post = function () {
    var thread = {
      content: compose.content,
      languageId: languages.current,
      userId: $localStorage.get('userId')
    };
    $loadingBox.show();
    $threads.create(thread).success(function (data) {
      $loadingBox.hide();
      $scope.composeModal.hide();
      threads.load();
    }).error(function (error) {
      $loadingBox.hide();
      $alert(data.error.message);
    });
  };

  threads.filterLanguage = function (options) {
    options.where = {};
    if (languages.current) {
      options.where.languageId = languages.current;
    }
  };

  threads.filterPagination = function (options) {
  };

  threads.load = function () {
    var options = {
      include: 'user',
      order: 'created desc'
    };
    threads.filterLanguage(options);
    threads.filterPagination(options);
    $loadingBox.show('icon');
    $threads.get(options).success(function (data) {
      threads.all = data;
      $loadingBox.hide();
    }).error(function (error) {
      $loadingBox.hide();
      console.log(error);
    });
  };

  threads.refresh = function () {
    threads.load();
    $scope.$broadcast('scroll.refreshComplete');
  };

  languages.load();
  threads.load();

});

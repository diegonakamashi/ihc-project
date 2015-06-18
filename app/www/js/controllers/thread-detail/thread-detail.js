angular.module('ihc')
.controller('ThreadDetailCtrl', function($scope, $stateParams, $ionicModal, $threads, $loadingBox, $localStorage, $responses) {

  var thread = $scope.thread = {};
  var responses = $scope.responses = {};
  responses.new = {};

  $ionicModal.fromTemplateUrl('js/templates/new-response-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.newResponseModal = modal;
  });

  responses.load = function () {
    var id = $stateParams.threadId;
    var options = {
      include: 'user',
      sort: ''
    };
    $loadingBox.show();
    $threads.getResponses(id, options).success(function (data) {
      responses.instances = data;
      $loadingBox.hide();
    }).error(function (error) {
      $loadingBox.hide();
      console.log(error);
    });
  };

  responses.refresh = function () {
    responses.load();
    $scope.$broadcast('scroll.refreshComplete');
  };

  responses.new.post = function () {
    var response = {
      content: responses.new.content,
      userId: $localStorage.get('userId'),
      threadId: $stateParams.threadId
    };
    $loadingBox.show();
    $responses.create(response).success(function (data) {
      $loadingBox.hide();
      $scope.newResponseModal.hide();
      responses.load();
    }).error(function (error) {
      $loadingBox.hide();
      $alert(data.error.message);
    });
  };
  
  thread.load = function () {
    var id = $stateParams.threadId;
    var options = {
      include: 'user',
      order: 'created desc'
    };
    $loadingBox.show();
    $threads.getOne(id, options).success(function (data) {
      thread.instance = data;
      $loadingBox.hide();
      responses.load();
    }).error(function (error) {
      $loadingBox.hide();
      console.log(error);
    });
  };

  thread.load();
});

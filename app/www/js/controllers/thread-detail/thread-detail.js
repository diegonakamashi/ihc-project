angular.module('ihc')
.controller('ThreadDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.threadId);
});

angular.module('ihc')
.controller('PulseCtrl', function($scope, $responses, $loadingBox, $threads, $localStorage, $utils, $alert) {

  var pulses = $scope.pulses = {};
  pulses.instances = [];

  pulses.addToInstances = function (data, type) {
    for (var i = 0, x = data.length; i < x; i += 1) {
      data[i].type = type;
      needle = $utils.findNeedle(pulses.instances, data[i].id, 'id') ;
      if (!needle && needle.type !== data[i].type) {
        pulses.instances.push(data[i]);
      }
    }
  };

  pulses.loadThreads = function () {
    var userId = $localStorage.get('userId');
    var options = {
      where: {
        userId: userId
      }
    };
    $loadingBox.show();
    $threads.get(options).success(function (data) {
      pulses.addToInstances(data, 'thread');
      $loadingBox.hide();
    }).error(function (error) {
      $loadingBox.hide();
      $alert('Erro ao tentar carregar conteúdo, tente novamente mais tarde.');
    });
  };

  pulses.loadResponses = function () {
    var userId = $localStorage.get('userId');
    var options = {
      where: {
        userId: userId
      },
      include: 'thread'
    };
    $responses.get(options).success(function (data) {
      pulses.addToInstances(data, 'response');
    }).error(function (error) {
      $alert('Erro ao tentar carregar conteúdo, tente novamente mais tarde.');
    });
  };

  pulses.load = function () {
    pulses.loadThreads();
    pulses.loadResponses();
  };

  pulses.refresh = function () {
    pulses.load();
    $scope.$broadcast('scroll.refreshComplete');
  };

  pulses.load();

});

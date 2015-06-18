angular.module('ihc')
.controller('PulseCtrl', function($scope, $responses, $loadingBox, $threads, $localStorage, $utils) {

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
    var options = {
      where: {
        userId: $localStorage.get('userId')
      }
    };
    $loadingBox.show();
    $threads.get(options).success(function (data) {
      pulses.addToInstances(data, 'thread');
      $loadingBox.hide();
    }).error(function (error) {
      $loadingBox.hide();
      console.log(error);
    });
  };

  pulses.loadResponses = function () {
    var options = {
      where: {
        userId: $localStorage.get('userId')
      }
    };
    $responses.get(options).success(function (data) {
      pulses.addToInstances(data, 'response');
    }).error(function (error) {
      console.log(error);
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

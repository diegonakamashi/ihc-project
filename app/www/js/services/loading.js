angular.module('ihc')
.service('$loadingBox', function ($ionicLoading) {
  return {
    show: function (message) {
      if (message === 'icon') {
        $ionicLoading.show({
          template: '<ion-spinner class="loading-spinner" icon="lines"></ion-spinner>',
          hideOnStageChange: true
        });
      } else {
        $ionicLoading.show({ 
          template: message || 'Loading...',
          hideOnStageChange: true
        });
      }
    },
    hide: function () {
      $ionicLoading.hide();
    }
  };
});

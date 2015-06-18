angular.module('ihc')
.service('$loadingBox', function ($ionicLoading) {
  return {
    show: function (message) {
      $ionicLoading.show({ 
        template: message || '<ion-spinner class="loading-spinner" icon="lines"></ion-spinner>',
        hideOnStageChange: true
      });
    },
    hide: function () {
      $ionicLoading.hide();
    }
  };
});

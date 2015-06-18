angular.module('ihc')
.service('$loadingBox', function ($ionicLoading) {
  return {
    show: function (message) {
      $ionicLoading.show({ template: message || 'Loading...' });
    },
    hide: function () {
      $ionicLoading.hide();
    }
  };
});

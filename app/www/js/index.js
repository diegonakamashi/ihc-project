angular.module('ihc', [
  'ionic'
])
.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})
.run(function ($ionicPlatform, $localStorage, $rootScope, $state, $ionicHistory) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }
  });
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    var token = $localStorage.get('accessToken');
    var userId = $localStorage.get('userId');
    if (!token && toState.name !== 'login') {
      event.preventDefault();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
      $state.go('login');
    }
  });
});

angular.module('ihc', [
  'ionic'
])
.run(function($ionicPlatform, $localStorage, $rootScope, $state) {
  $ionicPlatform.ready(function() {
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
      $state.go('login');
    }
  });
});

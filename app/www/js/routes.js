angular.module('ihc')
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "js/controllers/app/app.html"
  })
  .state('app.pulse', {
    url: '/pulse',
    views: {
      'pulse': {
        templateUrl: 'js/controllers/pulse/pulse.html',
        controller: 'PulseCtrl'
      }
    }
  })
  .state('app.threads', {
    url: '/threads',
    views: {
      'threads': {
        templateUrl: 'js/controllers/threads/threads.html',
        controller: 'ThreadsCtrl'
      }
    }
  })
  .state('app.thread-detail', {
    url: '/threads/:threadId',
    views: {
      'threads': {
        templateUrl: 'js/controllers/thread-detail/thread-detail.html',
        controller: 'ThreadDetailCtrl'
      }
    }
  })
  .state('app.account', {
    url: '/account',
    views: {
      'account': {
        templateUrl: 'js/controllers/account/account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'js/controllers/login/login.html',
    controller: 'LoginCtrl'
  });

  $urlRouterProvider.otherwise('/app/pulse');

});

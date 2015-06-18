angular.module('ihc')
.service('$alert', function ($ionicPopup) {
  return function (message, title) {
    title = title || 'Alert';
    return $ionicPopup.alert({
      title: title,
      template: message
    });
  };
});

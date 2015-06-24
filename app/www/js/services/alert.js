angular.module('ihc')
.service('$alert', function ($ionicPopup) {
  return function (message, title) {
    title = title || 'Alerta';
    return $ionicPopup.alert({
      title: title,
      template: message
    });
  };
});

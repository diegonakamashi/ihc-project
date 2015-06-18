angular.module('ihc')
.factory('$localStorage', function ($window) {
  return {
    set: function (key, value) {
      if (value === null) {
        $window.localStorage.removeItem(key);
        return;
      }
      $window.localStorage[key] = value;
    },
    get: function (key) {
      return $window.localStorage[key] || null;
    },
    setObject: function (key, value) {
      if (value === null) {
        $window.localStorage.removeItem(key);
        return;
      }
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
});

angular.module('ihc')
.service('$utils', function () {

  var hasNeedle = function (array, value, key) {
    if (!array || !value || !key) {
      return false;
    }
    for (var i = 0, x = array.length; i < x; i += 1) {
      if (array[i][key] === value) {
        return true;
      }
    }
    return false;
  };

  var findNeedle = function (array, value, key) {
    if (!array || !value || !key) {
      return false;
    }
    for (var i = 0, x = array.length; i < x; i += 1) {
      if (array[i][key] === value) {
        return array[i];
      }
    }
    return false;
  };

  return {
    hasNeedle: hasNeedle,
    findNeedle: findNeedle
  };
});

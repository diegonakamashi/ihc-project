angular.module('ihc')
.service('$languages', function ($request) {
  return {

    get: function () {
      return $request('languages', {
        method: 'GET'
      });
    }

  };
});

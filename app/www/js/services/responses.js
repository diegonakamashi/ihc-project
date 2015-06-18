angular.module('ihc')
.service('$responses', function ($request) {
  return {

    get: function (options) {
      return $request('responses', {
        method: 'GET',
        params: {
          filter: options
        }
      });
    },

    create: function (data) {
      return $request('responses', {
        method: 'POST',
        data: data
      });
    }

  };
});

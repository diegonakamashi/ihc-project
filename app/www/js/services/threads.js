angular.module('ihc')
.service('$threads', function ($request) {
  return {

    get: function (options) {
      return $request('threads', {
        method: 'GET',
        params: {
          filter: options
        }
      });
    },

    create: function (data) {
      return $request('threads', {
        method: 'POST',
        data: data
      });
    }

  };
});

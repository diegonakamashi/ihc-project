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

    getOne: function (id, options) {
      return $request('threads/' + id, {
        method: 'GET',
        params: {
          filter: options
        }
      });
    },

    getResponses: function (id, options) {
      return $request('threads/' + id + '/responses', {
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

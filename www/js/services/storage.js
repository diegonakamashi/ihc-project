angular.module('ihc-project')
.service('storageService', function() {
  var storages = {};
  var localStorage = $window.localStorage || window.localStorage;

  var Storage = function (name) {
    storages[name] = {

      name: name,

      set: function (item, value) {
        if (!item || !value) {
          return false;
        }
        item = this.name.concat('-', item);
        localStorage.setItem(item, value);
        return value;
      },

      get: function (item) {
        if (!item) {
          return false;
        }
        item = this.name.concat('-', item);
        return localStorage.getItem(item);
      }
    };
  };

  return {
    storage: function (name) {
      if (!name) {
        return false;
      }
      return storages[name] ? storages[name] : new Storage(name);
    }
  };
});

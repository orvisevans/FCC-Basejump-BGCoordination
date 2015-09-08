(function () {
  'use strict';

  angular
    .module('nightlifeApp')
    .factory('userFactory', ['$http', function($http) {

      var userData = {};

      userData.getData = function () {
        return $http.get('/api/user');
      };

      return userData;
    }]);
})();

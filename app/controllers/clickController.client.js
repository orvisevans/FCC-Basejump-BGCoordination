(function () {
  'use strict';

  angular
    .module('nightlifeApp', [])
    .controller('clickController', ['$scope', function ($scope) {
      $scope.clicks = 0;

      $scope.addClick = function () {
        $scope.clicks += 1;
      }

      $scope.resetClicks = function () {
        $scope.clicks = 0;
      }
    }]);

})();

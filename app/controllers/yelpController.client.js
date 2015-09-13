(function () {
  'use strict';

  angular
    .module('nightlifeApp', ['ngResource'])
    .controller('yelpController',
      ['$scope', '$http', function ($scope, $http) {
        $scope.businesses = [];
        $scope.location = 'Portland, OR';
        $scope.yelpData = {};

        $scope.searchCity = function () {
          $http.get('/api/yelp/' + $scope.location).success(function(data) {
            $scope.yelpData = JSON.parse(data);
            $scope.businesses = $scope.yelpData.businesses;
          });
        }

        $scope.searchCity();

    }]);

})();

(function () {
  'use strict';

  angular
    .module('nightlifeApp', ['ngResource'])
    .controller('yelpController',
      ['$scope', '$http', 'userFactory', function ($scope, $http, userFactory) {
        $scope.businesses = [];
        $scope.location = 'Portland, OR';
        $scope.yelpData = {};
        $scope.user = {};

        userFactory.getData().then(function (user) {
          if (user.data.username) {
            $scope.user = user.data;
          }
        });

        $scope.userLoggedIn = function () {
          return $scope.user.username ? true : false;
        };

        function addGoingsParamToBusinesses() {
          userFactory.getData().then(function (user) {
            var dateString = new Date().setHours(0,0,0,0).toString();
            $http.get('/api/goings/' + dateString).success(function(goingsData) {
              $scope.businesses.forEach(function(business) {
                business.goings = goingsData.filter(function(going) {
                  return going.businessId === business.id;
                }).length;
                if (goingsData.filter(function(going) {
                  return going.businessId === business.id && going.userId === user.data.id;
                }).length) {
                  business.imGoing = true;
                } else {
                  business.imGoing = false;
                }
              });
            });
          });
        }

        $scope.addGoing = function (business) {
          userFactory.getData().then(function (user) {
            var newGoing =  {
              userId: user.data.id,
              businessId: business.id,
              date: new Date().setHours(0,0,0,0).toString()
            };
            $http.post('/api/goings/' + newGoing.date + '/' + newGoing.businessId + '/' + newGoing.userId, newGoing)
              .success(function(data) {
                business.imGoing = true;
                if (business.goings) {
                  business.goings += 1;
                } else {
                  business.goings = 1;
                }
              }).error(function(error) {
                console.log('error adding new Going');
              });
          });
        };

        $scope.removeGoing = function (business) {
          userFactory.getData().then(function(user) {
            var oldGoing =  {
              userId: user.data.id,
              businessId: business.id,
              date: new Date().setHours(0,0,0,0).toString()
            };
            $http.delete('/api/goings/' + oldGoing.date + '/' + oldGoing.businessId + '/' + oldGoing.userId, oldGoing)
              .error(function(error) {
                console.log('error removing Going');
              }).then(addGoingsParamToBusinesses());
          });
        };

        $scope.searchCity = function () {
          $http.get('/api/yelp/' + $scope.location).success(function(data) {
            $scope.yelpData = JSON.parse(data);
            $scope.businesses = $scope.yelpData.businesses;
            addGoingsParamToBusinesses();
          });
        }

    }]);

})();

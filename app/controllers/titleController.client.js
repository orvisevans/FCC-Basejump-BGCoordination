(function () {
  'use strict';

  angular
    .module('nightlifeApp')
    .controller('titleController',
      ['$scope', function($scope) {
        var titles = ['Meet your Meeples',
                      'Find your Friends',
                      'Play with your Peeps',
                      'Shuffle your Social Sphere',
                      'Beat the Boredom',
                      'Drink with your Dragons',
                      'Vice and Dice'];
        var titleIndex = Math.floor(Math.random()*titles.length);
        $scope.titleText = titles[titleIndex];
      }]);

})();

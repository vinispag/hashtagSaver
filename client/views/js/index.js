angular.module('hashtagSaver',['ngMaterial', 'ngMessages', 'material.svgAssetsCache'])

.controller('ListCtrl', function($scope, $mdDialog) {

  $scope.user = {
      email: '',
    };
  
  $scope.people = listhash;

  $scope.goToPerson = function(person, event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Navigating')
        .textContent('Inspect ' + person)
        .ariaLabel('Person inspect demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };

  $scope.doSecondaryAction = function(event) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('Secondary Action')
        .textContent('Secondary actions can be used for one click actions')
        .ariaLabel('Secondary click demo')
        .ok('Neat!')
        .targetEvent(event)
    );
  };

});

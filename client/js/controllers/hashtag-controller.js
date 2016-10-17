app.controller('hashtagController', ['$scope', '$resource', function ($scope, $resource) {
  var Hashtag = $resource('/api/hashtag');

  Hashtag.query(function (results) {
    $scope.hashtag = results;
  });

  $scope.hashtag = []

  $scope.createHashtag = function () {
    var hashtag = new Hashtag();
    hashtag.name = $scope.hashtagName;
    hashtag.$save(function (result) {
      $scope.hashtag.push(result);
      $scope.hashtagName = '';
    });
  }
}]);
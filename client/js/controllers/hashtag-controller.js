app.controller('hashtagController', ['$scope', '$resource', '$http', function ($scope, $resource,$http) {
  var Hashtag = $resource('/api/hashtag');
  var HaID = $resource('/api/hashtag/:hashid', {hashid:'@id'});
  
  Hashtag.query(function (results) {
    $scope.hashtag = results;
  });

  $scope.hashtag = []

  $scope.createHashtag = function () {
    var hashtag = new Hashtag();
    hashtag.name = '#' + $scope.hashtagName;
    hashtag.$save(function (result) {
      $scope.hashtag.push(result);
      $scope.hashtagName = '';
    });
  }

  $scope.deleteHashtag = function (id, index) {
    var hashtag = new HaID();
    hashtag.$remove({hashid:id},function (result) {
      $scope.hashtag.splice(index, 1);
    });
  }

  $scope.delete2Hashtag = function (id, index) {

  $http({
      method: 'POST',
      url: '/api/hashtag/'+ id,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
  },$scope.hashtag.splice(index, 1));
  }


}]);

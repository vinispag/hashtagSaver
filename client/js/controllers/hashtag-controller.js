var tag = 'users/self';
var url = window.location.href; 
var token = Right(url, 51); //size of access token from instagram authentication
var num_photos = 20;
var userID = 0;

app.controller('hashtagController', ['$scope', '$resource', '$http', function ($scope, $resource) {
  var Hashtag = $resource('/api/hashtag');
  var HaID = $resource('/api/hashtag/:hashid', {hashid:'@id'});
  var UsID =$resource('/api/hashtag/:userid', {userid:'@id'});

  $scope.getID = function(){
    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/',
      dataType: 'jsonp',
      type: 'GET',
      data: {access_token: token},
      success: function(data){
        console.log(data.data.id);
        userID = data.data.id;
        listHash();
      },
      error: function(data){
        console.log(data);
      }
    });
  }


  listHash = function(){
    UsID.query({userid: userID} , function (results) {
      $scope.hashtag = results;
      console.log('2');
      insta();
    });
  }

  $scope.hashtag = []

  $scope.createHashtag = function () {
    var hashtag = new Hashtag();

    if (typeof($scope.hashtagName) == 'undefined')
      $scope.hashtagName='';

    if ($scope.hashtagName.length == 0 && tag.substring(0,5) != 'users')
      hashtag.name = '#' + tag.substring(5).toLowerCase();
    else if (typeof($scope.hashtagName) != 'undefined')
      hashtag.name = '#' + $scope.hashtagName.replace('#','').replace(/ /g,'').toLowerCase();
    else
      hashtag.name = '#'

    if (hashtag.name.length > 1){
      hashtag.userid = userID;
      hashtag.$save(function (result) {
        if (result._id) {
          $scope.hashtag.push(result);
        }
      });
      tag = 'tags/' + $scope.hashtagName;
      $('input').attr('placeholder',$scope.hashtagName.replace('#','').replace(/ /g,''));
      $scope.hashtagName = '';
      console.log(tag);
      insta();
    }
  }

  $scope.deleteHashtag = function (id, index) {
    var hashtag = new HaID();
    hashtag.$remove({hashid:id},function (result) {
      $scope.hashtag.splice(index, 1);
    });
  }

   $scope.getInsta = function(tagname) {
    if (tagname){
      tag = 'tags/' + tagname.replace('#','').replace(/ /g,'');
      $('input').attr('placeholder',tagname.replace('#','').replace(/ /g,''));
    }
    else{
      tag = 'users/self';
      $('input').attr('placeholder','InstagramTag');
    }
    $scope.hashtagName = '';
    insta();
  }
}]);

function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function insta(){
  var images = document.getElementsByTagName('li');
  var l = images.length;
  for (var i = 0; i < l; i++) {
      images[0].parentNode.removeChild(images[0]);
  }
  $.ajax({
    url: 'https://api.instagram.com/v1/'+ tag +'/media/recent',
    dataType: 'jsonp',
    type: 'GET',
    data: {access_token: token , count: num_photos},
    success: function(data){
      for( x in data.data ){
        $('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');
      }
    },
    error: function(data){
      console.log(data);
    }
  });
}

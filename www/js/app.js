// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.controller("FeedController", function($http, $scope) {
 
    $scope.init = function() {
        $http.get("https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Feurolandfeeds.x10host.com%2Fhome%2Feurolan2%2Fpublic_html%2Fdrupal%2F%3Fq%3Drss.xml")
            .success(function(data) {
                $scope.rssTitle = data.feed.description;
                $scope.rssUrl = data.feed.link;
                $scope.items = data.items;
                window.localStorage["entries"] = JSON.stringify(data.feed.items);
            })
            .error(function(data) {
                console.log("ERROR: " + data);
                if(window.localStorage["entries"] !== undefined) {
                    $scope.entries = JSON.parse(window.localStorage["entries"]);
                }
            });
    }

    $scope.browse = function(v){
      window.open(v,"_system","location=yes");
    }
 
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

var myapp = angular.module('myapp', ['ngMap',"ui.router"])
  myapp.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/foo")
    $stateProvider
      .state('foo', { url: "/foo", templateUrl: "foo.html", controller: 'fooCtrl' })
      .state('bar', { url: "/bar", templateUrl: "bar.html", controller: 'barCtrl' })
  });
  myapp.controller('fooCtrl', function($scope, NgMap){
    NgMap.getMap('foomap').then(function(map) {
      console.log('NgMap.getMap in fooCtrl', map);
    });
    $scope.onClick = function() {
      alert('map clicked');
    }
  });
  myapp.controller('barCtrl', function(NgMap){
    NgMap.getMap('barmap').then(function(map) {
      console.log('NgMap.getMap in barCtrl', map);
    });
  });
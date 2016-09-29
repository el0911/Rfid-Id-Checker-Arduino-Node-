var app = angular.module('starter', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/index.html'
  });
}]);

app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect("http://localhost:8100/");

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}]);

app.controller('main', function($scope, socket) {
  $scope.details={};
  socket.on('init', function(data) {
  alert(data);
  $scope.details=data.Object.Object;
  console.log(data);
  });

  socket.on('d', function(data) {
  alert(data);
  console.log(data);
  });
});

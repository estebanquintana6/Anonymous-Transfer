(function () {
    'use strict';
    angular.module('app')
        .controller('customerController', ['$scope', '$rootScope','$location', '$q', '$http', '$mdDialog', CustomerController]);

    function CustomerController($scope, $rootScope, $location, $q, $http, $mdDialog) {

      $scope.appName = "Scytale";
      $rootScope.username = "";
      $scope.nickname = "";

      $scope.currentFile = 1;

      $scope.createUser = function(){
        $http({
          method: 'GET',
          url: 'http://127.0.0.1:8080/users/add',
          params: {username: $scope.nickname}
        }).then(function successCallback(response) {
            console.log("Usuario creado");
            $rootScope.username = $scope.nickname;
            $location.path('/menu');
          }, function errorCallback(response) {
            console.log("Error");
        });
      }

    }

})();

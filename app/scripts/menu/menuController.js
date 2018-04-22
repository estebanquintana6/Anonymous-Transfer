(function () {
    'use strict';
    angular.module('app')
        .controller('menuController', ['$scope', '$rootScope', '$location','$q', '$http', '$mdDialog','$interval', MenuController]);

    function MenuController($scope, $rootScope, $location, $q, $http, $mdDialog, $interval) {

      $scope.appName = "Scytale";
      $scope.fileInputs = [{id: "file1", name: "File 1", file: null}];
      $scope.files = [];
      $scope.file = null;
      $scope.user = "";
      $scope.actualFiles = [];

      $scope.logout = function(){
        $http({
          method: 'GET',
          url: 'http://127.0.0.1:8080/users/remove',
          params: {username: $rootScope.username}
        }).then(function successCallback(response) {
            console.log("Usuario elminiado");
            $rootScope.username = "";
            $location.path('/');
          }, function errorCallback(response) {
            console.log("Error");
            $location.path('/');
        });
      }

      $scope.addField = function(){
        var newItemNo = $scope.fileInputs.length+1;
        $scope.fileInputs.push({'id':'file'+newItemNo, 'name': "File "+newItemNo});
      }

      $scope.sendFiles = function(){
        var f = [];
        $scope.fileInputs.forEach(function(element) {
          f.push(element.file);
        });
        var uploadUrl = 'http://127.0.0.1:8080/files/up';
        uploadFiles(f, uploadUrl);
      }

      var uploadFiles = function(files, url){
          var user = $scope.user;
          var fd = new FormData();
          console.log(files);
          files.forEach(function(element) {
            fd.append('tracks', element);
          });
          fd.append('username', user);
          fd.append('sharer', $rootScope.username);

          $http({
                 method: 'POST',
                 url: url,
                 headers: {'Content-Type': undefined},
                 data: fd,
                 transformRequest: function(data, headersGetterFunction) {
                                 return data;
                  }
              })
              .then(function successCallback(response) {
                  console.log("success");
                }, function errorCallback(response) {
                  console.log("Error");
              });

            }

      var getFiles = function(){
        $http({
          method: 'GET',
          url: 'http://127.0.0.1:8080/files/getShared',
          params: {username: $rootScope.username}
        }).then(function(response) {
            $scope.actualFiles = angular.fromJson(response.data);
            console.log("Updated files");
        });
      }

      $interval(getFiles, 10000);
      $interval(function(){console.log($scope.actualFiles);},10000);
    }

})();

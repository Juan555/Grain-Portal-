var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('FirstController', ['$scope', 'CommonData', function($scope, CommonData) {
    $scope.data = "";
    $scope.displayText = ""

    $scope.setData = function() {
        CommonData.setData($scope.data);
        $scope.displayText = "Data set"

    };

}]);

mp4Controllers.controller('SecondController', ['$scope', 'CommonData', function($scope, CommonData) {
    $scope.data = "";

    $scope.getData = function() {
        $scope.data = CommonData.getData();

    };

}]);


mp4Controllers.controller('LlamaListController', ['$scope', '$http', 'Users', 'Llamas', '$window', function($scope, $http, Users, Llamas, $window) {

    // Llamas.get().success(function(data) {
    //     $scope.llamas = data;
    // });

    Users.get().success(function(data) {
        $scope.users = data.data;
        console.log("Users GET success");
    }).error(function(error) {
      $scope.status = "Users GET Error: " + $scope.status;
      console.log($scope.status);
    });



}]);

mp4Controllers.controller('SettingsController', ['$scope', '$window', function($scope, $window) {
    $scope.url = $window.sessionStorage.baseurl;

    $scope.setUrl = function() {
        $window.sessionStorage.baseurl = $scope.url;
        $scope.displayText = "URL set";

    };

}]);

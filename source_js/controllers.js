var kaleControllers = angular.module('kaleControllers', []);

kaleControllers.controller('SoundtestController', ['$scope', 'soundLogic', function($scope, soundLogic) {

    //Example of how to call soundLogic function
    $scope.callSoundLogic = function() {

        sounds = [
            '../media/DubstepDrumLoop(140bpm).mp3',
            '../media/EDMloop95BPM.wav'
        ];

        angles = [-90, 90];

        //sound, type string array, an array of file paths to sounds
        //angle, type number array, an array of angles
        //The ith sound in sounds corresponds to the ith sound in angles
        soundLogic.start(sounds, angles);
    }

}]);

kaleControllers.controller('FirstController', ['$scope', 'CommonData', function($scope, CommonData) {
    $scope.data = "";
    $scope.displayText = ""

    $scope.setData = function() {
        CommonData.setData($scope.data);
        $scope.displayText = "Data set"

    };

}]);

kaleControllers.controller('SecondController', ['$scope', 'CommonData', function($scope, CommonData) {
    $scope.data = "";

    $scope.getData = function() {
        $scope.data = CommonData.getData();

    };

}]);


kaleControllers.controller('LlamaListController', ['$scope', '$http', 'Users', 'Llamas', '$window', function($scope, $http, Users, Llamas, $window) {

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

kaleControllers.controller('SettingsController', ['$scope', '$window', function($scope, $window) {
    $scope.url = $window.sessionStorage.baseurl;

    $scope.setUrl = function() {
        $window.sessionStorage.baseurl = $scope.url;
        $scope.displayText = "URL set";

    };

}]);

var kaleControllers = angular.module('kaleControllers', []);

kaleControllers.controller('SoundTestController', ['$scope', 'SoundLogic', '$window', function($scope, SoundLogic, $window) {
    $window.sessionStorage.baseurl = 'http://localhost:3000';

    /*
     *   Greg's To-Do List
     *   1. Save environment as audio file
     *   2. Proper login system that doesn't store passwords in plaintext
     *   3. Deployment
     */

    //Example of how to call SoundLogic
    $scope.playEnvironment = function() {

        //required
        //Paths are to files in /public/media
        sounds = ['../media/DubstepDrumLoop(140bpm).mp3',
            '../media/EDMloop95BPM.wav'
        ];

        //required
        angles = [-90, 90];

        //optional, volumes has default values of 0.5 for sounds
        volumes = [0.1, 1];

        //sound, type string array, an array of file paths to sounds
        //angle, type number array, an array of angles
        //The ith sound in sounds corresponds to the ith angle in angles and the ith volume in volumes

        SoundLogic.playEnvironment(sounds, angles);
        //or
        //soundLogic.start(sounds, angles, volumes);

    }

    // Play a single sound. Functions as an audio preview
    $scope.playSingleSoundNoAngle = function() {

        var sound = '../media/birdschirping1.wav'

        SoundLogic.playSingleSoundNoAngle(sound);
    }


    /*  API - Similar to MP4's
     *   Limited support for queries.
     *   Let me (Greg) know if you would like additional API functionality
     *
     *   /api/users
     *
     *   User models' schema
     *
     *   var UserSchema = new mongoose.Schema({
     *       name: {type: String, required: true},
     *       email: {type: String, required: true},
     *       password: {type: String, required: true},
     *       soundObjectIDArray: {type: [String], default: []} //array of ids of soundObjects
     *   });
     *
     *   /api/soundobjects
     *
     *   soundObject Schema
     *
     *   var soundObjectSchema = new mongoose.Schema({
     *       angle: {type: Number, required: true},
     *       soundFileID: {type: String, required: true},
     *       userID: {type: String, default: ""} //optional, for two-way referencing if desired
     *   });
     *
     *   /api/soundfiles
     *
     *   soundFileID references a soundFile
     *
     *   SoundFile Schema
     *
     *   var soundFileSchema = new mongoose.Schema({
     *       name: {type: String, required: true},
     *       imageLocation: {type: String, required: true},
     *       soundFileLocation: {type: String, required: true}
     *   });
     *
     *
     *   Using the API
     *
     *   Users
     *   get(), gets all Users
     *   newUser(newUserInfo), creates new User, newUserInfo is type User object
     *   deleteUser(userID), deletes a User, userID is type String
     *   getSingleUser(userID), gets one User, userID is type String
     *   updateUser(updatedUserInfo), updates a User, updatedUserInfo is type User object
     *
     *
     *   SoundObjects
     *   get(), gets all SoundObjects
     *   newSoundObject(newSoundObjectInfo), creates new SoundObject, newSoundObjectInfo is type SoundObject object
     *   deleteSoundObject(soundObjectID), deletes a SoundObject, soundObjectID is type String
     *   getSingleSoundObject(soundObjectID), gets one SoundObject, soundObjectID is type String
     *   updateSoundObject(updatedSoundObjectInfo), updates a SoundObject, updatedSoundObjectInfo is type SoundObject object
     *
     *
     *   SoundFiles
     *   get(), gets all SoundFiles
     *   newSoundObject(newSoundObjectInfo), creates new SoundFile, newSoundObjectInfo is type SoundFile object
     *   deleteSoundObject(soundObjectID), deletes a SoundFile, soundFileID is type String
     *   getSingleSoundObject(soundObjectID), gets one SoundFile, soundFileID is type String
     *   updateSoundObject(updatedSoundObjectInfo), updates a SoundFile, updatedSoundObjectInfo is type SoundFile object
     *
     */

        // var pano = $("#myPano").pano({
        //     img: "../media/background.jpg",
        //     interval: 100,
        //     speed: 50
        // });

        // pano.moveLeft();
        // pano.stopMoving();
        // pano.moveRight();
        // pano.stopMoving();

}]);

kaleControllers.controller('MainPageController', ['$scope', '$window', function($scope, $window) {


}]);

kaleControllers.controller('FirstController', ['$scope', 'CommonData', function($scope, CommonData) {
    $window.sessionStorage.baseurl = 'http://localhost:3000';

    $scope.data = "";
    $scope.displayText = ""

    $scope.setData = function() {
        CommonData.setData($scope.data);
        $scope.displayText = "Data set"

    };

}]);

kaleControllers.controller('SecondController', ['$scope', 'CommonData', function($scope, CommonData) {
    $window.sessionStorage.baseurl = 'http://localhost:3000';

    $scope.data = "";

    $scope.getData = function() {
        $scope.data = CommonData.getData();

    };

}]);


kaleControllers.controller('LlamaListController', ['$scope', '$http', 'Users', 'Llamas', '$window', function($scope, $http, Users, Llamas, $window) {

    // Llamas.get().success(function(data) {
    //     $scope.llamas = data;
    // });

    $window.sessionStorage.baseurl = 'http://localhost:3000';

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
    $scope.url = 'http://localhost:3000';
    $scope.setUrl = function() {
        $window.sessionStorage.baseurl = $scope.url;
        $scope.displayText = "URL set";

    };

}]);

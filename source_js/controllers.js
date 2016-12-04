var kaleControllers = angular.module('kaleControllers', []);

kaleControllers.controller('SoundTestController', ['$scope', 'SoundLogic', 'UserAuth', '$window', function($scope, SoundLogic, UserAuth, $window) {
    $window.sessionStorage.baseurl = 'http://localhost:3000';

    /*
     *   Greg's To-Do List
     *   1. Save environment as audio file
     *   2. Proper login system that doesn't store passwords in plaintext (70% done)
     *   3. Deployment
     *
     *
     *   Fun Facts
     *   Passwords hashed and salted with bcrypt
     *   JWTs signed with SHA-512
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

        //optional, offset has default value of 0 degrees
        offset = 0;

        //sound => type string array, an array of file paths to sounds
        //angle => type number array, an array of angles
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

    $scope.playEnvironmentOffline = function() {
        sounds = ['../media/DubstepDrumLoop(140bpm).mp3',
            '../media/EDMloop95BPM.wav'
        ];
        angles = [-90, 90];
        volumes = [0.1, 1];
        SoundLogic.playEnvironmentOffline(sounds, angles);
    }


    /* DB Structure
     *
     * The general structure of our database is as follows:
     * A user has an array of soundEnvironment IDs.
     * Each soundEnvironment has an array of soundObject IDs.
     * Each soundObject references a soundFile via ID.
     */


    /*  Compatible sound file types
     *  https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats#Browser_compatibility
     */


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
     *       soundEnvironmentIDArray: {type: [String], default: []} //array of ids of soundEnvironments
     *   });
     *
     *   /api/soundenvironments
     *
     *   soundEnvironment Schema
     *
     *   var soundEnvironmentSchema = new mongoose.Schema({
     *       name: {type: String, required: true},   //Unique in each user's scope
     *       soundObjectIDArray: {type: [String], default: []},
     *       userID: {type: String, required: true}, //Not optional, used to check for user environment with same name
     *       dateCreated: {type: Date, default: Date.now}
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
     *   SoundEnvironments
     *   get(), gets all SoundEnvironments
     *   newSoundEnvironment(newSoundEnvironmentInfo), creates new SoundEnvironment, newSoundEnvironmentInfo is type SoundEnvironments object
     *   deleteSoundEnvironment(soundEnvironmentID), deletes a SoundEnvironment, soundEnvironmentID is type String
     *   getSingleSoundEnvironment(soundEnvironmentID), gets one SoundEnvironment, soundEnvironmentID is type String
     *   updateSoundEnvironment(updatedSoundEnvironmentInfo), updates a SoundEnvironment, updatedSoundEnvironmentInfo is type SoundEnvironments object
     *
     *   SoundObjects
     *   get(), gets all SoundObjects
     *   newSoundObject(newSoundObjectInfo), creates new SoundObject, newSoundObjectInfo is type SoundObject object
     *   deleteSoundObject(soundObjectID), deletes a SoundObject, soundObjectID is type String
     *   getSingleSoundObject(soundObjectID), gets one SoundObject, soundObjectID is type String
     *   updateSoundObject(updatedSoundObjectInfo), updates a SoundObject, updatedSoundObjectInfo is type SoundObject object
     *
     *   SoundFiles
     *   get(), gets all SoundFiles
     *   newSoundObject(newSoundObjectInfo), creates new SoundFile, newSoundObjectInfo is type SoundFile object
     *   deleteSoundObject(soundObjectID), deletes a SoundFile, soundFileID is type String
     *   getSingleSoundObject(soundObjectID), gets one SoundFile, soundFileID is type String
     *   updateSoundObject(updatedSoundObjectInfo), updates a SoundFile, updatedSoundObjectInfo is type SoundFile object
     *
     *
     *   UserAuth
     *   login, takes a String username and String password as input inside a userCredentials, returns a String token
     *   useToken, no input required, returns an user's userID, an userEmail, and a soundEnvironmentIDArray
     *
     *   
     */

    // Authentification Demonstration

    // Signup (using Foundation Abide Form Validation plugin in next iteration)
    $scope.newuser = {
        username: '',
        email: '',
        password: ''
    }

    $scope.confirmpassword = '';

    // $scope.signupErrors = {
    //    username: false,
    //    email: false,
    //    password: false
    // }

    $scope.signup = function() {

        if (username.length == 0) {

        }

        Users.newUser(newuser).success(function(data) {
            console.log("New User created");
        }).error(function(error) {
            $scope.status = "soundTest Users Signup error: " + error.message;
            console.log($scope.status);
        });
    }


    // Login (using Foundation Abide Form Validation plugin in next iteration)
    $scope.user = {
        username: '',
        password: ''
    };

    $scope.userData = '';

    $scope.login = function() {
        // console.log($scope.user.username);
        // console.log($scope.user.password);
        UserAuth.login($scope.user).success(function(data) {
            $scope.token = data.token;
            console.log("UserAuth login success");
            console.log("Token: " + $scope.token);
            $scope.accessUserData();
        }).error(function(error) {
            $scope.status = "soundTest UserAuth login error: " + error.message;
            console.log($scope.status);
        });


    }

    $scope.accessUserData = function() {
        UserAuth.useToken().success(function(data) {
            $scope.userData = data;
        }).error(function(error) {
            $scope.status = "soundTest UserAuth userToken error: " + error;
            console.log($scope.status);
        });
    }

    $scope.accessUserData();

    // SoundLogic.savemusic();


    var anchor = document.createElement('a');
    document.body.appendChild(anchor);

}]);

kaleControllers.controller('MainPageController', ['$scope', '$window', function($scope, $window) {

    $("#myPano").pano({
        img: "../media/background_small.jpg"
    });
  
        $scope.hello = function(){
             console.log("1");
            

        }


}]);

kaleControllers.controller('FirstController', ['$scope', 'CommonData', function($scope, CommonData) {
    $window.sessionStorage.baseurl = 'http://localhost:3000';

    $scope.data = "";
    $scope.displayText = "";

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

kaleControllers.controller('EditViewController', ['$scope', 'CommonData', function($scope, CommonData) {
    $window.sessionStorage.baseurl = 'http://localhost:3000';

    $scope.data = "";

    $scope.getData = function() {
        $scope.data = CommonData.getData();

    };

    $scope.closeIcon = function() {

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

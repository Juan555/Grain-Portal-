var kaleControllers = angular.module('kaleControllers', []);

kaleControllers.controller('SoundTestController', ['$scope', 'SoundLogic', 'UserAuth', '$window', function($scope, SoundLogic, UserAuth, $window) {
    $window.sessionStorage.baseurl = 'http://localhost:3000';

    /*
     *   Greg's To-Do List
     *   1. Save environment as audio file (Done)
     *   2. Backend + Proper login system that doesn't store passwords in plaintext (Done)
     *   3. Deployment (April's VM)
     *   4. Signup and Login modal content (Basic implementation)
     *   5. Enhance soundLogic to dynamically apply pano offset from original position (Done)
     *
     *
     *   Fun Facts
     *   Passwords hashed and salted with bcrypt
     *   JWTs signed with SHA-512
     *   HTTP-only signed cookies
     */

    //Example of how to call SoundLogic
    //playEnvironment

    //Stop environment sound by clicking element with class 'stopSound'
    //Pause environment sound by clicking element with class 'pauseSound'
    //Resume environment sound by clicking element with class 'resumeSound'

    $scope.playEnvironment = function() {

        //required
        //Paths are to files in /public/media
        sounds = [
            '../media/DubstepDrumLoop(140bpm).mp3',
            // '../media/EDMloop95BPM.wav',
            '../media/birdschirping1.wav'
        ];

        //required
        // angles = [-90, 90, 45];
        angles = [90, -90];

        //optional, volumes has default values of 0.5 for sounds
        // volumes = [0.8, 0.8, 1];
        volumes = [1, 1];

        //optional, offset has default value of 0 degrees
        offset = 0;

        //sound => type string array, an array of file paths to sounds
        //angle => type number array, an array of angles
        //The ith sound in sounds corresponds to the ith angle in angles and the ith volume in volumes

        SoundLogic.playEnvironment(sounds, angles, volumes);
        //or
        //soundLogic.start(sounds, angles, volumes);

    }

    // Play a single sound. Functions as an audio preview
    $scope.playSingleSoundNoAngle = function() {

        //required
        var sound = '../media/birdschirping1.wav';

        //optional, play time in milliseconds, default 5000 ms
        var time = 3000;

        SoundLogic.playSingleSoundNoAngle(sound, time);
    }

    // On function call downloads given environment as WAV file, volumes optional as usual
    $scope.downloadEnvironmentAsWAV = function() {

        //required
        sounds = ['../media/DubstepDrumLoop(140bpm).mp3',
            '../media/birdschirping1.wav'
        ];

        //required
        angles = [-90, 90];

        //optional, default is 0.5
        volumes = [0.5, 0.5];

        var offset = 0;

        var length = 10;

        SoundLogic.downloadEnvironmentAsWAV(sounds, angles, volumes, offset, length);
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

        if ($scope.newuser.username.length == 0 || $scope.newuser.email.length == 0 || $scope.confirmpassword != $scope.newuser.password) {
            return;
        }

        Users.newUser($scope.newuser).success(function(data) {
            console.log("New User created");
            console.log(data);
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


    // $('#testbutton4').click(function() {
    //     // console.log($window.doSomething());
    //     // doSomething.test2();
    //     // $.getScript('../bundle.js', function() {
    //     // });
    // });

    $scope.slider = {
        value: 360,
        // maxValue: 360,
        options: {
            showSelectionBar: true
        }
    };

    // $scope.$watchGroup(['slider.value'],
    //     function() {
    //         console.log($scope.slider.value);
    //     }

    // );

    // function tf1() {
    //     console.log($scope.slider.value);
    // }

    $scope.$watchGroup(['slider.value'],
        function() {
            sessionStorage.setItem('offsetTestAngle', $scope.slider.value);
            console.log($scope.slider.value);
        }

    );


}]);

kaleControllers.controller('MainPageController', ['$scope', '$window', function($scope, $window) {


}]);


kaleControllers.controller('EditViewController', ['$scope', 'SoundLogic', 'SoundFiles', 'SoundObjects', 'SoundEnvironments', '$window', 'UserAuth', function($scope, SoundLogic, SoundFiles, SoundObjects, SoundEnvironments, $window, UserAuth) {


    $scope.playEnvironment = function() {

        //required
        //Paths are to files in /public/media
        sounds = [
            '../media/DubstepDrumLoop(140bpm).mp3',
            // '../media/EDMloop95BPM.wav',
            '../media/birdschirping1.wav'
        ];

        //required
        // angles = [-90, 90, 45];
        angles = [90, -90];

        //optional, volumes has default values of 0.5 for sounds
        // volumes = [0.8, 0.8, 1];
        volumes = [1, 1];

        //optional, offset has default value of 0 degrees
        offset = 0;

        //sound => type string array, an array of file paths to sounds
        //angle => type number array, an array of angles
        //The ith sound in sounds corresponds to the ith angle in angles and the ith volume in volumes

        SoundLogic.playEnvironment(sounds, angles, volumes);
        //or
        //soundLogic.start(sounds, angles, volumes);

    }


    // $scope.playEnvironment();





    //     stopPropagation('#myPano', 'mousedown');
    // stopPropagation('#myPano', 'mouseup');

    // function stopPropagation(id, event) {
    //     $(id).on(event, function(e) {
    //         e.stopPropagation();
    //         return false;
    //     });
    // }
    $scope.myVar = -1;
    // $('#myPano').on('click', function(e){
    //     e.stopPropagation();
    //     $scope.myVar = setInterval(function(){
    //     var x=localStorage.getItem("position_diff");
    //            console.log(x);
    //      }, 1000);
    //     return false;
    // });
    // $('#myPano').on('mousedown', function(e){
    //     if ($scope.myVar == -1){
    //         $scope.myVar = setInterval(function(){
    //         var x=localStorage.getItem("position_diff");
    //        console.log(x);
    //      }, 1000);
    //     }


    // });
    // $('#myPano').on('mouseup', function(e){
    //     if ($scope.myVar != -1){
    //         clearInterval($scope.myVar);
    //         $scope.myVar = -1;
    //         console.log("1");
    //     }

    // });



    $window.sessionStorage.baseurl = 'http://localhost:3000';


    SoundFiles.get().then(function(data) {
        $scope.soundFiles = data.data.data;
    });

    $scope.currentSoundObjects = [];

    $scope.accessUserData = function() {
        UserAuth.useToken().success(function(data) {
            $scope.userData = data;
        }).error(function(error) {
            $scope.status = "soundTest UserAuth userToken error: " + error;
            console.log($scope.status);
        });
    }

    $scope.accessUserData();



    $scope.createSoundObject = function(event, ui, data) {
        console.log(data.soundFile._id);
<<<<<<< Updated upstream
        if ($scope.userData) {
            var newSoundObject = {
                'angle': 90,
                'soundFileID': data.soundFile._id,
                'userID': $scope.userData._id
            }
        } else {
            $scope.error = "Please login if you would like to save or view your environment."
=======
        if($scope.userData){
          var newSoundObject = {
            'angle': 90,
            'soundFileID': data.soundFile._id,
            'userID': $scope.userData._id
          };
        }
        else {
          var newSoundObject = {
            'angle': 90,
            'soundFileID': data.soundFile._id,
            'userID': ""
          };
>>>>>>> Stashed changes
        }

        var count = 0;
        for (var soundObj in $scope.currentSoundObjects) {
            if (newSoundObject.soundFileID == soundObj.soundFileID) {
                SoundObjects.updateSoundObject(newSoundObject);
                $scope.currentSoundObjects.splice(count, 1);
                return;
            }
            count++;
        }

        $scope.currentSoundObjects.push(newSoundObject);

        SoundObjects.newSoundObject(newSoundObject).error(function(error) {
            console.log(error);
        });
    };


      $scope.environment = {};
      $scope.saveEnvironment = function() {
        //if user not logged in, tell them to login or signup
        $scope.environment["soundObjectIDArray"] = $scope.currentSoundObjects;
        $scope.environment["userID"] = $scope.userData._id;
        SoundEnvironments.newSoundObject($scope.environment)
          .error(function(error){
            console.log(error);
          });
      };

      $scope.myFunc = function(myE) {
          console.log(myE.target.id);
              $scope.x = myE.clientX;
              $scope.y = myE.clientY;
          }

          $scope.playSound = function(path){
            console.log(path);
            SoundLogic.playSingleSoundNoAngle(path);
          }





  }]);

kaleControllers.controller('NavController', ['$scope', '$window', '$location', '$modal', function($scope, $window, $location, $modal) {

    $scope.currentPath = $location.path;
    $scope.setCurrentLocation = function(path) {
        $scope.currentPath = path;
        console.log($scope.currentPath);
    };


    $scope.open = function open(link) {
        var params = {
            templateUrl: link,
            resolve: {
                items: function() {
                    return $scope.items;
                },
            },
            controller: function($scope, $modalInstance) {

                $scope.reposition = function() {
                    $modalInstance.reposition();
                };

                $scope.ok = function() {
                    $modalInstance.close($scope.selected.item);
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };

            }
        };


        var modalInstance = $modal.open(params);

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);



kaleControllers.controller('LoginController', ['$scope', '$window', 'UserAuth', function($scope, $window, UserAuth) {

    $scope.accessUserData = function() {
        UserAuth.useToken().success(function(data) {
            $scope.userData = data;
            alert("Welcome " + data.username + " (" + data.email + ")");
        }).error(function(error) {
            $scope.status = "soundTest UserAuth userToken error: " + error;
            console.log($scope.status);
        });
    }

    $scope.accessUserData();

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

}]);

kaleControllers.controller('SignupController', ['$scope', '$window', 'UserAuth', 'Users', function($scope, $window, UserAuth, Users) {

    $scope.newuser = {
        username: '',
        email: '',
        password: ''
    }

    $scope.confirmpassword = '';

    $scope.signup = function() {

        if ($scope.newuser.username.length == 0 || $scope.newuser.email.length == 0 || $scope.confirmpassword != $scope.newuser.password) {
            return;
        }

        Users.newUser($scope.newuser).success(function(data) {
            console.log("New User created");
            console.log(data);
        }).error(function(error) {
            $scope.status = "soundTest Users Signup error: " + error.message;
            console.log($scope.status);
        });
    }

}]);

kaleControllers.controller('LoadEnvironmentController', ['$scope', '$window', 'SoundLogic', 'UserAuth', function($scope, $window, SoundLogic, UserAuth) {

}]);

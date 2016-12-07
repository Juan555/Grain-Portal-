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
        console.log("Login function called");
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


kaleControllers.controller('EditViewController', ['$scope', '$rootScope', 'SoundLogic', 'SoundFiles', 'SoundObjects', 'SoundEnvironments', '$window', 'Users', 'UserAuth', function($scope, $rootScope, SoundLogic, SoundFiles, SoundObjects, SoundEnvironments, $window, Users, UserAuth) {

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

    var userID = "";
    if($scope.userID == undefined){
      $scope.userID = "";
    }

    $scope.accessUserData = function() {
        UserAuth.useToken().success(function(data) {
            $scope.userData = data;

            userID = $scope.userData._id;
            $scope.userID = userID;

            console.log("right here: " + $scope.userID);


      $scope.getEnvironments = function(){

          Users.getSingleUser($scope.userID).success(function(data) {
            console.log(data);
              $scope.soundEnvironments = data.data[0].soundEnvironmentIDArray;
              // console.log("env");
              // console.log($scope.soundEnvironments);

              if($scope.soundEnvironments.length == 0) {
                console.log("soundEnvironments array length is 0");
                return;
              }

              SoundEnvironments.getSingleSoundObject($scope.soundEnvironments[0]).success(function(data){
              }).error(function(error) {
                console.log(error);
              })
              console.log(data);
          })
          .error(function(error){

            console.log("getEnvironments error: " + error);
          });
      };

      $scope.getEnvironments();



        }).error(function(error) {
            $scope.status = "EditView UserAuth userToken error: " + error;
            console.log($scope.status);
        });
    };

    $scope.accessUserData();


    if ($rootScope.currentSoundObjects == undefined) {
        $rootScope.currentSoundObjects = [];
    }
    if ($rootScope.soundIDs == undefined) {
        $rootScope.soundIDs = [];
    }

    function popsarray_h() {
        // run this code

        setTimeout(popsarray, 100);
    }

    function popsarray() {
        if ($rootScope.sArray == undefined) {
            // console.log("rootscope undefined");
            // Sorry rootScope but sleepy
            $rootScope.sArray = [0, 0, 0, 0];
            $rootScope.origArray = [0, 0, 0, 0];
            $rootScope.diffArray = [0, 0, 0, 0];

            $('.soundIcons').each(function(index) {
                var t = ($(this).offset()).left;
                // console.log("left start offset get");
                // console.log(t);
                $rootScope.origArray[index] = 0 - parseInt(t, 10);

            });

            console.log($rootScope.sArray);
        }
    }

    popsarray_h();


    $scope.createSoundObject = function(event, ui, data) {

        // console.log(data.soundFile._id);
        console.log(event.clientX);
        // console.log(event);

        if (data.soundFile._id == "58461523b6b5711b4dae25dd") {
            console.log("BIRD");
            $rootScope.sArray[3] = event.clientX + $rootScope.origArray[3];
            $rootScope.diffArray[3] = localStorage.getItem('position_diff');

        } else if (data.soundFile._id == "584613beb6b5711b4dae25db") {
            console.log("RAIN");
            $rootScope.sArray[2] = event.clientX + $rootScope.origArray[2];
            $rootScope.diffArray[2] = localStorage.getItem('position_diff');

        } else if (data.soundFile._id == "584610e6b6b5711b4dae25da") {
            console.log("WIND");
            $rootScope.sArray[1] = event.clientX + $rootScope.origArray[1];
            $rootScope.diffArray[1] = localStorage.getItem('position_diff');

        } else {
            console.log("DOG");
            $rootScope.sArray[0] = event.clientX + $rootScope.origArray[0];
            $rootScope.diffArray[0] = localStorage.getItem('position_diff');

        }
        var x = 3140 - localStorage.getItem("position_diff");
        if (x < 0) {
            y = (((3140 + (x % 3140)) * 18) / 157) % 360;
            // console.log(y);
        } else {
            y = ((18 * x) / 157) % 360;

        }
              var newSound = {};
                if(userID != ""){
                   newSound = {
                    "angle": y,
                    "soundFileID": data.soundFile._id,
                    "userID": userID
                  };
                }
                else {
                   newSound = {
                    "angle": y,
                    "soundFileID": data.soundFile._id,
                    "userID": ""
                  };
                }

        $rootScope.currentSoundObjects.push(newSound);
        console.log($rootScope.currentSoundObjects);
        SoundObjects.newSoundObject(newSound)
            .success(function(data) {
                $rootScope.soundIDs.push(data.data._id);
            });

        console.log("sArray: " + $rootScope.sArray);
        console.log("diffArray: " + $rootScope.diffArray);



        $rootScope.currentSoundObjects.push(newSound);
        console.log($rootScope.currentSoundObjects);
        SoundObjects.newSoundObject(newSound);

    };




    $scope.myFunc = function(myE) {
        console.log(myE.target.id);
        $scope.x = myE.clientX;
        $scope.y = myE.clientY;
    }

    $scope.playSound = function(path) {
        console.log(path);
        SoundLogic.playSingleSoundNoAngle(path);
    }

    $scope.environment = {};

    $scope.saveEnvironment = function() {
        console.log($rootScope.soundIDs);
        for (var i = 0; i < $rootScope.currentSoundObjects.length; i++) {

        }
        $scope.environment.soundObjectIDArray = $rootScope.soundIDs;
        $scope.environment.userID = userID;
        SoundEnvironments.newSoundObject($scope.environment)
            .success(function(data) {
                var envID = data.data._id;
                Users.getSingleUser(userID)
                    .success(function(updateuserdata) {
                        updateuserdata.data[0].soundEnvironmentIDArray.push(envID);
                        Users.updateUser(updateuserdata.data[0]);
                    });
            })
            .error(function(error) {
                console.log(error);
            });
    };


    var timeout;
    $("#myPano, #leftpanoclick, #rightpanoclick").mousedown(function() {

        timeout = setInterval(function() {

            $('.soundIcons').each(function(index) {
                var diff = localStorage.getItem('position_diff') - $scope.diffArray[index] - 119 + 130;
                diff += -40;
                diff = diff % (4055);
                // var offset = parseInt($(this).css('left'), 10);
                var f = $rootScope.sArray[index];
                // console.log("sArray " + index + " " + f);
                // console  .log(offset);
                if ($(this).css('top') != "0px") {
                    $(this).css('left', diff + f);
                }
            })

        }, 50);


        //WEIRD STUFF HAPPENS AFTER LOOPAROUND

        return false;

    });


    $(document).mouseup(function() {
        clearInterval(timeout);

        // $('.soundIcons').each(function(index) {
        //     // console.log("attr start");
        //     $(this).attr('start', 0);
        // });
        // $(".soundIcons").attr('start', 0);

        return false;
    });


      // $scope.getEnvironments = function(){

      //     Users.getSingleUser($scope.userID).success(function(data) {
      //       console.log(data);
      //         $scope.soundEnvironments = data.data[0].soundEnvironmentIDArray;
      //         SoundEnvironments.getSingleSoundObject().success(function(data){
      //         }).error(function(error) {
      //           console.log(error);
      //         })
      //         console.log(data);
      //     })
      //     .error(function(error){

      //       console.log("getEnvironments error: " + error);
      //     });
      // };

      // $scope.getEnvironments();

          $scope.playSound = function(path){
            console.log(path);
            SoundLogic.playSingleSoundNoAngle(path);
          }

          $scope.playViewEnvironment = function(envID){
              var soundFileIDs = [];
              var soundAngles = [];
              var sounds = [];

              SoundEnvironments.getSingleSoundEnvironment(envID)
                  .success(function(data){
                      var soundObjectIDs = data.data.soundObjectIDArray;

                      for(var i = 0; i < soundObjectIDs; i++){
                        SoundObjects.getSingleSoundObject(soundObjectIDs[i])
                            .success(function(data) {
                              soundAngles.push(data.data.angle);
                              soundFileIDs.push(data.data.soundFileID);
                            });
                      }


                  });

                for(var i=0; i < soundFileIDs; i++){
                  SoundFiles.getSingleSoundFile(soundFileIDs[i])
                      .success(function(data){
                        sounds.push(data.data.soundFileLocation);
                      })
                }


                SoundLogic.playEnvironment(sounds, soundAngles);

            };



  }]);



kaleControllers.controller('NavController', ['$scope', '$window', '$location', '$modal', 'UserAuth', function($scope, $window, $location, $modal, UserAuth) {

    // $scope.loggedin = sessionStorage.getItem('loggedin');
    $scope.$root.loggedin = false;

    $scope.accessUserData = function() {
        UserAuth.useToken().success(function(data) {
            $scope.$root.loggedin = true;
        }).error(function(error) {
            $scope.status = "soundTest UserAuth userToken error: " + error;
            console.log($scope.status);
        });
    }

    $scope.accessUserData();
    console.log("scope.loggedin: " + $scope.$root.loggedin);



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


                function run() {
                    // run this code

                    setTimeout(afterTwoSeconds, 500);
                }

                function afterTwoSeconds() {
                    // run this code two seconds after executing run.
                    if ($scope.$root.loggedin == true) {
                        console.log("after2: " + $scope.$root.loggedin);
                        $scope.cancel();
                    }
                }



                $scope.reposition = function() {
                    $modalInstance.reposition();
                };

                $scope.ok = function() {
                    $modalInstance.close($scope.selected.item);
                };

                $scope.cancel = function() {
                    $modalInstance.dismiss('cancel');
                };

                $scope.finished = function() {
                    // call run
                    run();

                    // if ($scope.$root.loggedin == true) {
                    //     $modalInstance.dismiss('cancel');
                    // }
                }
            }
        };

        var modalInstance = $modal.open(params);

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };


    $scope.logout = function() {
        console.log("Logout");
        // $cookieStore.remove("access-token");
        // $cookies.put('myFavorite', 'oatmeal');
        // $cookies.remove('access-token');
        UserAuth.logout();
        // sessionStorage.setItem('loggedin', false);
        $scope.$root.loggedin = false;
    }

    $scope.isEditView = true;

    $scope.toEditView = function() {
        $scope.isEditView = true;
    }

    $scope.toViewView = function() {
        $scope.isEditView = false;
    }

}]);



kaleControllers.controller('LoginController', ['$scope', '$window', 'UserAuth', function($scope, $window, UserAuth) {

    $scope.accessUserData = function() {
        UserAuth.useToken().success(function(data) {
            $scope.userData = data;
            // alert("Welcome " + data.username + " (" + data.email + ")");
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
        console.log("Login function called");
        UserAuth.login($scope.user).success(function(data) {
            $scope.token = data.token;
            console.log("UserAuth login success");
            console.log("Token: " + $scope.token);
            $scope.accessUserData();

            $scope.$root.closeModal = true;
            // sessionStorage.setItem('loggedin', true);
            $scope.$root.loggedin = true;
            console.log("loggedin: " + $scope.$root.loggedin);
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

            $scope.user = {
                username: $scope.newuser.username,
                password: $scope.newuser.password
            };

            $scope.login = function() {
                console.log("Login function called");
                UserAuth.login($scope.user).success(function(data) {
                    $scope.token = data.token;
                    console.log("UserAuth login success");
                    console.log("Token: " + $scope.token);


                    $scope.$root.loggedin = true;
                    console.log("signup loggedin: " + $scope.$root.loggedin);
                }).error(function(error) {
                    $scope.status = "SignUpController UserAuth login error: " + error.message;
                    console.log($scope.status);
                });
            }

            $scope.login();



        }).error(function(error) {
            $scope.status = "soundTest Users Signup error: " + error.message;
            console.log($scope.status);
        });
    }

}]);

kaleControllers.controller('LoadEnvironmentController', ['$scope', 'Users', '$window', 'SoundLogic', 'SoundEnvironments', 'UserAuth', function($scope, Users, $window, SoundLogic, SoundEnvironments, UserAuth) {

    if ($scope.userID == undefined) {
        $scope.userID = "";
    }
    $scope.accessUserData = function() {
        UserAuth.useToken().success(function(data) {
            $scope.userData = data;
            $scope.userID = $scope.userData._id;
        }).error(function(error) {
            $scope.status = "LoadEnvironmentController UserAuth userToken error: " + error;
            console.log($scope.status);
        });
    };
    console.log($scope.userID);
    $scope.accessUserData();

    $scope.getEnvironments = function() {
        if ($scope.userID != "") {
            Users.getSingleUser($scope.userID).success(function(data) {
                    $scope.soundEnvironments = data.data[0].soundEnvironmentIDArray;
                    console.log(data);
                })
                .error(function(error) {
                    console.log("Get environments fail: " + error);
                    console.log(error);
                });
        }
    };

    $scope.getEnvironments();

}]);

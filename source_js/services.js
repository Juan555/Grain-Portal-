var kaleServices = angular.module('kaleServices', []);

kaleServices.factory('CommonData', function() {
    var data = "";
    return {
        getData: function() {
            return data;
        },
        setData: function(newData) {
            data = newData;
        }
    }
});

kaleServices.factory('Llamas', function($http, $window) {
    return {
        get: function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/llamas');
        }
    }
});

kaleServices.factory('SoundLogic', function() {
    return {

        playSingleSoundNoAngle: function(sound) {

            var bufferLoader;
            var soundPath = sound;
            var volumeNum = typeof volume !== 'undefined' ? volume : 0.5;

            if ('AudioContext' in window) {
                var context = new(window.AudioContext || window.webkitAudioContext)();
                console.log("AudioContext created");

                bufferLoader = new BufferLoader(context, [soundPath], finishedLoading);
                bufferLoader.load();

            }

            function finishedLoading(bufferList) {
                var i;

                var source = context.createBufferSource();
                context.listener.setPosition(0, 0, 0);

                // source.loop = false;

                source.buffer = bufferList[0];

                var gainNode = context.createGain();
                gainNode.gain.value = volumeNum;

                source.connect(gainNode);
                gainNode.connect(context.destination);

                source.start(0);
                console.log("source start");
                // context.close();

            }

        },

        playEnvironment: function(sounds, angles, volumes) {

            var bufferLoader;
            var soundPathArray = sounds;
            var angleArray = angles;
            var volumeArray = typeof volumes !== 'undefined' ? volumes : [];

            if ('AudioContext' in window) {
                var context = new(window.AudioContext || window.webkitAudioContext)();
                console.log("AudioContext created");

                bufferLoader = new BufferLoader(context, soundPathArray, finishedLoading);
                bufferLoader.load();

            }

            function finishedLoading(bufferList) {
                var i;
                for (i = 0; i < bufferList.length; i++) {

                    var source = context.createBufferSource();
                    context.listener.setPosition(0, 0, 0);

                    source.loop = true;

                    source.buffer = bufferList[i];

                    var panner = context.createPanner();
                    // panner.coneOuterGain = 0.1;
                    mult = 5;
                    angle = angleArray[i];
                    if (angle < 0) {
                        angle += 360;
                    }
                    angle = angle % 360;

                    if (angle >= 0 && angle <= 45) {
                        //angle to rad
                        rad = angle * Math.PI / 180;
                        //determine sound position in 
                        x = Math.asin(rad);
                        y = Math.acos(rad);
                    } else if (angle > 45 && angle <= 90) {
                        angle = 90 - angle
                        rad = angle * Math.PI / 180;
                        x = Math.acos(rad);
                        y = Math.asin(rad);
                    } else if (angle > 90 && angle <= 135) {
                        angle = angle - 90;
                        rad = angle * Math.PI / 180;
                        x = Math.acos(rad);
                        y = -Math.asin(rad);
                    } else if (angle > 135 && angle <= 180) {
                        angle = 180 - angle;
                        rad = angle * Math.PI / 180;
                        x = Math.asin(rad);
                        y = -Math.acos(rad);
                    } else if (angle > 180 && angle <= 225) {
                        angle = angle - 180
                        rad = angle * Math.PI / 180;
                        x = -Math.asin(rad);
                        y = -Math.acos(rad);
                    } else if (angle > 225 && angle <= 270) {
                        angle = 270 - angle;
                        rad = angle * Math.PI / 180;
                        x = -Math.acos(rad);
                        y = -Math.asin(rad);
                    } else if (angle > 270 && angle <= 315) {
                        angle = angle - 270;
                        rad = angle * Math.PI / 180;
                        x = -Math.acos(rad);
                        y = Math.asin(rad);
                    } else if (angle > 315 && angle <= 360) {
                        angle = 360 - angle;
                        rad = angle * Math.PI / 180;
                        x = -Math.asin(rad);
                        y = Math.acos(rad);
                    } else {
                        console.log("Invalid angle");
                        return;
                    }

                    console.log("x is " + x);
                    console.log("y is " + y);

                    x *= mult;
                    y *= mult / 2;

                    panner.setPosition(x, y, -0.5);

                    source.connect(panner);
                    var gainNode = context.createGain();
                    if (volumeArray.length == 0) {
                        gainNode.gain.value = 0.5;

                    } else {
                        gainNode.gain.value = volumes[i];
                    }
                    panner.connect(gainNode);
                    gainNode.connect(context.destination);

                    source.start(0);
                    console.log("source start");
                }

            }

            // function loadSounds(obj, sounds, callback) {
            //  var name = [];
            //  var paths = [];
            //  for (var sound in sounds) {
            //      var path = sounds[name];
            //  }
            // }

        }
    }
});

kaleServices.factory('Users', function($http, $window) {
    return {
        get: function() {
            console.log("Users Service Attempt get GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/users');
        },
        newUser: function(newUserInfo) {
            console.log("Users Service Attempt newUser POST");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/users', newUserInfo);
        },
        deleteUser: function(userID) {
            console.log("Users Service Attempt deleteUser DELETE");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/users/' + userID);
        },
        getSingleUser: function(userID) {
            console.log("Users Service Attempt getSingleUser GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/users?where={"_id": "' + userID + '"}');
        },
        updateUser: function(updatedUserInfo) {
            console.log("Users Service Attempt updateUser PUT");
            // console.log("and user id is " + updatedUser._id);
            var baseUrl = $window.sessionStorage.baseurl;
            return $http({
                method: 'PUT',
                url: baseUrl + '/api/users/' + updatedUserInfo._id,
                data: updatedUserInfo
            });
        }
    }
});

kaleServices.factory('SoundObjects', function($http, $window) {
    return {
        get: function() {
            console.log("SoundObjects Service Attempt get GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/soundobjects');
        },
        newSoundObject: function(newSoundObjectInfo) {
            console.log("SoundObjects Service Attempt Users POST");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/soundobjects', newSoundObjectInfo);
        },
        deleteSoundObject: function(soundObjectID) {
            console.log("SoundObjects Service Attempt deleteSoundObject DELETE");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/soundobjects/' + soundObjectID);
        },
        getSingleSoundObject: function(soundObjectID) {
            console.log("SoundObjects Service Attempt getSingleSoundObject GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/soundobjects?where={"_id": "' + soundObjectID + '"}');
        },
        updateSoundObject: function(updatedSoundObjectInfo) {
            console.log("Users Service Attempt updateSoundObject PUT");
            // console.log("and user id is " + updatedUser._id);
            var baseUrl = $window.sessionStorage.baseurl;
            return $http({
                method: 'PUT',
                url: baseUrl + '/api/soundobjects/' + updatedSoundObjectInfo._id,
                data: updatedSoundObjectInfo
            });
        }
    }
});

kaleServices.factory('SoundFiles', function($http, $window) {
    return {
        get: function() {
            console.log("SoundFiles Service Attempt get GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/soundfiles');
        },
        newSoundFile: function(newSoundFileInfo) {
            console.log("SoundFiles Service Attempt newSoundFile POST");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/soundfiles', newSoundFileInfo);
        },
        deleteSoundFile: function(soundFileID) {
            console.log("SoundFiles Service Attempt deleteSoundFile DELETE");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/soundfiles/' + soundFileID);
        },
        getSingleSoundFile: function(soundFileID) {
            console.log("SoundFiles Service Attempt getSingleSoundFile GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/soundfiles?where={"_id": "' + soundFileID + '"}');
        },
        updateSoundFile: function(updatedSoundFileInfo) {
            console.log("SoundFiles Service Attempt updateSoundFile PUT");
            // console.log("and user id is " + updatedUser._id);
            var baseUrl = $window.sessionStorage.baseurl;
            return $http({
                method: 'PUT',
                url: baseUrl + '/api/soundfiles/' + updatedSoundFileInfo._id,
                data: updatedSoundFileInfo
            });
        }
    }
});

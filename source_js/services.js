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

kaleServices.factory('soundLogic', function() {
    return {
        start: function(sounds, angles) {

            var bufferLoader;
            var soundPathArray = sounds;
            var angleArray = angles;

            if ('AudioContext' in window) {
                var context = new(window.AudioContext || window.webkitAudioContext)();
                console.log("AudioContext created");

                bufferLoader = new BufferLoader(context, soundPathArray,
                    finishedLoading
                );

                bufferLoader.load();

            }

            function finishedLoading(bufferList) {
                var i;
                for (i = 0; i < bufferList.length; i++) {

                    var source = context.createBufferSource();
                    // var source2 = context.createBufferSource();
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

                    // source2.buffer = bufferList[1];



                    // source1.connect(context.destination);
                    // source2.connect(context.destination);
                    // panner.connect(context.destination);
                    source.connect(panner);

                    var gainNode = context.createGain();
                    gainNode.gain.value = 0.5;

                    panner.connect(gainNode);

                    gainNode.connect(context.destination);

                    source.start(0);
                    console.log("source start");
                    // source2.start(0);

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

kaleServices.factory('Llamas', function($http, $window) {
    return {
        get: function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/llamas');
        }
    }
});

kaleServices.factory('Users', function($http, $window) {
    return {
        get: function() {
            console.log("Users get");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/users');
        }
    }
});

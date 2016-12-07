var kaleServices = angular.module('kaleServices', []);

kaleServices.factory('SoundLogic', function($window) {
    return {

        playSingleSoundNoAngle: function(sound, time) {
            fx();
            var bufferLoader;
            var soundPath = sound;
            var volumeNum = typeof volume !== 'undefined' ? volume : 0.5;
            var time = typeof time !== 'undefined' ? time : 1000000;

            if ('AudioContext' in window) {
                var context = new(window.AudioContext || window.webkitAudioContext)();
                console.log("AudioContext created");

                bufferLoader = new BufferLoader(context, [soundPath], finishedLoading);
                bufferLoader.load();

            }

            function finishedLoading(bufferList) {

                var source = context.createBufferSource();
                context.listener.setPosition(0, 0, 0);

                source.loop = true;

                source.buffer = bufferList[0];

                var gainNode = context.createGain();
                gainNode.gain.value = volumeNum;

                source.connect(gainNode);
                gainNode.connect(context.destination);

                source.start(0);
                console.log("source start");
                // context.close();
            }

            function closeContext() {
                console.log('Closing AudioContext');
                context.close();
            }

            window.setTimeout(closeContext, time);

        },

        playEnvironment: function(sounds, angles, volumes, offset) {
            console.log("playEnvironment");
            var bufferLoader;
            var soundPathArray = sounds;
            var angleArray = angles;
            var volumeArray = typeof volumes !== 'undefined' ? volumes : [];
            var offset = typeof offset !== 'undefined' ? offset : 0;

            if ('AudioContext' in window) {
                var context = new(window.AudioContext || window.webkitAudioContext)();
                console.log("AudioContext created");

                bufferLoader = new BufferLoader(context, soundPathArray, finishedLoading);
                bufferLoader.load();

            }

            function finishedLoading(bufferList) {
                var i;
                var sourceArray = [];
                var pannerArray = [];
                for (i = 0; i < bufferList.length; i++) {

                    var source = context.createBufferSource();
                    sourceArray.push(source);
                    context.listener.setPosition(0, 0, 0);

                    source.loop = true;

                    source.buffer = bufferList[i];

                    var panner = context.createPanner();
                    pannerArray.push(panner);
                    // panner.coneOuterGain = 0.1;

                    coords = coordCalc(angleArray[i], offset);

                    var x = coords.x;
                    var y = coords.y;

                    panner.setPosition(x, y, -0.5);

                    source.connect(panner);
                    var gainNode = context.createGain();
                    if (volumeArray.length == 0) {
                        gainNode.gain.value = 0.5;

                    } else {
                        gainNode.gain.value = volumeArray[i];
                    }
                    panner.connect(gainNode);
                    gainNode.connect(context.destination);

                    source.start(0);
                    console.log("source start");

                }

                $('.stopSound').click(function() {
                    console.log("Closing AudioContext");
                    context.close();
                });

                $('.pauseSound').click(function() {
                    console.log("Pausing AudioContext");
                    context.suspend();
                });

                $('.resumeSound').click(function() {
                    console.log("Resuming AudioContext");
                    context.resume();
                });

                function offsetApply() {
                    console.log('offsetApply');
                    var offsetAngle = sessionStorage.getItem('offsetTestAngle');
                    console.log("SoundLogic playEnvironment offsetApply offsetTestAngle: " + offsetAngle);
                    var i;
                    for (i = 0; i < pannerArray.length; i++) {
                        var coords = coordCalc(parseInt(angleArray[i]), parseInt(offsetAngle));
                        pannerArray[i].setPosition(coords.x, coords.y, -0.5);
                    }

                }

                console.log("above offsetApply");

                // window.setInterval(offsetApply(), 100);
                window.setInterval(function(){
                    offsetApply();
                }, 100);



                function panoOffsetApply(y) {
                    console.log('offsetApply');
                    var offsetAngle = y;
                    console.log("SoundLogic playEnvironment offsetApply offsetTestAngle: " + offsetAngle);
                    var i;
                    for (i = 0; i < pannerArray.length; i++) {
                        // console.log(parseInt(angleArray[i]) + parseInt(offsetAngle));
                        var coords = coordCalc(parseInt(angleArray[i]), parseInt(offsetAngle));
                        pannerArray[i].setPosition(coords.x, coords.y, -0.5);
                    }

                }
                var intervalIRight;
                $('#myPano')


                .mousedown(function() {
                        intervalIRight = setInterval(function() {
                            var x = 3140 - localStorage.getItem("position_diff");
                            if (x < 0) {
                                y = (((3140 + (x % 3140)) * 18) / 157) % 360;
                                // console.log(y);
                            } else {
                                y = ((18 * x) / 157) % 360;

                            }

                            panoOffsetApply(y);

                        }, 250);

                    })
                    .mouseup(function() {
                        clearInterval(intervalIRight);
                    });


                // function testfx2() {
                //     console.log('testfx2');
                //     var coords = coordCalc(angleArray[0], 0);
                //     // this.panner.setOrientation(Math.cos(angle), -Math.sin(angle), 1);
                //     console.log(coords.x + " " + coords.y);
                //     context.listener.setOrientation(0.5, 0, -1, 0, 1, 0);

                // }






                // $("html").on("dragover", function(event) {
                //     event.preventDefault();
                //     event.stopPropagation();
                //     console.log('drag');
                // });

                // $('#myPano').ondrag = function(event) {
                //     console.log('drag');
                // };



            }

        },

        downloadEnvironmentAsWAV: function(sounds, angles, volumes, offset, length) {

            var bufferLoader;
            var soundPathArray = sounds;
            var angleArray = angles;
            var volumeArray = typeof volumes !== 'undefined' ? volumes : [];
            var offset = typeof offset !== 'undefined' ? offset : 0;
            var length = typeof length !== 'undefined' ? length : 5;

            if ('AudioContext' in window) {
                // var context = new(window.AudioContext || window.webkitAudioContext)();
                var context = new OfflineAudioContext(2, 44100 * length, 44100);

                console.log("AudioContext created");

                bufferLoader = new BufferLoader(context, soundPathArray, finishedLoading);
                bufferLoader.load();

            }

            function finishedLoading(bufferList) {
                var i;
                for (i = 0; i < bufferList.length; i++) {

                    var source = context.createBufferSource();
                    // var source = offlineCtx.createBufferSource();

                    context.listener.setPosition(0, 0, 0);

                    source.loop = true;

                    source.buffer = bufferList[i];

                    var panner = context.createPanner();
                    // panner.coneOuterGain = 0.1;

                    coords = coordCalc(angleArray[i], offset);

                    var x = coords.x;
                    var y = coords.y;

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
                    // gainNode.connect(offlineCtx.destination);


                    source.start(0);
                    console.log("source start");
                    context.startRendering().then(function(buffer) {
                        // buffer contains the output buffer
                        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
                        var song = audioCtx.createBufferSource();
                        // song.buffer = e.renderedBuffer;
                        song.buffer = buffer;

                        song.connect(audioCtx.destination);

                        // song.start();

                        // $.getScript('../bundle.js', function() {
                        //     console.log("Bundle.js load and execute");
                        // });

                        // START EXTERNAL LIBRARY CODE


                        (function e(t, n, r) {
                            function s(o, u) {
                                if (!n[o]) {
                                    if (!t[o]) {
                                        var a = typeof require == "function" && require;
                                        if (!u && a) return a(o, !0);
                                        if (i) return i(o, !0);
                                        var f = new Error("Cannot find module '" + o + "'");
                                        throw f.code = "MODULE_NOT_FOUND", f
                                    }
                                    var l = n[o] = { exports: {} };
                                    t[o][0].call(l.exports, function(e) {
                                        var n = t[o][1][e];
                                        return s(n ? n : e)
                                    }, l, l.exports, e, t, n, r)
                                }
                                return n[o].exports
                            }
                            var i = typeof require == "function" && require;
                            for (var o = 0; o < r.length; o++) s(r[o]);
                            return s
                        })({
                            1: [function(require, module, exports) {
                                module.exports = audioBufferToWav

                                function audioBufferToWav(buffer, opt) {
                                    opt = opt || {}

                                    var numChannels = buffer.numberOfChannels
                                    var sampleRate = buffer.sampleRate
                                    var format = opt.float32 ? 3 : 1
                                    var bitDepth = format === 3 ? 32 : 16

                                    var result
                                    if (numChannels === 2) {
                                        result = interleave(buffer.getChannelData(0), buffer.getChannelData(1))
                                    } else {
                                        result = buffer.getChannelData(0)
                                    }

                                    return encodeWAV(result, format, sampleRate, numChannels, bitDepth)
                                }

                                function encodeWAV(samples, format, sampleRate, numChannels, bitDepth) {
                                    var bytesPerSample = bitDepth / 8
                                    var blockAlign = numChannels * bytesPerSample

                                    var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample)
                                    var view = new DataView(buffer)

                                    /* RIFF identifier */
                                    writeString(view, 0, 'RIFF')
                                        /* RIFF chunk length */
                                    view.setUint32(4, 36 + samples.length * bytesPerSample, true)
                                        /* RIFF type */
                                    writeString(view, 8, 'WAVE')
                                        /* format chunk identifier */
                                    writeString(view, 12, 'fmt ')
                                        /* format chunk length */
                                    view.setUint32(16, 16, true)
                                        /* sample format (raw) */
                                    view.setUint16(20, format, true)
                                        /* channel count */
                                    view.setUint16(22, numChannels, true)
                                        /* sample rate */
                                    view.setUint32(24, sampleRate, true)
                                        /* byte rate (sample rate * block align) */
                                    view.setUint32(28, sampleRate * blockAlign, true)
                                        /* block align (channel count * bytes per sample) */
                                    view.setUint16(32, blockAlign, true)
                                        /* bits per sample */
                                    view.setUint16(34, bitDepth, true)
                                        /* data chunk identifier */
                                    writeString(view, 36, 'data')
                                        /* data chunk length */
                                    view.setUint32(40, samples.length * bytesPerSample, true)
                                    if (format === 1) { // Raw PCM
                                        floatTo16BitPCM(view, 44, samples)
                                    } else {
                                        writeFloat32(view, 44, samples)
                                    }

                                    return buffer
                                }

                                function interleave(inputL, inputR) {
                                    var length = inputL.length + inputR.length
                                    var result = new Float32Array(length)

                                    var index = 0
                                    var inputIndex = 0

                                    while (index < length) {
                                        result[index++] = inputL[inputIndex]
                                        result[index++] = inputR[inputIndex]
                                        inputIndex++
                                    }
                                    return result
                                }

                                function writeFloat32(output, offset, input) {
                                    for (var i = 0; i < input.length; i++, offset += 4) {
                                        output.setFloat32(offset, input[i], true)
                                    }
                                }

                                function floatTo16BitPCM(output, offset, input) {
                                    for (var i = 0; i < input.length; i++, offset += 2) {
                                        var s = Math.max(-1, Math.min(1, input[i]))
                                        output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
                                    }
                                }

                                function writeString(view, offset, string) {
                                    for (var i = 0; i < string.length; i++) {
                                        view.setUint8(offset + i, string.charCodeAt(i))
                                    }
                                }

                            }, {}],
                            2: [function(require, module, exports) {
                                // Citation: https://github.com/Jam3/audiobuffer-to-wav/blob/master/demo/index.js
                                // Requests and decodes an MP3 file
                                // Encodes the audio data as WAV
                                // Then triggers a download of the file

                                var abf = (function abfunction() {
                                    var bufferToWav = require('audiobuffer-to-wav')
                                    var audioContext = new(window.AudioContext || window.webkitAudioContext)()
                                    var anchor = document.createElement('a')
                                    document.body.appendChild(anchor)
                                    anchor.style = 'display: none'
                                    var wav = bufferToWav(song.buffer)
                                    var blob = new window.Blob([new DataView(wav)], {
                                        type: 'audio/wav'
                                    })
                                    var url = window.URL.createObjectURL(blob)
                                    anchor.href = url
                                    anchor.download = 'audio.wav'
                                    anchor.click()
                                    window.URL.revokeObjectURL(url)
                                })();

                            }, { "audiobuffer-to-wav": 1 }]
                        }, {}, [2]);

                        // END CODE

                        console.log("Buffer-to-file completed!");
                    });
                }

            }

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

kaleServices.factory('SoundEnvironments', function($http, $window) {
    return {
        getUserEnvironments: function(params) {
            console.log("SoundEnvironments Service Attempt getUserEnvironments");

            var baseUrl = $window.sessionStorage.baseurl;
            var combinedUrl = baseUrl + '/api/soundenvironments?';
            combinedUrl += 'where={"userID": "' + params.userID + '"}';

            return $http.get(combinedUrl);
        },
        get: function() {
            console.log("SoundEnvironments Service Attempt get GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/soundenvironments');
        },
        newSoundObject: function(newSoundEnvironmentInfo) {
            console.log("SoundEnvironments Service Attempt Users POST");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/soundenvironments', newSoundEnvironmentInfo);
        },
        deleteSoundObject: function(soundEnvironmentID) {
            console.log("SoundEnvironments Service Attempt deleteSoundEnvironment DELETE");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl + '/api/soundenvironments/' + soundEnvironmentID);
        },
        getSingleSoundObject: function(soundEnvironmentID) {
            console.log("SoundEnvironments Service Attempt getSingleSoundEnvironment GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/soundenvironments?where={"_id": "' + soundEnvironmentID + '"}');
        },
        updateSoundObject: function(updatedSoundEnvironmentInfo) {
            console.log("Users Service Attempt updateSoundEnvironment PUT");
            // console.log("and user id is " + updatedUser._id);
            var baseUrl = $window.sessionStorage.baseurl;
            return $http({
                method: 'PUT',
                url: baseUrl + '/api/soundenvironments/' + updatedSoundEnvironmentInfo._id,
                data: updatedSoundEnvironmentInfo
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

kaleServices.factory('UserAuth', function($http, $window) {
    return {
        //login requires username and password, returns token
        login: function(userCredentials) {
            console.log("UserAuth Service Attempt getToken (JWT) POST");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl + '/api/userauth', userCredentials);
        },
        //useToken does not require a token because magic fairy cookies
        useToken: function() {
            console.log("UserAuth Service Attempt userToken (JWT) GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http({
                method: 'GET',
                url: baseUrl + '/api/userauth'
            });
        },
        logout: function() {
            console.log("UserAuth Service Attempt logout (JWT) GET");
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl + '/api/userlogout');
        }
    }
});

var fx = function() {
    console.log('aloha');
}

var coordCalc = function(angleInput, offset) {
    console.log("Coordinate calculation start");

    mult = 5;
    angle = angleInput + offset;
    if (angle < 0) {
        angle += 360;
    }
    angle = angle % 360;

    if (angle >= 0 && angle <= 45) {
        //angle to rad
        rad = angle * Math.PI / 180;
        //determine sound position
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
        console.log("Invalid angle 1: " + angle);
        return;
    }

    // console.log("x is " + x);
    // console.log("y is " + y);

    x *= mult;
    y *= mult / 2;

    var coords = {
        x: x,
        y: y
    }

    return coords;
}

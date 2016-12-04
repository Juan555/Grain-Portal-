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

kaleServices.factory('SoundLogic', function($window) {
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

        playEnvironment: function(sounds, angles, volumes, offset) {

            var bufferLoader;
            var soundPathArray = sounds;
            var angleArray = angles;
            var volumeArray = typeof volumes !== 'undefined' ? volumes : [];
            var offset = typeof volumes !== 'undefined' ? offset : 0;

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
                    angle = angleArray[i] + offset;
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

        },

        playEnvironmentOffline: function(sounds, angles, volumes, offset) {

            var bufferLoader;
            var soundPathArray = sounds;
            var angleArray = angles;
            var volumeArray = typeof volumes !== 'undefined' ? volumes : [];
            var offset = typeof volumes !== 'undefined' ? offset : 0;

            if ('AudioContext' in window) {
                // var context = new(window.AudioContext || window.webkitAudioContext)();
                var context = new OfflineAudioContext(2, 44100 * 5, 44100);

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

                    // source.loop = true;

                    source.buffer = bufferList[i];

                    var panner = context.createPanner();
                    // panner.coneOuterGain = 0.1;
                    mult = 5;
                    angle = angleArray[i] + offset;
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
                    // gainNode.connect(offlineCtx.destination);


                    source.start(0);
                    console.log("source start");
                    context.startRendering().then(function(buffer) {
                        // buffer contains the output buffer
                        var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
                        // context.suspend(6);
                        var song = audioCtx.createBufferSource();
                        // song.buffer = e.renderedBuffer;
                        song.buffer = buffer;

                        song.connect(audioCtx.destination);

                        $('#testbutton4').click(function() {
                            // song.start();

                            // START EXTERNAL LIBRARY CODE

                            // $.getScript('../bundle.js', function() {
                            //     //script is loaded and executed put your dependent JS here
                            // });


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
                                    "use strict";
                                    var window = require("global/window")
                                    var isFunction = require("is-function")
                                    var parseHeaders = require("parse-headers")
                                    var xtend = require("xtend")

                                    module.exports = createXHR
                                    createXHR.XMLHttpRequest = window.XMLHttpRequest || noop
                                    createXHR.XDomainRequest = "withCredentials" in (new createXHR.XMLHttpRequest()) ? createXHR.XMLHttpRequest : window.XDomainRequest

                                    forEachArray(["get", "put", "post", "patch", "head", "delete"], function(method) {
                                        createXHR[method === "delete" ? "del" : method] = function(uri, options, callback) {
                                            options = initParams(uri, options, callback)
                                            options.method = method.toUpperCase()
                                            return _createXHR(options)
                                        }
                                    })

                                    function forEachArray(array, iterator) {
                                        for (var i = 0; i < array.length; i++) {
                                            iterator(array[i])
                                        }
                                    }

                                    function isEmpty(obj) {
                                        for (var i in obj) {
                                            if (obj.hasOwnProperty(i)) return false
                                        }
                                        return true
                                    }

                                    function initParams(uri, options, callback) {
                                        var params = uri

                                        if (isFunction(options)) {
                                            callback = options
                                            if (typeof uri === "string") {
                                                params = { uri: uri }
                                            }
                                        } else {
                                            params = xtend(options, { uri: uri })
                                        }

                                        params.callback = callback
                                        return params
                                    }

                                    function createXHR(uri, options, callback) {
                                        options = initParams(uri, options, callback)
                                        return _createXHR(options)
                                    }

                                    function _createXHR(options) {
                                        if (typeof options.callback === "undefined") {
                                            throw new Error("callback argument missing")
                                        }

                                        var called = false
                                        var callback = function cbOnce(err, response, body) {
                                            if (!called) {
                                                called = true
                                                options.callback(err, response, body)
                                            }
                                        }

                                        function readystatechange() {
                                            if (xhr.readyState === 4) {
                                                loadFunc()
                                            }
                                        }

                                        function getBody() {
                                            // Chrome with requestType=blob throws errors arround when even testing access to responseText
                                            var body = undefined

                                            if (xhr.response) {
                                                body = xhr.response
                                            } else {
                                                body = xhr.responseText || getXml(xhr)
                                            }

                                            if (isJson) {
                                                try {
                                                    body = JSON.parse(body)
                                                } catch (e) {}
                                            }

                                            return body
                                        }

                                        var failureResponse = {
                                            body: undefined,
                                            headers: {},
                                            statusCode: 0,
                                            method: method,
                                            url: uri,
                                            rawRequest: xhr
                                        }

                                        function errorFunc(evt) {
                                            clearTimeout(timeoutTimer)
                                            if (!(evt instanceof Error)) {
                                                evt = new Error("" + (evt || "Unknown XMLHttpRequest Error"))
                                            }
                                            evt.statusCode = 0
                                            return callback(evt, failureResponse)
                                        }

                                        // will load the data & process the response in a special response object
                                        function loadFunc() {
                                            if (aborted) return
                                            var status
                                            clearTimeout(timeoutTimer)
                                            if (options.useXDR && xhr.status === undefined) {
                                                //IE8 CORS GET successful response doesn't have a status field, but body is fine
                                                status = 200
                                            } else {
                                                status = (xhr.status === 1223 ? 204 : xhr.status)
                                            }
                                            var response = failureResponse
                                            var err = null

                                            if (status !== 0) {
                                                response = {
                                                    body: getBody(),
                                                    statusCode: status,
                                                    method: method,
                                                    headers: {},
                                                    url: uri,
                                                    rawRequest: xhr
                                                }
                                                if (xhr.getAllResponseHeaders) { //remember xhr can in fact be XDR for CORS in IE
                                                    response.headers = parseHeaders(xhr.getAllResponseHeaders())
                                                }
                                            } else {
                                                err = new Error("Internal XMLHttpRequest Error")
                                            }
                                            return callback(err, response, response.body)
                                        }

                                        var xhr = options.xhr || null

                                        if (!xhr) {
                                            if (options.cors || options.useXDR) {
                                                xhr = new createXHR.XDomainRequest()
                                            } else {
                                                xhr = new createXHR.XMLHttpRequest()
                                            }
                                        }

                                        var key
                                        var aborted
                                        var uri = xhr.url = options.uri || options.url
                                        var method = xhr.method = options.method || "GET"
                                        var body = options.body || options.data || null
                                        var headers = xhr.headers = options.headers || {}
                                        var sync = !!options.sync
                                        var isJson = false
                                        var timeoutTimer

                                        if ("json" in options && options.json !== false) {
                                            isJson = true
                                            headers["accept"] || headers["Accept"] || (headers["Accept"] = "application/json") //Don't override existing accept header declared by user
                                            if (method !== "GET" && method !== "HEAD") {
                                                headers["content-type"] || headers["Content-Type"] || (headers["Content-Type"] = "application/json") //Don't override existing accept header declared by user
                                                body = JSON.stringify(options.json === true ? body : options.json)
                                            }
                                        }

                                        xhr.onreadystatechange = readystatechange
                                        xhr.onload = loadFunc
                                        xhr.onerror = errorFunc
                                            // IE9 must have onprogress be set to a unique function.
                                        xhr.onprogress = function() {
                                            // IE must die
                                        }
                                        xhr.onabort = function() {
                                            aborted = true;
                                        }
                                        xhr.ontimeout = errorFunc
                                        xhr.open(method, uri, !sync, options.username, options.password)
                                            //has to be after open
                                        if (!sync) {
                                            xhr.withCredentials = !!options.withCredentials
                                        }
                                        // Cannot set timeout with sync request
                                        // not setting timeout on the xhr object, because of old webkits etc. not handling that correctly
                                        // both npm's request and jquery 1.x use this kind of timeout, so this is being consistent
                                        if (!sync && options.timeout > 0) {
                                            timeoutTimer = setTimeout(function() {
                                                if (aborted) return
                                                aborted = true //IE9 may still call readystatechange
                                                xhr.abort("timeout")
                                                var e = new Error("XMLHttpRequest timeout")
                                                e.code = "ETIMEDOUT"
                                                errorFunc(e)
                                            }, options.timeout)
                                        }

                                        if (xhr.setRequestHeader) {
                                            for (key in headers) {
                                                if (headers.hasOwnProperty(key)) {
                                                    xhr.setRequestHeader(key, headers[key])
                                                }
                                            }
                                        } else if (options.headers && !isEmpty(options.headers)) {
                                            throw new Error("Headers cannot be set on an XDomainRequest object")
                                        }

                                        if ("responseType" in options) {
                                            xhr.responseType = options.responseType
                                        }

                                        if ("beforeSend" in options &&
                                            typeof options.beforeSend === "function"
                                        ) {
                                            options.beforeSend(xhr)
                                        }

                                        xhr.send(body)

                                        return xhr


                                    }

                                    function getXml(xhr) {
                                        if (xhr.responseType === "document") {
                                            return xhr.responseXML
                                        }
                                        var firefoxBugTakenEffect = xhr.status === 204 && xhr.responseXML && xhr.responseXML.documentElement.nodeName === "parsererror"
                                        if (xhr.responseType === "" && !firefoxBugTakenEffect) {
                                            return xhr.responseXML
                                        }

                                        return null
                                    }

                                    function noop() {}

                                }, { "global/window": 3, "is-function": 4, "parse-headers": 7, "xtend": 8 }],
                                3: [function(require, module, exports) {
                                    (function(global) {
                                        if (typeof window !== "undefined") {
                                            module.exports = window;
                                        } else if (typeof global !== "undefined") {
                                            module.exports = global;
                                        } else if (typeof self !== "undefined") {
                                            module.exports = self;
                                        } else {
                                            module.exports = {};
                                        }

                                    }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
                                }, {}],
                                4: [function(require, module, exports) {
                                    module.exports = isFunction

                                    var toString = Object.prototype.toString

                                    function isFunction(fn) {
                                        var string = toString.call(fn)
                                        return string === '[object Function]' ||
                                            (typeof fn === 'function' && string !== '[object RegExp]') ||
                                            (typeof window !== 'undefined' &&
                                                // IE8 and below
                                                (fn === window.setTimeout ||
                                                    fn === window.alert ||
                                                    fn === window.confirm ||
                                                    fn === window.prompt))
                                    };

                                }, {}],
                                5: [function(require, module, exports) {
                                    var isFunction = require('is-function')

                                    module.exports = forEach

                                    var toString = Object.prototype.toString
                                    var hasOwnProperty = Object.prototype.hasOwnProperty

                                    function forEach(list, iterator, context) {
                                        if (!isFunction(iterator)) {
                                            throw new TypeError('iterator must be a function')
                                        }

                                        if (arguments.length < 3) {
                                            context = this
                                        }

                                        if (toString.call(list) === '[object Array]')
                                            forEachArray(list, iterator, context)
                                        else if (typeof list === 'string')
                                            forEachString(list, iterator, context)
                                        else
                                            forEachObject(list, iterator, context)
                                    }

                                    function forEachArray(array, iterator, context) {
                                        for (var i = 0, len = array.length; i < len; i++) {
                                            if (hasOwnProperty.call(array, i)) {
                                                iterator.call(context, array[i], i, array)
                                            }
                                        }
                                    }

                                    function forEachString(string, iterator, context) {
                                        for (var i = 0, len = string.length; i < len; i++) {
                                            // no such thing as a sparse string.
                                            iterator.call(context, string.charAt(i), i, string)
                                        }
                                    }

                                    function forEachObject(object, iterator, context) {
                                        for (var k in object) {
                                            if (hasOwnProperty.call(object, k)) {
                                                iterator.call(context, object[k], k, object)
                                            }
                                        }
                                    }

                                }, { "is-function": 4 }],
                                6: [function(require, module, exports) {

                                    exports = module.exports = trim;

                                    function trim(str) {
                                        return str.replace(/^\s*|\s*$/g, '');
                                    }

                                    exports.left = function(str) {
                                        return str.replace(/^\s*/, '');
                                    };

                                    exports.right = function(str) {
                                        return str.replace(/\s*$/, '');
                                    };

                                }, {}],
                                7: [function(require, module, exports) {
                                    var trim = require('trim'),
                                        forEach = require('for-each'),
                                        isArray = function(arg) {
                                            return Object.prototype.toString.call(arg) === '[object Array]';
                                        }

                                    module.exports = function(headers) {
                                        if (!headers)
                                            return {}

                                        var result = {}

                                        forEach(
                                            trim(headers).split('\n'),
                                            function(row) {
                                                var index = row.indexOf(':'),
                                                    key = trim(row.slice(0, index)).toLowerCase(),
                                                    value = trim(row.slice(index + 1))

                                                if (typeof(result[key]) === 'undefined') {
                                                    result[key] = value
                                                } else if (isArray(result[key])) {
                                                    result[key].push(value)
                                                } else {
                                                    result[key] = [result[key], value]
                                                }
                                            }
                                        )

                                        return result
                                    }
                                }, { "for-each": 5, "trim": 6 }],
                                8: [function(require, module, exports) {
                                    module.exports = extend

                                    var hasOwnProperty = Object.prototype.hasOwnProperty;

                                    function extend() {
                                        var target = {}

                                        for (var i = 0; i < arguments.length; i++) {
                                            var source = arguments[i]

                                            for (var key in source) {
                                                if (hasOwnProperty.call(source, key)) {
                                                    target[key] = source[key]
                                                }
                                            }
                                        }

                                        return target
                                    }

                                }, {}],
                                9: [function(require, module, exports) {
                                    // Citation: https://github.com/Jam3/audiobuffer-to-wav/blob/master/demo/index.js
                                    // Requests and decodes an MP3 file
                                    // Encodes the audio data as WAV
                                    // Then triggers a download of the file

                                    var abf = (function abfunction() {
                                        console.log('abfunction');

                                        var xhr = require('xhr')
                                        var bufferToWav = require('audiobuffer-to-wav')

                                        var audioContext = new(window.AudioContext || window.webkitAudioContext)()

                                        xhr({
                                            uri: './media/DubstepDrumLoop(140bpm).mp3',
                                            responseType: 'arraybuffer'
                                        }, function(err, body, resp) {
                                            if (err) throw err

                                            var anchor = document.createElement('a')
                                            document.body.appendChild(anchor)
                                            anchor.style = 'display: none'

                                            audioContext.decodeAudioData(resp, function(buffer) {
                                                var wav = bufferToWav(song.buffer)
                                                var blob = new window.Blob([new DataView(wav)], {
                                                    type: 'audio/wav'
                                                })

                                                var url = window.URL.createObjectURL(blob)
                                                anchor.href = url
                                                anchor.download = 'audio.wav'
                                                anchor.click()
                                                window.URL.revokeObjectURL(url)
                                            }, function() {
                                                throw new Error('Could not decode audio data.')
                                            })
                                        })

                                    })();

                                    // var doSomething = (function () {
                                    //   "use strict";
                                    //    return {
                                    //       test: (function () {
                                    //         return 'test';
                                    //       }()),
                                    //       test2: (function () {
                                    //         return console.log('test 2');
                                    //       })
                                    //    };
                                    // }());

                                    // function abf() {
                                    //     alert("aloha");
                                    //     console.log('stuff');
                                    //     return "hello";
                                    // }

                                }, { "audiobuffer-to-wav": 1, "xhr": 2 }]
                            }, {}, [9]);

                            // END CODE

                        });


                        console.log("completed!");
                    });
                }

            }

            // context.oncomplete = function(e) {
            //     // alert("lol");
            //     var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
            //     // context.suspend(6);
            //     var song = audioCtx.createBufferSource();
            //     song.buffer = e.renderedBuffer;

            //     song.connect(audioCtx.destination);

            //     $('#testbutton4').click(function() {
            //         song.start();
            //     });


            //     console.log("completed!");

            //     // abfunction();


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

kaleServices.factory('SoundEnvironments', function($http, $window) {
    return {
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
        }
    }
});

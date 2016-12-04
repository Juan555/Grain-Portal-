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
            var wav = bufferToWav(buffer)
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

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

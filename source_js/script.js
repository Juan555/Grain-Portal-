var main = function() {

    $('#testbutton1').click(function() {

        if ('AudioContext' in window) {
            var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
            console.log("AudioContext created");

            // var oscillator = audioCtx.createOscillator();
            // var gainNode = audioCtx.createGain();

            // oscillator.connect(gainNode);
            // gainNode.connect(audioCtx.destination);

            // oscillator.type = 'sine';
            // oscillator.frequency.value = 400;
            // oscillator.start();

            // function playSound(buffer) {
            // 	var source = audioCtx.createBufferSource();
            // 	source.buffer = buffer;
            // 	source.connect(context.destination);
            // 	console.og("source.start");
            // 	source.start(0);
            // }

            // loadSounds(this, {
            // 	buffer: 'sounds/position.wav'
            // });

            // bufferLoader = new BufferLoader(context,
            // 	[
            // 		''])

        }

    })

}

$(document).ready(main);

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API

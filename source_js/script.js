var main = function() {

    var bufferLoader;

    $('#testbutton1').click(function() {

        if ('AudioContext' in window) {
            var context = new(window.AudioContext || window.webkitAudioContext)();
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

            bufferLoader = new BufferLoader(context, [
                    '../media/DubstepDrumLoop(140bpm).mp3',
                    '../media/EDMloop95BPM.wav'
                ],
                finishedLoading
            );

            bufferLoader.load();

        }

        function finishedLoading(bufferList) {
            var source1 = context.createBufferSource();
            // var source2 = context.createBufferSource();
            context.listener.setPosition(0, 0, 0);

            source1.loop = true;

            source1.buffer = bufferList[0];

            var panner = context.createPanner();
            // panner.coneOuterGain = 0.1;
            mult = 5;
            angle = -45;
            //angle to rad
            rad = angle * Math.PI / 180;
            // rad = Math.PI/4;

            x = Math.asin(rad);
            y = Math.acos(rad);

            x *= mult * -1;
            y *= mult / 2;

            console.log("x is " + x);
            console.log("y is " + y);

            panner.setPosition(x, y, -0.5);

            // source2.buffer = bufferList[1];



            // source1.connect(context.destination);
            // source2.connect(context.destination);
            // panner.connect(context.destination);
            source1.connect(panner);

            var gainNode = context.createGain();
            gainNode.gain.value = 0.5;

            panner.connect(gainNode);

            gainNode.connect(context.destination);

            source1.start(0);
            // source2.start(0);

        }

        // function loadSounds(obj, sounds, callback) {
        // 	var name = [];
        // 	var paths = [];
        // 	for (var sound in sounds) {
        // 		var path = sounds[name];
        // 	}
        // }

    })

}

$(document).ready(main);

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API

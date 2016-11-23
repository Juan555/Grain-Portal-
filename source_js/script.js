var main = function() {

// if('AudioContext' in window) {
// 	var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
// 	console.log("AudioContext created");

// 	var oscillator = audioCtx.createOscillator();
// 	var gainNode = audioCtx.createGain();

// 	oscillator.connect(gainNode);
// 	gainNode.connect(audioCtx.destination);

// 	oscillator.type = 'sine';
// 	oscillator.frequency.value = 2500;
// 	oscillator.start();

// }

}

$(document).ready(main);

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API
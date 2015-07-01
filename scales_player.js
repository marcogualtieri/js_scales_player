var ScalesPlayer = ScalesPlayer || {};

(function (out) {

	try {
        context = new (AudioContext || webkitAudioContext);
    }
    catch(e) {
        alert('No web audio oscillator support in this browser');
    }

    // Note frequencies - starting from C3
    var noteFrequencies = [131, 139, 147, 156, 165, 175, 185, 196, 208, 220, 233, 247, 262, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494];
    
    // Scale steps  - 1: S, 2: T
    var scales = {
        'ionian': [2,2,1,2,2,2,1],
        'dorian': [2,1,2,2,2,1,2],
        'phrygian': [1,2,2,2,1,2,2],
        'lydian': [2,2,2,1,2,2,1],
        'mixolydian': [2,2,1,2,2,1,2],  
        'aeolian': [2,1,2,2,1,2,2],  
        'locrian': [1,2,2,1,2,2,2]
    };

	var Player = function(bpm, noteValue, noteIndex, scaleIndex, oscillatorType, repeatDescending) {
		// close current context (if any) and open a new one
        context.close();
        context = new AudioContext;

        var oscillator,
            t = context.currentTime,
            noteLength = 1/(bpm/60) * noteValue,
            scale = [0].concat(scales[scaleIndex]);

        if (repeatDescending) {
            for(var i=scale.length-1; i>0; i--) {
                scale.push(-scale[i]);
            }
        }

        for (var i = 0; i < scale.length; i++) {
            oscillator = context.createOscillator(); 
            oscillator.type = oscillatorType;
            noteIndex += scale[i];
            oscillator.frequency.value = noteFrequencies[noteIndex];
            oscillator.start(t);
            t += noteLength;
            oscillator.stop(t);
            oscillator.connect(context.destination);
        }
	};

	out.Player = Player;

}(ScalesPlayer));
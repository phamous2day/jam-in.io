window.onload = function () {
	MIDI.loadPlugin({
		soundfontUrl: "/soundfont/",
		instrument: "acoustic_grand_piano",
		onprogress: function(state, progress) {
			console.log(state, progress);
		},
		onsuccess: function() {
			var delay = 0; // play one note every quarter second
			var stopNote = 200;
			var note = 100; // the MIDI note
			var velocity = 127; // how hard the note hits
      function nextNote(){
        if(note === stopNote){
          return;
        }
        console.log("Playing note", note);
        // var velocity = 127; // how hard the note hits
        MIDI.setVolume(0, 127);
        MIDI.noteOn(0, note, velocity, delay);
        MIDI.noteOff(0, note, delay + 0.75);
        note++;
        setTimeout(function() {
            nextNote();
        }, 1000);
      }

			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);
		}
	});
};

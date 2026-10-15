
/**
 * T-05: Bind drum pads to clicks and keyboard events.
 * T-06: Record triggered drum events in a FIFO queue.
 * Audio playback remains delegated to AudioEngine.
 */

const drumPads = document.querySelectorAll(".drum-pad");

function playPad(pad, inputType) {
  const soundPath = pad.dataset.sound;
  const key = pad.dataset.key;

  if (!soundPath) {
    console.error("Drum pad is missing its data-sound attribute.");
    return;
  }

  AudioEngine.play(soundPath);

  BeatRecorder.record({
    key,
    sound: soundPath,
    input: inputType,
  });
}

drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    playPad(pad, "click");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  const pressedKey = event.key.toLowerCase();

  const matchingPad = Array.from(drumPads).find(
    (pad) => pad.dataset.key === pressedKey
  );

  if (!matchingPad) {
    return;
  }

  playPad(matchingPad, "keydown");
});

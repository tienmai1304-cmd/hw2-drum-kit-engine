
/**
 * T-05: Bind drum pads to clicks and keyboard events.
 * Audio playback remains delegated to AudioEngine.
 */

const drumPads = document.querySelectorAll(".drum-pad");

function playPad(pad) {
  const soundPath = pad.dataset.sound;

  if (!soundPath) {
    console.error("Drum pad is missing its data-sound attribute.");
    return;
  }

  AudioEngine.play(soundPath);
}

drumPads.forEach((pad) => {
  pad.addEventListener("click", () => {
    playPad(pad);
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

  playPad(matchingPad);
});

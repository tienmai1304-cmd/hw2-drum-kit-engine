
/**
 * T-04: Independent Polyphonic Audio Engine
 * Reads sound paths from the HTML data-sound contract.
 */

const AudioEngine = (() => {
  const activeAudios = new Set();

  function play(soundPath) {
    if (typeof soundPath !== "string" || soundPath.trim() === "") {
      console.error("AudioEngine: sound path is required.");
      return;
    }

    const audio = new Audio(soundPath);

    activeAudios.add(audio);

    audio.addEventListener(
      "ended",
      () => {
        activeAudios.delete(audio);
      },
      { once: true }
    );

    audio.addEventListener(
      "error",
      () => {
        activeAudios.delete(audio);
        console.error(`AudioEngine: failed to load "${soundPath}".`);
      },
      { once: true }
    );

    const playback = audio.play();

    if (playback && typeof playback.catch === "function") {
      playback.catch((error) => {
        activeAudios.delete(audio);
        console.error("AudioEngine: playback failed.", error);
      });
    }
  }

  function stopAll() {
    for (const audio of activeAudios) {
      audio.pause();
      audio.currentTime = 0;
    }

    activeAudios.clear();
  }

  return Object.freeze({
    play,
    stopAll
  });
})();

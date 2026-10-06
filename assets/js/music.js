document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");
  if (!music || !button) return;

  // The UI always follows the audio element itself, so it stays correct
  // whether playback was started by autoplay, the first interaction or the button
  const updateUI = () => {
    const isPlaying = !music.paused;
    button.classList.toggle("playing", isPlaying);
    button.classList.toggle("paused", !isPlaying);
    button.setAttribute("aria-pressed", isPlaying);
  };

  music.addEventListener("play", updateUI);
  music.addEventListener("playing", updateUI);
  music.addEventListener("pause", updateUI);
  music.addEventListener("ended", updateUI);

  // Browsers block sound until the visitor interacts with the page, so if
  // autoplay is refused, start on the first real interaction instead.
  // Only these count as a user gesture for audio (hover, scroll and
  // touchstart don't), and the listeners stay until playback really starts.
  const unlockEvents = ["pointerdown", "pointerup", "touchend", "click", "keydown"];
  let userPaused = false;

  const removeUnlock = () =>
    unlockEvents.forEach((type) => document.removeEventListener(type, onFirstInteraction, true));

  function onFirstInteraction(e) {
    // The music button handles its own click; don't start + immediately toggle it off
    if (button.contains(e.target)) return removeUnlock();
    if (userPaused || !music.paused) return removeUnlock();
    music.play().then(removeUnlock).catch(updateUI);
  }

  const tryAutoplay = () => {
    music
      .play()
      .then(removeUnlock)
      .catch(() => {
        updateUI();
        unlockEvents.forEach((type) =>
          document.addEventListener(type, onFirstInteraction, { capture: true, passive: true })
        );
      });
  };

  button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      userPaused = false;
      music.play().catch(updateUI);
    } else {
      userPaused = true;
      music.pause();
    }
  });

  music.addEventListener("error", () => {
    console.error("Error loading audio source");
    updateUI();
  });

  updateUI();
  tryAutoplay();
});

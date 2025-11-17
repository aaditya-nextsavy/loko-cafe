document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");

  // Function to update UI based on play state
  const updateUI = () => {
    const isPlaying = !music.paused;
    button.classList.toggle("playing", isPlaying);
    button.classList.toggle("paused", !isPlaying);
    button.setAttribute("aria-pressed", isPlaying);
  };

  // Try to autoplay audio
  const tryPlay = () => {
    music.play()
      .then(() => {
        console.log("Autoplay succeeded");
        updateUI();
      })
      .catch((err) => {
        console.log("Autoplay blocked:", err);
        updateUI(); // Keep icon in paused state
      });
  };

  // Try autoplay as soon as page loads
  tryPlay();

  // On any user interaction, retry autoplay once
  document.body.addEventListener("click", tryPlay, { once: true });
  document.body.addEventListener("mouseenter", tryPlay, { once: true });

  // Music toggle button logic
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (music.paused) {
      music.play().then(updateUI);
    } else {
      music.pause();
      updateUI();
    }
  });

  // Handle error gracefully
  music.onerror = () => {
    console.error("Error loading audio source");
    button.classList.add("paused");
    button.classList.remove("playing");
  };
});

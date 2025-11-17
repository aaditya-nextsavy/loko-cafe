document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bg-music");
  const button = document.getElementById("music-toggle");

  button.classList.add("playing");

  const updateUI = () => {
    const isPlaying = !music.paused;
    button.classList.toggle("playing", isPlaying);
    button.classList.toggle("paused", !isPlaying);
    button.setAttribute("aria-pressed", isPlaying);
  };

  const tryPlay = () => {
    music.play()
      .then(updateUI)
      .catch(() => {
        console.log("Autoplay blocked — waiting for user interaction");
      });
  };

  tryPlay(); 

  document.body.addEventListener("click", tryPlay, { once: true });

  button.addEventListener("click", () => {
    if (music.paused) {
      music.play().then(updateUI);
    } else {
      music.pause();
      updateUI();
    }
  });

  music.onerror = () => {
    console.error("Error loading audio");
    button.classList.add("paused");
    button.classList.remove("playing");
  };
});

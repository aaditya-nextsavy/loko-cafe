document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bg-music");
    const button = document.getElementById("music-toggle");

    const updateUI = () => {
        const isPlaying = !music.paused;
        button.classList.toggle("playing", isPlaying);
        button.classList.toggle("paused", !isPlaying);
        button.setAttribute("aria-pressed", isPlaying);
    };

    // Try autoplay
    music.play()
        .then(updateUI)
        .catch(() => {
            console.log("Autoplay blocked — waiting for user interaction");
            updateUI();
        });

    // Toggle play/pause on click
    button.addEventListener("click", () => {
        if (music.paused) {
            music.play().then(updateUI);
        } else {
            music.pause();
            updateUI();
        }
    });

    // Optional: handle audio load errors
    music.onerror = () => {
        console.error("Error loading audio");
        button.classList.add("paused");
        button.classList.remove("playing");
    };
});

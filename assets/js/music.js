document.addEventListener("DOMContentLoaded", () => {
    const music = document.getElementById("bg-music");
    const button = document.getElementById("music-toggle");

    // Try autoplay
    const tryPlay = () => {
        music.play()
            .then(() => {
                button.classList.add("playing");
                button.classList.remove("paused");
            })
            .catch(() => {
                console.log("Autoplay blocked — waiting for user interaction");
                button.classList.add("paused");
            });
    };

    tryPlay();

    button.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            button.classList.add("playing");
            button.classList.remove("paused");
        } else {
            music.pause();
            button.classList.add("paused");
            button.classList.remove("playing");
        }
    });
});

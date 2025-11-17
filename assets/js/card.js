document.addEventListener("DOMContentLoaded", () => {
    const card = document.getElementById("tilt-card");

    const isMobile = window.matchMedia("(max-width: 1080px)").matches;
    if (isMobile) return;

    const rotationLimit = 35; 

    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) - 0.5;
        const yPercent = (y / rect.height) - 0.5;

        const rotateX = yPercent * rotationLimit;      
        const rotateY = xPercent * rotationLimit * -1;

        card.style.transform = `
            perspective(600px)  /* closer perspective → more depth */
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.06)
        `;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
    });
});

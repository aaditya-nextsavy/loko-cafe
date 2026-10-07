document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector(".embla");
  if (!root || typeof EmblaCarousel === "undefined") return;

  const viewport = root.querySelector(".embla__viewport");
  const prevBtn = root.querySelector(".embla__button--prev");
  const nextBtn = root.querySelector(".embla__button--next");
  const progressBar = root.querySelector(".embla__progress-bar");

  const embla = EmblaCarousel(viewport, {
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
    duration: 32,
  });

  // Progress: the bar always shows at least one "step" so it never looks empty
  const updateProgress = () => {
    const steps = Math.max(embla.scrollSnapList().length, 1);
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    const fill = 1 / steps + progress * (1 - 1 / steps);
    progressBar.style.transform = `scaleX(${fill})`;
  };

  const updateButtons = () => {
    prevBtn.disabled = !embla.canScrollPrev();
    nextBtn.disabled = !embla.canScrollNext();
    root.classList.toggle("is-static", !embla.canScrollPrev() && !embla.canScrollNext());
  };

  prevBtn.addEventListener("click", () => embla.scrollPrev());
  nextBtn.addEventListener("click", () => embla.scrollNext());

  embla
    .on("init", () => { updateProgress(); updateButtons(); })
    .on("reInit", () => { updateProgress(); updateButtons(); })
    .on("scroll", updateProgress)
    .on("select", updateButtons);

  updateProgress();
  updateButtons();

  // CARD FLIP
  // Hover devices flip with CSS :hover. Touch devices flip on tap.
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const cards = root.querySelectorAll(".loc-card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (canHover.matches) return;
      // Let links on the back side work without flipping the card back
      if (e.target.closest("a") && card.classList.contains("is-flipped")) return;
      if (e.target.closest("a")) e.preventDefault();

      const willFlip = !card.classList.contains("is-flipped");
      cards.forEach((c) => c.classList.remove("is-flipped"));
      card.classList.toggle("is-flipped", willFlip);
    });

    card.addEventListener("keydown", (e) => {
      if (e.target !== card || (e.key !== "Enter" && e.key !== " ")) return;
      e.preventDefault();
      card.classList.toggle("is-flipped");
    });
  });
});

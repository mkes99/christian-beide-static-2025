export function initBackToTop() {
  const button = document.querySelector(".backToTop");
  if (!button) return;
  const update = () => {
    button.hidden = window.scrollY <= 100;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
}

const ARROW_LEFT =
  '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M15 4 7 12l8 8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ARROW_RIGHT =
  '<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="m9 4 8 8-8 8" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CLOSE =
  '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>';
const SWIPE_DISTANCE = 50;

function button(className, label, html) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = `lightboxBtn ${className}`;
  el.setAttribute("aria-label", label);
  el.innerHTML = html;
  return el;
}

export function initLightbox() {
  const links = [...document.querySelectorAll("a.galleryLink")];
  if (!links.length) return;

  const root = document.createElement("div");
  root.className = "lightbox";
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("aria-label", "Image viewer");
  root.hidden = true;

  const stage = document.createElement("div");
  stage.className = "lightboxStage";
  const image = document.createElement("img");
  image.className = "lightboxImage";
  image.alt = "";
  const caption = document.createElement("p");
  caption.className = "lightboxCaption";
  const status = document.createElement("p");
  status.className = "lightboxStatus";
  status.setAttribute("aria-live", "polite");
  const prev = button("lightboxPrev", "Previous image", ARROW_LEFT);
  const next = button("lightboxNext", "Next image", ARROW_RIGHT);
  const close = button("lightboxClose", "Close", CLOSE);
  stage.append(image, caption);
  root.append(stage, prev, next, close, status);
  document.body.append(root);

  let index = 0;
  let opener = null;

  const preload = (i) => {
    const src = links[(i + links.length) % links.length].href;
    new Image().src = src;
  };

  function show(i) {
    index = (i + links.length) % links.length;
    const link = links[index];
    image.classList.add("isLoading");
    image.onload = () => image.classList.remove("isLoading");
    image.src = link.href;
    const thumb = link.querySelector("img");
    image.alt = (thumb && thumb.alt) || link.title || "";
    caption.textContent = link.title || "";
    status.textContent = `${index + 1} / ${links.length}`;
    const single = links.length < 2;
    prev.hidden = next.hidden = single;
    preload(index + 1);
    preload(index - 1);
  }

  function open(i, trigger) {
    opener = trigger;
    root.hidden = false;
    document.documentElement.classList.add("lightboxOpen");
    show(i);
    close.focus();
  }

  function dismiss() {
    root.hidden = true;
    image.removeAttribute("src");
    document.documentElement.classList.remove("lightboxOpen");
    if (opener) opener.focus();
  }

  links.forEach((link, i) => {
    link.addEventListener("click", (event) => {
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.button !== 0
      )
        return;
      event.preventDefault();
      open(i, link);
    });
  });

  prev.addEventListener("click", () => show(index - 1));
  next.addEventListener("click", () => show(index + 1));
  close.addEventListener("click", dismiss);
  root.addEventListener("click", (event) => {
    if (event.target === root || event.target === stage) dismiss();
  });

  document.addEventListener("keydown", (event) => {
    if (root.hidden) return;
    if (event.key === "Escape") dismiss();
    else if (event.key === "ArrowLeft") show(index - 1);
    else if (event.key === "ArrowRight") show(index + 1);
    else if (event.key === "Tab") {
      const focusable = [...root.querySelectorAll("button:not([hidden])")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  let startX = null;
  stage.addEventListener("pointerdown", (event) => {
    startX = event.clientX;
  });
  stage.addEventListener("pointerup", (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) > SWIPE_DISTANCE) show(index + (dx < 0 ? 1 : -1));
  });
  stage.addEventListener("pointercancel", () => {
    startX = null;
  });
}

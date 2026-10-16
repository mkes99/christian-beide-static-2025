const HIDE_DELAY = 300;
const FADE_MS = 200;

function showSubmenu(item, submenu) {
  clearTimeout(item._hideTimer);
  if (item.classList.contains("isHover")) return;
  item.classList.add("isHover");
  submenu.style.display = "block";
  submenu.animate({ opacity: [0, 1] }, { duration: FADE_MS, easing: "ease" });
}

function hideSubmenu(item, submenu) {
  clearTimeout(item._hideTimer);
  item._hideTimer = setTimeout(() => {
    item.classList.remove("isHover");
    submenu.style.display = "";
  }, HIDE_DELAY);
}

function initDesktopMenu() {
  document.querySelectorAll(".siteNav li").forEach((item) => {
    const submenu = item.querySelector(":scope > .subMenu");
    if (!submenu) return;
    item.addEventListener("mouseenter", () => showSubmenu(item, submenu));
    item.addEventListener("mouseleave", () => hideSubmenu(item, submenu));
    item.addEventListener("focusin", () => showSubmenu(item, submenu));
    item.addEventListener("focusout", (event) => {
      if (!item.contains(event.relatedTarget)) hideSubmenu(item, submenu);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      clearTimeout(item._hideTimer);
      item.classList.remove("isHover");
      submenu.style.display = "";
    });
  });
}

function slideToggle(el, ms = 300) {
  const opening = getComputedStyle(el).display === "none";
  if (el._slide) el._slide.cancel();
  if (opening) el.style.display = "block";
  const full = el.scrollHeight;
  el.style.overflow = "hidden";
  const frames = opening
    ? [{ height: "0px" }, { height: full + "px" }]
    : [{ height: full + "px" }, { height: "0px" }];
  el._slide = el.animate(frames, { duration: ms, easing: "ease-out" });
  el._slide.onfinish = () => {
    el.style.overflow = "";
    el.style.display = opening ? "block" : "";
    el._slide = null;
  };
}

function initMobileMenu() {
  const button = document.getElementById("mobileToggle");
  const nav = document.getElementById("mobileNav");
  if (!button || !nav) return;
  button.setAttribute("aria-controls", "mobileNav");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-label", "Menu");
  button.addEventListener("click", (event) => {
    event.preventDefault();
    slideToggle(nav);
    button.setAttribute(
      "aria-expanded",
      String(getComputedStyle(nav).display === "none"),
    );
  });
  window
    .matchMedia("(min-width: 1201px)")
    .addEventListener("change", (event) => {
      if (!event.matches) return;
      [nav, ...nav.querySelectorAll("li.hasSub > .subMenu")].forEach((el) => {
        if (el._slide) el._slide.cancel();
        el.style.display = "";
        el.style.overflow = "";
      });
      nav.querySelectorAll("li.isOpen").forEach((item) => {
        item.classList.remove("isOpen");
        item.querySelector(":scope > a").setAttribute("aria-expanded", "false");
      });
      button.setAttribute("aria-expanded", "false");
    });
  nav.querySelectorAll("li.hasSub > a").forEach((link) => {
    link.setAttribute("aria-expanded", "false");
    link.addEventListener("click", (event) => {
      const onIcon = event.target.closest("i");
      if (!onIcon && link.getAttribute("href") !== "#") return;
      event.preventDefault();
      const item = link.closest("li");
      const open = item.classList.toggle("isOpen");
      link.setAttribute("aria-expanded", String(open));
      slideToggle(item.querySelector(":scope > ul"));
    });
  });
}

export function initMenus() {
  initDesktopMenu();
  initMobileMenu();
}

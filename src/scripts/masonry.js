const STAGGER_MS = 40;
const MAX_DELAY_MS = 600;
const FADE_MS = 200;

// Places each item in the shortest column, like a masonry grid.
function layout(container, items) {
  items.forEach((item) => {
    item.style.position = "";
    item.style.left = "";
    item.style.top = "";
  });
  const columnWidth = items[0].getBoundingClientRect().width;
  const columns = Math.max(
    1,
    Math.floor(container.clientWidth / columnWidth + 0.01),
  );
  const heights = new Array(columns).fill(0);
  const placements = items.map((item) => {
    const marginBottom = parseFloat(getComputedStyle(item).marginBottom) || 0;
    const height = item.getBoundingClientRect().height + marginBottom;
    const column = heights.indexOf(Math.min(...heights));
    const placement = { left: column * columnWidth, top: heights[column] };
    heights[column] += height;
    return placement;
  });
  container.style.position = "relative";
  items.forEach((item, i) => {
    item.style.position = "absolute";
    item.style.left = placements[i].left + "px";
    item.style.top = placements[i].top + "px";
  });
  container.style.height = Math.max(...heights) + "px";
}

export function initMasonry() {
  document.querySelectorAll(".gallery").forEach((container) => {
    const items = [...container.querySelectorAll(".galleryItem")];
    if (!items.length) return;
    const run = () => layout(container, items);
    run();
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    items.forEach((item, i) => {
      item.style.visibility = "visible";
      if (animate) {
        item.animate(
          { opacity: [0, 1] },
          {
            duration: FADE_MS,
            delay: Math.min(i * STAGGER_MS, MAX_DELAY_MS),
            fill: "backwards",
          },
        );
      }
    });
    let width = container.clientWidth;
    new ResizeObserver(() => {
      if (container.clientWidth === width) return;
      width = container.clientWidth;
      run();
    }).observe(container);
    window.addEventListener("load", run);
  });
}

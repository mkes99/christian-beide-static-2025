import blackAndGray from "@/assets/home/black-and-gray.jpg";
import color from "@/assets/home/color.jpg";
import realism from "@/assets/home/realism.jpg";
import coverUps from "@/assets/home/cover-ups.jpg";

/**
 * One entry per gallery page. `slug` is both the URL (/slug/) and the folder of
 * photos under src/assets/gallery/. Photos show in filename order.
 */
export const galleries = [
  { slug: "blackandgray", title: "Black and Gray", cover: blackAndGray },
  { slug: "color", title: "Color", cover: color },
  { slug: "realism", title: "Realism", cover: realism },
  { slug: "cover-ups", title: "Cover-Ups", cover: coverUps },
];

import { galleries } from "@/data/galleries";

export interface NavLink {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "The Process", href: "/the-process/" },
  {
    label: "Galleries",
    children: galleries.map((gallery) => ({
      label: gallery.title,
      href: `/${gallery.slug}/`,
    })),
  },
  { label: "Contact", href: "/contact/" },
];

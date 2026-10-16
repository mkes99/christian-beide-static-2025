import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://christianbiede.com",
  integrations: [sitemap()],
  trailingSlash: "always",
  compressHTML: false,
  markdown: { gfm: false },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Oswald",
      cssVariable: "--fontOswald",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Open Sans",
      cssVariable: "--fontOpenSans",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
  build: { format: "directory" },
});

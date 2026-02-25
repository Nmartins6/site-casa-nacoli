import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://nmartins6.github.io",
  base: "/site-casa-nacoli/",
  integrations: [
    react({ experimentalReactChildren: true }),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    },
  },
});
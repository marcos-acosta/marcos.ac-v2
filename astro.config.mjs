// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkRehype: {
      footnoteBackContent: "↩\uFE0E", // Use text variation selector to prevent emoji rendering on iOS
    },
  },
});

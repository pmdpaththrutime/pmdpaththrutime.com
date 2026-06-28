import { defineConfig } from "astro/config";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

import { WEBSITE_ROOT_URL } from "./src/constants";

export default defineConfig({
  integrations: [icon(), sitemap(), react()],
  site: WEBSITE_ROOT_URL,
  compressHTML: true,
});

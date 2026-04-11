import { defineConfig } from "astro/config";

import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

import { WEBSITE_ROOT_URL } from "./src/constants";

export default defineConfig({
  integrations: [icon(), sitemap()],
  site: WEBSITE_ROOT_URL,
});
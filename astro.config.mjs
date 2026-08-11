// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
 	i18n: {
    locales: ["fr", "en"],
		defaultLocale: "en",
		routing : {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true
  	}
 	},
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Kufam",
      cssVariable: "--font-kufam",
      fallbacks: ["sans-serif"],
      weights: [600, 700],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Lexend",
      cssVariable: "--font-lexend",
      fallbacks: ["sans-serif"],
      weights: [400, 500],
    },
    {
      provider: fontProviders.fontsource(),
      name: "Akaya Telivigala",
      cssVariable: "--font-akaya",
      fallbacks: ["serif"],
    },
  ],

  integrations: [sitemap()],
});

import { defineConfig, fontProviders } from "astro/config";

import sitemap from "@astrojs/sitemap";
import { getEnv } from "astro/env/runtime";

// https://astro.build/config
export default defineConfig({
	i18n: {
		locales: ["fr", "en"],
		defaultLocale: "en",
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true,
		},
	},
	site: getEnv("SITE_URL"),
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
	vite: {
		build: {
			cssMinify: "esbuild", // "lightningcss" not compatible with deno sadly
		},
	},

	integrations: [
		sitemap({
			i18n: { defaultLocale: "en", locales: ["fr", "en"] },
			customPages: [`${getEnv("SITE_URL")}/robots.txt`],
		}),
	],
});

import { describe, expect, test } from "vitest";
import { experimental_AstroContainer } from "astro/container";
import Header from "@components/header.astro";
import { getThemesNames } from "@utils/themes"
import defineConfig from "../astro.config.mjs"

describe("Header.astro test", async () => {
 	const container = await experimental_AstroContainer.create();
	const result = await container.renderToString(Header);

	const parser = new DOMParser();
	const document = parser.parseFromString(result, "text/html")

	test("Languages all showing up in <select>", () => {
		const nLangConfig = defineConfig.i18n?.locales.length;
		const nLangDoc = document.getElementsByTagName("[data-theme-selection]")![0].childElementCount;

		expect(nLangConfig).toEqual(nLangDoc);
	})

	test("Languages all showing up in <select>", () => {
		const nLangConfig = defineConfig.i18n?.locales.length;
		const nLangDoc = document.querySelector("[data-lang-selection]")!.childElementCount;

		expect(nLangConfig).toEqual(nLangDoc);
	})

	test("Themes all showing up in <select>", () => {
		const nThemeConfig = getThemesNames.length;
		const nThemeDoc = document.querySelector("[data-theme-selection]")!.childElementCount;

		expect(nThemeConfig).toEqual(nThemeDoc);
	})
})

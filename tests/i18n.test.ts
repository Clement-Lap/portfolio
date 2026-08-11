import { describe, expect, it, test } from "vitest";
import { getLangFromUrl, useTranslations } from "../src/i18n/utils"
import { languages, defaultLang } from "../src/i18n/ui"
import { type AstroCookies } from "astro";
import type { ui } from "../src/i18n/ui";

describe("i18n test", () => {
	test("URL parameter for language parsing", () => {
		const examples = {
			"https://www.example.com/?lang=en": "en",
			"https://www.example.com/?lang=fr&lang=en": "fr",
			"https://www.example.com/?lang=en&lang=fr": "en",
			"https://www.example.com/?lang=de": null,
			"https://www.example.com/lang=fr": null
		}

		for (const [ex, res] of Object.entries(examples)) {
			expect(getLangFromUrl(URL.parse(ex)!)).toBe(res);
		}
	});

	test("Cookie for language", () => {
		// ADD: test for cookies usin
		expect(1).toBe(1);
	})

	test("Translation accuracy between English and French", () => {
		const names: (keyof (typeof ui)[typeof defaultLang])[] = [
			"header.home",
			"header.about",
			"header.projects",
			"header.blog"
		]

		const englishExamples = [
			"Home",
			"About",
			"Projects",
			"Blog",
		]

		const frenchExamples = [
			"Accueil",
			"À propos",
			"Projets",
			"Blog",
		]
		// test the test itself lol
		expect(englishExamples.length).toBe(frenchExamples.length);
		expect(englishExamples.length).toBe(names.length);

		const size = Object.keys(englishExamples).length;


		let t = useTranslations("en");
		for (let i = 0; i < size; i++) {
			expect(t(names[i])).toBe(englishExamples[i])
		}

		t = useTranslations("fr");
		for (let i = 0; i < size; i++) {
			expect(t(names[i])).toBe(frenchExamples[i])
		}
	})
})

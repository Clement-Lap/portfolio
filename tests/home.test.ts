import { describe, expect, test } from "vitest";
import { experimental_AstroContainer } from "astro/container";
import EnglishHomePage from "@pages/fr/index.astro";
import FrenchHomePage from "@pages/en/index.astro";

describe("Home page test", async () => {
	const container = await experimental_AstroContainer.create();
	const enHomePage = await container.renderToString(EnglishHomePage);
	const frHomePage = await container.renderToString(FrenchHomePage);

	const parser = new DOMParser();
	const enHomePageHTML = parser.parseFromString(enHomePage, "text/html")
	const frHomePageHTML = parser.parseFromString(frHomePage, "text/html")

	test("Does translation only change the text", () => {
		const totalEnglishElement = enHomePageHTML.querySelectorAll("*").length
		const totalFrenchElement = frHomePageHTML.querySelectorAll("*").length

		expect(totalEnglishElement).toEqual(totalFrenchElement);
	})
})

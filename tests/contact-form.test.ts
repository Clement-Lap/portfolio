import { experimental_AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";
import ContactForm from "../src/components/contact-form.astro";

describe("Components test", () => {
  test("Contact form test", async () => {
    const container = await experimental_AstroContainer.create();
		const result = await container.renderToString(ContactForm);

		const labelTags = result.split(">").filter((slice) => slice.startsWith("<label")).length
		const inputTags = result.split(">").filter((slice) => slice.startsWith("<input") || slice.startsWith("<textarea")).length

		// do all images have alt text
		expect(labelTags).toEqual(inputTags);
  });
});

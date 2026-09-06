import { experimental_AstroContainer } from "astro/container";
import { describe, expect, test } from "vitest";
import ContactForm from "@components/contact-form.astro";

describe("Contact-form.astro test", () => {
  test("Each input have labels", async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(ContactForm);

    const labelTags =
      result.split(">").filter((slice) => slice.startsWith("<label")).length;
    const inputTags =
      result.split(">").filter((slice) =>
        slice.startsWith("<input") || slice.startsWith("<textarea")
      ).length;

		expect(labelTags).toEqual(inputTags);
  });
});

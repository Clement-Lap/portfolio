import { expect, describe, test } from "vitest"
import { experimental_AstroContainer } from "astro/container";
import Cursor from "../src/components/cursor.astro"

describe("Component test", () => {
	test("Cursor component", async () => {
		const container = await experimental_AstroContainer.create();
		const result = await container.renderToString(Cursor);

		expect(result).not.toContain("<div class=\"cursor\"><div>")
	})
})

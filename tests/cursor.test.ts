import { describe, expect, test } from "vitest";
import { experimental_AstroContainer } from "astro/container";
import Cursor from "@components/cursor.astro";

describe("Cursor test", () => {
  test("No HTML sent by default", async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Cursor);

    expect(result).not.toContain('<div class="cursor"><div>');
  });
});

import { experimental_AstroContainer } from "astro/container";
import { describe, expect, it, test } from "vitest";
import Caroussel from "../src/components/caroussel.astro";

describe("Components test", () => {
  test("Caroussel test", async () => {
    const container = await experimental_AstroContainer.create();
    const result = await container.renderToString(Caroussel);

    // check if the right images are loaded
    expect(result, "have image 1").toContain("angry-clem.png");
    expect(result, "have image 2").toContain("clem-n-cat.png");
    expect(result, "have image 3").toContain("dumb-cat.png");
    expect(result, "have image 4").toContain("evil-cat.png");
    expect(result, "have image 5").toContain("glorious-cat.png");

    // check if the alternative text is here
    expect(result, "have image 1 alt").toContain('alt="Little me, angry me."');
    expect(result, "have image 2 alt").toContain('alt="Me holding a long cat."');
    expect(result, "have image 3 alt").toContain('alt="My dumb cat."');
    expect(result, "have image 4 alt").toContain('alt="My evil cat."');
    expect(result, "have image 5 alt").toContain('alt="She looks like Batman."');
  });
});

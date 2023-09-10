import { takeScreenshot } from "@/utils/screenshot";

describe("Screenshot", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <main class="outer">
          <section id="middle" class="middle">
            <article class="inner super-inner">Inner Text</article>
          </section>
        </main>
      `;
  });

  it("returns a snapshot of the document", async () => {
    const snapshot = await takeScreenshot();

    expect(snapshot).toContain("<html");
    expect(snapshot).toContain("<body");
    expect(snapshot).toContain("<main");
    expect(snapshot).toContain("<section");
    expect(snapshot).toContain("<article");
    expect(snapshot).toContain("id");
    expect(snapshot).toContain("class");
    expect(snapshot).toContain("outer");
    expect(snapshot).toContain("middle");
    expect(snapshot).toContain("inner");
    expect(snapshot).toContain("super-inner");
    expect(snapshot).toContain("Inner Text");
  });
});

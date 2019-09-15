import mouse from "@/loggers/mouse";

describe("mouse logger", () => {
  describe("click", () => {
    let clickSpy;

    beforeAll(() => {
      document.body.innerHTML = `
        <div class="outer">
          <div id="middle" class="middle">
            <div class="inner super-inner">Inner Text</div>
          </div>
        </div>
      `;

      clickSpy = jest.spyOn(mouse, "click");

      document.addEventListener("click", clickSpy);
    });

    it("should trigger clickLogger", () => {
      (document.querySelector("div.outer") as HTMLElement).click();

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });
});

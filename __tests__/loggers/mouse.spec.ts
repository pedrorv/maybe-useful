import mouse from "@/loggers/mouse";

describe("mouse logger", () => {
  describe("click", () => {
    let clickSpy;

    beforeEach(() => {
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

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should trigger clickLogger", () => {
      (document.querySelector("div.outer") as HTMLElement).click();

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it("should trigger clickLogger even if the dom gets changed after the event listener is added", () => {
      document.body.innerHTML = `
        <div class="outer-new"></div>
      `;

      (document.querySelector("div.outer-new") as HTMLElement).click();

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });
});

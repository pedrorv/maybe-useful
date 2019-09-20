import * as mouse from "@/trackers/mouse";

describe("Tracker", () => {
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

  it("should trigger the click tracker", () => {
    (document.querySelector("div.outer") as HTMLElement).click();

    expect(clickSpy).toHaveBeenCalledTimes(1);

    (document.querySelector("div#middle") as HTMLElement).click();

    expect(clickSpy).toHaveBeenCalledTimes(2);

    (document.querySelector("div.inner") as HTMLElement).click();

    expect(clickSpy).toHaveBeenCalledTimes(3);
  });

  it("should trigger the click tracker even if the dom gets changed after the event listener is added", () => {
    document.body.innerHTML = `
        <div class="outer-new"></div>
      `;

    (document.querySelector("div.outer-new") as HTMLElement).click();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it("should return the event path with ids and classes", () => {
    document.body.innerHTML = `
        <div class="outer">
          <div id="middle" class="middle">
            <div id="inner super-inner" class="inner super-inner">Inner Text</div>
          </div>
        </div>
      `;

    (document.querySelector("div.inner") as HTMLElement).click();

    const returnValue = clickSpy.mock.results[0].value;

    expect(returnValue.path).toEqual(
      "html body div.outer div#middle.middle div#inner#super-inner.inner.super-inner"
    );
  });
});

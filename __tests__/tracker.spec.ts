import { MouseTracker } from "../src/trackers";
import { clearEvents, getEvents } from "../src/utils/logger";
import { init } from "../src/main";
import { getAppId } from "../src/utils/common";

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

    // @ts-ignore
    window.screen.orientation = { type: "" };

    clickSpy = jest.spyOn(MouseTracker, "track");

    document.addEventListener("click", clickSpy);
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
  });

  it("should set the appId when initializing the library", () => {
    init("test-app-id");

    expect(getAppId()).toBe("test-app-id");
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

  it("should log events", () => {
    document.body.innerHTML = `<div class="log"></div>`;

    (document.querySelector("div.log") as HTMLElement).click();
    (document.querySelector("div.log") as HTMLElement).click();
    (document.querySelector("div.log") as HTMLElement).click();

    expect(getEvents().length).toEqual(3);
  });

  it("should clear logged events", () => {
    document.body.innerHTML = `<div class="log"></div>`;

    (document.querySelector("div.log") as HTMLElement).click();
    clearEvents();

    expect(getEvents().length).toEqual(0);
  });
});

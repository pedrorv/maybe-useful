import { clearEvents, getEvents } from "@/utils/logger";
import { init, stop } from "@/main";

describe("MouseTracker", () => {
  beforeEach(() => {
    init("test-app-id", "http://localhost:3000");
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
    stop();
  });

  it("should trigger the click tracker", () => {
    document.body.innerHTML = `
        <div class="outer">
          <div id="middle" class="middle">
            <div class="inner super-inner">Inner Text</div>
          </div>
        </div>
      `;

    (document.querySelector("div.outer") as HTMLElement).click();
    (document.querySelector("div#middle") as HTMLElement).click();
    (document.querySelector("div.inner") as HTMLElement).click();

    expect(getEvents().length).toEqual(3);
  });

  it("should trigger the click tracker even if the dom gets changed after the event listener is added", () => {
    document.body.innerHTML = `
        <div class="outer-new"></div>
      `;

    (document.querySelector("div.outer-new") as HTMLElement).click();

    expect(getEvents().length).toEqual(1);
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

    expect(getEvents()[0].path).toEqual(
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

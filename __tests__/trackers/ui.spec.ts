import { UITracker } from "@/trackers";
import { clearEvents } from "@/utils/logger";
import { init, stop } from "@/main";

describe("UITracker", () => {
  beforeEach(() => {
    init("test-app-id", "http://localhost:3000");
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
    stop();
  });

  it("should return the resize event with proper structure", async () => {
    const uiEvent = new UIEvent("resize", {
      bubbles: true,
    });
    const event = await UITracker.track(uiEvent);

    expect(event).toMatchObject({
      type: "ui",
      name: "resize",
      path: "html",
      properties: {
        scrollX: expect.any(Number),
        scrollY: expect.any(Number),
        screen: {
          availHeight: expect.any(Number),
          availWidth: expect.any(Number),
          height: expect.any(Number),
          width: expect.any(Number),
          orientation: expect.any(String),
        },
        location: { origin: expect.any(String), pathname: expect.any(String) },
        screenshot: expect.stringContaining("</html>"),
      },
      timestamp: expect.any(Number),
      sessionId: expect.any(String),
    });
  });

  it('should be able to "screenshot" the dom', async () => {
    const event = await UITracker.trackDOMChange();

    expect(event).toMatchObject({
      type: "ui",
      name: "dom-change",
      path: "html",
      properties: {
        scrollX: expect.any(Number),
        scrollY: expect.any(Number),
        screen: {
          availHeight: expect.any(Number),
          availWidth: expect.any(Number),
          height: expect.any(Number),
          width: expect.any(Number),
          orientation: expect.any(String),
        },
        location: { origin: expect.any(String), pathname: expect.any(String) },
        screenshot: expect.stringContaining("</html>"),
      },
      timestamp: expect.any(Number),
      sessionId: expect.any(String),
    });
  });
});

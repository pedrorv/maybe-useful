import { WindowTracker } from "@/trackers";
import { clearEvents } from "@/utils/logger";
import { init, stop } from "@/main";

describe("WindowTracker", () => {
  beforeEach(() => {
    init("test-app-id", "http://localhost:3000", true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
    stop();
  });

  it("should return the resize event with proper structure", () => {
    const uiEvent = new UIEvent("resize", {
      bubbles: true,
    });
    const event = WindowTracker.track(uiEvent);

    expect(event).toMatchObject({
      type: "window",
      name: "resize",
      path: "html",
      uniqueSelector: "html",
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
      },
      timestamp: expect.any(Number),
      sessionId: expect.any(String),
    });
  });
});

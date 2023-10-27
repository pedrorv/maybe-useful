import { UITracker } from "@/trackers";
import { getEvents, clearEvents } from "@/utils/logger";
import { init, stop } from "@/main";

describe("UITracker", () => {
  beforeEach(() => {
    init("test-app-id", "http://localhost:3000", true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
    stop();
  });

  it('should be able to "screenshot" the dom', async () => {
    const event = await UITracker.track();

    expect(event).toMatchObject({
      type: "ui",
      name: "dom-change",
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
        screenshot: expect.stringContaining("</html>"),
      },
      timestamp: expect.any(Number),
      sessionId: expect.any(String),
    });
  });

  it(`shouldn't run multiple DOM track events at the same time`, async () => {
    await Promise.all([UITracker.track(), UITracker.track()]);

    expect(getEvents().length).toBe(1);
  });
});

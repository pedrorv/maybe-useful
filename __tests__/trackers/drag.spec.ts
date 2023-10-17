import { clearEvents, getEvents } from "@/utils/logger";
import { init, stop } from "@/main";

describe("DragTracker", () => {
  beforeEach(() => {
    init("test-app-id", "http://localhost:3000", true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
    stop();
  });

  it("should log the drag with proper structure", () => {
    const dragEvent = new MouseEvent("drag", {
      bubbles: true,
    });
    document.body.innerHTML = `
        <div class="outer">
          <div class="middle">
            <div class="inner" />
          </div>
        </div>
      `;

    (document.querySelector("div.inner") as HTMLElement).dispatchEvent(
      dragEvent
    );

    expect(getEvents()[0]).toMatchObject({
      type: "drag",
      name: "drag",
      path: "html body div.outer div.middle div.inner",
      properties: {
        altKey: expect.any(Boolean),
        button: expect.any(Number),
        clientX: expect.any(Number),
        clientY: expect.any(Number),
        ctrlKey: expect.any(Boolean),
        metaKey: expect.any(Boolean),
        movementX: undefined,
        movementY: undefined,
        screenX: expect.any(Number),
        screenY: expect.any(Number),
        shiftKey: expect.any(Boolean),
      },
      timestamp: expect.any(Number),
      sessionId: expect.any(String),
    });
  });
});

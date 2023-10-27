import { clearEvents, getEvents } from "@/utils/logger";
import { init, stop } from "@/main";

describe("KeyboardTracker", () => {
  beforeEach(() => {
    init("test-app-id", "http://localhost:3000", true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
    stop();
  });

  it("should log the keydown with proper structure", () => {
    const keyboardEvent = new KeyboardEvent("keydown", {
      code: "1",
      shiftKey: true,
      altKey: false,
      ctrlKey: false,
      isComposing: false,
      metaKey: false,
      bubbles: true,
    });
    document.body.innerHTML = `
        <div class="outer">
          <div class="middle">
            <input />
          </div>
        </div>
      `;

    (document.querySelector("input") as HTMLElement).dispatchEvent(
      keyboardEvent
    );

    expect(getEvents()[0]).toMatchObject({
      type: "keyboard",
      name: "keydown",
      path: "html body div.outer div.middle input",
      uniqueSelector: expect.any(String),
      properties: {
        altKey: false,
        ctrlKey: false,
        isComposing: false,
        location: 0,
        metaKey: false,
        repeat: false,
        shiftKey: true,
      },
      timestamp: expect.any(Number),
      sessionId: expect.any(String),
    });
  });
});

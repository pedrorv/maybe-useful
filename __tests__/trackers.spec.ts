import * as trackers from "@/trackers";
import { init, stop } from "@/main";

describe("Trackers", () => {
  beforeEach(() => {
    document.body.innerHTML = `
        <div class="outer">
          <div id="middle" class="middle">
            <div class="inner super-inner">Inner Text</div>
          </div>
        </div>
      `;

    for (const trackerKey in trackers) {
      jest.spyOn(trackers[trackerKey], "track");
    }

    init("test-app-id", "http://localhost:3000", true);
  });

  afterEach(() => {
    jest.clearAllMocks();
    stop();
  });

  it("should track all registered events", () => {
    const eventNames = [];

    for (const trackerKey in trackers) {
      eventNames.push(...trackers[trackerKey].eventNames);
    }

    for (const eventName of eventNames) {
      const element = document.querySelector("div.inner") as HTMLElement;
      const event = new Event(eventName, { bubbles: true });
      element.dispatchEvent(event);
    }

    for (const trackerKey in trackers) {
      expect(trackers[trackerKey].track).toBeCalledTimes(
        trackers[trackerKey].eventNames.length
      );
    }
  });
});

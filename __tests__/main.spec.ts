import * as trackers from "@/trackers";
import { clearEvents } from "@/utils/logger";
import { init, stop } from "@/main";
import { getAppId, getServerUrl } from "@/utils/common";

const TOTAL_RESIZE_EVENTS = 1;

const TOTAL_DOCUMENT_EVENTS = Object.keys(trackers)
  .filter((trackerName) => trackers[trackerName].listenerElement === document)
  .reduce(
    (acc, trackerName) => acc + trackers[trackerName].eventNames.length,
    0
  );
const TOTAL_WINDOW_EVENTS = Object.keys(trackers)
  .filter((trackerName) => trackers[trackerName].listenerElement === window)
  .reduce(
    (acc, trackerName) => acc + trackers[trackerName].eventNames.length,
    0
  );

describe("Main", () => {
  afterEach(() => {
    jest.clearAllMocks();
    clearEvents();
    stop();
  });

  describe("init", () => {
    it("should set the appId and serverUrl when initializing the library", () => {
      init("test-app-id", "http://localhost:3000", true);

      expect(getAppId()).toBe("test-app-id");
      expect(getServerUrl()).toBe("http://localhost:3000");
    });

    it("should set the listeners", () => {
      document.addEventListener = jest.fn();
      document.removeEventListener = jest.fn();
      window.addEventListener = jest.fn();
      window.removeEventListener = jest.fn();

      init("test-app-id", "http://localhost:3000", true);

      expect(document.removeEventListener).toHaveBeenCalledTimes(
        TOTAL_DOCUMENT_EVENTS
      );
      expect(document.addEventListener).toHaveBeenCalledTimes(
        TOTAL_DOCUMENT_EVENTS
      );
      expect(window.removeEventListener).toHaveBeenCalledTimes(
        TOTAL_WINDOW_EVENTS + TOTAL_RESIZE_EVENTS
      );
      expect(window.addEventListener).toHaveBeenCalledTimes(
        TOTAL_WINDOW_EVENTS + TOTAL_RESIZE_EVENTS
      );
    });
  });

  describe("stop", () => {
    it("should stop remove the listeners", () => {
      document.removeEventListener = jest.fn();
      window.removeEventListener = jest.fn();

      stop();

      expect(document.removeEventListener).toHaveBeenCalledTimes(
        TOTAL_DOCUMENT_EVENTS
      );
      expect(window.removeEventListener).toHaveBeenCalledTimes(
        TOTAL_WINDOW_EVENTS + TOTAL_RESIZE_EVENTS
      );
    });
  });
});

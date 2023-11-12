import { WindowWatcherEvent } from "../types";
import { getAppId, getSessionId, getWindowProps } from "../utils/common";
import { logEvent } from "../utils/logger";

export class WindowTracker {
  static get eventNames(): string[] {
    return ["scroll"];
  }

  static get listenerElement() {
    return window;
  }

  static track(e: UIEvent): WindowWatcherEvent {
    const event = WindowTracker.toWatcherEvent(e);
    logEvent(event);
    return event;
  }

  private static toWatcherEvent(e: UIEvent): WindowWatcherEvent {
    return {
      type: "window",
      name: e.type,
      path: "html",
      uniqueSelector: "html",
      properties: getWindowProps(),
      timestamp: Date.now(),
      sessionId: getSessionId(),
      appId: getAppId(),
    };
  }
}

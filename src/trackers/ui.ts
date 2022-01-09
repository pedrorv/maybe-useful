import { UIWatcherEvent } from "../types";
import { getSessionId, getWindowProps } from "../utils/common";
import { logEvent } from "../utils/logger";
import { takeScreenshot } from "../utils/screenshot";

export class UITracker {
  static get eventNames(): string[] {
    return ["resize", "scroll"];
  }

  static get listenerElement() {
    return window;
  }

  private static async trackBase(e: UIEvent | string) {
    const event = await UITracker.toWatcherEvent(e);
    if (!event) return null;

    logEvent(event);
    return event;
  }

  static async track(e: UIEvent): Promise<UIWatcherEvent | null> {
    return UITracker.trackBase(e);
  }

  static async trackDOMChange() {
    return UITracker.trackBase("dom-change");
  }

  private static async toWatcherEvent(
    e: UIEvent | string
  ): Promise<UIWatcherEvent | null> {
    const screenshot = await takeScreenshot();
    const eventName = typeof e === "string" ? e : e.type;
    if (!screenshot) return null;

    return {
      eventType: "ui",
      eventName,
      path: "html",
      properties: { ...getWindowProps(), screenshot },
      timestamp: Date.now(),
      sessionId: getSessionId(),
    };
  }
}

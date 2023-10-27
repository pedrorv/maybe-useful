import { UIWatcherEvent } from "../types";
import {
  getAppId,
  getDryRun,
  getSessionId,
  getWindowProps,
} from "../utils/common";
import { logEvent } from "../utils/logger";
import { takeScreenshot } from "../utils/screenshot";

let isTakingScreenshot = false;
let previousScreenshot;

export class UITracker {
  static get eventNames(): string[] {
    return [];
  }

  static get listenerElement() {
    return window;
  }

  static async track(): Promise<UIWatcherEvent | null> {
    const event = await UITracker.toWatcherEvent("dom-change");
    if (!event) return null;

    logEvent(event);
    return event;
  }

  private static async toWatcherEvent(
    name: string
  ): Promise<UIWatcherEvent | null> {
    let screenshot;
    try {
      if (isTakingScreenshot) return null;
      isTakingScreenshot = true;
      screenshot = await takeScreenshot();
      if (!screenshot) return null;
      if (previousScreenshot === screenshot && !getDryRun()) return null;

      return {
        type: "ui",
        name,
        path: "html",
        uniqueSelector: "html",
        properties: { ...getWindowProps(), screenshot },
        timestamp: Date.now(),
        sessionId: getSessionId(),
        appId: getAppId(),
      };
    } catch (e) {
      return null;
    } finally {
      previousScreenshot = screenshot;
      isTakingScreenshot = false;
    }
  }
}

import { KeyboardWatcherEvent } from "../types";
import {
  generateUniqueSelector,
  getAppId,
  getSessionId,
  getTrackerPath,
} from "../utils/common";
import { logEvent } from "../utils/logger";

export class KeyboardTracker {
  static get eventNames(): string[] {
    return ["keydown", "keyup", "keypress"];
  }

  static get listenerElement() {
    return document;
  }

  static track(e: KeyboardEvent): KeyboardWatcherEvent {
    const event = KeyboardTracker.toWatcherEvent(e);
    logEvent(event);
    return event;
  }

  private static toWatcherEvent(e: KeyboardEvent): KeyboardWatcherEvent {
    const {
      altKey,
      ctrlKey,
      isComposing,
      location,
      metaKey,
      repeat,
      shiftKey,
    } = e as KeyboardEvent;

    return {
      type: "keyboard",
      name: e.type,
      path: getTrackerPath(e),
      uniqueSelector: generateUniqueSelector(e.target) ?? getTrackerPath(e),
      properties: {
        altKey,
        ctrlKey,
        isComposing,
        location,
        metaKey,
        repeat,
        shiftKey,
      },
      timestamp: Date.now(),
      sessionId: getSessionId(),
      appId: getAppId(),
    };
  }
}

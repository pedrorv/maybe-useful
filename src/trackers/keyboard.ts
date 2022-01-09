import { KeyboardWatcherEvent } from "../types";
import { getSessionId, getTrackerPath } from "../utils/common";
import { logEvent } from "../utils/logger";

export class KeyboardTracker {
  static get eventNames(): string[] {
    return ["keydown", "keypress", "keyup"];
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
      code,
      ctrlKey,
      isComposing,
      key,
      location,
      metaKey,
      repeat,
      shiftKey,
    } = e as KeyboardEvent;

    return {
      eventType: "keyboard",
      eventName: e.type,
      path: getTrackerPath(e),
      properties: {
        altKey,
        code,
        ctrlKey,
        isComposing,
        key,
        location,
        metaKey,
        repeat,
        shiftKey,
      },
      timestamp: Date.now(),
      sessionId: getSessionId(),
    };
  }
}

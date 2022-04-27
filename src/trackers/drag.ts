import { DragWatcherEvent } from "../types";
import { getAppId, getSessionId, getTrackerPath } from "../utils/common";
import { logEvent } from "../utils/logger";

export class DragTracker {
  static get eventNames(): string[] {
    return [
      "drag",
      "dragend",
      "dragenter",
      "dragstart",
      "dragleave",
      "dragover",
      "drop",
    ];
  }

  static get listenerElement() {
    return document;
  }

  static track(e: DragEvent): DragWatcherEvent {
    const event = DragTracker.toWatcherEvent(e);
    logEvent(event);
    return event;
  }

  private static toWatcherEvent(e: DragEvent): DragWatcherEvent {
    const {
      altKey,
      button,
      clientX,
      clientY,
      ctrlKey,
      metaKey,
      movementX,
      movementY,
      screenX,
      screenY,
      shiftKey,
    } = e as DragEvent;

    return {
      type: "drag",
      name: e.type,
      path: getTrackerPath(e),
      properties: {
        altKey,
        button,
        clientX,
        clientY,
        ctrlKey,
        metaKey,
        movementX,
        movementY,
        screenX,
        screenY,
        shiftKey,
      },
      timestamp: Date.now(),
      sessionId: getSessionId(),
      appId: getAppId(),
    };
  }
}

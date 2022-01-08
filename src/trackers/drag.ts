import { DragWatcherEvent } from "../types";
import { getTrackerPath, getWindowProps } from "../utils/common";
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

  static toWatcherEvent(e: DragEvent): DragWatcherEvent {
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
      eventType: "drag",
      eventName: e.type,
      path: getTrackerPath(e),
      window: getWindowProps(),
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
    };
  }
}

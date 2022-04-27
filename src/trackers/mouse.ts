import { MouseWatcherEvent } from "../types";
import { getAppId, getSessionId, getTrackerPath } from "../utils/common";
import { logEvent } from "../utils/logger";

export class MouseTracker {
  static get eventNames(): string[] {
    return [
      "click",
      "dblclick",
      "mousedown",
      "mouseenter",
      "mouseleave",
      "mousemove",
      "mouseout",
      "mouseup",
      "select",
      "wheel",
    ];
  }

  static get listenerElement() {
    return document;
  }

  static track(e: MouseEvent): MouseWatcherEvent {
    const event = MouseTracker.toWatcherEvent(e);
    logEvent(event);
    return event;
  }

  private static toWatcherEvent(e: MouseEvent): MouseWatcherEvent {
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
    } = e as MouseEvent;

    return {
      type: "mouse",
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

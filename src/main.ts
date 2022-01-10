import {
  DragTracker,
  KeyboardTracker,
  MouseTracker,
  UITracker,
} from "./trackers";
import { getEvents, clearEvents } from "./utils/logger";

let domObserver;

if (MutationObserver) {
  domObserver = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((m) => {
      [...Array.from(m.addedNodes), ...Array.from(m.removedNodes)].forEach(
        (node) => {
          // Discards all iframes because os html2canvas
          if (node.nodeName !== "IFRAME") UITracker.trackDOMChange();
        }
      );
    });
  });
}

export const setupTrackers = () => {
  domObserver?.disconnect();
  domObserver.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  });

  [UITracker, DragTracker, KeyboardTracker, MouseTracker].forEach((tracker) =>
    tracker.eventNames.forEach((eventName) => {
      tracker.listenerElement.removeEventListener(eventName, tracker.track);
      tracker.listenerElement.addEventListener(eventName, tracker.track);
    })
  );
};

export { getEvents, clearEvents };

if (window && window.addEventListener) {
  window.addEventListener("DOMContentLoaded", setupTrackers);
}

import {
  DragTracker,
  KeyboardTracker,
  MouseTracker,
  UITracker,
} from "./trackers";

let domObserver;

if (MutationObserver) {
  domObserver = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((m) => {
      [...Array.from(m.addedNodes), ...Array.from(m.removedNodes)].forEach(
        UITracker.trackDOMChange
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
    tracker.eventNames.forEach((name) => {
      tracker.listenerElement.removeEventListener(name, tracker.track);
      tracker.listenerElement.addEventListener(name, tracker.track);
    })
  );
};

if (window && window.addEventListener) {
  window.addEventListener("DOMContentLoaded", setupTrackers);
}

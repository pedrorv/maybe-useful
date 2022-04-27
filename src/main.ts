import {
  DragTracker,
  KeyboardTracker,
  MouseTracker,
  UITracker,
} from "./trackers";
import { setAppId } from "./utils/common";

let domObserver;

if (MutationObserver) {
  domObserver = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((m) => {
      const hasAlteredVisualElements = !![
        ...Array.from(m.addedNodes),
        ...Array.from(m.removedNodes),
      ].filter((node) => node.nodeName !== "SCRIPT");

      if (hasAlteredVisualElements) UITracker.trackDOMChange();
    });
  });
}

export const init = (appId: string) => {
  setAppId(appId);

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

import {
  DragTracker,
  KeyboardTracker,
  MouseTracker,
  UITracker,
} from "@/trackers";
import { setAppId, setServerUrl } from "@/utils/common";

const TRACKERS = [UITracker, DragTracker, KeyboardTracker, MouseTracker];

let domObserver;
export const init = (appId: string, serverUrl: string) => {
  setAppId(appId);
  setServerUrl(serverUrl);

  if (MutationObserver) {
    domObserver = new MutationObserver((mutations: MutationRecord[]) => {
      mutations.forEach((m) => {
        const hasAlteredVisualElements = !![
          ...Array.from(m.addedNodes),
          ...Array.from(m.removedNodes),
        ].filter((node) => node.nodeName !== "SCRIPT").length;
        if (hasAlteredVisualElements) UITracker.trackDOMChange();
      });
    });
  }

  domObserver?.disconnect();
  domObserver?.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true,
  });

  TRACKERS.forEach((tracker) =>
    tracker.eventNames.forEach((name) => {
      tracker.listenerElement.removeEventListener(name, tracker.track);
      tracker.listenerElement.addEventListener(name, tracker.track);
    })
  );
};

export const stop = () => {
  domObserver?.disconnect();
  TRACKERS.forEach((tracker) =>
    tracker.eventNames.forEach((name) => {
      tracker.listenerElement.removeEventListener(name, tracker.track);
    })
  );
};

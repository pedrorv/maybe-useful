import {
  DragTracker,
  KeyboardTracker,
  MouseTracker,
  UITracker,
} from "@/trackers";
import { setAppId, setDryRun, setServerUrl } from "@/utils/common";
export { getEvents } from "@/utils/logger";

const TRACKERS = [UITracker, DragTracker, KeyboardTracker, MouseTracker];

let domObserver;
export const init = async (
  appId: string,
  serverUrl: string,
  isDryRun = false
) => {
  setAppId(appId);
  setServerUrl(serverUrl);
  setDryRun(isDryRun);

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

  if (!isDryRun) await UITracker.trackDOMChange();
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

import {
  DragTracker,
  KeyboardTracker,
  MouseTracker,
  UITracker,
} from "./trackers";
import { setAppId, setServerUrl } from "./utils/common";

let interval;
export const init = (appId: string, serverUrl: string) => {
  setAppId(appId);
  setServerUrl(serverUrl);
  clearInterval(interval);

  interval = setInterval(UITracker.trackDOMChange, 1000);

  [UITracker, DragTracker, KeyboardTracker, MouseTracker].forEach((tracker) =>
    tracker.eventNames.forEach((name) => {
      tracker.listenerElement.removeEventListener(name, tracker.track);
      tracker.listenerElement.addEventListener(name, tracker.track);
    })
  );
};

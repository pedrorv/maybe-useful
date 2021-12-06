import drag from './trackers/drag';
import keyboard from "./trackers/keyboard";
import mouse from "./trackers/mouse";
import { getEvents } from './utils/logger';

export const setupTrackers = () =>
  [drag, keyboard, mouse].forEach(tracker =>
    Object.keys(tracker).forEach(eventName => {
      document.removeEventListener(eventName, tracker[eventName]);
      document.addEventListener(eventName, tracker[eventName]);
    })
  );

export { getEvents };

if (window && window.addEventListener) {
  window.addEventListener("load", setupTrackers);
}

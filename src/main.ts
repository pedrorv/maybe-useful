import drag from './trackers/drag';
import keyboard from "./trackers/keyboard";
import mouse from "./trackers/mouse";

export const setupTrackers = () =>
  [drag, keyboard, mouse].forEach(tracker =>
    Object.keys(tracker).forEach(eventName =>
      document.addEventListener(eventName, tracker[eventName])
    )
  );

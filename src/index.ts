import keyboard from "@/trackers/keyboard";
import mouse from "@/trackers/mouse";

const setupTrackers = () =>
  [keyboard, mouse].forEach(tracker =>
    Object.keys(tracker).forEach(eventName =>
      document.addEventListener(eventName, tracker[eventName])
    )
  );

window.onload = setupTrackers;

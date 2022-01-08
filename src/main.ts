import drag from "./trackers/drag";
import keyboard from "./trackers/keyboard";
import mouse from "./trackers/mouse";
import { getEvents, logEvent } from "./utils/logger";
import { takeScreenshot } from "./utils/screenshot";

const logScreen = async () => {
  const screenshot = await takeScreenshot();
  console.log("screenshot");
  if (screenshot) logEvent({ screenshot });
};

let domObserver;

if (MutationObserver) {
  domObserver = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((m) => {
      [...Array.from(m.addedNodes), ...Array.from(m.removedNodes)].forEach(
        (node) => {
          // Discards all iframes because os html2canvas
          if (node.nodeName !== "IFRAME") logScreen();
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

  [drag, keyboard, mouse].forEach((tracker) =>
    Object.keys(tracker).forEach((eventName) => {
      document.removeEventListener(eventName, tracker[eventName]);
      document.addEventListener(eventName, tracker[eventName]);
    })
  );

  ["resize", "scroll"].forEach((eventName) => {
    window.removeEventListener(eventName, logScreen);
    window.addEventListener(eventName, logScreen);
  });
};

export { getEvents };

if (window && window.addEventListener) {
  window.addEventListener("load", setupTrackers);
}

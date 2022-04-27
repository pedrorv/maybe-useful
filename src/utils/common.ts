import { uuid } from "../utils/uuid";
import { BrowserEvent, WindowProps } from "../types";

const extractAttr = (obj: HTMLElement, attr: string) => obj?.[attr] ?? "";
export const extractClasses = (el: HTMLElement) =>
  extractAttr(el, "className")
    .split(" ")
    .filter(Boolean)
    .map((className) => `.${className}`)
    .join("");
export const extractIds = (el: HTMLElement) =>
  extractAttr(el, "id")
    .split(" ")
    .filter(Boolean)
    .map((id) => `#${id}`)
    .join("");

const eventToTargetPath = (event: BrowserEvent): EventTarget[] =>
  Array.from(event.composedPath()).reverse();

const targetPathToTrackerPath = (targetPath: EventTarget[]) => {
  const htmlIndex = targetPath.findIndex((target) => {
    const { nodeName } = target as HTMLElement;
    return String(nodeName).toLowerCase() === "html";
  });

  if (htmlIndex === -1) return "html";

  return targetPath
    .slice(htmlIndex, Infinity)
    .map(
      (el: HTMLElement) =>
        extractAttr(el, "nodeName") + extractIds(el) + extractClasses(el)
    )
    .join(" ")
    .toLocaleLowerCase();
};

export const getTrackerPath = (event: BrowserEvent) =>
  targetPathToTrackerPath(eventToTargetPath(event));

let sessionId;
export const getSessionId = () => (sessionId = sessionId ?? uuid());

let appId: string;
export const getAppId = () => appId;
export const setAppId = (id: string) => (appId ??= id);

export const getWindowProps = (): WindowProps => {
  const { scrollX, scrollY } = window;
  const { origin, pathname } = window.location;
  const { availHeight, availWidth, height, width } = window.screen;
  const orientation = window.screen.orientation.type;

  return {
    scrollX,
    scrollY,
    screen: {
      availHeight,
      availWidth,
      height,
      width,
      orientation,
    },
    location: {
      origin,
      pathname,
    },
  };
};

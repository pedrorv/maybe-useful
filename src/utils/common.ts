import { uuid } from "../utils/uuid";
import { BrowserEvent, WindowProps } from "../types";
import { getCssSelector } from "css-selector-generator";

export const generateUniqueSelector = (el: unknown) => {
  try {
    return getCssSelector(el);
  } catch (e) {
    return null;
  }
};

const extractAttr = (obj: HTMLElement, attr: string) => {
  const attrVal = obj?.[attr];
  return typeof attrVal === "string" ? attrVal : "";
};
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

const valueToAsterisks = (val: string) => (val || "").replace(/\S/g, "*");

export const getValueFromTarget = (target: KeyboardEvent["target"]) => {
  if (
    target instanceof HTMLInputElement &&
    ["checkbox", "radio"].includes(
      (target.getAttribute("type") || "").toLocaleLowerCase()
    )
  ) {
    return { value: valueToAsterisks(target.value), checked: target.checked };
  } else if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
  ) {
    if ("checked" in target) {
      return { value: valueToAsterisks(target.value), checked: target.checked };
    } else {
      return { value: valueToAsterisks(target.value), checked: false };
    }
  }

  return { value: "", checked: false };
};

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

let serverUrl: string;
export const getServerUrl = () => serverUrl;
export const setServerUrl = (url: string) => (serverUrl ??= url);

let dryRun: boolean;
export const getDryRun = () => dryRun;
export const setDryRun = (isDryRun: boolean) => (dryRun ??= isDryRun);

export const getWindowProps = (): WindowProps => {
  const { scrollX, scrollY, innerWidth, innerHeight } = window;
  const { origin, pathname } = window.location;
  const { availHeight, availWidth, height, width } = window.screen;
  const orientation = window.screen.orientation.type;
  const body = document.body;
  const html = document.documentElement;
  const htmlWidth = Math.max(
    body.scrollWidth,
    body.offsetWidth,
    html.clientWidth,
    html.scrollWidth,
    html.offsetWidth
  );
  const htmlHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return {
    htmlWidth,
    htmlHeight,
    innerWidth,
    innerHeight,
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

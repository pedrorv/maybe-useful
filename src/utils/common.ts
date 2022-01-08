import { defaultTo, filter, join, map, merge, pipe, prop, split } from "ramda";
import { BrowserEvent, WindowProps } from "../types";

export const enhance = (fn: (o: object) => object) => (o: object) =>
  merge(o, fn(o));

export const extractAttr = (attr: string) =>
  pipe(defaultTo({ [attr]: "" }), prop(attr));

export const extractClasses = pipe(
  extractAttr("className"),
  split(" "),
  filter(Boolean),
  map((className) => `.${className}`),
  join("")
);

export const extractIds = pipe(
  extractAttr("id"),
  split(" "),
  filter(Boolean),
  map((id) => `#${id}`),
  join("")
);

const eventToTargetPath = (event: BrowserEvent): EventTarget[] =>
  Array.from(event.composedPath()).reverse();

const targetPathToTrackerPath = (targetPath: EventTarget[]) => {
  const htmlIndex = targetPath.findIndex((target) => {
    const { nodeName } = target as HTMLElement;
    return String(nodeName).toLowerCase() === "html";
  });

  if (htmlIndex === -1) return "";

  return targetPath
    .slice(htmlIndex, Infinity)
    .map(
      (el: HTMLElement) =>
        extractAttr("nodeName")(el) + extractIds(el) + extractClasses(el)
    )
    .join(" ")
    .toLocaleLowerCase();
};

export const getTrackerPath = pipe(eventToTargetPath, targetPathToTrackerPath);

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

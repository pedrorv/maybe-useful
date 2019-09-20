import { TrackerEvent } from "@/types";
import {
  enhance,
  extractAttr,
  extractClasses,
  extractIds
} from "@/utils/common";
import { equals, join, map, pipe, prop, slice, toLower } from "ramda";

export const toTrackerEvent = (browserEvent: MouseEvent): TrackerEvent => ({
  browserEvent
});

export const withEventName = (name: string) => enhance(() => ({
  name
}));

export const withProperties = enhance(({ browserEvent }: TrackerEvent) => {
  const { altKey, button, clientX, clientY, ctrlKey, metaKey, movementX,
  movementY, screenX, screenY, shiftKey } = browserEvent;

  return {
    altKey,
    button,
    clientX,
    clientY,
    ctrlKey,
    metaKey,
    movementX,
    movementY,
    screenX,
    screenY,
    shiftKey,
  }
});

export const withWindow = enhance(() => {
  const { scrollX, scrollY } = window;
  const { origin, pathname } = window.location;
  const { availHeight, availWidth, height, width } = window.screen;
  const orientation = window.screen.orientation.type;

  return {
    window: {
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
    }
  }
});

export const withBrowserPath = enhance(({ browserEvent }: TrackerEvent) => ({
  browserPath: Array.from(
    browserEvent.composedPath() as HTMLElement[]
  ).reverse()
}));

export const withPath = enhance(({ browserPath }: TrackerEvent) => {
  const htmlIndex = browserPath.findIndex(
    pipe(
      prop("nodeName"),
      String,
      toLower,
      equals("html")
    )
  );

  const path = pipe(
    slice(htmlIndex, Infinity),
    map(
      el => extractAttr("nodeName")(el) + extractIds(el) + extractClasses(el)
    ),
    join(" "),
    toLower
  )(browserPath);

  return { path };
});

import {
  BrowserEvent,
  KeyboardTrackerEventProps,
  MouseTrackerEventProps,
  TrackerEvent,
  TrackerType,
  WindowProps
} from "@/types";
import {
  enhance,
  extractAttr,
  extractClasses,
  extractIds
} from "@/utils/common";
import { equals, join, map, pipe, prop, slice, toLower } from "ramda";

export const toTrackerEvent = (browserEvent: BrowserEvent): TrackerEvent => ({
  browserEvent
});

export const withEventName = (eventName: string) =>
  enhance(() => ({
    eventName
  }));

export const withEventType = (eventType: string) =>
  enhance(() => ({
    eventType
  }));

export const withKeyboardProperties = enhance(
  ({ browserEvent }: TrackerEvent): KeyboardTrackerEventProps => {
    const {
      altKey,
      charCode,
      code,
      ctrlKey,
      isComposing,
      key,
      keyCode,
      location,
      metaKey,
      repeat,
      shiftKey,
      which
    } = browserEvent as KeyboardEvent;

    return {
      altKey,
      charCode,
      code,
      ctrlKey,
      isComposing,
      key,
      keyCode,
      location,
      metaKey,
      repeat,
      shiftKey,
      which
    };
  }
);

export const withMouseProperties = enhance(
  ({ browserEvent }: TrackerEvent): MouseTrackerEventProps => {
    const {
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
      shiftKey
    } = browserEvent as MouseEvent;

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
      shiftKey
    };
  }
);

export const withWindow = enhance((): { window: WindowProps } => {
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
        orientation
      },
      location: {
        origin,
        pathname
      }
    }
  };
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

export const createEvent = pipe(
  toTrackerEvent,
  withBrowserPath,
  withPath,
  withWindow
);

export const trackerFactory = (
  eventNames: string[],
  trackerEvent: (e: BrowserEvent) => R.Merge<object, object>
): TrackerType =>
  eventNames.reduce(
    (acc, eventName) => {
      acc[eventName] = pipe(
        trackerEvent,
        withEventName(eventName)
      );

      return acc;
    },
    {} as any
  );

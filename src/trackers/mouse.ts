import { toTrackerEvent, withBrowserPath, withPath } from "@/utils/events";
import { pipe } from "ramda";

const mouseEvent = pipe(
  toTrackerEvent,
  withBrowserPath,
  withPath
);

export const click = pipe(
  mouseEvent
);

export const dblclick = pipe(
  mouseEvent
);

export const mousedown = pipe(
  mouseEvent
);

export const mouseenter = pipe(
  mouseEvent
);

export const mouseleave = pipe(
  mouseEvent
);

export const mousemove = pipe(
  mouseEvent
);

export const mouseout = pipe(
  mouseEvent
);

export const mouseup = pipe(
  mouseEvent
);

export const select = pipe(
  mouseEvent
);

export const wheel = pipe(
  mouseEvent
);

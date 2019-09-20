import { toTrackerEvent, withBrowserPath, withEventName, withPath, withProperties, withWindow } from "@/utils/events";
import { pipe } from "ramda";

const mouseEvent = pipe(
  toTrackerEvent,
  withBrowserPath,
  withPath,
  withWindow,
  withProperties
);

export const click = pipe(
  mouseEvent,
  withEventName('click')
);

export const dblclick = pipe(
  mouseEvent,
  withEventName('dblclick')
);

export const mousedown = pipe(
  mouseEvent,
  withEventName('mousedown')
);

export const mouseenter = pipe(
  mouseEvent,
  withEventName('mouseenter')
);

export const mouseleave = pipe(
  mouseEvent,
  withEventName('mouseleave')
);

export const mousemove = pipe(
  mouseEvent,
  withEventName('mousemove')
);

export const mouseout = pipe(
  mouseEvent,
  withEventName('mouseout')
);

export const mouseup = pipe(
  mouseEvent,
  withEventName('mouseup')
);

export const select = pipe(
  mouseEvent,
  withEventName('select')
);

export const wheel = pipe(
  mouseEvent,
  withEventName('wheel')
);

import { Mouse } from "@/types";
import {
  createEvent,
  withEventName,
  withEventType,
  withMouseProperties
} from "@/utils/events";
import { pipe } from "ramda";

const mouseEvent = pipe(
  createEvent,
  withMouseProperties,
  withEventType("mouse")
);

const mouseEventsNames = [
  "click",
  "dblclick",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseup",
  "select",
  "wheel"
];

const mouse: Mouse = mouseEventsNames.reduce(
  (acc, eventName) => {
    acc[eventName] = pipe(
      mouseEvent,
      withEventName(eventName)
    );

    return acc;
  },
  {} as any
);

export default mouse;

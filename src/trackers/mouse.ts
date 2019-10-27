import { Mouse } from "@/types";
import { trackerFactory } from "@/utils/common";
import {
  createEvent,
  withEventType,
  withMouseProperties
} from "@/utils/events";
import { pipe } from "ramda";

const mouseEvent = pipe(
  createEvent,
  withMouseProperties,
  withEventType("mouse")
);

const mouseEventNames = [
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

const mouseTracker: Mouse = trackerFactory(
  mouseEventNames,
  mouseEvent
) as Mouse;

export default mouseTracker;

import { Mouse } from "../types";
import {
  createEvent,
  trackerFactory,
  withEventType,
  withMouseProperties,
} from "../utils/events";
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
  "wheel",
];

const mouseTracker = trackerFactory(mouseEventNames, mouseEvent) as Mouse;

export default mouseTracker;

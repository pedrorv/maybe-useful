import { Drag } from "@/types";
import { trackerFactory } from "@/utils/common";
import {
  createEvent,
  withEventType,
  withMouseProperties
} from "@/utils/events";
import { pipe } from "ramda";

const dragEvent = pipe(
  createEvent,
  withMouseProperties,
  withEventType("drag")
);

const dragEventNames = [
  "drag",
  "dragend",
  "dragenter",
  "dragstart",
  "dragleave",
  "dragover",
  "drop"
];

const dragTracker: Drag = trackerFactory(dragEventNames, dragEvent) as Drag;

export default dragTracker;

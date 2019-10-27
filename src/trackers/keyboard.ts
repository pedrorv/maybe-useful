import { Keyboard } from "@/types";
import {
  createEvent,
  trackerFactory,
  withEventType,
  withKeyboardProperties
} from "@/utils/events";
import { pipe } from "ramda";

const keyboardEvent = pipe(
  createEvent,
  withKeyboardProperties,
  withEventType("keyboard")
);

const keyboardEventNames = ["keydown", "keypress", "keyup"];

const keyboardTracker = trackerFactory(
  keyboardEventNames,
  keyboardEvent
) as Keyboard;

export default keyboardTracker;

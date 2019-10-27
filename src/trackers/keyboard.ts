import { Keyboard } from "@/types";
import { trackerFactory } from "@/utils/common";
import {
  createEvent,
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

const keyboardTracker: Keyboard = trackerFactory(
  keyboardEventNames,
  keyboardEvent
) as Keyboard;

export default keyboardTracker;

import { Keyboard } from "@/types";
import {
  createEvent,
  withEventName,
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

const keyboard: Keyboard = keyboardEventNames.reduce(
  (acc, eventName) => {
    acc[eventName] = pipe(
      keyboardEvent,
      withEventName(eventName)
    );

    return acc;
  },
  {} as any
);

export default keyboard;

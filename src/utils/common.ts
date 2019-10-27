import { BrowserEvent, TrackerType } from "@/types";
import { defaultTo, filter, join, map, merge, pipe, prop, split } from "ramda";
import { withEventName } from "./events";

export const enhance = (fn: (o: object) => object) => (o: object) =>
  merge(o, fn(o));

export const extractAttr = (attr: string) =>
  pipe(
    defaultTo({ [attr]: "" }),
    prop(attr)
  );

export const extractClasses = pipe(
  extractAttr("className"),
  split(" "),
  filter(Boolean),
  map(className => `.${className}`),
  join("")
);

export const extractIds = pipe(
  extractAttr("id"),
  split(" "),
  filter(Boolean),
  map(id => `#${id}`),
  join("")
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

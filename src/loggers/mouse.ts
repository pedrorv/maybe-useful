import { toTrackerEvent, withBrowserPath, withPath } from "@/utils/events";
import { pipe } from "ramda";

export const click = pipe(
  toTrackerEvent,
  withBrowserPath,
  withPath
);

export default {
  click
};

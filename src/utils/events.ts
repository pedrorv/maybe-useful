import { TrackerEvent } from "@/types";
import {
  enhance,
  extractAttr,
  extractClasses,
  extractIds
} from "@/utils/common";
import { equals, join, map, pipe, prop, slice, toLower } from "ramda";

export const toTrackerEvent = (browserEvent: MouseEvent): TrackerEvent => ({
  browserEvent,
  location: {
    origin: window.location.origin,
    pathname: window.location.pathname,
  },
});

export const withBrowserPath = enhance(({ browserEvent }: TrackerEvent) => ({
  browserPath: Array.from(
    browserEvent.composedPath() as HTMLElement[]
  ).reverse()
}));

export const withPath = enhance(({ browserPath }: TrackerEvent) => {
  const htmlIndex = browserPath.findIndex(
    pipe(
      prop("nodeName"),
      String,
      toLower,
      equals("html")
    )
  );

  const path = pipe(
    slice(htmlIndex, Infinity),
    map(
      el => extractAttr("nodeName")(el) + extractIds(el) + extractClasses(el)
    ),
    join(" "),
    toLower
  )(browserPath);

  return { path };
});

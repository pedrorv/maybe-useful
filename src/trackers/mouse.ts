import { Mouse } from '@/types';
import { toTrackerEvent, withBrowserPath, withEventName, withPath, withProperties, withWindow } from "@/utils/events";
import { pipe } from "ramda";

const mouseEvent = pipe(
  toTrackerEvent,
  withBrowserPath,
  withPath,
  withWindow,
  withProperties
);

const mouseEventsNames = [
  'click',
  'dblclick',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseup',
  'select',
  'wheel'
];

const mouse: Mouse = mouseEventsNames.reduce((acc, eventName) => {
  acc[eventName] = pipe(
    mouseEvent,
    withEventName(eventName)
  );

  return acc;
}, {} as any);

export default mouse;
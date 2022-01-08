import { TrackerEvent } from "../types";

type LoggedEvent = TrackerEvent & { timestamp: number };

const events: LoggedEvent[] = [];

export const logEvent = (e: TrackerEvent): LoggedEvent => {
  const loggedEvent = {
    ...e,
    timestamp: Date.now(),
    browserEvent: undefined,
    browserPath: undefined,
  };

  events.push(loggedEvent);
  return loggedEvent;
};

export const getEvents = () => [...events];

export const clearEvents = () => events.splice(0, events.length);

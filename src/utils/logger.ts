import { WatcherEvent } from "../types";
import { getServerUrl, getDryRun } from "./common";

const events: WatcherEvent[] = [];

const sendEvents = (events: WatcherEvent | WatcherEvent[]) => {
  if (!events) return;
  if (Array.isArray(events) && !events.length) return;

  return fetch(`${getServerUrl()}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(events),
  })
    .then(() => {})
    .catch(() => {});
};

setInterval(() => {
  if (!getDryRun()) {
    sendEvents(events.splice(0, events.length));
  }
}, 100);

export const logEvent = (e: WatcherEvent): void => {
  if (getDryRun()) {
    events.push(e);
  } else if (e.type === "ui") {
    sendEvents(e);
  } else {
    events.push(e);
    if (events.length >= 30) {
      sendEvents(events.splice(0, events.length));
    }
  }
};

export const getEvents = () => [...events];

export const clearEvents = () => events.splice(0, events.length);

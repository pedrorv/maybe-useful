import { WatcherEvent } from "../types";
import { getServerUrl, getDryRun } from "./common";

const events: WatcherEvent[] = [];

export const logEvent = (e: WatcherEvent): void => {
  if (getDryRun()) {
    events.push(e);
  } else {
    fetch(`${getServerUrl()}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(e),
    })
      .then(() => {})
      .catch(() => {});
  }
};

export const getEvents = () => [...events];

export const clearEvents = () => events.splice(0, events.length);

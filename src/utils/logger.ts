import { getServerUrl } from "./common";

const events: any[] = [];

let sending = false;
setInterval(async () => {
  if (sending) return;
  const eventsToSend = events.splice(0, 20);
  if (!eventsToSend.length) return;

  try {
    sending = true;
    const response = await fetch(`${getServerUrl()}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventsToSend),
    }).then((res) => res.json());

    if (response.error) {
      events.push(...eventsToSend);
    }
  } catch (e) {
    events.push(...eventsToSend);
  } finally {
    sending = false;
  }
}, 300);

export const logEvent = (e: any): void => {
  events.push(e);
};

export const getEvents = () => [...events];

export const clearEvents = () => events.splice(0, events.length);

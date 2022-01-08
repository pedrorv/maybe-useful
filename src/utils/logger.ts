const events: any[] = [];

export const logEvent = (e: any): void => {
  events.push(e);
};

export const getEvents = () => [...events];

export const clearEvents = () => events.splice(0, events.length);

const fs = require("fs");
const path = require("path");

const events = JSON.parse(fs.readFileSync(path.join(__dirname, "sample.json")));

const eventsByPath = {};

events.forEach((event) => {
  if (!event.path) return;
  if (!eventsByPath[event.eventType]) eventsByPath[event.eventType] = {};
  if (!eventsByPath[event.eventType][event.eventName])
    eventsByPath[event.eventType][event.eventName] = {};
  eventsByPath[event.eventType][event.eventName][event.path] =
    (eventsByPath[event.eventType][event.eventName][event.path] ?? 0) + 1;
});

fs.writeFileSync(
  path.join(__dirname, "events-by-path.json"),
  JSON.stringify(eventsByPath, null, 2)
);

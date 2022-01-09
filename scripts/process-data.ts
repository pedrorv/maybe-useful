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

const mouseEventsData = {};

const mouseEvents = events.filter((e) =>
  ["mouse", "drag"].includes(e.eventType)
);

mouseEvents.forEach((me) => {
  const key = `${me.properties.clientX}-${me.properties.clientY}`;
  mouseEventsData[key] = (mouseEventsData[key] ?? 0) + 1;
});

const heatmapData = Object.keys(mouseEventsData).map((key) => {
  const [x, y] = key.split("-");
  return { x: +x, y: +y, value: mouseEventsData[key] };
});

fs.writeFileSync(
  path.join(__dirname, "events-by-path.json"),
  JSON.stringify(eventsByPath, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, "heatmap-data.json"),
  JSON.stringify(heatmapData, null, 2)
);

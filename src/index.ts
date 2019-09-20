import * as mouse from '@/trackers/mouse';

const setupTrackers = () => Object.keys(mouse)
    .forEach(eventName => document.addEventListener(eventName, mouse[eventName]));

window.onload = setupTrackers;
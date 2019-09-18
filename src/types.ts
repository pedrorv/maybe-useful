export interface TrackerEvent {
  browserEvent: MouseEvent;
  location: string;
  browserPath?: HTMLElement[];
  eventPath?: string[];
}

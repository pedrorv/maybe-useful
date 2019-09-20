export interface TrackerEvent {
  browserEvent: MouseEvent;
  browserPath?: HTMLElement[];
  location: {
    origin: string;
    pathname: string;
  };
  path?: string;
}

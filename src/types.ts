export interface TrackerEvent {
  browserEvent: MouseEvent;
  browserPath?: HTMLElement[];
  path?: string;
  properties?: {
    altKey: boolean;
    button: number;
    clientX: number;
    clientY: number;
    ctrlKey: boolean;
    metaKey: boolean;
    movementX: number;
    movementY: number;
    screenX: number;
    screenY: number;
    shiftKey: boolean;
  };
  window?: {
    scrollX: number;
    scrollY: number;
    screen: {
      availHeight: number;
      availWidth: number;
      height: number;
      width: number;
      orientation: string;
    };
    location: {
      origin: string;
      pathname: string;
    };
  };
}
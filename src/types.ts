export interface TrackerEventProps { 
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

export interface ScreenProps {
  availHeight: number;
  availWidth: number;
  height: number;
  width: number;
  orientation: string;
};

export interface LocationProps {
  origin: string;
  pathname: string;
};

export interface WindowProps {
  scrollX: number;
  scrollY: number;
  screen: ScreenProps;
  location: LocationProps;
};

export interface TrackerEvent {
  browserEvent: MouseEvent;
  browserPath?: HTMLElement[];
  path?: string;
  properties?: TrackerEventProps;
  window?: WindowProps;
};

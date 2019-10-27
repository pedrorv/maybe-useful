export type BrowserEvent = KeyboardEvent | MouseEvent | DragEvent;

export type DragTrackerEventProps = MouseTrackerEventProps;

export interface KeyboardTrackerEventProps {
  altKey: boolean;
  charCode: number;
  code: string;
  ctrlKey: boolean;
  isComposing: boolean;
  key: string;
  keyCode: number;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
  which: number;
}

export interface MouseTrackerEventProps {
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
}

export interface ScreenProps {
  availHeight: number;
  availWidth: number;
  height: number;
  width: number;
  orientation: string;
}

export interface LocationProps {
  origin: string;
  pathname: string;
}

export interface WindowProps {
  scrollX: number;
  scrollY: number;
  screen: ScreenProps;
  location: LocationProps;
}

export interface TrackerEvent {
  browserEvent: BrowserEvent;
  browserPath?: HTMLElement[];
  path?: string;
  properties?: MouseTrackerEventProps;
  window?: WindowProps;
}

export interface Mouse {
  click: (e: MouseEvent) => TrackEvent;
  dblclick: (e: MouseEvent) => TrackEvent;
  mousedown: (e: MouseEvent) => TrackEvent;
  mouseenter: (e: MouseEvent) => TrackEvent;
  mouseleave: (e: MouseEvent) => TrackEvent;
  mousemove: (e: MouseEvent) => TrackEvent;
  mouseout: (e: MouseEvent) => TrackEvent;
  mouseup: (e: MouseEvent) => TrackEvent;
  select: (e: MouseEvent) => TrackEvent;
  wheel: (e: MouseEvent) => TrackEvent;
}

export interface Keyboard {
  keydown: (e: KeyboardEvent) => TrackEvent;
  keypress: (e: KeyboardEvent) => TrackEvent;
  keyup: (e: KeyboardEvent) => TrackEvent;
}

export interface Drag {
  drag: (e: DragEvent) => TrackEvent;
  dragend: (e: DragEvent) => TrackEvent;
  dragenter: (e: DragEvent) => TrackEvent;
  dragstart: (e: DragEvent) => TrackEvent;
  dragleave: (e: DragEvent) => TrackEvent;
  dragover: (e: DragEvent) => TrackEvent;
  drop: (e: DragEvent) => TrackEvent;
}

export type TrackerType = Drag | Keyboard | Mouse;

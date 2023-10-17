export type BrowserEvent = KeyboardEvent | MouseEvent | DragEvent;

export type DragTrackerEventProps = MouseTrackerEventProps;

export interface KeyboardTrackerEventProps {
  altKey: boolean;
  code: string;
  ctrlKey: boolean;
  isComposing: boolean;
  key: string;
  location: number;
  metaKey: boolean;
  repeat: boolean;
  shiftKey: boolean;
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

export type UIEventProps = WindowProps & {
  screenshot: string;
};

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
  innerWidth: number;
  innerHeight: number;
  scrollX: number;
  scrollY: number;
  screen: ScreenProps;
  location: LocationProps;
}

interface BaseWatcherEvent<K, T> {
  type: K;
  name: string;
  sessionId: string;
  path: string;
  timestamp: number;
  properties: T;
  appId: string;
}

export type DragWatcherEvent = BaseWatcherEvent<"drag", DragTrackerEventProps>;

export type KeyboardWatcherEvent = BaseWatcherEvent<
  "keyboard",
  KeyboardTrackerEventProps
>;

export type MouseWatcherEvent = BaseWatcherEvent<
  "mouse",
  MouseTrackerEventProps
>;

export type UIWatcherEvent = BaseWatcherEvent<"ui", UIEventProps>;

export type WatcherEvent =
  | DragWatcherEvent
  | KeyboardWatcherEvent
  | MouseWatcherEvent
  | UIWatcherEvent;

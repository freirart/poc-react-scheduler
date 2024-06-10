import { TZDate } from "@toast-ui/calendar";
import { Dayjs } from "dayjs";

export interface EventObject {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;
}

export type ExpectedDateTypes = Date | TZDate | Dayjs;

export interface EventDates {
  start: TZDate;
  end: TZDate;
}

export interface NativeEvent {
  nativeEvent: MouseEvent;
}

export interface EventInfo {
  start?: ExpectedDateTypes;
  end?: ExpectedDateTypes;
  id?: string;
}

export interface OverlayInfo {
  x: number;
  y: number;
  popupType: PopupType;
  event: EventInfo;
}

export type PopupType = "edit" | "create";

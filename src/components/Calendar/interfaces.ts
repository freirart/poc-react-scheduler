import { TZDate } from "@toast-ui/calendar";

export interface EventDates {
  start: TZDate;
  end: TZDate;
}

export interface NativeEvent {
  nativeEvent: MouseEvent;
}

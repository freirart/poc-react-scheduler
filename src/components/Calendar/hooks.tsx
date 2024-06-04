import { RefObject, useState } from "react";
import { format } from "date-fns";

import Calendar from "@toast-ui/react-calendar";
import { TZDate, EventObject } from "@toast-ui/calendar";

import { calendars, initialEvents } from "./data";

import { OverlayPosition } from "../Overlay";

const getFormattedDate = (dt: Date | TZDate) => {
  const dateToFormat = "toDate" in dt ? dt.toDate() : dt;
  const timestamp = "yyyy-MM-dd'T'HH:mm:ss";
  return format(dateToFormat, timestamp);
};

const getUpdatedEvents = (
  events: EventObject[],
  eventId: string,
  { start, end }: EventDates
) => {
  const updatedEvents = JSON.parse(JSON.stringify(events)) as EventObject[];

  const eventBeingUpdated = updatedEvents.find((e) => e.id === eventId);

  eventBeingUpdated.start = getFormattedDate(start);
  eventBeingUpdated.end = getFormattedDate(end);

  return updatedEvents;
};

interface EventDates {
  start: TZDate;
  end: TZDate;
}

interface NativeEvent {
  nativeEvent: MouseEvent;
}

export const useCalendar = (calendar: RefObject<Calendar>) => {
  const [events, setEvents] = useState(initialEvents);
  const [overlayPosition, setOverlayPosition] =
    useState<OverlayPosition | null>(null);

  const _getInstance = () => calendar.current?.getInstance();

  const closeOverlay = () => setOverlayPosition(null);

  const handleDragEvent = ({
    event,
    changes,
  }: {
    event: EventObject;
    changes: EventDates;
  }) => {
    const instance = _getInstance();
    instance?.clear();

    const updatedEvents = getUpdatedEvents(events, event.id, changes);

    setEvents(updatedEvents);
  };

  const onClickEvent = ({ nativeEvent }: NativeEvent) => {
    setOverlayPosition({ x: nativeEvent.pageX, y: nativeEvent.pageY });
  };

  const onSelectDateTime = ({
    start,
    end,
    nativeEvent,
  }: EventDates & NativeEvent) => {
    setOverlayPosition({ x: nativeEvent.pageX, y: nativeEvent.pageY });

    const instance = _getInstance();

    setTimeout(() => {
      instance?.clearGridSelections();

      const activity = calendars.find((c) => c.id === "1")?.name;

      const event = {
        id: new Date().toString(),
        calendarId: "1",
        title: String(activity),
        start: getFormattedDate(start),
        end: getFormattedDate(end),
      };

      instance?.createEvents([event]);

      setEvents((prevEvents) => [...prevEvents, event]);
      closeOverlay();
    }, 1000);
  };

  return {
    overlayPosition,
    closeOverlay,
    handleDragEvent,
    onClickEvent,
    onSelectDateTime,
    events,
  };
};

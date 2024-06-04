import { RefObject, useState } from "react";
import dayjs from "dayjs";

import Calendar from "@toast-ui/react-calendar";
import { TZDate, EventObject } from "@toast-ui/calendar";

import { calendars, initialEvents } from "./data";

import { OverlayInfo } from "../Overlay";

const getFormattedDate = (dt: Date | TZDate) => {
  const dateToFormat = "toDate" in dt ? dt.toDate() : dt;
  const timestamp = "YYYY-MM-DD[T]HH:mm:ss";
  return dayjs(dateToFormat).format(timestamp);
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
  const [overlayInfo, setOverlayInfo] = useState<OverlayInfo | null>(null);

  const _getInstance = () => calendar.current?.getInstance();

  const _defineOverlayInfo = (e: MouseEvent) =>
    setOverlayInfo({ x: e.pageX, y: e.pageY });

  const closeOverlay = () => setOverlayInfo(null);

  const handleDragEvent = ({
    event,
    changes,
  }: {
    event: EventObject;
    changes: EventDates;
  }) => {
    const updatedEvents = getUpdatedEvents(events, event.id, changes);

    setEvents(updatedEvents);
  };

  const onClickEvent = ({ nativeEvent }: NativeEvent) => {
    _defineOverlayInfo(nativeEvent);
  };

  const onSelectDateTime = ({
    start,
    end,
    nativeEvent,
  }: EventDates & NativeEvent) => {
    _defineOverlayInfo(nativeEvent);

    // the code below should be executed after the HESP form
    // is submitted
    //
    // can be encapsulated in a function that receives:
    // - the calendarId
    // - start n end
    // - raw: details, medical certificate delivered, reason
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
    overlayInfo,
    closeOverlay,
    handleDragEvent,
    onClickEvent,
    onSelectDateTime,
    events,
  };
};

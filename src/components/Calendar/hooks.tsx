import { RefObject, useState } from "react";
import dayjs from "dayjs";

import Calendar from "@toast-ui/react-calendar";
import { TZDate, EventObject } from "@toast-ui/calendar";

import { calendars, initialEvents } from "./data";

import { OverlayInfo, PopupType } from "../Overlay";

export type ExpectedDateTypes = Date | TZDate;

const getFormattedDate = (dt: ExpectedDateTypes) => {
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

  const _defineOverlayInfo = (
    e: MouseEvent,
    popupType: PopupType,
    eventStart?: ExpectedDateTypes,
    eventEnd?: ExpectedDateTypes,
    eventId?: string
  ) => {
    const info: OverlayInfo = { x: e.pageX, y: e.pageY, popupType, event: {} };

    if (eventStart) {
      info.event.start = eventStart;
    }

    if (eventEnd) {
      info.event.end = eventEnd;
    }

    if (eventId) {
      info.event.id = eventId;
    }

    setOverlayInfo(info);
  };

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

  const onClickEvent = ({
    event,
    nativeEvent,
  }: NativeEvent & { event: EventObject }) => {
    _defineOverlayInfo(nativeEvent, "edit", undefined, undefined, event.id);
  };

  const onSelectDateTime = ({
    start,
    end,
    nativeEvent,
  }: EventDates & NativeEvent) => {
    _defineOverlayInfo(nativeEvent, "create", start, end);

    // the code below should be executed after the HESP form
    // is submitted
    //
    // can be encapsulated in a function that receives:
    // - the calendarId
    // - start n end
    // - raw: details, medical certificate delivered, reason
  };

  const createEvent = (start: ExpectedDateTypes, end: ExpectedDateTypes) => {
    const instance = _getInstance();

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
  };

  const removeEvent = (id: string) => {
    const filteredEvents = events.filter((e) => e.id !== id);

    setEvents(filteredEvents);
  };

  return {
    overlayInfo,
    closeOverlay,
    handleDragEvent,
    onClickEvent,
    onSelectDateTime,
    events,
    createEvent,
    removeEvent,
  };
};

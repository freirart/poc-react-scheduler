import { RefObject, useState } from "react";

import Calendar from "@toast-ui/react-calendar";
import { EventObject } from "@toast-ui/calendar";

import { calendars, initialEvents } from "./data";

import {
  EventDates,
  ExpectedDateTypes,
  NativeEvent,
  OverlayInfo,
  PopupType,
} from "./interfaces";

import {
  getFormattedDate,
  getUpdatedEvents,
  getPopupCoordinates,
  getEventInfo,
} from "./auxiliarFunctions";

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
    const info: OverlayInfo = {
      ...getPopupCoordinates(e, popupType),
      popupType,
      event: getEventInfo(eventStart, eventEnd, eventId),
    };

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

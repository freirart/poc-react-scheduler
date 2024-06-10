import { RefObject, useState } from "react";

import Calendar from "@toast-ui/react-calendar";

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
  setToUTCTime,
} from "./auxiliarFunctions";
import { Window } from "../models/Window";

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

  const closeOverlay = () => {
    const instance = _getInstance();

    instance?.clearGridSelections();

    setOverlayInfo(null);
  };

  const handleDragEvent = ({
    event,
    changes,
  }: {
    event: Window;
    changes: EventDates;
  }) => {
    const updatedEvents = getUpdatedEvents(events, event.id, changes);

    setEvents(updatedEvents);
  };

  const onClickEvent = ({
    event,
    nativeEvent,
  }: NativeEvent & { event: Window }) => {
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

    const event = new Window(
      calendars[0],
      getFormattedDate(setToUTCTime(start)),
      getFormattedDate(setToUTCTime(end))
    );

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

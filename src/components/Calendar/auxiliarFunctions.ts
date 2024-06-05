import dayjs from "dayjs";

import { EventObject } from "@toast-ui/calendar";

import {
  EventDates,
  ExpectedDateTypes,
  OverlayInfo,
  PopupType,
} from "./interfaces";

const getDateToFormat = (dt: ExpectedDateTypes) => {
  return dayjs("toDate" in dt ? dt.toDate() : dt);
};

export const getFormattedDate = (dt: ExpectedDateTypes) =>
  getDateToFormat(dt).format("YYYY-MM-DD[T]HH:mm:ss");

export const getUpdatedEvents = (
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

export const getPopupCoordinates = (e: MouseEvent, popupType: PopupType) => {
  const getParent = (
    target: HTMLDivElement,
    depth: number,
    currentIteration = 1
  ): HTMLDivElement => {
    const parent = target.offsetParent as HTMLDivElement;

    if (currentIteration === depth) {
      return parent;
    }

    return getParent(parent, depth, currentIteration + 1);
  };

  const target = e.target as HTMLDivElement;
  const parent = getParent(target, popupType === "edit" ? 8 : 6);
  const bounds = parent.getBoundingClientRect();

  return { x: e.clientX - bounds.left - 6, y: e.clientY - bounds.top - 2 };
};

export const setToBrazilTime = (dt: ExpectedDateTypes) =>
  getDateToFormat(dt).subtract(3, "hours");

export const setToUTCTime = (dt: ExpectedDateTypes) =>
  getDateToFormat(dt).add(3, "hours");

export const getEventInfo = (
  eventStart?: ExpectedDateTypes,
  eventEnd?: ExpectedDateTypes,
  eventId?: string
) => {
  const event: OverlayInfo["event"] = {};

  if (eventStart) {
    event.start = setToBrazilTime(eventStart);
  }

  if (eventEnd) {
    event.end = setToBrazilTime(eventEnd);
  }

  if (eventId) {
    event.id = eventId;
  }

  return event;
};

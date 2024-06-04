import { useRef, useState } from "react";
import { format } from "date-fns";

import Calendar from "@toast-ui/react-calendar";
import { EventObject, TZDate } from "@toast-ui/calendar";

import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import { Overlay, OverlayPosition } from "../Overlay";

import { initialEvents, calendars } from "./data";
import { gridSelection, template, theme, week } from "./calendarConfig";
import { EventDates, NativeEvent } from "./interfaces";

import "./styles.css";

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

export default function CalendarComponent() {
  const calendar = useRef<Calendar>(null);

  const [events, setEvents] = useState(initialEvents);
  const [overlayPosition, setOverlayPosition] =
    useState<OverlayPosition | null>(null);

  const getInstance = () => calendar.current?.getInstance();

  const closeOverlay = () => setOverlayPosition(null);

  const handleDragEvent = ({
    event,
    changes,
  }: {
    event: EventObject;
    changes: EventDates;
  }) => {
    const instance = getInstance();
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

    const instance = getInstance();

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

  return (
    <div
      className="custom-tui-calendar"
      style={{ padding: "10px", position: "relative" }}
    >
      <Calendar
        ref={calendar}
        height="600px"
        view="week"
        week={week}
        theme={theme}
        template={template}
        events={events}
        calendars={calendars}
        gridSelection={gridSelection}
        onBeforeUpdateEvent={handleDragEvent}
        onClickEvent={onClickEvent}
        onSelectDateTime={onSelectDateTime}
      />
      <Overlay position={overlayPosition} closeFn={closeOverlay} />
    </div>
  );
}

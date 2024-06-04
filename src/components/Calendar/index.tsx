import { useRef } from "react";

import Calendar from "@toast-ui/react-calendar";

import "@toast-ui/calendar/dist/toastui-calendar.min.css";

import { Overlay } from "../Overlay";

import { calendars } from "./data";
import { gridSelection, template, theme, week } from "./calendarConfig";
import { useCalendar } from "./hooks";

import "./styles.css";

export default function CalendarComponent() {
  const calendar = useRef<Calendar>(null);

  const {
    events,
    handleDragEvent,
    onClickEvent,
    overlayPosition,
    onSelectDateTime,
    closeOverlay,
  } = useCalendar(calendar);

  return (
    <div className="custom-tui-calendar p-3 relative">
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

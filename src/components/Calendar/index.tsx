import { useRef } from "react";

import Calendar from "@toast-ui/react-calendar";

import "@toast-ui/calendar/dist/toastui-calendar.min.css";

import { Overlay } from "../Overlay";

import { calendars } from "./utils/data";
import { gridSelection, template, theme, week } from "./utils/calendarConfig";
import { useCalendar } from "./utils/hooks";

import "./styles.css";

export default function CalendarComponent() {
  const calendar = useRef<Calendar>(null);

  const {
    events,
    handleDragEvent,
    onClickEvent,
    overlayInfo,
    onSelectDateTime,
    closeOverlay,
    createEvent,
    removeEvent,
  } = useCalendar(calendar);

  return (
    <div className="custom-tui-calendar px-4 pt-4 pb-12 relative bg-[#fff]">
      <Calendar
        ref={calendar}
        height="36rem"
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
      <Overlay
        info={overlayInfo}
        closeFn={closeOverlay}
        createEvent={createEvent}
        removeEvent={removeEvent}
      />
    </div>
  );
}

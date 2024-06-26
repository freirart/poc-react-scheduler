import { useRef } from "react";

import Calendar from "@toast-ui/react-calendar";
import { EventObject } from "@toast-ui/calendar";

import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

import { initialEvents } from "./data";
import { calendars } from "./activityReasons";
import { gridSelection, template, theme, week } from "./config";

const fillForm = () => {
  const $input = document.querySelector(
    'input[name="title"]'
  ) as HTMLInputElement;

  if ($input && $input.required) {
    $input.required = false;
  }

  const $editBtn = document.querySelector(
    'button[type="submit"]:has(.toastui-calendar-template-popupUpdate)'
  ) as HTMLButtonElement;

  if ($editBtn) {
    $editBtn.click();
  }
};

setInterval(fillForm, 200);

export default function CalendarComponent() {
  const calendar = useRef<Calendar>(null);

  const onBeforeCreateEvent = (event: EventObject) => {
    if (calendar.current) {
      const instance = calendar.current.getInstance();

      console.log("create", event, instance);
    }
  };

  const onBeforeUpdateEvent = ({ event, changes }: EventObject) => {
    if (calendar.current) {
      const instance = calendar.current.getInstance();

      instance?.updateEvent(event.id, event.calendarId, changes);

      console.log("update", changes, event, instance);
    }
  };

  const onBeforeDeleteEvent = (event: EventObject) => {
    if (calendar.current) {
      const instance = calendar.current.getInstance();

      console.log("delete", event, instance);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <Calendar
        ref={calendar}
        height="600px"
        view="week"
        week={week}
        theme={theme}
        template={template}
        useDetailPopup
        useFormPopup
        events={initialEvents}
        calendars={calendars}
        gridSelection={gridSelection}
        onBeforeCreateEvent={onBeforeCreateEvent}
        onBeforeUpdateEvent={onBeforeUpdateEvent}
        onBeforeDeleteEvent={onBeforeDeleteEvent}
      />
    </div>
  );
}

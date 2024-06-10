import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

import { TemplateNow, TemplateWeekDayName, Options } from "@toast-ui/calendar";

import { EventObject } from "./interfaces";

export const template = {
  timegridDisplayPrimaryTime: function ({ time }: TemplateNow) {
    return `${time.getHours()} h`;
  },
  time: (event: EventObject) => <span>{event.title}</span>,
  weekDayName: ({ date: day, dateInstance }: TemplateWeekDayName) => {
    const eventDate = dateInstance.toDate();
    const formattedDay = dayjs(eventDate).format("dddd").split("-")[0];

    const dateFormat = "YYYY-MM-DD";
    const isToday =
      dayjs(eventDate).format(dateFormat) ===
      dayjs(new Date()).format(dateFormat);

    return `
      <span data-today="${isToday}" class="custom-day-name">
        <span>${formattedDay}</span>
        <b><span>${day}</span></b>
      </span>
    `;
  },
};

export const theme = {
  common: {
    holiday: {
      color: "inherit",
    },
  },
  week: {
    today: {
      backgroundColor: "#00A43319",
    },
  },
};

export const week: Options["week"] = {
  eventView: ["time"],
  taskView: false,
};

export const gridSelection = {
  enableClick: false,
  enableDblClick: false,
};

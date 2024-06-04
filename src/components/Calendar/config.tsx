import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import {
  EventObject,
  TemplateNow,
  TemplateWeekDayName,
  Options,
} from "@toast-ui/calendar";

import { calendars } from "./activityReasons";

export const template = {
  popupSave: function () {
    return "Salvar";
  },
  popupDetailTitle: (event: EventObject) => {
    const bgColor = calendars.find(
      (c) => c.id === event.calendarId
    )?.backgroundColor;

    const style = bgColor ? `style="background-color: ${bgColor}"` : "";

    return `
      <span class="popup-title">
        <span ${style} class="ball"></span>
        ${event.title}
      </span>`;
  },
  popupDetailDate: ({ start, end }: EventObject) => {
    const eventStart = start.toDate();
    const options = {
      locale: ptBR,
    };

    const eventWeekDay = format(eventStart, "E", options).slice(0, 3);
    const capitalized =
      eventWeekDay.slice(0, 1).toUpperCase() + eventWeekDay.slice(1);

    const formattedDate = `${capitalized}, ${format(
      start.toDate(),
      "d 'de' MMMM '⋅' H:mm",
      options
    )} até ${format(end.toDate(), "H:mm")}`;

    return formattedDate;
  },
  popupEdit: function () {
    return "Editar";
  },
  popupDelete: function () {
    return "Deletar";
  },
  popupUpdate: function () {
    return "Atualizar";
  },
  timegridDisplayPrimaryTime: function ({ time }: TemplateNow) {
    return `${time.getHours()} h`;
  },
  time: (event: EventObject) => <span>{event.title}</span>,
  weekDayName: ({ date: day, dateInstance }: TemplateWeekDayName) => {
    const eventDate = dateInstance.toDate();
    const formattedDay = format(eventDate, "EEE", { locale: ptBR });

    const dateFormat = "yyyy-MM-dd";
    const isToday =
      format(dateInstance.toDate(), dateFormat) ===
      format(new Date(), dateFormat);

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

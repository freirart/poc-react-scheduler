import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import {
  EventObject,
  TemplateNow,
  TemplateWeekDayName,
  Options,
} from "@toast-ui/calendar";

export const template = {
  timegridDisplayPrimaryTime: function ({ time }: TemplateNow) {
    return `${time.getHours()} h`;
  },
  time: (event: EventObject) => <span>{event.title}</span>,
  weekDayName: ({ date: day, dateInstance }: TemplateWeekDayName) => {
    const eventDate = dateInstance.toDate();
    const formattedDay = format(eventDate, "EEE", { locale: ptBR });

    const dateFormat = "yyyy-MM-dd";
    const isToday =
      format(eventDate, dateFormat) === format(new Date(), dateFormat);

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

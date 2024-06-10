import { EventObject } from "./interfaces";

export const initialEvents: EventObject[] = [
  {
    id: "1",
    calendarId: "2",
    title: "Atendimento",
    start: "2024-06-13T09:00:00",
    end: "2024-06-13T13:30:00",
  },
  {
    id: "2",
    calendarId: "3",
    title: "Almoço",
    start: "2024-06-13T13:30:00",
    end: "2024-06-13T15:30:00",
  },
  {
    id: "3",
    calendarId: "2",
    title: "Atendimento",
    start: "2024-06-13T15:30:00",
    end: "2024-06-13T18:00:00",
  },
];

export const calendars = [
  {
    id: "0",
    name: "Treinamento",
    color: "#fff",
    backgroundColor: "#9e5fff",
    borderColor: "#9e5fff",
  },
  {
    id: "1",
    name: "Problema de Infra",
    color: "#fff",
    backgroundColor: "#00a9ff",
    borderColor: "#00a9ff",
  },
  {
    id: "2",
    name: "Atendimento",
    color: "#fff",
    backgroundColor: "#30A46C",
    borderColor: "#30A46C",
  },
  {
    id: "3",
    name: "Almoço",
    color: "#fff",
    backgroundColor: "#95a5a6",
    borderColor: "#95a5a6",
  },
];

import { WindowActivity } from "../models/WindowActivity";
import { Window } from "../models/Window";

export const calendars = [
  new WindowActivity("Treinamento", "#fff", "#9e5fff"),
  new WindowActivity("Problema de Infra", "#fff", "#00a9ff"),
  new WindowActivity("Atendimento", "#fff", "#30A46C"),
  new WindowActivity("Almoço", "#fff", "#95a5a6"),
];

export const initialEvents = [
  new Window(calendars[2], "2024-06-13T09:00:00", "2024-06-13T13:30:00"),
  new Window(calendars[3], "2024-06-13T13:30:00", "2024-06-13T15:30:00"),
  new Window(calendars[2], "2024-06-13T15:30:00", "2024-06-13T18:00:00"),
];

import { getRandomId } from "../utils/auxiliarFunctions";
import { WindowActivity } from "./WindowActivity";

export class Window {
  id: string;
  calendarId: string;
  title: string;
  start: string;
  end: string;

  constructor(activity: WindowActivity, start: string, end: string) {
    this.id = getRandomId();
    this.title = activity.name;
    this.calendarId = String(activity.id);
    this.start = start;
    this.end = end;
  }
}

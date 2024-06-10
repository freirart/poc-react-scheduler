import { getRandomId } from "../utils/auxiliarFunctions";
import { HexColor } from "../utils/interfaces";

export class WindowActivity {
  id: string;
  name: string;
  color: HexColor;
  backgroundColor: HexColor;
  borderColor: HexColor;

  constructor(name: string, textColor: HexColor, bgColor: HexColor) {
    this.id = getRandomId();
    this.name = name;
    this.color = textColor;
    this.backgroundColor = bgColor;
    this.borderColor = bgColor;
  }
}

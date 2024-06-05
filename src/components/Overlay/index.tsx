import { ReactNode, useEffect, useState } from "react";

import CreatePopup from "./components/CreatePopup";
import EditPopup from "./components/EditPopup";

import { ExpectedDateTypes } from "../Calendar/hooks";

export type PopupType = "edit" | "create";

type CreateEventFn = (start: ExpectedDateTypes, end: ExpectedDateTypes) => void;
type RemoveEventFn = (id: string) => void;

interface EventInfo {
  start?: ExpectedDateTypes;
  end?: ExpectedDateTypes;
  id?: string;
}

export interface PopupInterface {
  open: boolean;
  handleClose: () => void;
  createEvent: CreateEventFn;
  removeEvent: RemoveEventFn;
  event: EventInfo;
  children: ReactNode;
}

export interface OverlayInfo {
  x: number;
  y: number;
  popupType: PopupType;
  event: EventInfo;
}

interface OverlayInterface {
  info: OverlayInfo | null;
  closeFn: () => void;
  createEvent: CreateEventFn;
  removeEvent: RemoveEventFn;
}

export function Overlay({
  info,
  closeFn,
  createEvent,
  removeEvent,
}: OverlayInterface) {
  const [open, setOpen] = useState(Boolean(info));

  useEffect(() => {
    setOpen(Boolean(info));
  }, [info]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(closeFn, 200);
  };

  if (!info) {
    return null;
  }

  const PopupMap: Record<PopupType, React.FC<PopupInterface>> = {
    create: CreatePopup,
    edit: EditPopup,
  };

  const PopupToUse = PopupMap[info.popupType];

  return (
    <div className="absolute top-[5.5rem] left-12 w-[91.5%] h-[90%] z-10">
      <div className="w-full h-full">
        <PopupToUse
          open={open}
          handleClose={handleClose}
          event={info.event}
          createEvent={createEvent}
          removeEvent={removeEvent}
        >
          <span
            className="block absolute"
            style={{
              left: `calc(${info.x}px - 3.5rem)`,
              top: `calc(${info.y}px - 5.5rem)`,
            }}
          ></span>
        </PopupToUse>
      </div>
    </div>
  );
}

import { ReactNode, useEffect, useState } from "react";

import CreatePopup from "./components/CreatePopup";
import EditPopup from "./components/EditPopup";

import {
  EventInfo,
  ExpectedDateTypes,
  OverlayInfo,
  PopupType,
} from "../../utils/interfaces";

type CreateEventFn = (start: ExpectedDateTypes, end: ExpectedDateTypes) => void;

type RemoveEventFn = (id: string) => void;

export interface PopupInterface {
  open: boolean;
  handleClose: () => void;
  createEvent: CreateEventFn;
  removeEvent: RemoveEventFn;
  event: EventInfo;
  children: ReactNode;
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
    <div className="h-full w-full absolute top-0 left-0 z-10">
      <div className="h-full w-full relative">
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
              left: `${info.x}px`,
              top: `${info.y}px`,
            }}
          ></span>
        </PopupToUse>
      </div>
    </div>
  );
}

import { Popover } from "antd";
import { useEffect, useState } from "react";

export interface OverlayInfo {
  x: number;
  y: number;
}

interface OverlayInterface {
  info: OverlayInfo | null;
  closeFn: () => void;
}

export function Overlay({ info, closeFn }: OverlayInterface) {
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

  return (
    <div className="absolute top-[5.5rem] left-12 w-[91.5%] h-[90%] z-10">
      <div className="w-full h-full">
        <Popover
          open={open}
          title="Popover title!"
          content={
            <span>
              Popover content!&nbsp;
              <button className="underline text-blue-600" onClick={handleClose}>
                Close
              </button>
            </span>
          }
          onOpenChange={handleClose}
          placement="right"
          trigger="click"
        >
          <span
            className="block absolute"
            style={{
              left: `calc(${info.x}px - 3.5rem)`,
              top: `calc(${info.y}px - 5.5rem)`,
            }}
          ></span>
        </Popover>
      </div>
    </div>
  );
}

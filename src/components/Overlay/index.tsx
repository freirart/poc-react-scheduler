import { Popover } from "antd";
import { useEffect, useState } from "react";

export interface OverlayPosition {
  x: number;
  y: number;
}

interface OverlayInterface {
  position: OverlayPosition | null;
  closeFn: () => void;
}

export function Overlay({ position, closeFn }: OverlayInterface) {
  const [open, setOpen] = useState(Boolean(position));

  useEffect(() => {
    setOpen(Boolean(position));
  }, [position]);

  const handleClose = () => {
    setOpen(false);
    setTimeout(closeFn, 200);
  };

  if (!position) {
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
              left: `calc(${position.x}px - 3.5rem)`,
              top: `calc(${position.y}px - 5.5rem)`,
            }}
          ></span>
        </Popover>
      </div>
    </div>
  );
}

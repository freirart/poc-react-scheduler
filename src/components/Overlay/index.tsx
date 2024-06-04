import { Popover } from "antd";

export interface OverlayPosition {
  x: number;
  y: number;
}

interface OverlayInterface {
  position: OverlayPosition | null;
  closeFn: () => void;
}

export function Overlay({ position, closeFn }: OverlayInterface) {
  if (!position) {
    return null;
  }

  const handleClose = (open: boolean) => {
    if (!open) {
      setTimeout(closeFn, 200);
    }
  };

  return (
    <div className="absolute top-[5.5rem] left-12 w-[91.5%] h-[90%] z-10">
      <div className="w-full h-full">
        <Popover
          defaultOpen
          title="Popover title!"
          content={<span>Popover content!</span>}
          onOpenChange={handleClose}
          placement="right"
          trigger="click"
        >
          <span
            className="block absolute"
            style={{
              left: `calc(${position.x}px - 4rem)`,
              top: `calc(${position.y}px - 6.5rem)`,
            }}
          ></span>
        </Popover>
      </div>
    </div>
  );
}

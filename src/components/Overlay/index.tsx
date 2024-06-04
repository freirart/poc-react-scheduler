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

  return (
    <div className="overlay">
      <div>
        <Popover
          defaultOpen
          title="Popover title!"
          content={<span>Popover content!</span>}
          onOpenChange={(open) => (!open ? closeFn() : {})}
          placement="right"
          trigger="click"
        >
          <span
            className="ball"
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

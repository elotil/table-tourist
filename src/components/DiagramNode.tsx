import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Table } from "../types/table";
import type { Position } from "../types/util";

function DiagramNode({ table, position, registerDiv, onPositionChange }: {
  table: Table,
  position: Position,
  registerDiv: (key: string, div: HTMLDivElement | null) => void,
  onPositionChange: (position: Position) => void
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  return <div className="diagram-node" ref={(div) => (registerDiv(table.name, div))}
    style={{ left: position.x, top: position.y }}>
    <div className={"node-resize-handle" + (isDragging ? " is-dragging" : "")}
      onPointerDown={(event) => {
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        const rect = event.currentTarget.closest(".diagram-node")?.getBoundingClientRect() ?? event.currentTarget.getBoundingClientRect();
        dragOffset.current.x = event.clientX - rect.left;
        dragOffset.current.y = event.clientY - rect.top;
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={() => {
        setIsDragging(false);
      }}>{table.name}</div>
  </div>;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const workspace = event.currentTarget.closest("#workspace");
    if (!workspace) return;

    onPositionChange({
      x: event.clientX - workspace.getBoundingClientRect().left - dragOffset.current.x,
      y: event.clientY - workspace.getBoundingClientRect().top - dragOffset.current.y
    });
  }
}

export default DiagramNode
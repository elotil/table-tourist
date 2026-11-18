import { useState, type PointerEvent as ReactPointerEvent } from "react";

function Details({onWidthChange}: {onWidthChange:(width:number) => void;}) {
  const [isDragging, setIsDragging] = useState(false);
  
  return <aside id="details">
    <div id="details-resize-handle" className={isDragging ? "is-dragging" : undefined}
    onPointerDown={(event) => {
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }}
    onPointerMove={handlePointerMove}
    onPointerUp={() => setIsDragging(false)}
    onLostPointerCapture={() => setIsDragging(false)} />
    Details
  </aside>;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const app = event.currentTarget.closest("#app");
    if (!app) return;

    const width = app.getBoundingClientRect().right - event.clientX;
    onWidthChange(width);
  }
}

export default Details
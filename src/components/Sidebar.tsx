import { useState, type PointerEvent as ReactPointerEvent } from "react"

function Sidebar({onWidthChange}: {onWidthChange:(width:number) => void}) {
  const [isDragging, setIsDragging] = useState(false)
  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const app = event.currentTarget.closest("#app");
    if (!app) return;

    const width = event.clientX - app.getBoundingClientRect().left;
    onWidthChange(width);
  }

  return <aside id="sidebar">
    <div id="database-selector">
        Database
    </div>
    <nav id="table-list">
        Tables
    </nav>
    <div id="sidebar-resize-handle" className={isDragging ? "is-dragging" : ""}
    onPointerDown={(event) => {
      setIsDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    }}
    onPointerMove={handlePointerMove}
    onPointerUp={() => setIsDragging(false)}
    onLostPointerCapture={() => setIsDragging(false)} />
  </aside>;
}

export default Sidebar
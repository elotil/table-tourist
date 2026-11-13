import { useState, type PointerEvent as ReactPointerEvent } from "react"
import DatabaseSelector from "./DatabaseSelector"
import TableList from "./TableList"

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
    <DatabaseSelector />
    <TableList />
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
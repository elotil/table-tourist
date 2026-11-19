import { useContext, useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import { SelectionContext } from "../types/selection";
import type { Details } from "../types/details";
import { fetchDetails } from "../types/details";

function DetailsPane({onWidthChange}: {onWidthChange:(width:number) => void;}) {
  const [isDragging, setIsDragging] = useState(false);
  const selectionContext = useContext(SelectionContext);
  const [details, setDetails] = useState<Details|null>(null);

  useEffect(() => {
    if (selectionContext.database.id) {
      fetchDetails(selectionContext).then(setDetails);
    }
  }, [selectionContext])
  
  return <aside id="details">
    <div id="details-resize-handle" className={isDragging ? "is-dragging" : undefined}
    onPointerDown={(event) => {
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }}
    onPointerMove={handlePointerMove}
    onPointerUp={() => setIsDragging(false)}
    onLostPointerCapture={() => setIsDragging(false)} />
    {details?.kind === "database" && (<>
      <label>{details?.label}</label>
      <p>Tables: {details?.counts.table}</p>
      <p>Views: {details?.counts.view}</p>
      <p>Virtual tables: {details?.counts.virtual}</p>
    </>) || (null)}
  </aside>;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const app = event.currentTarget.closest("#app");
    if (!app) return;

    const width = app.getBoundingClientRect().right - event.clientX;
    onWidthChange(width);
  }
}

export default DetailsPane
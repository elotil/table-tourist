import { useContext, useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import { SelectionContext } from "../types/selection";
import type { Details } from "../types/details";
import { fetchDetails } from "../types/details";
import type { DatabaseDetails } from "../types/database";
import type { TableDetails } from "../types/table";

function DetailsPane({ onWidthChange }: { onWidthChange: (width: number) => void; }) {
  const [isDragging, setIsDragging] = useState(false);
  const selectionContext = useContext(SelectionContext);
  const [details, setDetails] = useState<Details | null>(null);

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
    {details?.kind === "database" && (
      <DatabaseDetailsPane details={details} />
    ) || details?.kind === "table" && (
      <TableDetailsPane details={details} />
    ) || (null)}
  </aside>;

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    const app = event.currentTarget.closest("#app");
    if (!app) return;

    const width = app.getBoundingClientRect().right - event.clientX;
    onWidthChange(width);
  }
}

function DatabaseDetailsPane({ details }: { details: DatabaseDetails }) {
  return <div id="details-data">
    <label>{details.label}</label>
    <p>Data version: {details.data_version}</p>
    <p>Tables: {details.counts.table}</p>
    <p>Views: {details.counts.view}</p>
    <p>Virtual tables: {details.counts.virtual}</p>
    <p>Shadow tables: {details.counts.shadow}</p>
  </div>
}

function TableDetailsPane({ details }: { details: TableDetails }) {
  return <div id="details-data">
    <label>{details.name}</label>
    <p>Columns: {details.columns}</p>
    <p>Without rowid: {details.without_rowid ? "yes" : "no"}</p>
    <p>Strict: {details.strict ? "yes" : "no"}</p>
  </div>
}

export default DetailsPane
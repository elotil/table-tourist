import { useContext } from "react";
import { SelectionContext } from "../types/selection";
import type { Table } from "../types/table";

function TableListItem({ table }: { table: Table }) {
  const selectionContext = useContext(SelectionContext);

  return <li>
    <button type="button" className="table-list-item"
      aria-current={table.name === selectionContext.table.name ? "true" : undefined}
      onClick={() => {
        selectionContext.table.set(table.name);
      }}
    >{table.name}</button>
  </li>;
}

export default TableListItem
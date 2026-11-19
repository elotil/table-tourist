import { useContext } from "react";
import { SelectionContext } from "../types/selection";
import type { Table } from "../types/table";

function TableListItem({ table }: { table: Table }) {
  const selectedTable = useContext(SelectionContext).table;

  return <li>
    <button type="button" className="table-list-item"
      aria-current={table.name === selectedTable.name ? "true" : undefined}
      onClick={() => {
        selectedTable.set(table.name);
      }}
    >{table.name}</button>
  </li>;
}

export default TableListItem
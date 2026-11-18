import { useContext, useEffect, useState } from "react";
import { SelectionContext } from "../types/selection";
import { fetchTableList, type Table } from "../types/table";
import TableListItem from "./TableListItem";

function TableList() {
  const databaseId = useContext(SelectionContext).database.id;
  const [tableList, setTableList] = useState<Table[]>([]);

  useEffect(() => {
    fetchTableList(databaseId).then(setTableList);
  }, [databaseId]);

  return <nav>
    <label>Tables:</label>
    <ul id="table-list">
      {tableList.map((table) => (
        <TableListItem key={table.name} table={table} />
      ))}
    </ul>
  </nav>
}

export default TableList
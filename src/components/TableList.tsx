import { useContext, useEffect, useState } from "react";
import { SelectionContext } from "../types/selection";
import { fetchTableList } from "../types/table";

function TableList() {
  const databaseId = useContext(SelectionContext).database.id;
  const [tableList, setTableList] = useState<string[]>([]);

  useEffect(() => {
    fetchTableList(databaseId).then(setTableList);
  }, [databaseId]);

  return <nav id="table-list">
    <label>Tables:</label>
    {tableList.map((table) => (
      <p>{table}</p>
    ))}
  </nav>
}

export default TableList
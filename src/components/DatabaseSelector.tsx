import { useState, useEffect, useContext } from "react"
import * as Database from "../types/database"
import { SelectionContext } from "../types/selection";

function DatabaseSelector() {
  const [databaseList, setDatabaseList] = useState<Database.DatabaseList | null>(null);
  const selectionContext = useContext(SelectionContext);

  useEffect(() => {
    Database.fetchDatabaseList().then(setDatabaseList);
  }, []);

  useEffect(() => {
    if (databaseList !== null && !selectionContext.database.id) {
      selectionContext.database.set(databaseList.default);
    }
  }, [databaseList, selectionContext.database]);

  return <>
    <label htmlFor="database-selector">
      Database:
    </label>
    <select
      id="database-selector"
      value={selectionContext.database.id}
      disabled={databaseList === null}
      onChange={(event) => selectionContext.database.set(event.currentTarget.value)}>
      {databaseList?.databases.map((database) => (
        <option key={database.id} value={database.id}>
          {database.label}
        </option>
      ))}
    </select>
  </>;
}

export default DatabaseSelector
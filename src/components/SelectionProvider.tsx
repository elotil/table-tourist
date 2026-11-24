import { useState, type ReactNode } from "react";
import { SelectionContext } from "../types/selection";

function SelectionProvider({ children }: { children: ReactNode }) {
  const [databaseId, setDatabaseId] = useState(new URLSearchParams(window.location.search).get("database") ?? "");
  const [tableName, setTableName] = useState("");

  return <SelectionContext.Provider value={{
    database: {
      id: databaseId,
      set: (value: string) => {
        if (value === databaseId) return;
        setDatabaseId(value);
        setTableName("");
        const url = new URL(window.location.href);
        url.searchParams.set("database", value);
        window.history.replaceState(null, "", url.toString());
      }
    },
    table: {
      name: tableName,
      set: setTableName
    }
  }}>
    {children}
  </SelectionContext.Provider>
}

export default SelectionProvider;
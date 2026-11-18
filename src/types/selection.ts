import { createContext } from "react";
import type { DatabaseSelection } from "./database";
import type { TableSelection } from "./table";

export type Selection = {
  database: DatabaseSelection,
  table: TableSelection
}

const missingSelectionProvider = (): never => {
  throw new Error("SelectionProvider is missing");
}

export const SelectionContext = createContext<Selection>({
  database: {
    id: "",
    set: missingSelectionProvider
  },
  table: {
    name: "",
    set: missingSelectionProvider
  }
});
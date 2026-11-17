import { createContext } from "react";
import type { DatabaseSelection } from "./database";

export type Selection = {
  database: DatabaseSelection
}

export const SelectionContext = createContext<Selection>({
  database: {
    id: "",
    set: () => {
      throw("SelectionProvider is missing");
    }
  }
});
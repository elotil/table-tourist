import type { DatabaseDetails } from "./database";
import { type Selection } from "./selection"
import type { TableDetails } from "./table";

export type Details = DatabaseDetails | TableDetails;

export async function fetchDetails(selection: Selection): Promise<Details> {
  const params = new URLSearchParams({
    database: selection.database.id,
    table: selection.table.name
  });
  const response = await fetch(`/api/details.cfm?${params}`);

  if (!response.ok) {
    throw (`Request failed: ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
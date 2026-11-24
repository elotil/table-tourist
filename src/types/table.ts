export type Table = {
  name: string;
}

export type TableSelection = {
  readonly name: string;
  set: (value: string) => void;
}

export type TableDetails = {
  kind: "table";
  name: string;
  columns: number;
  without_rowid: boolean;
  strict: boolean;
};

export async function fetchTableList(databaseId: string): Promise<Table[]> {
  const params = new URLSearchParams({ database: databaseId });
  const response = await fetch(`/api/tables.cfm?${params}`);

  if (!response.ok) {
    throw (`Request failed: ${response.status}`);
  }

  return response.json();
}
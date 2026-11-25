export type Column = {
  id: number;
  name: string;
  type: string;
  notnull: boolean;
  default_value: any;
  primary_key: boolean;
};

export async function fetchColumnList(databaseId: string, tableName: string): Promise<Column[]> {
  const params = new URLSearchParams({ database: databaseId, table: tableName });
  const response = await fetch(`api/columns.cfm?${params}`);

  if (!response.ok) {
    throw (`Request failed: ${response.status}`);
  }

  return response.json();
}
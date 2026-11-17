export async function fetchTableList(databaseId: string): Promise<string[]> {
  const params = new URLSearchParams({database: databaseId});
  const response = await fetch(`/api/tables.cfm?${params}`);

  if (!response.ok) {
    throw(`Request failed: ${response.status}`);
  }

  return response.json();
}
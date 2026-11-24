export type Database = {
  id: string;
  label: string;
};

export type DatabaseList = {
  databases: Database[];
  default: string;
};

export type DatabaseSelection = {
  readonly id: string;
  set: (value: string) => void;
};

export type DatabaseDetails = {
  kind: "database";
  label: string;
  data_version: number;
  counts: {
    table: number;
    view: number;
    virtual: number;
    shadow: number;
  };
};

export async function fetchDatabaseList(): Promise<DatabaseList> {
  const response = await fetch("/api/databases.cfm");

  if (!response.ok) {
    throw (`Request failed: ${response.status}`);
  }

  return response.json();
}
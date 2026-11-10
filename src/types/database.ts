export type Database = {
    id: string;
    label: string;
};

export type DatabaseList = {
    databases: Database[];
    selected: string;
};

export async function fetchDatabases(): Promise<DatabaseList> {
    const response = await fetch("/api/databases.cfm");

    if (!response.ok) {
        throw(`Request failed: ${response.status}`);
    }

    return response.json();
}
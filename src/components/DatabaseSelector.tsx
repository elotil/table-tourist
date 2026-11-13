import {useState, useEffect} from "react"
import {type DatabaseList, fetchDatabases, setCurrentDatabase} from "../types/database"

function DatabaseSelector() {
    const [databaseList, setDatabaseList] = useState<DatabaseList|null>(null);

    useEffect(() => {
            fetchDatabases().then(setDatabaseList);
    }, []);

    return <>
    <label htmlFor="database-selector">
        Database: 
    </label>
    <select
        id="database-selector"
        value={databaseList?.selected ?? ""}
        disabled={databaseList === null}
        onChange={async (event) => {
            const databaseId = event.currentTarget.value;
            const updatedList = await setCurrentDatabase(databaseId);
            setDatabaseList(updatedList);
        }}>
            {databaseList?.databases.map((database) => (
                <option key={database.id} value={database.id}>
                    {database.label}
                </option>
            ))}
    </select>
    </>
}

export default DatabaseSelector
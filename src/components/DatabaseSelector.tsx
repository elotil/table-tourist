import {useState, useEffect} from "react"
import {type DatabaseList, fetchDatabases} from "../types/database"

function DatabaseSelector() {
    const [databaseList, setDatabaseList] = useState<DatabaseList|null>(null);

    useEffect(() => {
            fetchDatabases().then(setDatabaseList);
    }, []);

    return <select
        id="database-selector"
        value={databaseList?.selected ?? ""}
        disabled={databaseList === null}
        onChange={(event) => {
            const databaseId = event.currentTarget.value;
            setDatabaseList(current => 
                current === null ? current : {...current, selected: databaseId}
            );
            console.log(databaseId);
            // TODO pass to backend to update
    }}>
        {databaseList?.databases.map((database) => (
            <option key={database.id} value={database.id}>
                {database.label}
            </option>
        ))}
    </select>
}

export default DatabaseSelector
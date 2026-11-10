<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
    if (!structKeyExists(session, "currentDatabase")) return;
    databases = application.appConfig.databases;
    dblist = []
    for (databaseId in databases) {
        dblist.push({
            "id": databaseId,
            "label": databases[databaseId].label
        })
    }

    writeOutput(serializeJSON({
        "databases": dblist,
        "selected": session.currentDatabase
    }));
</cfscript>
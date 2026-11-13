<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
    if (cgi.REQUEST_METHOD == "POST") {
        requestData = getHTTPRequestData();
        data = deserializeJSON(charsetDecode(requestData.content, "utf-8"));

        if (!isStruct(data) || !structKeyExists(data, "selected")) {
            cfheader(statuscode=400, statustext="Bad Request");
            writeOutput(serializeJSON({
                error = "Selected database is required"
            }));
            abort;
        }
        
        databaseId = toString(data.selected);
        if (!structKeyExists(application.appConfig.databases, databaseId)) {
            cfheader(statuscode=400, statustext="Bad Request");
            writeOutput(serializeJSON({
                error = "Unknown database"
            }));
            abort;
        }

        session.currentDatabase = databaseId;
    }

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
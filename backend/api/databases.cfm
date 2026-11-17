<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
    if (!structKeyExists(application, "appConfig")) return;
    if (!structKeyExists(application.appConfig, "databases")) return;
    databases = application.appConfig.databases;
    dblist = []
    for (databaseId in databases) {
        dblist.push({
            "id": databaseId,
            "label": databases[databaseId].label
        })
    }
    default = "";
    if (structKeyExists(application.appConfig, "default")
    && structKeyExists(application.appConfig.databases, application.appConfig.default)) {
        default = application.appConfig.default;
    } else if (arrayLen(dblist) > 0) {
        default = dblist[0];
    }

    writeOutput(serializeJSON({
        "databases": dblist,
        "default": default
    }));
</cfscript>
<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
    if (!structKeyExists(url, "table")) {
        cfheader(statusCode="400", statusText="Missing table parameter");
        writeOutput(serializeJSON({error: "Missing table parameter"}));
        abort;
    }

    database = new Database();
    records = database.getRecords(url.table);

    if (isNull(records)) {
        cfheader(statusCode="404", statusText="Invalid table parameter");
        writeOutput(serializeJSON({error: "Invalid table parameter"}));
        abort;
    }

    writeOutput(serializeJSON(records, "struct"));
</cfscript>
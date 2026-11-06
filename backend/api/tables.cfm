<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
    database = new Database();
    tables = database.getTables();

    writeOutput(serializeJSON(tables));
</cfscript>
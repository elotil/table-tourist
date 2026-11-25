<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
  param name="url.database" default="";
  databaseId = trim(url.database);
  if (!len(databaseId) || !structKeyExists(application.appConfig.databases, databaseId)) {
    header statuscode=400 statustext="Bad Request";
    writeOutput(serializeJSON({
      error="Invalid database ID"
    }));
    abort;
  }

  database = new Database(databaseId);
  tables = database.getTables();

  writeOutput(serializeJSON(tables));
</cfscript>
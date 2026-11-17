<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
  param name="url.database" default="chinook";
  databaseId = trim(url.database);
  if (!len(databaseId) || !structKeyExists(application.appConfig.databases, databaseId)) {
    header statuscode=400 statustext="Bad Request";
    writeOutput(serializeJSON({
      error="Invalid database ID"
    }));
    abort;
  }

  database = new Database(databaseId);
  tables = database.executeQuery("
    SELECT name FROM pragma_table_list WHERE schema = 'main' AND type = 'table';
  ");

  writeOutput(serializeJSON(tables));
</cfscript>
<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
  param name="url.database" default="";
  param name="url.table" default="";
  databaseId = trim(url.database);
  tableName = trim(url.table);
  if (!len(databaseId) || !structKeyExists(application.appConfig.databases, databaseId)) {
    header statuscode=400 statustext="Bad Request";
    writeOutput(serializeJSON({
      error="Invalid database ID"
    }));
    abort;
  }
  if (!len(tableName)) {
    header statusCode="400", statusText="Bad Request";
    writeOutput(serializeJSON({
      error="Missing table parameter"
    }));
    abort;
  }

  database = new Database(databaseId);
  columns = database.getColumns(url.table);

  if (columns.isEmpty()) {
    header statusCode="404", statusText="Not Found";
    writeOutput(serializeJSON({
      error="Invalid table name"
    }));
    abort;
  }

  writeOutput(serializeJSON(columns, "struct"));
</cfscript>
<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
  param name="url.database" default="";
  param name="url.table" default="";
  param name="url.record" default="";
  databaseId = trim(url.database);
  if (!len(databaseId) || !structKeyExists(application.appConfig.databases, databaseId)) {
    header statuscode=400 statustext="Bad Request";
    writeOutput(serializeJSON({
      error="Invalid database ID"
    }));
    abort;
  }

  database = new Database(databaseId);
  
  if (len(trim(url.record))) {
    // TODO write record details
  } else if (len(trim(url.table))) {
    table = trim(url.table);
    data = database.getTableInfo(table);
    result = {
      "kind": "table",
      "name": data.name,
      "columns": data.ncol,
      "without_rowid": data.wr,
      "strict": data.strict
    };
  } else {
    result = {
      "kind": "database",
      "label": application.appConfig.databases[databaseId].label
    };
    structAppend(result, database.getDatabaseInfo());
  }

  writeOutput(serializeJSON(result));
</cfscript>
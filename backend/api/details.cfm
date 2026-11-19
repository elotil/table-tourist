<cfcontent type="application/json; charset=utf-8" reset="true">

<cfscript>
  param name="url.database" default="";
  param name="url.table" default="";
  param name="url.record" default="";
  databaseId = trim(url.database);
  if (!len(databaseId)) {
    abort;
  }
  if (!structKeyExists(application.appConfig.databases, databaseId)) {
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
    // TODO
    result = {
      "kind": "table"
    };
  } else {
    result = {
      "kind": "database",
      "label": application.appConfig.databases[databaseId].label,
      "counts": database.getCounts()
    };
  }

  writeOutput(serializeJSON(result));
</cfscript>
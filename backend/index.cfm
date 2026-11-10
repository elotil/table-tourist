<!DOCTYPE html>
<html>
<head>
    <title>Table Tourist Backend</title>
</head>
<body>
    <cfscript>
        databaseId = session.currentDatabase;

        if (!structKeyExists(application.databases, databaseId)) {
            throw(message="Unknown database selection");
        }

        database = application.databases[databaseId];

        ds = {
            class: "org.sqlite.JDBC",
            bundleName: "org.xerial.sqlite-jdbc",
            bundleVersion: "3.54.1.0",
            connectionString: "jdbc:sqlite:" & database.path
        };

        result = queryExecute("SELECT 1 AS ok", [], { datasource: ds });
        writeOutput(result.ok[1]);
</cfscript>
</body>
</html>
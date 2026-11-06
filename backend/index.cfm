<!DOCTYPE html>
<html>
<head>
    <title>Table Tourist Backend</title>
</head>
<body>
    <cfscript>
        database = new Database();
        result = database.executeQuery(
            "SELECT COUNT(*) AS track_count FROM Track"
        );

        writeOutput("Number of tracks: " & result.track_count);
    </cfscript>
</body>
</html>
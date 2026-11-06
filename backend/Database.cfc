component {
    public array function executeQuery(required string sql, struct params = {}) {
        return queryExecute(
            arguments.sql,
            arguments.params,
            { datasource: session.currentDatabase, returntype: "array" }
        );
    }

    public array function getTables() {
        var cacheKey = "tables:" & session.currentDatabase;
        var tables = cacheGet(
            id = cacheKey,
            cacheName = session.cacheName
        );

        if (!isNull(tables)) {
            return tables;
        }
        
        tables = executeQuery("
                SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
            ").map((row) => row.name);

        cachePut(
            id = cacheKey,
            value = tables,
            cacheName = session.cacheName
        );

        return tables;
    }

    public array function getColumns(required string table) {
        var cacheKey = "columns:" & session.currentDatabase & ":" & arguments.table;
        var columns = cacheGet(
            id = cacheKey,
            cacheName = session.cacheName
        );

        if (!isNull(columns)) {
            return columns;
        }

        columns = executeQuery("SELECT * FROM pragma_table_info(:table)",
            { table=arguments.table }
        );

        cachePut(
            id = cacheKey,
            value = columns,
            cacheName = session.cacheName
        );

        return columns;
    }

    public any function getRecords(
        required string table,
        numeric limit = 50,
        numeric offset = 0
    ) {
        try {
            return executeQuery(
                "SELECT * FROM """
                & replace(arguments.table, """", """""", "all")
                & """ LIMIT :limit OFFSET :offset",
                { limit=arguments.limit, offset=arguments.offset }
            );
        } catch (database e) {
            if (findNoCase("no such table", e.message)) {
                return null;
            }
            rethrow;
        }
    }
}
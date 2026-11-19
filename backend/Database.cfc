component {
  variables.id = "";
  variables.datasource = "";

  public Database function init(required string databaseId) {
    variables.id = databaseId;
    variables.datasource = getDatasource(databaseId);
  }

  private struct function getDatasource(required string databaseId) {
    var database = application.appConfig.databases[databaseId];
    return {
      class: "org.sqlite.JDBC",
      bundleName: "org.xerial.sqlite-jdbc",
      bundleVersion: "3.54.1.0",
      connectionString: "jdbc:sqlite:" & database.path
    };
  }

  public array function executeQuery(required string sql, struct params = {}) {
    return queryExecute(
      arguments.sql,
      arguments.params,
      { datasource: variables.datasource, returntype: "array" }
    );
  }

  public array function getTables() {
    var cacheKey = "tables:" & variables.id;
    var tables = cacheGet(
      id = cacheKey,
      cacheName = application.cacheName
    );

    if (!isNull(tables)) {
      return tables;
    }
        
    tables = executeQuery("
      SELECT name FROM pragma_table_list WHERE schema = 'main' AND type = 'table' AND name NOT GLOB 'sqlite_*';
    ").map((row) => ({"name": row.name}));

    cachePut(
      id = cacheKey,
      value = tables,
      cacheName = application.cacheName
    );

    return tables;
  }

  public array function getColumns(required string table) {
    var cacheKey = "columns:" & variables.id & ":" & arguments.table;
    var columns = cacheGet(
      id = cacheKey,
      cacheName = application.cacheName
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
      cacheName = application.cacheName
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

  public struct function getCounts() {
    var cacheKey = "counts:" & variables.id;
    var counts = cacheGet(
      id = cachekey,
      cacheName = application.cacheName
    )

    if (!isNull(counts)) {
      return counts;
    }

    counts = {
      "table": 0,
      "view": 0,
      "virtual": 0
    };
    result = executeQuery("
      SELECT type, COUNT(*) as count
      FROM pragma_table_list
      WHERE schema = 'main' AND name NOT GLOB 'sqlite_*'
      GROUP BY type;
    ");

    for (row in result) {
      if (structKeyExists(counts, row.type)) {
        counts[row.type] = row.count;
      }
    }

    cachePut(
      id = cacheKey,
      value = counts,
      cacheName = application.cacheName
    );

    return counts;
  }
}
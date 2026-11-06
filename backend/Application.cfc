component {
    this.nullSupport = true;
    this.name = "Table Tourist";
    this.sessionManagement = true;

    variables.appConfig = deserializeJSON(
        fileRead("/etc/app.config.json")
    );

    for (databaseId in variables.appConfig.databases) {
        this.datasources[databaseId] = {
            class: "org.sqlite.JDBC",
            bundleName: "org.xerial.sqlite-jdbc",
            bundleVersion: "3.54.1.0",
            connectionString: "jdbc:sqlite:" &
                variables.appConfig.databases[databaseId].path
        };
    }

    this.cache.connections["templatecache"] = {
        class: "lucee.runtime.cache.ram.RamCache",
        storage: false,
        custom: { timeToIdleSeconds: 3600, timeToLiveSeconds: 3600 },
        default: 'object'
    };

    public void function onSessionStart() {
        session.currentDatabase = structKeyExists(variables.appConfig, "default") &&
            structKeyExists(variables.appConfig.databases, variables.appConfig.default) ?
            variables.appConfig.default : listFirst(structKeyList(variables.appConfig.databases));
        session.cacheName = "templatecache";

        // TODO: create an independent working copy for this session
    }
}
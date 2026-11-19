component {
    this.nullSupport = true;
    this.name = "Table Tourist";
    this.sessionManagement = true;
    this.serialization.preserveCaseForStructKey = true;

    this.cache.connections["templatecache"] = {
        class: "lucee.runtime.cache.ram.RamCache",
        storage: false,
        // TODO adjust cache timeout for prod
        custom: { timeToIdleSeconds: 10, timeToLiveSeconds: 10 },
        default: 'object'
    };

    public function onApplicationStart() {
        application.appConfig = deserializeJSON(
            fileRead("/etc/app.config.json")
        );
        application.cacheName = "templatecache";
        return true;
    }
}
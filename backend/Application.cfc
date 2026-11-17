component {
    this.nullSupport = true;
    this.name = "Table Tourist";
    this.sessionManagement = true;

    this.cache.connections["templatecache"] = {
        class: "lucee.runtime.cache.ram.RamCache",
        storage: false,
        custom: { timeToIdleSeconds: 3600, timeToLiveSeconds: 3600 },
        default: 'object'
    };

    public function onApplicationStart() {
        application.appConfig = deserializeJSON(
            fileRead("/etc/app.config.json")
        );
        return true;
    }

    public function onSessionStart() {
        session.cacheName = "templatecache";

        // TODO: create an independent working copy for this session
    }
}
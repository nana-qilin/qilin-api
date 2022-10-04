export default {
    api: {
        port: {
            https: 443,
            http: 80
        },
        baseurl: "localhost",
        https: {
            enable: true,
            forcessl: false,
        },
    },
    logger: {
        level: "debug",
        colors: {
            default: "",
            text: "#ccd9e5",
            start: "#76db91",
            stop: "#e87963",
            log: "#9eb5ef",
            warn: "#ead672",
            error: "#e55252",
            debug: "#6b8daa"
        }
    }
}
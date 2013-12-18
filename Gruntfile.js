var loadGruntConfig = require("load-grunt-config"),
    loadGruntTasks = require("load-grunt-tasks"),
    lockFile = require("lockfile");
    express = require("express");

module.exports = function (grunt) {
    loadGruntConfig(grunt);
    loadGruntTasks(grunt);

    grunt.registerTask("expressServer", function () {
        var app = express();

        app.use(function (request, response, next) {
            (function retry() {
                if (lockFile.checkSync(".tmp/express.lock")) {
                    setTimeout(retry, 30);
                } else {
                    next();
                }
            })();
        });

        app.use(express.static(__dirname + "/dist"));
        app.use("/bower_components", express.static(__dirname + "/bower_components"));
        app.use("/.tmp", express.static(__dirname + "/.tmp"));

        app.listen(parseInt(process.env.PORT) || 3000);
    });

    grunt.registerTask("lock", "Set semaphore for express server to wait on.", function () {
        grunt.file.mkdir(".tmp");
        lockFile.lockSync(".tmp/express.lock");
        grunt.log.writeln("Locked - Development server won't answer incoming requests until grunt is done updating.");
    });

    grunt.registerTask("unlock", "Release semaphore that express server waits on.", function () {
        lockFile.unlockSync(".tmp/express.lock");
        grunt.log.writeln("Unlocked - Development server now handles requests.");
    });

    grunt.registerTask("build", ["copy", "recess", "ember_handlebars"]);

    grunt.registerTask("server", ["build", "expressServer", "watch"]);

    grunt.registerTask("dist", ["build", "useminPrepare", "concat", "uglify", "cssmin", "usemin"]);
};

var gulp = require('gulp');

module.exports = {
    name: 'browser-sync',
    task: function () {
        "use strict";
        return gulp.browserSync({
            server: {
                baseDir: gulp.config.dist,
                middleware: require("../frontend/data/middlewares.js")
            },
            port: gulp.config.port,
            open: false
        });
    }
};
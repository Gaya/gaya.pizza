var gulp = require('gulp');

module.exports = {
    name: 'browser-sync',
    task: function () {
        "use strict";
        return gulp.browserSync({
            server: {
                baseDir: gulp.config.dist,
                middleware: gulp.config.middlewares
            },
            port: gulp.config.port,
            open: false
        });
    }
};
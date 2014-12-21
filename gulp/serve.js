var gulp = require("gulp");

module.exports = [{
    name: "compile",
    pre: ['svg-sprite', 'sass', 'browserify-dist', 'copy-images', 'wintersmith']
}, {
    name: "serve",
    pre: ['compile', 'browser-sync'],
    task: function () {
        "use strict";
        //svg-sprite
        gulp.watch(gulp.config.src + "/icons/**/*.svg", ['svg-sprite']);

        //sass
        gulp.watch(gulp.config.src + "/sass/**/*.scss", ['sass']);

        //js
        gulp.watch(gulp.config.src + "/{js,libs}/**/*.js", ['browserify-dist']);

        //wintersmith
        gulp.watch(gulp.config.src + "/templates/*.html", ['wintersmith']);
        gulp.watch(gulp.config.blog + "/**/*", ['wintersmith']);

        //images
        gulp.watch(gulp.config.src + "/images/**/*", ['copy-images']);
    }
}];
var gulp = require("gulp");

module.exports = [{
    name: "copy-images",
    task: function () {
        "use strict";
        return gulp.src(gulp.config.src + "/images/**/*")
            .pipe(gulp.dest(gulp.config.dist + "/images"))
            .pipe(browserSync.reload({stream:true}));
    }
}];
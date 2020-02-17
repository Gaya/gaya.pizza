var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths;

function sassSource(type) {
    "use strict";
    return gulp.src(gulp.config.src + '/sass/style.scss')
        .pipe(sass({
            style: (type === "build" ? 'compressed' : 'expanded'),
            includePaths: neat
        }).on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest((type === "build" ? gulp.config.build + '/css/' : gulp.config.dist + '/css/')))
        .pipe(gulp.browserSync.reload({stream:true}));
}

module.exports = [{
    name: "sass",
    task: function() {
        'use strict';
        return sassSource("dist");
    }
}, {
    "name": "sass-build",
    "task": function () {
        "use strict";
        sassSource('build');
    }
}];

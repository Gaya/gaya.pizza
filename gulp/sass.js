var gulp = require('gulp'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
    sourcemaps = require('gulp-sourcemaps');

function sassSource(type) {
    "use strict";
    neat.push(__dirname + "/../../node_modules/select2");

    return gulp.src(gulp.config.src + '/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            style: (type === "build" ? 'compressed' : 'expanded'),
            includePaths: neat
        }).on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        }))
        .pipe(sourcemaps.write())
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

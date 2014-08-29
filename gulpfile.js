var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync');

gulp.config = {
    src: 'src',
    libs: 'src/libs',
    dist: 'dist',
    build: 'build',
    tests: 'test',
    port: (process.env.PORT || 3000),
    middleware: function (req, res, next) {
        next();
    }
};
var pkg = require('./package.json');


gulp.task('sass', function() {
    'use strict';

    return sassSource("dist");
});

gulp.task('sass-build', function() {
    'use strict';

    return sassSource("build");
});

function sassSource(type) {
    "use strict";

    var dest = gulp.config.dist + '/css/';

    if (type === "build") {
        dest = gulp.config.build + '/css/';
    }

    return gulp.src(gulp.config.src + '/sass/style.scss')
        .pipe(sass({
            style: 'expanded',
            loadPath: __dirname + '/' + gulp.config.src + '/sass/'
        }).on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest(dest))
        .pipe(browserSync.reload({stream:true}));
}

gulp.task('browser-sync', function() {
    'use strict';

    browserSync({
        server: {
            baseDir: gulp.config.dist,
            middleware: gulp.config.middleware
        },
        port: gulp.config.port,
        open: false
    });
});

gulp.task('compile', ['sass']);

gulp.task('serve', ['compile', 'browser-sync'], function () {
    'use strict';

    //sass
    gulp.watch(gulp.config.src + "/sass/**/*.scss", ['sass']);
});
var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    SVGSprite = require('svg-sprite');

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

gulp.task('browserify-dist', function() {
    'use strict';
    return browserifySource("dist");
});

gulp.task('browserify-build', function() {
    'use strict';
    return browserifySource("build");
});

function browserifySource(type) {
    'use strict';

    var src = './' + gulp.config.src + '/js/main.js';
    var dest = gulp.config.dist + '/js/';
    var name = pkg.name + ".js";

    if (type === "build") {
        dest = gulp.config.build + '/js/';
    }

    return browserify(src)
        .bundle()
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source(name))
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

gulp.task('copy-images', function () {
    return gulp.src(gulp.config.src + "/images/**/*")
        .pipe(gulp.dest(gulp.config.dist + "/images"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('copy-html', function () {
    return gulp.src(gulp.config.src + "/template/**/*")
        .pipe(gulp.dest(gulp.config.dist))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('svg-sprite', function () {
    SVGSprite.createSprite(gulp.config.src + '/icons', gulp.config.dist, {
        spritedir: 'images',
        sprite: 'gn-sprite',
        maxwidth: 100,
        maxheight: 100,
        layout: "diagonal",
        render: {
            sass: {
                template: gulp.config.src + '/sass/libs/_svg-sprite-layout.scss',
                dest: "../" + gulp.config.src + '/sass/atoms/sprite.scss'
            }
        }
    }, function () {
        console.log("svg sprite is done");
    });
});

gulp.task('compile', ['sass', 'browserify-dist', 'copy-html', 'copy-images']);

gulp.task('serve', ['compile', 'browser-sync'], function () {
    'use strict';
    //sass
    gulp.watch(gulp.config.src + "/sass/**/*.scss", ['sass']);

    //js
    gulp.watch(gulp.config.src + "/{js,libs}/**/*.js", ['browserify-dist']);

    //html
    gulp.watch(gulp.config.src + "/template/*.html", ['copy-html']);

    //images
    gulp.watch(gulp.config.src + "/images/**/*", ['copy-images']);
});
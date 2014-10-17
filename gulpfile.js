var gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-ruby-sass'),
    browserSync = require('browser-sync'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    SVGSprite = require('svg-sprite'),
    cssshrink = require('gulp-cssshrink'),
    imagemin = require('gulp-imagemin'),
    critical = require('critical'),
    wintersmith = require('wintersmith');;

gulp.config = {
    src: 'src',
    libs: 'src/libs',
    dist: 'dist',
    build: 'build',
    tests: 'test',
    blog: 'blog',
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

gulp.task('svg-sprite', function (cb) {
    return SVGSprite.createSprite(gulp.config.src + '/icons', gulp.config.dist, {
        spritedir: 'images',
        sprite: 'gn-sprite',
        variables: {
            imagePath: "../"
        },
        maxwidth: 100,
        maxheight: 100,
        layout: "vertical",
        render: {
            sass: {
                template: gulp.config.src + '/sass/libs/_svg-sprite-layout.scss',
                dest: "../" + gulp.config.src + '/sass/atoms/sprite.scss'
            }
        }
    }, function () {
        console.log("Sprite and mixin has been generated");
        cb();
    });
});

gulp.task('cssshrink', function () {
    "use strict";
    return gulp.src(gulp.config.dist + '/css/*.css')
        .pipe(cssshrink())
        .pipe(gulp.dest(gulp.config.dist + '/css/'));
});

gulp.task('image-min', function () {
    "use strict";
    return gulp.src(gulp.config.dist + '/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(gulp.config.dist + '/images/'));
});

gulp.task('critical', function () {
    "use strict";
    critical.generateInline({
        // Your base directory
        base: gulp.config.dist,

        // HTML source
        src: 'index.html',

        // Your CSS Files (optional)
        css: [gulp.config.dist + '/css/style.css'],

        // Viewport width
        width: 320,

        // Viewport height
        height: 480,

        // Target for final HTML output
        htmlTarget: 'index-critical.html',

        // Target for generated critical-path CSS (which we inline)
        styleTarget: 'css/critical.css',

        // Minify critical-path CSS when inlining
        minify: true
    });
});

gulp.task('wintersmith', function () {
    "use strict";
    var env = wintersmith('./config.json');

    env.build(function(error) {
        if (error) { throw error; }
        console.log('Done!');
    });
});

gulp.task('compile', ['svg-sprite', 'sass', 'browserify-dist', 'copy-images', 'wintersmith']);
gulp.task('optimize', ['cssshrink', 'image-min']);

gulp.task('serve', ['compile', 'browser-sync'], function () {
    'use strict';
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
});
var gulp = require('gulp'),
    cssshrink = require('gulp-cssshrink'),
    imagemin = require('gulp-imagemin'),
    critical = require('critical'),
    uglify = require('gulp-uglify');


module.exports = [{
    name: "cssshrink",
    task: function () {
        "use strict";
        return gulp.src(gulp.config.dist + '/css/*.css')
            .pipe(cssshrink())
            .pipe(gulp.dest(gulp.config.dist + '/css/'));
    }
}, {
    name: "image-min",
    task: function () {
        "use strict";
        return gulp.src(gulp.config.dist + '/images/**/*')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}]
            }))
            .pipe(gulp.dest(gulp.config.dist + '/images/'));
    }
}, {
    name: "critical",
    task: function () {
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
    }
}, {
    name: "uglify-js",
    task: function () {
        "use strict";
        return gulp.src(gulp.config.dist + '/js/*.js')
            .pipe(uglify())
            .pipe(gulp.dest(gulp.config.dist + '/js/'));
    }
}, {
    name: "optimize",
    pre: ['cssshrink', 'uglify-js'] //'image-min'
}];
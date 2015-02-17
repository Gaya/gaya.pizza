var gulp = require('gulp'),
    cssshrink = require('gulp-cssshrink'),
    imageop = require('gulp-image-optimization'),
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
        return gulp.src(gulp.config.dist + '/**/*{.jpg,.jpeg,.png,.gif,.bmp,.svg}')
            .pipe(imageop({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}]
            }))
            .pipe(gulp.dest(gulp.config.dist + '/'));
    }
}, {
    name: "critical",
    task: function () {
        "use strict";
        critical.generateInline({
            base: gulp.config.dist,
            src: 'index.html',
            css: [gulp.config.dist + '/css/style.css'],
            width: 320,
            height: 480,
            htmlTarget: 'index.html',
            styleTarget: '',
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
    pre: ['cssshrink', 'image-min', 'uglify-js', 'critical']
}];
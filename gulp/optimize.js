var gulp = require('gulp'),
    cssshrink = require('gulp-cssshrink'),
    imageop = require('gulp-image-optimization'),
    critical = require('critical'),
    uglify = require('gulp-uglify'),
    findit = require('findit');


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
        process.setMaxListeners(0);
        var finder = findit(gulp.config.dist);
        var files = [];
        var working = false;

        finder.on('file', function (file, stat) {
            if (file.substr(-10) === "index.html") {
                file = file.replace(gulp.config.dist + "/", "");

                files.push(file);

                console.log("Added " + file);
                doCritical();
            }
        });

        var doCritical = function () {
            if (files.length > 0 && working == false) {
                working = true;

                var file = files.pop();
                console.log("Working on " + file);

                critical.generateInline({
                    base: gulp.config.dist,
                    src: file,
                    css: [gulp.config.dist + '/css/style.css'],
                    width: 320,
                    height: 480,
                    htmlTarget: file,
                    styleTarget: '',
                    minify: true,
                    extract: false
                }, function (err, output) {
                    working = false;
                    doCritical();
                });
            }
        }
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
    pre: ['cssshrink', 'image-min', 'uglify-js'],
    task: function () {
        gulp.start("critical");
    }
}];
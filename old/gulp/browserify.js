var gulp = require("gulp"),
    source = require('vinyl-source-stream'),
    browserify = require('old/gulp/browserify');

function browserifySource(type) {
    'use strict';

    var src = './' + gulp.config.src + '/js/main.js';
    var dest = gulp.config.dist + '/js/';
    var name = gulp.pkg.name + ".js";

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
        .pipe(gulp.browserSync.reload({stream:true}));
}

module.exports = [{
    name: "browserify-dist",
    task: function () {
        "use strict";
        return browserifySource("dist");
    }
}, {
    name: "browserify-build",
    task: function () {
        "use strict";
        return browserifySource("build");
    }
}];

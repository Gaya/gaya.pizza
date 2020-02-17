var gulp = require('gulp'),
    fs = require('fs');

gulp.browserSync = require('browser-sync');
gulp.config = require('./gulpconfig.js');
gulp.pkg = require('../package.json');

//read all tasks
var files = fs.readdirSync("./" + gulp.config.gulp);
files.forEach(function (file) {
    "use strict";
    if (file.substr(-3) !== ".js") {
        return;
    }

    var tasks = require("./" + gulp.config.gulp + "/" + file);

    if (tasks.length === undefined) {
        tasks = [tasks];
    }

    tasks.forEach(function (task) {
        if (task.pre) {
            gulp.task(task.name, task.pre, task.task);
        } else {
            gulp.task(task.name, task.task);
        }
    });
});

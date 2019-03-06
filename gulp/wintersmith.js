var gulp = require("gulp"),
    wintersmith = require("wintersmith"),
    config = require('../config.json');

module.exports = [{
    name: "wintersmith",
    task: function (cb) {
        "use strict";
        config.output = "./" + gulp.config.dist;

        //build settings
        if (gulp.config.dist === gulp.config.build) {
            config.locals.url = "https://gaya.pizza";
        }

        var env = wintersmith(config);

        env.build(function(error) {
            if (error) {
                console.error(error);
            }
            gulp.browserSync.reload();

            cb();
        });

        return false;
    }
}];

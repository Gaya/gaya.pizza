var gulp = require("gulp"),
    wintersmith = require("wintersmith"),
    config = require('../config.json');

module.exports = [{
    name: "wintersmith",
    task: function () {
        "use strict";
        config.output = "./" + gulp.config.dist;

        var env = wintersmith(config);

        env.build(function(error) {
            if (error) {
                console.error(error);
            }
            gulp.browserSync.reload();
        });
    }
}];
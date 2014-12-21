var gulp = require("gulp"),
    wintersmith = require("wintersmith");

module.exports = [{
    name: "wintersmith",
    task: function () {
        "use strict";
        var env = wintersmith('./config.json');

        env.build(function(error) {
            if (error) {
                console.error(error);
            }
            gulp.browserSync.reload();
        });
    }
}];
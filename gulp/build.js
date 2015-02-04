var gulp = require("gulp");

module.exports = [{
    name: "build",
    pre: ["set-target", "compile"],
    task: function () {
        "use strict";
        console.log("Done");
    }
}, {
    name: "set-target",
    task: function () {
        "use strict";
        console.log("Set target to public/");
        gulp.config.dist = gulp.config.build;
    }
}];
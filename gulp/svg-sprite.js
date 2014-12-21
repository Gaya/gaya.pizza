var gulp = require("gulp");

module.exports = [{
    name: "svg-sprite",
    task: function (cb) {
        "use strict";
        return SVGSprite.createSprite(gulp.config.src + '/icons', gulp.config.dist, {
            spritedir: 'images',
            sprite: 'gn-sprite',
            variables: {
                imagePath: "../"
            },
            maxwidth: 100,
            maxheight: 100,
            padding: 0,
            layout: "diagonal",
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
    }
}];
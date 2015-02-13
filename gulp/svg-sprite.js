var gulp = require("gulp"),
    SVGSprite = require('svg-sprite');

module.exports = [{
    name: "svg-sprite",
    task: function (cb) {
        "use strict";
        SVGSprite.createSprite(gulp.config.src + '/icons', gulp.config.dist, {
            spritedir: 'images',
            sprite: 'gn-sprite',
            variables: {
                imagePath: "../"
            },
            maxwidth: 50,
            maxheight: 50,
            padding: 0,
            layout: "diagonal",
            render: {
                sass: {
                    template: gulp.config.src + '/sass/libs/_svg-sprite-layout.scss',
                    dest: "../" + gulp.config.src + '/sass/atoms/sprite.scss'
                },
                css: false
            }
        }, function () {
            console.log("Sprite and mixin has been generated");
            cb();
        });
    }
}];
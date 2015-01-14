var _ = require("underscore");

var inlineObject = {
    init: function (object, lineHeight) {
        this.element = object;
        this.lineHeight = lineHeight;

        //bind the events
        this.element.addEventListener("load", _.bind(this.fixInline, this), false);
        window.addEventListener("resize", _.bind(this.fixInline, this), false);
    },

    fixInline: function () {
        console.log(this.element.height);
    }
};

module.exports = function (object, lineHeight) {
    var inliner = Object.create(inlineObject);
    inliner.init(object, lineHeight);

    return inliner;
};
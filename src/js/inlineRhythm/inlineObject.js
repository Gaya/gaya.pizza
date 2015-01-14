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
        if (this.needsSpace(this.lineHeight, this.element.height)) {
            var padding = ((this.lineHeight - (this.element.height % this.lineHeight)) / 2) + "px";
            this.element.style.paddingTop = padding;
            this.element.style.paddingBottom = padding;
        } else {
            this.element.style.padding = 0;
        }
    },

    needsSpace: function (lineHeight, height) {
        return (height % lineHeight !== 0);
    }
};

module.exports = function (object, lineHeight) {
    var inliner = Object.create(inlineObject);
    inliner.init(object, lineHeight);

    return inliner;
};
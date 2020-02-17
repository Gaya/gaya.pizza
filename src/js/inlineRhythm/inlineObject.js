var inlineObject = {
    init: function (object, lineHeight) {
        "use strict";
        this.element = object;
        this.lineHeight = lineHeight;

        //bind the events
        this.element.addEventListener("load", this.fixInline.bind(this), false);
        window.addEventListener("resize", this.fixInline.bind(this), false);
    },

    fixInline: function () {
        "use strict";
        if (this.needsSpace(this.lineHeight, this.element.height)) {
            var padding = ((this.lineHeight - (this.element.height % this.lineHeight)) / 2) + "px";
            this.element.style.paddingTop = padding;
            this.element.style.paddingBottom = padding;
        } else {
            this.element.style.padding = 0;
        }
    },

    needsSpace: function (lineHeight, height) {
        "use strict";
        return (height % lineHeight !== 0);
    }
};

module.exports = function (object, lineHeight) {
    "use strict";
    var inliner = Object.create(inlineObject);
    inliner.init(object, lineHeight);

    return inliner;
};

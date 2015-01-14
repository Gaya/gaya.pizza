var inlineObject = {
    init: function (object, lineHeight) {
        this.element = object;
        this.lineHeight = lineHeight;

        this.fixInline();
    },

    fixInline: function () {
        console.log(this.element);
    }
};

module.exports = function (object, lineHeight) {
    var inliner = Object.create(inlineObject);
    inliner.init(object, lineHeight);

    return inliner;
};
var inlineObject = {
    init: function (object) {
        this.element = object;

        this.fixInline();
    },

    fixInline: function () {
        console.log(this.element.height);
    }
};

module.exports = function (object) {
    var inliner = Object.create(inlineObject);
    inliner.init(object);

    return inliner;
};
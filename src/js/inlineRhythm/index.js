var inlineRhythm = {
    imagequery: ".post__body img",
    lineHeight: 30,

    init: function() {
        this.fixInline(document.querySelectorAll(this.imagequery));
    },

    fixInline: function (objects) {
        for (var i = 0; i < objects.length; i++) {
            console.log(objects[i].naturalHeight);
        }
    }
};

module.exports = function () {
    return Object.create(inlineRhythm);
};
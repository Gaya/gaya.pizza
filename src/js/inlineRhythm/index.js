var inlineObject = require("./inlineObject.js");

var inlineRhythm = {
    lineHeight: 30,

    init: function(query) {
        var objects = document.querySelectorAll(query);

        for (var i = 0; i < objects.length; i++) {
            inlineObject(objects[i], this.lineHeight);
        }
    }
};

module.exports = function () {
    return Object.create(inlineRhythm);
};
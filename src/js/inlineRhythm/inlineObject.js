var inlineObject = {
    init: function (object) {

    }
};

module.exports = function (object) {
    var inliner = Object.create(inlineObject);
    inliner.init(object);

    return inliner;
};
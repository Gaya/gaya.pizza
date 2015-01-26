var form = require("./form.js");

var contactform = {
    onSubmit: function () {},
    init: function (query) {
        "use strict";
        var objects = document.querySelectorAll(query);
        form(objects, this.onSubmit);
    }
};

module.exports = function createContactForm() {
    "use strict";
    return Object.create(contactform);
}
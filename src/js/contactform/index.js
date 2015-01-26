var form = require("./form.js");

var contactform = {
    init: function (query) {
        "use strict";
        var objects = document.querySelectorAll(query);
        form(objects);
    }
};

module.exports = function createContactForm() {
    "use strict";
    return Object.create(contactform);
}
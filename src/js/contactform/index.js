var form = require("./form.js");

var contactform = {
    onSubmit: function () {},
    submit: function (cb) {
        "use strict";
        this.onSubmit = cb;

        return this;
    },
    init: function (query) {
        "use strict";
        var objects = document.querySelectorAll(query);
        form(objects, this.onSubmit);

        return this;
    }
};

module.exports = function createContactForm() {
    "use strict";
    return Object.create(contactform);
}
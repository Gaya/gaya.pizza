var formObject = {
    init: function (form) {
        "use strict";

    }
};

module.exports = function (form) {
    "use strict";
    var contactform = Object.create(formObject);
    contactform.init(form);

    return contactform;
};
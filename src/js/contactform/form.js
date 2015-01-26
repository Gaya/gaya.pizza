var _ = require("underscore");

var formObject = {
    init: function (form) {
        "use strict";
        this.element = form;

        this.bindSubmit();
    },

    bindEvent: function (target, event, action) {
        "use strict";
        if(target.addEventListener) {
            target.addEventListener(event, action, false);
        } else {
            target.attachEvent('on' + event, action);
        }
    },

    bindSubmit: function () {
        "use strict";
        this.bindEvent(this.element, 'submit', _.bind(function (e) {
            e.preventDefault();

            if (this.validateFields()) {
                this.element.submit();
            }
        }, this));
    },

    validateFields: function () {
        "use strict";
        return false;
    }
};

module.exports = function (form) {
    "use strict";
    var contactform = Object.create(formObject);
    contactform.init(form);

    return contactform;
};
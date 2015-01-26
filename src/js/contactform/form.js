var field = require('./field.js');

function FormValidator(element, onsubmit) {
    "use strict";
    this.element = element;
    this.onsubmit = onsubmit;
    this.init();
}

FormValidator.prototype = {
    init: function () {
        "use strict";
        this.bindSubmit();
        this.resolveFields();
    },

    resolveFields: function () {
        "use strict";
        this.fields = [];
        var formElements = this.formElements();

        for (var i = 0; i < formElements.length; i++) {
            this.fields.push(field(formElements[i]));
        }
    },

    formElements: function () {
        "use strict";
        return this.element.querySelectorAll("input,textarea,select");
    },

    bindSubmit: function () {
        "use strict";
        this.bindEvent(this.element, 'submit', function (e) {
            e.preventDefault();

            if (this.validateFields()) {
                this.onsubmit.call(this);
            }
        }.bind(this));
    },

    bindEvent: function (target, event, action) {
        "use strict";
        if(target.addEventListener) {
            target.addEventListener(event, action, false);
        } else {
            target.attachEvent('on' + event, action);
        }
    },

    validateFields: function () {
        "use strict";
        var valid = true;
        for (var i = 0; i < this.fields.length; i++) {
            if (!this.fields[i].validate()) {
                valid = false;
            }
        }

        return valid;
    }
};

module.exports = function (forms, onsubmit) {
    "use strict";
    var formvalidators = [];

    for (var i = 0; i < forms.length; i++) {
        formvalidators.push(new FormValidator(forms[i], onsubmit));
    }

    return formvalidators;
};
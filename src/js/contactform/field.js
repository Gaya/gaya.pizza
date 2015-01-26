var error = require('./error.js');

function Field(element) {
    "use strict";
    this.element = element;
    this.validations = [
        this.checkRequired.bind(this)
    ];
}

Field.prototype = {
    isRequired: function () {
        "use strict";
        return this.element.getAttribute("data-required");
    },

    validate: function () {
        "use strict";
        this.valid = true;

        //perform registered validations
        for (var i = 0; i < this.validations.length; i++) {
            if (this.valid) {
                this.validations[i]();
            }
        }

        if (this.valid) {
            this.unsetError();
        }

        return this.valid;
    },

    checkRequired: function () {
        "use strict";
        if (this.isRequired() && this.element.value.length === 0) {
            this.valid = false;

            this.setError(this.element.getAttribute("data-required-message"));
        }
    },

    setError: function (msg) {
        "use strict";
        if (!this.error) {
            this.error = error(this.element, msg);
        }

        this.error.update(msg);
    },

    unsetError: function () {
        "use strict";
        if (this.error) {
            this.error.remove();
            delete this.error;
        }
    }
};

function EmailField(element) {
    "use strict";
    this.element = element;
    this.validations = [
        this.checkRequired.bind(this),
        this.checkEmail.bind(this)
    ];
}

EmailField.prototype = Field.prototype;
EmailField.prototype.checkEmail = function () {
    "use strict";
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.element.value)) {
        this.valid = false;
        this.setError(this.element.getAttribute("data-invalid"));
    }
};

function FieldFactory(element) {
    "use strict";
    var fieldType = element.getAttribute("type");
    var obj;

    if (fieldType === "email") {
        obj = new EmailField(element);
    } else {
        obj = new Field(element);
    }

    return obj;
}

module.exports = function (element) {
    "use strict";
    return FieldFactory(element);
};
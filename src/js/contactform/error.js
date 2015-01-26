function Error(target, msg) {
    "use strict";
    this.target = target;

    this.init(msg);
}

Error.prototype = {
    init: function (msg) {
        "use strict";
        this.createElement();
        this.update(msg);
    },

    createElement: function () {
        "use strict";
        this.element = document.createElement("p");
        this.element.setAttribute("class", "contact-form__error");
        this.text = document.createTextNode("");
        this.element.appendChild(this.text);

        this.target.parentNode.insertBefore(this.element, this.target.nextSibling);
    },

    update: function (msg) {
        "use strict";
        this.text.nodeValue = msg;
    },

    remove: function () {
        "use strict";
        if (this.element) {
            this.element.parentNode.removeChild(this.element);
        }
    }
};

module.exports = function (target, msg) {
    "use strict";
    return new Error(target, msg);
};
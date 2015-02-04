var form = require("./form.js");
var _ = require("underscore");

var contactform = {
    endpoint: "",
    onSubmit: function () {
        "use strict";
        this.setFormValues();

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", this.endpoint, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.form = this;
        xmlhttp.onreadystatechange = _.bind(function(e) {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);

                if (response.send) {
                    this.setSend();
                } else {
                    this.setSendError();
                }
            } else {
                console.log("Wait");
            }
        }, this);
        xmlhttp.send(this.serializeObject({
            name: this.name,
            email: this.email,
            message: this.message
        }));
    },
    submit: function (cb) {
        "use strict";
        this.onSubmit = cb;

        return this;
    },
    init: function (query) {
        "use strict";
        var objects = document.querySelectorAll(query);

        if (objects.length > 0) {
            this.endpoint = objects[0].getAttribute("action");
            this.forms = form(objects, _.bind(this.onSubmit, this));
        }

        return this;
    },
    setSend: function () {
        "use strict";
        this.forms[0].innerHTML = "Thank you for your message, I'll get back to you ASAP.";
    },
    setSendError: function () {
        "use strict";
        window.alert("Whoops, something went wrong. Try again.");
    },
    serializeObject: function (obj) {
        "use strict";
        var str = "";

        for (var key in obj) {
            if (str !== "") {
                str += "&";
            }
            str += key + "=" + obj[key];
        }

        return str;
    },
    setFormValues: function () {
        "use strict";
        this.name = document.querySelector("#name").value;
        this.email = document.querySelector("#email").value;
        this.message = document.querySelector("#message").value;
    }
};

module.exports = function createContactForm() {
    "use strict";
    return Object.create(contactform);
}
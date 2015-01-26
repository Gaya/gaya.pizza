var form = require("./form.js");

var contactform = {
    endpoint: "",
    onSubmit: function () {
        "use strict";
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.open("POST", this.endpoint, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.form = this;
        xmlhttp.onreadystatechange = function(e) {
            if (xmlhttp.readyState === 4) {
                var response = JSON.parse(xmlhttp.responseText);
                var source = e.target || e.srcElement;

                if (response.send) {
                    source.form.setSend();
                } else {
                    source.form.setSendError();
                }
            }
        };
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
        this.endpoint = objects[0].getAttribute("action");
        form(objects, this.onSubmit);

        return this;
    },
    setSend: function () {
        "use strict";
        //success
    },
    setSendError: function () {
        "use strict";

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
    }
};

module.exports = function createContactForm() {
    "use strict";
    return Object.create(contactform);
}
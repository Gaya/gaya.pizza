var app = require('express')(),
    mail = require("./mail.js"),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    compression = require('compression');

//parse form data
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/contact', mail);

app.use(compression());

app.use(serveStatic(__dirname + '/../public/', {
    'index': ['index.html'],
    'maxAge': (86400000 * 365),
    'setHeaders': function setHeaders(res, next) {
        "use strict";
        res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
    }
}));

app.listen(process.env.PORT || 5000);

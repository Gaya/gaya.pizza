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
    'maxAge': '2 years'
}));

app.listen(process.env.PORT || 5000);

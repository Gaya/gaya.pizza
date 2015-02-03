var connect = require('connect');
var mail = require("./mail.js");

connect().use(connect.bodyParser()).use(
    '/contact', mail
).use(connect.static(__dirname)).listen(process.env.PORT || 5000);

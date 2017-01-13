var app = require('express')(),
    serveStatic = require('serve-static'),
    compression = require('compression'),
    fs = require("fs"),
    __public_root = __dirname.replace('server', 'public') + '/';

//compress output
app.use(compression());

//serve static files
app.use(serveStatic(__public_root, {
    'index': ['index.html'],
    'maxAge': (86400000 * 365),
    'setHeaders': function setHeaders(res, path) {
        "use strict";
        var expire = 345600000;
        if (path.substr(-10) === "index.html") {
            expire = 43200000;
        }
        res.setHeader('Expires', new Date(Date.now() + expire).toUTCString());
    }
}));

//handle not found
app.use(function(req, res, next){
    res.status(404);

    if (req.accepts('html')) {
        res.sendFile(__public_root + '404.html');
        return;
    }

    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    if (!req.accepts('html') && !req.accepts('json')) {
        res.type('txt').send('Not found');
    }
});

app.listen(process.env.PORT || 5000);

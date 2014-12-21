module.exports = {
    "gulp": "app/gulp",
    "src": 'src',
    "dist": 'dist',
    "build": 'build',
    "blog": 'blog',
    "port": 3000,
    "middleware": function handleMiddleWare (req, res, next) {
        "use strict";
        next();
    }
};
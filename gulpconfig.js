module.exports = {
    "gulp": "gulp",
    "src": 'src',
    "dist": 'dist',
    "build": 'build',
    "blog": 'blog',
    "port": 3000,
    "middlewares": [function handleMiddleWare (req, res, next) {
        "use strict";
        next();
    }]
};
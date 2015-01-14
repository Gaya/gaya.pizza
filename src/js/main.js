var scrollHeader = require("./scrollOffset.js");
var inlineRhythm = require("./inlineRhythm/");

//bind on scroll
window.onscroll = scrollHeader;
inlineRhythm().init(".post__body img");
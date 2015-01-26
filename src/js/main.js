var scrollHeader = require("./scrollOffset.js");
var inlineRhythm = require("./inlineRhythm/");
var contactform = require("./contactform/");
require("picturefill");

//bind on scroll
window.onscroll = scrollHeader;
inlineRhythm().init(".post__body img");
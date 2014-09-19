var navHeight = 60;
var headerElement = document.querySelector("header.main-header");
var navElement = document.querySelector("nav.main-nav");
var fixed = false;

window.onscroll = function () {
    "use strict";
    var headerSize = headerElement.getBoundingClientRect();
    var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);

    if (top >= headerSize.height && fixed === false) {
        navElement.setAttribute("class", "main-nav--fixed");
        headerElement.style.marginBottom = navHeight + "px";
        fixed = true;
    } else if (top <= headerSize.height && fixed === true) {
        navElement.setAttribute("class", "main-nav");
        headerElement.style.marginBottom = "0px";
        fixed = false;
    }
};
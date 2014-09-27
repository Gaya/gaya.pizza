var navHeight = 60;
var headerElement = document.querySelector("header.main-header");
var navElement = document.querySelector("nav.main-nav");
var fixed = false;

window.onscroll = debounce(function () {
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
}, 5);

function debounce(func, wait, immediate) {
    "use strict";
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) { func.apply(context, args); }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) { func.apply(context, args); }
    };
}
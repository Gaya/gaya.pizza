---
title: "QueryLoader2 – Preload your images with ease"
author: Gaya
date: 2011-10-26
template: article.html
seo_desc: "QueryLoader2 helps you create an image preloader for your website using jQuery."
links:
  -
    title: Download
    desc: Download on Github
    url: https://github.com/Gaya/QueryLoader2
  -
    title: Example
    desc: See it in action!
    url: http://scripts.gayadesign.com/queryLoader2/
docs:
  name: "QueryLoader2"
  functions:
    -
      name: "QueryLoader2"
      params:
        -
          type: "DOMElement"
          name: "element"

        -
          type: "object"
          name: "options"

      desc: "You can add options to loader."
      tables:
        -
          name: "options"
          rows:
            -
              name: "fadeOutTime"
              type: "int"
              desc: "Time in miliseconds it takes for the overlay to fade out at the end."
            -
              name: "minimumTime"
              type: "int"
              desc: "Time in miliseconds which the loading has to run. If time has not passed the animation will still show."
            -
              name: "maxTime"
              type: "int"
              desc: "Maximum time in milliseconds the loader may take. Go past this time and the loader with automatically close."
            -
              name: "backgroundColor"
              type: "string"
              desc: "Background color of the loader (in hex)."
            -
              name: "barColor"
              type: "string"
              desc: "Background color of the bar (in hex)."
            -
              name: "barHeight"
              type: "int"
              desc: "Height of the bar in pixels. Default: 1"
            -
              name: "deepSearch"
              type: "bool"
              desc: "Set to true to find ALL images with the selected elements. If you don't want queryLoader to look in the children, set to false. Default: true."
            -
              name: "percentage"
              type: "bool"
              desc: "Set to true to enable percentage visualising. Default is false."
            -
              name: "onComplete"
              type: "function"
              desc: "This function is called once the loading and animation are completed."
            -
              name: "onProgress"
              type: "function"
              desc: "This function is called when an image is loaded. Gets parameters percentage, imagesLoaded, totalImages."
---
Gaya Design is back in business and hitting hard with a redo of the 2009 script QueryLoader. I kept getting e-mails and comments about it and thought I had left it just hanging there for way too long. It had become very outdated. So here it is: version 2 of QueryLoader!

[![QueryLoader2 - Preload your images with ease](/articles/queryloader2-preload-your-images-with-ease/ql2header.jpg "QueryLoader2 - Preload your images with ease")](/articles/queryloader2-preload-your-images-with-ease/)

<span class="more"></span>

A direct link to the zipfile:  
[https://github.com/Gaya/QueryLoader2/zipball/master](https://github.com/Gaya/QueryLoader2/zipball/master)

View the example here:  
[http://scripts.gayadesign.com/queryLoader2/](http://scripts.gayadesign.com/queryLoader2/)

Reason behind v2
----------------

QueryLoader2 is a better version of the old script posted in 2009. It serves the main purpose of preloading the images on your website by showing an overlay and a loading bar. It automatically fetches all your images and background images and preloads them before showing the webpage.

Compatibility
-------------

QueryLoader currently works in IE version 9+, Chrome, Safari and Firefox.

**No dependencies**, so *no* jQuery / Zepto / MooTools needed.

Example usage:
--------------

Include the queryloader2.min.js script in the head section of your webpage.


```html
<script src="queryloader2.min.js" type="text/javascript"></script>
```


Create a QueryLoader2 object like this for example:


```javascript
<script type="text/javascript">
    window.addEventListener('DOMContentLoaded', function() {
        new QueryLoader2(document.querySelector("body"), {
            barColor: "#efefef",
            backgroundColor: "#111",
            percentage: true,
            barHeight: 1,
            minimumTime: 200,
            fadeOutTime: 1000
        });
    });
</script>
```


Use with NPM / Browserify
-------------------------

First install QueryLoader as a dependency in your project:


```
npm install queryloader2 --save-dev
```


Use it in a node / browserify project:


```javascript
var QueryLoader2 = require("queryloader2");

var loader = new QueryLoader2(document.querySelector("body"), {
    barColor: "#efefef",
    backgroundColor: "#111",
    percentage: true,
    barHeight: 1,
    minimumTime: 200,
    fadeOutTime: 1000
});
```


jQuery usage
------------

Include jQuery and `queryloader2.min.js` scripts in the header.


```html
<script src="https://code.jquery.com/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="queryloader2.min.js" type="text/javascript"></script>
```


Call QueryLoader in `$(document).ready()` like this:


```javascript
$(document).ready(function () {
    $("body").queryLoader2();
});
```


Install using Bower
-------------------


```
bower install queryloader2
```




GitHub
------

As you might have noticed [I put my code on GitHub](https://github.com/Gaya/QueryLoader2). This makes it easier for me to manage my code and give you updates if you or me find any bugs.  
 You can also [file issues](https://github.com/Gaya/QueryLoader2/issues) with the script here and fork it to make changes / fix bugs. If you send me pull requests I will take a look as to what you have changed and commit it if it is an addition.
---
title: "QueryLoader – preload your website in style"
author: Gaya
date: 2009-10-01
template: article.html
links:
  -
    title: Download
    desc: Get the preloader script!
    url: http://www.gayadesign.com/scripts/queryLoader/queryLoader.zip
  -
    title: Example
    desc: See the preloader in action.
    url: http://www.gayadesign.com/scripts/queryLoader/
---
There is always a minor problem when it comes to preloading image on a website. Nobody really has a full solution for it. There are a lot of preloaders available, but most of the time they only display the words: "Loading page" or have an animated image that spins. Why can't there be a nice loading bar of some kind? I've gotten a few request on how to make a preloader, or people asking me how to get all the images of a web page and preload them (even the images in CSS). This preloader has it all. Loading bar, custom animations and getting all images included in the web page.

<div style="background-color: #fcf8bb; text-align: center; margin-bottom: 1.5em; padding: 0.75em;">[ There is a new version of QueryLoader. Consider this one obselete!](http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/)</div>[![QueryLoader - preload your website in style](/articles/\/qloader.jpg "QueryLoader - preload your website in style")](http://www.gayadesign.com/diy/queryloader-preload-your-website-in-style/)<span id="more-489"></span><div style="background-color: #fcf8bb; text-align: center; margin-bottom: 1.5em; padding: 0.75em;">[ There is a new version of QueryLoader. Consider this one obselete!](http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/)</div> (a special shout out goes to Sieb of [Siebdesign](http://www.siebdesign.nl) for coming up with the animation and the idea of building a preloader) Download the source code here: [http://www.gayadesign.com/scripts/queryLoader/queryLoader.zip](http://www.gayadesign.com/scripts/queryLoader/queryLoader.zip) View the example here: [http://www.gayadesign.com/scripts/queryLoader/](http://www.gayadesign.com/scripts/queryLoader/) Example with percentage visible: [http://www.gayadesign.com/scripts/queryLoaderPercentage/](http://www.gayadesign.com/scripts/queryLoaderPercentage/) or download: [http://www.gayadesign.com/scripts/queryLoader2/qL2.zip](http://www.gayadesign.com/scripts/queryLoaderPercentage/qL2.zip) (thanks to Olivier Dumetz) Features:
---------

- Preload a whole web page.
- Preload a part of the page.
- Gets all images, <img> tags and background-image of your CSS
- Easy to implement.
- Adjustable loading bar.
- Tested in Firefox, Safari, Opera, Chrome, IE7, IE8 and IE6 (script will be ignored in IE6 though).

Implementation:
---------------

 To implement this script you don't need any Javascript experience. Just follow these easy steps: **1.** Download [the zipped archive](http://www.gayadesign.com/scripts/queryLoader/queryLoader.zip). **2.** Upload the contents to your webserver. **3.** Place the following code in thepart of your page: 
```html
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js'></script>
<link rel="stylesheet" href="css/queryLoader.css" type="text/css" />
<script type='text/javascript' src='js/queryLoader.js'></script>
```
 Remove the jQuery part if you have already included the file. **4.** Place this code at the bottom of your page: 
```html
<script type='text/javascript'>
QueryLoader.init();
</script>
```
 You are now done! Customization:
--------------

 If you only want one element / container to be preloaded you can setup a jQuery selector to only preload what you want. Let's say you have an element with an id. You only want the images inside that element to be preloaded. You can use the following code: 
```html
<script type='text/javascript'>
QueryLoader.selectorPreload = "#idOfTheElement";
QueryLoader.init();
</script>
```
 Be aware that you can only preload a single element. So using a class selector could cause some problems. To read more about selectors in jQuery you can read [this page in the jQuery docs](http://docs.jquery.com/Selectors). To adjust the animations of the loading bar, you can take a look in the following functions: `QueryLoader.animateLoader()` and `QueryLoader.doneLoad()` Adjusting these functions requires a bit of jQuery knowledge. Any questions about QueryLoader and implementations can be posted in the comments below. Good luck and happy developing.
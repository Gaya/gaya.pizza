---
title: "Presentation Cycle: Cycle with a progressbar"
author: Gaya
date: 2009-11-03
template: article.html
links:
  -
    title: Download
    desc: Get the goods
    url: http://www.gayadesign.com/scripts/presentationCycle/presentationCycle.zip
  -
    title: Example
    desc: See it in action!
    url: http://www.gayadesign.com/scripts/presentationCycle/
---
[Cycle](http://www.malsup.com/jquery/cycle/) is a script that supports image presentations to easily display multiple images. This script supports a lot of effects and the cycling of html elements. Presentation Cycle is a variation on the functionality of Cycle. Instead of generating a list of numbers that are clickable Presentation Cycle generates a progress bar that shows when the new slide will appear. In this article I'll explain how to implement this on your web page and give you some tips on how to adjust the looks of the cycle elements and progress bar. [![Presentation Cycle: Cycle with a progressbar](/articles/presentation-cycle-cycle-with-a-progressbar/presentationCycle.jpg "Presentation Cycle: Cycle with a progressbar")](http://www.gayadesign.com/diy/presentation-cycle-cycle-with-a-progressbar)<span id="more-559"></span> Download the source code here: [http://www.gayadesign.com/scripts/presentationCycle/presentationCycle.zip](http://www.gayadesign.com/scripts/presentationCycle/presentationCycle.zip) View the example here: [http://www.gayadesign.com/scripts/presentationCycle/](http://www.gayadesign.com/scripts/presentationCycle/) As shown on the [example page](http://www.gayadesign.com/scripts/presentationCycle/), this script generates a progress bar automatically instead of the developer adding some html. Depending on the settings of the script, it dynamically generates a progress bar adjusted to the number of slides in the Cycle container. Features
--------

- Cycle through elements
- Adjustable animation times
- Generates a navigation bar that also shows the progress
- Works in modern browsers

Implementing the script
-----------------------

 The [zip archive](http://www.gayadesign.com/scripts/presentationCycle/presentationCycle.zip) contains an example page to see how to get things to work, but the following steps will tell you how to make your own. First we need to upload the contents of the [zip archive](http://www.gayadesign.com/scripts/presentationCycle/presentationCycle.zip) to your web server (or local for testing). Create a new html page and include the following code in the `` section: 
```html
<head>
    <!-- Stylesheets-->
    <link rel="stylesheet" type="text/css" href="css/presentationCycle.css" />

    <!-- Scripts -->
    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js?ver=1.3.2'></script>
    <script type='text/javascript' src='js/jquery.cycle.all.min.js'></script>
    <script type='text/javascript' src='js/presentationCycle.js'></script>
</head>
```
 It's time to create the container that will contain the html elements for the Cycle: 
```html
<div id="presentation_container" class="pc_container">

    <div class="pc_item">
        <div class="desc">
            <h1>Description title</h1>
            You can put your description in here.
        </div>
        <img src="images/slide1.jpg" alt="slide1" />
    </div>

    <!-- ... repeat the previous item -->

</div>
```
 The container of the cycle elements has a default **id** of "`#presentation_container`". This corresponds to the default settings of the script and the stylesheet. The child elements have a class of "`pc_item`", this also corresponds to the default settings in the stylesheet. Have you uploaded all the files and images? Then you are ready to initialize the script. Put the following below the Cycle container: 
```html
<script type="text/javascript">
presentationCycle.init();
</script>
```
 This is all you need to do to get the default look going! In the following section I will talk about how to configure the script to adjust the looks to your likings. Adjusting the looks
-------------------

 The first thing I'll explain is how to adjust the images that are used to generate the progress bar. The Javascript file of Presentation Cycle contains the following code regarding images the script uses (*line 18*): 
```javascript
//progressbar options
barHeight: 14,
barDisplacement: 20,
barImgLeft: "images/pc_item_left.gif",
barImgRight: "images/pc_item_right.gif",
barImgCenter: "images/pc_item_center.gif",
barImgBarEmpty: "images/pc_bar_empty.gif",
barImgBarFull: "images/pc_bar_full.gif",
```
 The bar height is defined in pixels, this is required for the script to work properly. The height is the same as the images that are contained in the **images** folder. As you can see the images are sprites. I've included the active and inactive version of the image in one image to reduce loading time and it makes the script work better. To adjust the images you need to have two square images next to each other. Making the left part the inactive one and the right the active one. The only requirement is that all the images have the same height, this is to position the bar the right way. Also make sure that you set the height in the script too. `barDisplacement` is the combined value of padding + margin the bar has. To change settings the following code might help; there is no need to change the Javascript file. This code is executed after the Cycle container defined. 
```javascript
presentationCycle.barHeight = 10; //different from the default
presentationCycle.barImgLeft = "images/pc_item_left_custom.gif"; //using a different image

presentationCycle.init(); //start the script
```
 To adjust the settings of the cycle you can adjust the following settings: 
```javascript
//slide options
slideTimeout: 8000,
containerId: "presentation_container",

//cycle options
cycleFx: 'scrollHorz',
cycleSpeed: 600,
```
 `slideTimeout` is the time it takes for a slide to go to the next one. `containerId` is the container of the cycle elements. `cycleFx` is the effect of cycle the script will be using, for all the effects visit [the effect browser](http://www.malsup.com/jquery/cycle/browser.html). `cycleSpeed` is the speed of the animation. I used `<div>` elements to add text to the slides, you can play around with the elements to make them fit your needs, that's the great thing about Cycle! For [more examples](http://www.gayadesign.com/scripts/presentationCycle/index.php?style=1) on how to adjust the script you can take a look at the source of the [different examples](http://www.gayadesign.com/scripts/presentationCycle/index.php?style=2) on the example page. Good luck!
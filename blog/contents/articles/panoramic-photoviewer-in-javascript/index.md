---
title: "Panoramic Photoviewer in Javascript"
author: Gaya
date: 2009-01-14
template: article.html
links:
  -
    title: Download
    desc: PhotoNav zip-archive
    url: http://gaya.github.io/scripts/photonav/photonav.zip
  -
    title: Example
    desc: Open the PhotoNav examples
    url: http://gaya.github.io/scripts/photonav/
---
As a webdesigner you might have had this problem: "I've got a nice looking wide image, but I don't want my visitors to scroll horizontally."

A [colleague](http://www.siebdesign.nl/) showed me a new project he was working on. A large image appeared and I had the ability to drag and move the image around in a container. Not super efficient if you ask me, I still had to grab the image and move it around holding my mouse button. Can't there be an easier way?

This article will show you my solution to the problem and maybe even a different approach on navigation.

[![Panoramic Photoviewer in Javascript](/articles/panoramic-photoviewer-in-javascript/postimage.jpg "Panoramic Photoviewer in Javascript")](/articles/panoramic-photoviewer-in-javascript/)

<span class="more"></span>

The *example page* is located here:  
[http://gaya.github.io/scripts/photonav/](http://gaya.github.io/scripts/photonav/)

And the *archive is downloadable* here:  
[http://gaya.github.io/scripts/photonav/photonav.zip](http://gaya.github.io/scripts/photonav/photonav.zip)

**What is it?**
---------------

This photo container has been adjusted to "move" with the cursor. To achieve this I used Javascript and a library called [Prototype](http://www.prototypejs.org/). Prototype is also needed in order to run script.aculo.us. I also applied script.aculo.us to achieve the smooth moving picture.

**What do we have and what do we need to do?**
----------------------------------------------

1. Create a HTML layout for the picture to get in.
2. Adjust the CSS.
3. Make a call to PhotoNav in Javascript.

**1. Create a HTML layout**
---------------------------

This is the easiest step. It might just as well be a copy paste of the code below. But be aware of three things.  
 First give the overall container an id (so Javascript can grab the object).  
 Then make sure the div with classname *fixed* gets a second classname to correspond with the CSS (I used *opt1* and *opt2*).  
 Determine if you want to have links inside of the container, if not; you can leave the container empty.

Take a look at the code below:


```html
<div class='photo' style='display: none;' id='navigate'>
    <div class='fixed opt1'>
        <!-- this is optional -->
        <a href='http://gayadesign.com/post/' class='button1'>
        
        </a>
        <a href='http://gayadesign.com/portfolio/' class='button2'>
        
        </a>
        <a href='http://gayadesign.com/about/' class='button3'>
        
        </a>
        <a href='http://gayadesign.com/partners/' class='button4'>
        
        </a>
        <a href='http://gayadesign.com/contact/' class='button5'>
        
        </a>
    </div>
</div>
```


The overall container "navigate" will always be hidden prior to the actual Javascript call. I also gave the *fixed* div a second class. This classname will point to the options of the container; the height and the background image (the actual image that needs scrolling).  
 You can add *a tags* to the *fixed* container. I gave them all classnames so they can be positioned in the CSS. This part is optional.

Remember to include the Prototype library and the PhotoNav Javascript files in the header (and script.aculo.us if you want to enable smooth scrolling). Also include the CSS file *photonav.css*.


```html
<script src="js/prototype.js" type="text/javascript"></script>

<script src="js/scriptaculous.js" type="text/javascript"></script>

<script src="js/photonav.js" type="text/javascript"></script>
<link href='css/photonav.css' rel='stylesheet' type='text/css' />
```


**2. Adjust the CSS**
---------------------

The top part of the CSS has to stay the way it is, do not adjust it if you don't know what you are doing. I put a comment at the spot where you can start to edit the CSS.**  
** I'll describe what to do at each part of the CSS.

**.photonav .photo: **


```css
.photonav .photo {
    width: 400px;
    margin: 10px;
    border: 1px solid gray;
}
```


Adjust the width of the total container. This has to be a fixed width in order for it to work in IE6. I have no idea why, but if the *width* was set to *100%*, the height was 0px. You can do *100%* in other browser with the *!important* trick.  
 The margin and border are optional, just make it as you'd like.

**.photonav .photo .opt1:**


```css
.photonav .photo .opt1 {
    height: 100px;
    background-image: url();
}
```


This is the height of the photo container, at least, the *fixed* container. But notice the *.opt1*, it is the second classname we added to the *fixed* container in the HTML part.  
 The background image is the image that has to be viewed inside the container.

*The next part is optional and only if you want buttons inside the container.*

**a.button*:**


```css
a.button1 {
    margin-left: 20px;
    margin-top: 30px;
    width: 100px;
    height: 90px;
    background-image: url();
}

a.button1:hover {
    background-image: url();
}
```


In order to create a menu navigation like I did on the preview page, you need to add *a tags* with different classnames. Define the pixels from the left side and the top of the container in the margin values. State the width and height of the button and the background image (if needed).  
 To create an *onhover* effect you can add an other image in the *:hover* part.  
 If you want a second *a tag* next to the other, subtract the *height *of the previous button from the margin-top.

**3. Make a call to PhotoNav in Javascript**
--------------------------------------------

Now that you've got all the necessary HTML and CSS set, you can call the PhotoNav functionality. The following code can be put in a js file or in a *strict* tag.


```javascript
document.getElementById('navigate').style.display = 'block';
PhotoNav.init('navigate', 758, 1412, false, 0, false);
```


The specification is:  
**function **init(**String ***id_of_container*, **int ***width_of_container*, **int ***width_of_panorama_picture*, **bool ***smoothScrolling*, **float ***smoothLevel*, **bool***debugMode*);

**String ***id_of_container*:  
 The id of the container.

**int ***width_of_container*:  
 Give the width in pixels of the *fixed* container. For calculating reasons.

**int ***width_of_panorama_picture*:  
 Give the width in pixels of the <span style="font-style: italic;">panoramic </span>*picture*. For calculating reasons.

**bool ***smoothScrolling*:  
 Enable script.aculo.us powered smooth scrolling (default: false)

**float ***smoothLevel*:  
 Level of smoothing, recommended to keep the default 0.1 (default: 0.1)

**bool***debugMode*:  
 Enable debug mode. Outputting value to the HTML element with id *'status'*. (default: false)

If you want to enable debug mode, you have to insert the following code somewhere in your HTML:


```html
<div id='status'>
    &nbsp;
</div>
```


Now that everything is set, you can fire the thing up! Enable the navigation on loading a page or by triggering an event in Javascript. If you have implementations of this script, post your examples in the comment section, I'd like to see them.

Happy developing! And have fun.
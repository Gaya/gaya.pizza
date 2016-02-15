---
title: "Garagedoor effect using Javascript"
author: Gaya
date: 2008-12-28
template: article.html
links:
  -
    title: Download
    desc: Garage Door Effect zip-archive
    url: http://gaya.github.io/scripts/garagedoor/garagedoor.zip
  -
    title: Example
    desc: Open the Garage Door example
    url: http://gaya.github.io/scripts/garagedoor/
---
You might have noticed the menu at the top right corner of the website. That's something what I like to call the GarageDoor effect.

Creating one has now been made easy! This tutorial explains everything you need to know on how to create the same effect yourself.

[![Garagedoor effect using Javascript](/articles/garagedoor-effect-using-javascript/garageprev1.jpg "Garagedoor effect using Javascript")](/articles/garagedoor-effect-using-javascript/)

<span class="more"></span>

An example of the GarageDoor effect in work is found here: [http://gaya.github.io/scripts/garagedoor/](http://gaya.github.io/scripts/garagedoor/)
*Download* the following archive containing everything you need: [http://gaya.github.io/scripts/garagedoor/garagedoor.zip](http://gaya.github.io/scripts/garagedoor/garagedoor.zip)

*Unzip *the contents of the archive and upload the contents to your server, the set folders can be adjusted to your needs.

First we need to make the script ans style of the GarageDoor work. To make that happen, you'll need Scriptaculous. This library enables interface effects, so you don't have to create it yourself. So [grab Scriptaculous](http://script.aculo.us/downloads) and upload it to your server. Make sure you also upload the **prototype.js** file (in the lib folder).

Add the following code in the **** tag of your page:


```html
<script src="js/prototype.js" type="text/javascript"></script>
<script src="js/scriptaculous.js" type="text/javascript"></script>

<script src="js/garagedoor.js" type="text/javascript"></script>
<link href='css/garagedoor.css' rel='stylesheet' type='text/css' />
```


This will load the scripts and styles needed for the GarageDoor to work. *Adjust the paths where needed.  
*

The next thing you want to do is to create the HTML layout for the garagedoors. The following code shows the structure you need to create for your document:


```html
<div class='garagedoor' id='garagedoor'>
    <div title='linktofile' class='item'>
        <div class='underlay'>
            Caption text
        </div>
        <img src='uritooverlayimage' class='overlay' />
        <div class='mouse'><img src='images/nothing.gif' />&nbsp;</div>
    </div>
    <div title='linktofile' class='item'>
        <div class='underlay'>
            Caption text
        </div>
        <img src='uritooverlayimage' class='overlay' />
        <div class='mouse'><img src='images/nothing.gif' />&nbsp;</div>
    </div>
</div>
```


This contains two items that will be the garagedoor. The keywords **linktofile** and **uritooverlayimage** have to be adjusted in order to make it work. **Linktofile** is the URL of the page the button has to link to, might be confusing because it's not an *a tag*, but Javascript fixes it for you.

The items have a default size of: **100px width **and **80px height**. *Create overlay images* according to these dimensions. In order to change the size, take a look in the **garagedoor.css** file and *adjust* the **width** and **height** of several elements.

All there is left to do is call the GarageDoor to enable the effect!


```html
<script>
    GarageDoor.scrollY = -55;
    GarageDoor.scrollX = 0;
    GarageDoor.setBindings('garagedoor');
</script>
```


The first line in the `<script>` tag sets the amount of scrolling the overlay has to do when the cursor is floating over an item. In this example the overlay has to go 55 up, which means move -55px on the Y-axis.

You can also make it scroll horizontal.

Give the **id** of the **garagedoor container** to the **setBindings** method and the GarageDoor effect will be initialized! Be sure to make the call **after** creating the **html**.

You are now set to use the GarageDoor Effect. Good luck!
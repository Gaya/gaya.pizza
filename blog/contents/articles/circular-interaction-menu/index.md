---
title: Circular InterAction menu
author: Gaya
date: 2009-09-04
template: article.html
links:
  -
    title: Download
    desc: Get the InterAction zip-archive
    url: http://gayadesign.com/scripts/interaction/interaction.zip
  -
    title: Example
    desc: See the menu in action
    url: http://gayadesign.com/scripts/interaction/
---
It's time for another jQuery script from Gaya Design. This time I created an interactive menu, which can be used in CMSes, applications or just on your own website. This post will show you how this script works and how to apply it in your own environment. [![Circular InterAction menu](/articles/interactionpost.jpg "Circular InterAction menu")](http://www.gayadesign.com/diy/circular-interaction-menu/)<span id="more-475"></span> Download the source code here: [http://gayadesign.com/scripts/interaction/interaction.zip](http://gayadesign.com/scripts/interaction/interaction.zip) View the examples here: [http://gayadesign.com/scripts/interaction/](http://gayadesign.com/scripts/interaction/) Have you ever run into this problem? You have a nice CMS with a list of items a client can edit, delete, move etc etc. The page becomes kind of cluttered with icons, problem! Not anymore. This script offers a minor solution to that problem. It is a menu that opens once you click on an object of your choice. It loads the options and shows them in a circular way around the center of the object. It took some math and a lot of thinking time, but the menu items seem to be positioning quite well. If you take a look at the example, you see that I applied the InterAction script inside a small mini game. It shows that an object can have menu items, that the items can fire actions and that objects can get new sets of actions if needed.

Getting started:
----------------

 First we have to include a few stuff scripts and CSS in the `` tag: 
```html
<link href='css/interaction.css' rel='stylesheet' type='text/css' />
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js'></script>
<script src="js/interaction.js" type="text/javascript"></script>
```
 You can leave out the jQuery part if you have it included in your html already. Now you need an object on which you to add the menu. I'll use a sample object: 
```html
<img id="plant" src='images/flower.png' alt='' />
```
 This will serve as our object in this tutorial. Note that you have to have an image `flower.png` ready for use ;-) To add a menu to this object you'll only need to execute the following Javascript code: 
```javascript
InterAction.init("#plant", Array(Array("test option", function() {})));
```
 These are the method + parameters you have to perform to add a menu to the object. The object is now clickable and there is one menu option with an empty action. The first parameter is the selector (use id) you'd use in jQuery. The second parameter is a multidimensional array filled with arrays that contain menu options + their actions. Where the first item in the array is the text in the menu item and the second item the action itself. It is a callback for the menu item once it is clicked. To prevent the code from getting cluttered, the second parameter can be set before the `InterAction.init()` method is called. I like to separate both this way: 
```javascript
var plantMenu = Array(
    Array("Test option", function() {
        //you can enter js code here
    }),
    Array("Test option 2", function() {
        //you can enter js code here
    })
);

InterAction.init("#plant", plantMenu);
```
 These are the basics of creating a menu with the InterAction script. Filling it in:
--------------

 Have you already noticed that empty actions will not automatically the menu once you've clicked on an item? InterAction supports has a few options you can use in the action to make the development process a bit easier. 
```javascript
//this will close the menu
InterAction.forceClose();

//this contains the html object of the item you just clicked
InterAction.clickedElement;
//for jQuery:
$(InterAction.clickedElement);

//dynamically create a new menu for an object:
InterAction.init("#plant", nameOfActionArray); //will replace old menu if one exists
```
 To change the looks of the menu, you can take a look in the CSS and replace the images of the menu if you want. They are also set in the InterAction.js file. A quick example:
----------------

 The following code will show you how to create an easy InterAction menu: 
```javascript
var plantMenu = Array(
    Array("Close menu"), function() {
        InterAction.forceClose();
    },
    Array("Hide me"), function() {
        $(InterAction.clickedElement).fadeOut();
    },
    Array("Create new"), function() {
        InterAction.init("#" + $(InterAction.clickedElement).attr("id"), plantMenu);
    }
);

InterAction.init("#plant", plantMenu);
```
 Future:
-------

 I am already creating a standard Javascript file containing actions which are widely used in applications (such as going to an url and manipulating html). If you are creating actions yourself I'd be happy to hear what your ideas are, so I can use them in the future. Drop any questions you have in the comments. Happy developing!
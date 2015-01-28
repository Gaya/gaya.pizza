I love [image slideshows](http://www.noupe.com/javascript/30-javascriptajax-techniques-for-sliders-scrollers-and-scrollbars.html) and [portfolios with an extra bit of interaction and effects](http://www.siebdesign.nl/ "Sieb Design"). The problem I found when I wanted to make one of my own was that I always ran out of ideas how to display portfolio items / pictures in a special way. But then it hit me, and the idea for this image slider was born. [![Image slider for displaying pictures or portfolios](/articles/imageslider.jpg "Image slider for displaying pictures or portfolios")](http://www.gayadesign.com/diy/image-slider-for-displaying-pictures-or-portfolios/)<span id="more-222"></span> Example of the image slider is located at: [http://www.gayadesign.com/scripts/slider/](http://www.gayadesign.com/scripts/slider/) The slider and all its files can be downloaded here: [http://www.gayadesign.com/scripts/slider/gdslider.zip](http://www.gayadesign.com/scripts/slider/gdslider.zip) First I want to explain what this image slider does: This image slider creates a slideshow of images and makes it look like the images have been cropped to only thin strokes. Once the user clicks on an image it will expand across the slideshow and show the picture in its full galore. Click of the left or the right side of the container to navigate to other pictures, the images will keep appearing as if there is an infinite loop of images. It also preloads the images that will be shown on the page. The pictures in the example are all pictures from [http://www.sxc.hu/](http://www.sxc.hu/ "Stock.xchng") a nice site with free stock photos. **Please note that this script does not work in IE6. ** Implementing this script is fairly easy. [The zip-archive](http://www.gayadesign.com/scripts/slider/gdslider.zip) contains everything you need except from [Scriptaculous and Prototype](http://script.aculo.us/ "Scriptaculous"). So [let's download that](http://script.aculo.us/downloads "Download scriptaculous") first. Next, unzip the archive somewhere and upload the contents of the **/src/** and **/lib/** folders to you web server. Great! Now that you have Scriptaculous uploaded, [download the image slider](http://www.gayadesign.com/scripts/slider/gdslider.zip) and unzip it. Upload the contents to your web server (I used the **js** folder to put the Scriptaculous files in to keep things separated). Now it's time to make things work. Add the following code to your  tag. Adjust the following code to your preferences: 
```html
<!-- include scriptaculous + prototype -->
<script src="js/scriptaculous/prototype.js" type="text/javascript"></script>
<script src="js/scriptaculous/scriptaculous.js" type="text/javascript"></script>

<script src="js/extraTransitions.js" type="text/javascript"></script>
<script src="js/slider.js" type="text/javascript"></script>
```
 You can find the html code to put on your page in the **example.html** file which is the following: 
```html
<div id="items">
    <div id="loading">
        &nbsp;
        <div id="pictureLoadContainer"></div>
    </div>
    <div id="caption" style="display: none">
        <div class="background">&nbsp;</div>
        <div id="captionContent" style="display: none"></div>
    </div>
    <div id="overflow">
        <!-- put images with alt attributes here -->
    </div>
    <div id="SlideLeft" class="nav left">
        <img src="images/arrow_left.png" alt="Click to move left" />
    </div>
    <div id="SlideRight" class="nav right">
        <img src="images/arrow_right.png" alt="Click to move right" />
    </div>
</div>
```
 The images you want to load inside the slider have to be **1000 x 620** by default. I'll explain how adjust this later in the tutorial. Put the images you want to load in the <div> called *"overlay"*, just like a normal image on your webpage. 
```html
<img src="uritoimage" alt="caption to go with the image" />
<img src="uritoimage" alt="caption to go with the image" />
<img src="uritoimage" alt="caption to go with the image" />
...
```
 You are basically done with adjusting the script if you like the default looks. To adjust the height and width of several elements take a look in the **style.css** file.

- Define the height and width of the item container in: **\#container #items**.
- Define the size of the navigation buttons in: **\#container #items .nav**.
- Define the size of the items in: **\#container .item**.
- If you adjust the height also adjust it here: **\#container #items #overflow**.

 If you adjust the widths of elements you also have to change the **slider.js** file in the js folder. The code is at the top of the script: 
```javascript
/* edit these options according to your CSS */
itemWidth: 250, //width of an item
totalWidth: 1000, //total width of the container
navWidth: 112, //width of the nav including padding
/* end edit options */
```
 *Adjust the number to the amount of pixels you had it changed into. Easy not?* The script will load automatically and will only start once all the images have been loaded. Have fun!
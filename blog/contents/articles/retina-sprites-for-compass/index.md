Creating CSS rules for retina sprites and background images can be a drag. I wrote a quick mixin that will help you with this. It allows you to use sprites in Compass with added retina variants. Works just like the normal sprites helpers, but has been made a lot easier with these mixins. [![](/articles/post-image.jpg "Retina Sprites for Compass")](http://www.gayadesign.com/diy/retina-sprites-for-compass/)<span id="more-869"></span> Take a look at the example to see the results.

The problem:
------------

 You want your site to serve retina images to retina displays, but not to non-retina ones. This mixin / solution will make it very easy for you to use sprites and let Compass generate the mappings of the two different sizes. Since we have to develop sites that serve retina images and background-images our sprites and background-image approaches might get a bit cluttered in our CSS. Using just one call, this mixin will know which image has to be served to the browser and will also resize it to show as if it was in your normal image dimentions. How to use:
-----------

 First thing you'll need to do is to download the mixins and put them where your scss / sass files are located. Notice the underscore at the start of the filenames, this will prevent Compass from compiling these files to CSS. 1. Include the mixin in your SASS/SCSS file using: `@import "retina-sprites";`
2. Create two folders in your images folder of your Compass project. By default there are `icons` and `icons-2x`.
3. Save your sprite images in the folders. The pixel-ratio 1 variant in `./icons` and the retina variant in `./icons-2x`. Make sure there have the same filename.
4. Use the sprite in your SASS/SCSS using: `@include use-sprite(filename)`. (Note the missing .png, this is not needed.)

 It's really that easy! What it does:
-------------

 Compass will create a nice sprite image from the images you put in the folders. Make sure you only use PNG files for the best result. Using just the name of the file Compass will know where the image is located in the huge sprite image it will generate. The mixin will also get the retina variant if the browser is running in a pixel-ratio 2 environment. This is the generated CSS from the example: SCSS: 
```scss
.sprite2 {
    @include use-sprite("sprite2");
}
```
 Becomes, CSS: 
```css
.sprite2 {
    background-image: url("../images/icons-s44ec97e90e.png");
    background-position: 0 -25px;
    background-repeat: no-repeat;
    overflow: hidden;
    display: block;
    height: 25px;
    width: 25px;
}

@media (-webkit-min-device-pixel-ratio: 2), (-o-min-device-pixel-ratio: 3 / 2), (min-device-pixel-ratio: 2) {
    .sprite2 {
        background-image: url("../images/icons-2x-s93dce01c9d.png");
        background-position: 0 -25px;
        background-size: 45px 95px;
        height: 25px;
        width: 25px;
    }
}
```
 The nice thing about this is that the browser will only get the sprite image it needs:
###Non-retina:

![Network on non retina device](/articles/network-non-retina.jpg "Network on non retina device")### **Retina:**

![Network on retina device](/articles/network-retina.jpg "Network on retina device")

Bonus: retina background-images
-------------------------------

 With the same principles of the sprites I created a mixin that sets the background-image and it's retina version. How to use retina background-images:
------------------------------------

1. Include the mixin in your SASS/SCSS file using: `@import "retina-background-image";`****
2. Put a pixel-ratio 1 version and a retina version anywhere in your images folder.
3. Apply the style using: `@include background-retina(file-normal.png, file-retina.png);`

 The following code will generate: SCSS: 
```scss
.background {
    @include background-retina("background.gif", "background-2x.gif");
}
```
 Becomes, CSS: 
```css
.background {
    background-image: url('../images/background.gif');
}
@media (-webkit-min-device-pixel-ratio: 2),
(-o-min-device-pixel-ratio: 3 / 2),
(min-device-pixel-ratio: 2) {
    .background {
        background-image: url('../images/background-2x.gif');
        background-size: 25px 25px;
    }
}
```
 Conclusion:
-----------

 Let me know what you think about the mixins and if they are useful to you. If you have anything to add, put it in the comments or let me know on Github. Happy Sassing, and tell people to stop using LESS ;) Gaya
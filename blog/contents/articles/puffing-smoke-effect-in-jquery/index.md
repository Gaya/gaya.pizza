---
title: "Puffing Smoke Effect in jQuery"
author: Gaya
date: 2009-05-26
template: article.html
links:
  -
    title: Download
    desc: Get the code to puff
    url: http://www.gayadesign.com/scripts/smokeeffect/smokeEffect.zip
  -
    title: Example
    desc: View the puffs
    url: http://www.gayadesign.com/scripts/smokeeffect/
---
Since the launch of the new looks, I've been getting some requests on how to make the puffing smoke effect that you can see in the header.

Thinking it might be a funny effect, I'd like to take this opportunity to discuss this effect.

[![Puffing Smoke Effect in jQuery](/articles/puffing-smoke-effect-in-jquery/puffingsmoke.jpg "Puffing Smoke Effect in jQuery")](http://www.gayadesign.com/diy/puffing-smoke-effect-in-jquery/)

<span class="more"></span>

Download the source code here: [http://www.gayadesign.com/scripts/smokeeffect/smokeEffect.zip](http://www.gayadesign.com/scripts/smokeeffect/smokeEffect.zip)

View the examples here: [http://www.gayadesign.com/scripts/smokeeffect/](http://www.gayadesign.com/scripts/smokeeffect/)

As you can see on the example page, you can selected different types of smoke that will adjust the effect while keeping the code intact.

Creating this fun jQuery effect doesn't take too much effort. I am going to quickly go through the steps of using this effect to show you how easy it can be.

Usage
-----

Using this script takes just a few small steps. Enter the following code in the  section of your HTML page (remove jQuery if you already included that):


```html
<link href='css/smokePuff.css' rel='stylesheet' type='text/css' />
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js'></script>
<script src="js/smokeEffect.js" type="text/javascript"></script>
```


Next up is to put something in the page that will puff the smoke, I used the chimney from my home page. Include the following in your HTML:


```html
<div id="smokeSpawnPoint">
    <img src='uri to your image' alt='chimney' />
</div>
```


Now it's time to make the Javascript call and set up the smoke.

First we're going to set the URI to the smoke / cloud image and the size in pixels.  
 Place this after the HTML from above:


```html
<script type='text/javascript'>
    SmokeEffect.imgLocation = "http://www.yoursite.com/images/smoke.png";
    SmokeEffect.smokeWidth = 100;
    SmokeEffect.smokeHeight = 100;
</script>
```


Make sure the values match your smoke image. The smoke image is preferably a PNG image to make the effect look better and to be able to see the background. If you have a solid colour background, you can also use other formats.

Now start up the script by including the following code in the same `<script>` tag:


```javascript
SmokeEffect.makeEffect("smokeSpawnPoint", 24, 12);
```


The first parameter is the id of the element the smoke has to come from. The next 2 are the position from the top-left of the element where the smoke has to start. First is X then Y.

So if you have an image of a chimney like me, the starting point is 24px to the right and 12px down from the top-left. Play with the values to get it right.

And that's it! Another easy effect on your web page!

Extra!
------

If you want to change the kind of smoke coming out of the spawn point you can use this code to change it into another image:


```javascript
SmokeEffect.imgLocation = "http://www.yoursite.com/images/otherSmoke.png";
SmokeEffect.smokeWidth = 90;
SmokeEffect.smokeHeight = 70;
```


You can change this dynamically whenever you want.

Good luck!
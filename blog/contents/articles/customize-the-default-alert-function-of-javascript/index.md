---
title: "Customize the default alert() function of Javascript"
author: Gaya
date: 2009-03-11
template: article.html
links:
  -
    title: Download
    desc: GdAlert zip-archive
    url: http://www.gayadesign.com/scripts/gdalert/gdalert.zip
  -
    title: Example
    desc: Open the GdAlert example
    url: http://www.gayadesign.com/scripts/gdalert/
---
Web designers, developers and web users know them. We all have run across one of these; the Javascript alert message. Most of the time, I don't even read them and click them away. But the more important thing is that they just look ugly, no matter which browser you use.

So why not remake the whole Javascript alert function? This article will give you the basics of my customization of the alert message.

<div class="border">[![Customize the default alert() function of Javascript](/articles/\/gdalertintro.jpg "Customize the default alert() function of Javascript")](http://www.gayadesign.com/diy/customize-the-default-alert-function-of-javascript/)</div><span id="more-139"></span> While working on a new project which will launch in a few months (I hope!) I used a lot of alert messages in Javascript, just because it's easy and quick to use. The problem still is that it looks ugly. So, I decided to **overwrite the alert function** and create my own version of it. Sweet, not? *What did I do?* First of all, I needed a way to overwrite the alert function because I didn't want to go and refactor all of my code to call another function, you programmers understand me ;). Next is how the message should displayed on the screen. The first problem is surprisingly easy, you can just overwrite a function by declaring it again. To display the message, I created a quick container which will be centered. There will also be a container beneath with message box to darken and disable the rest of the page. Okay, so now for the things you need to do. Go to [http://script.aculo.us/downloads](http://script.aculo.us/downloads) and download the latest version of scriptaculous. Also download GdAlert: [http://www.gayadesign.com/scripts/gdalert/gdalert.zip](http://www.gayadesign.com/scripts/gdalert/gdalert.zip) Upload the contents to your server. Now place the following code in the head section of your page. 
```html
<script src="js/prototype.js" type="text/javascript"></script>
<script src="js/scriptaculous.js" type="text/javascript"></script>
<script src="js/gdAlert.js" type="text/javascript"></script>
```
 So now that you've got the Javascript files ready, we now need to do one last thing. Include the following code right after the **** tag: 
```html
<div id='alert_message' style='display: none'>
    <span>
    
    </span>
    <input type='button' value='ok' class='button' onclick='gdAlert.close()' />
    <br style='clear: both' />
</div>
```
 That was it. Now all your alert function calls will be nicer and personalized. Take a look in the CSS to configure the looks of the message box, I'd really like to see what variations you make of this script. Good luck!
If you're a webdeveloper or designer I am pretty sure you've run into the problem of people wanting to have "fullscreen content" or just background images that will stretch in the most optimal way to the users screen. Lately I found that a lot of people are asking for fullscreen backgrounds, videos and other types on stuff. So to prevent myself from reinventing the wheel over and over again I made a small jQuery plugin, and thought you guys might like it too. So here it is: Fullscreen Background for jQuery. [![jQuery plugin: Fullscreen Background](/articles/fullscreengdpost.jpg "jQuery plugin: Fullscreen Background")](http://www.gayadesign.com/diy/jquery-plugin-fullscreen-background/)<span id="more-845"></span>

How to use.
-----------

 And using it is so easy; anyone can do it! Oh, and it works in every browser I could test it in. (IE7 and higher, Firefox, Opera, Safari and Chrome) Here's a short step by step installation guide: 1. Put the following code in the  section of your webpage: 
```html
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery.fullscreenBackground.js"></script>
```

2. Have the following structure in your HTML (or something similar): 
```html
<div class="content">
    Content goes here
</div>
<div id="background-image">
    <img src="path/to/img.jpg" alt="" width="800" height="600" />
</div>
```

3. Remember to define the width and height of the images! This is important.
4. Then, in your CSS. Make sure the content (not the background image container) is absolute and has a higher z-index than 1.
5. Finally add this in a piece of Javascript, preferably in <span class="code"><span class="code">$(document).ready(); </span></span> 
```javascript
$("#background-image").fullscreenBackground();
```


Documentation:
--------------

  Conclusion:
-----------

 Quick and easy: it really does the trick here. Absolutely no rocket science, but it will prevent you from coding it again in the future. Let me know what you think!
---
title: "sNotify: Easy notifications in jQuery"
author: Gaya
date: 2009-08-19
template: article.html
links:
  -
    title: Download
    desc: Get sNotify in a zip-archive
    url: http://www.gayadesign.com/scripts/sNotify/sNotify.zip
  -
    title: Example
    desc: See the notifications in action!
    url: http://www.gayadesign.com/scripts/sNotify/
---
There hasn't been a jQuery tutorial / script on Gaya Design for a while. This is because I've been working on this particular script for a while and have a lot of other scripts in development. sNotify is a script which is particularly handy for people who are developing web applications. sNotify allows the developer to display notifications in a fast and easy way. [![sNotify: Easy notifications in jQuery](/articles/\/snotify.jpg "sNotify: Easy notifications in jQuery")](http://www.gayadesign.com/diy/snotify-easy-notifications-in-jquery/)<span id="more-453"></span> Download the source code here: [http://www.gayadesign.com/scripts/sNotify/sNotify.zip](http://www.gayadesign.com/scripts/sNotify/sNotify.zip) View the examples here: [http://www.gayadesign.com/scripts/sNotify/](http://www.gayadesign.com/scripts/sNotify/) The idea for sNotify struck me when I was playing the Sims 3. Its way of notifying the user of important events looked simple but effective. A message box slides in screen from the top right, containing just a small bit of information. The thing I liked most was the way it sorted notifications and displayed them in an orderly way. By this I mean: When there is more than one notification, it displays them one after another.

Features:
---------

- Display notifications in the top right corner of the screen
- Close the message with a click on a button
- Automatically closes messages after 10 seconds (or whatever you'd like)
- Disables auto close when you are hovering over a message
- Puts messages in a queue to display them one after another
- Easy to implement

Getting it to work:
-------------------

 First thing we need to do is to include the script on your web page. Upload the contents of the script somewhere, preferably in the folders you use for CSS and JS. Put the following code in the `` section of the page: 
```html
<link href='css/sNotify.css' rel='stylesheet' type='text/css' />
<script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js'></script>
<script src="js/sNotify.js" type="text/javascript"></script>
```
 You can remove the jQuery part if you already included it. Now that you've included sNotify, you can start to test out the script. Use the following Javascript code to display a message: 
```html
<script type='text/javascript'>
sNotify.addToQueue("You can add your message here.");
</script>
```
 This will display the notification in the first possible cycle of the queue. You are basically putting the message in a queue so that messages won't get mixed up. By doing a simple `sNotify.addToQueue` call you can add your messages to the queue, so it is possible to add multiple messages at the same time but it won't clutter the page: 
```javascript
sNotify.addToQueue("The first message.");
sNotify.addToQueue("The second message.");
sNotify.addToQueue("The third message.");
```
 To change the amount of time a message a message stays on screen, use the following: 
```javascript
sNotify.timeOpen = 10; //change this number to the amount of second you want
```
 Conclusion:
-----------

 It's that easy! You can edit the CSS to adjust the looks (I guess this is required) according to the looks of your web page. You can also add HTML in the messages to add links or other elements. Have fun!
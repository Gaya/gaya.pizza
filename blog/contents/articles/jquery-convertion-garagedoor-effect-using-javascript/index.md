Today I finally found the courage to go and try [jQuery](http://jquery.com/ "jQuery"). After getting some people say: "You should use jQuery instead of scriptaculous." I began thinking. What is the reason I choose script.aculo.us again? Must have been something I read in that time. Anyway, today I found the time to look at jQuery a bit and thought: Let's convert [my very first posted script](http://www.gayadesign.com/diy/garagedoor-effect-using-javascript/) to jQuery! After 5 minutes of reading about selectors in jQuery and 15 minutes of coding it was born. I am super amazed by the results! About 40%/50% less code and about 200% less time needed to write the script. I bet that in the future 400% less time is reachable! **For all the jQuery lovers: Here is the Garage Door effect. Now in jQuery!**[![jQuery convertion: Garagedoor effect using Javascript](/articles/jquerygarage.jpg "jQuery convertion: Garagedoor effect using Javascript")](http://www.gayadesign.com/diy/jquery-convertion-garagedoor-effect-using-javascript/)<span id="more-237"></span> Since this article is a redo of [Garagedoor effect using Javascript](http://www.gayadesign.com/diy/garagedoor-effect-using-javascript/) I'll just make it so that it fits jQuery. An example of the GarageDoor effect in work is found here: [http://www.gayadesign.com/scripts/jquerygaragedoor/](http://www.gayadesign.com/scripts/jquerygaragedoor/) Download the following archive containing everything you need: [http://www.gayadesign.com/scripts/jquerygaragedoor/jquerygarage.zip](http://www.gayadesign.com/scripts/jquerygaragedoor/jquerygarage.zip)*Unzip *the contents of the archive and upload the contents to your server, the set folders can be adjusted to your needs. First we need to make the script ans style of the GarageDoor work. To make that happen, you’ll need jQuery. This library enables interface effects, so you don’t have to create it yourself. So [grab jQuery](http://docs.jquery.com/Downloading_jQuery#Download_jQuery) and upload it to your server. Add the following code in the **** tag of your page: 
```html
<script src="js/jquery-1.3.2.min.js" type="text/javascript"></script>

<script src="js/garagedoorjQuery.js" type="text/javascript"></script>
<link href='css/garagedoor.css' rel='stylesheet' type='text/css' />
```
 This will load the scripts and styles needed for the GarageDoor to work. *Adjust the paths where needed. * The next thing you want to do is to create the HTML layout for the garagedoors. The following code shows the structure you need to create for your document: 
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
 his contains two items that will be the garagedoor. The keywords **linktofile** and **uritooverlayimage** have to be adjusted in order to make it work. **Linktofile** is the URL of the page the button has to link to, might be confusing because it’s not an *a tag*, but Javascript fixes it for you. The items have a default size of: **100px width **and **80px height**. *Create overlay images* according to these dimensions. In order to change the size, take a look in the **garagedoor.css** file and *adjust* the **width** and **height** of several elements. All there is left to do is call the GarageDoor to enable the effect! 
```html
<script type="text/javascript">
    GarageDoor.scrollY = -55;
    GarageDoor.scrollX = 0;
    GarageDoor.setBindings('garagedoor');
</script>
```
 The first line in the **<script>** tag sets the amount of scrolling the overlay has to do when the cursor is floating over an item. In this example the overlay has to go 55 up, which means move -55px on the Y-axis. You can also make it scroll horizontal. Give the **id** of the **garagedoor container** to the **setBindings** method and the GarageDoor effect will be initialized! Be sure to make the call **after** creating the **html**. Hope you liked this jQuery version of the Garage Door. **No more prototype conflicts**! Stay tuned for more jQuery convertions!
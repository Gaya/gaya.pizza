[Twitter](http://www.twitter.com "Twitter") is an amazing service to keep in touch with everyone on the Internet. It's easy, fast and there are a lot of [Twitter applications](http://twitter.com/downloads "Twitter Applications"). I came up with the idea to Ajaxify (is that even a word?) the tweets on [my website](http://www.gayadesign.com "Gaya Design"). As you can see, it's on the right, below the last.fm recently played. It's called [AjaxTwits](http://www.gayadesign.com/diy/ajaxtwits-load-tweets-on-your-website-with-ajax "AjaxTwits")! This article will show you how to use AjaxTwits and how to install it on your website. [![AjaxTwits - Load Tweets on your website with AJAX](/articles/ajaxtwits.jpg "AjaxTwits - Load Tweets on your website with AJAX")](http://www.gayadesign.com/diy/ajaxtwits-load-tweets-on-your-website-with-ajax)<span id="more-172"></span> Example of AjaxTwits is located at: [http://www.gayadesign.com/scripts/ajaxtwits/](http://www.gayadesign.com/scripts/ajaxtwits/) AjaxTwits and all it's files can be downloaded here: [http://www.gayadesign.com/scripts/ajaxtwits/ajaxtwits.zip](http://www.gayadesign.com/scripts/ajaxtwits/ajaxtwits.zip) or the [old version](http://www.gayadesign.com/scripts/ajaxtwits/ajaxtwits_old.zip)Update notice:
--------------

 There were a few things going from in the AjaxTwits class which have been fixed. Some tweets seems to make AjaxTwits stop working. I also included the date in the Javascript code. [Download the new zip](http://www.gayadesign.com/scripts/ajaxtwits/ajaxtwits.zip) to gain access to the improved code. If you have an installation of AjaxTwits on your site you can replace the AjaxTwits.php class with the file from the [new zip](http://www.gayadesign.com/scripts/ajaxtwits/ajaxtwits.zip). The Javascript has changed to, but it's not necessary to change. What does AjaxTwits do?
-----------------------

- Load a twitter timeline and / or the replies of a twitter account
- Cache the results so you don't stress the twitter servers
- Avatar finder (auto update if user uploads a new one)
- Load multiple timelines / replies from different accounts
- AJAX support with JSON option or XML
- Front-end Javascript output
- Automatic hyperlink finder and @username linking
- Easy to adjust to your likings

Why AjaxTwits?
--------------

 The problem with loading twitter on the server side part of your website is that it will slow down the load time massively. Which means your pages will load pretty slow. This is because of the use of external feeds and services, it takes some time to load them. The server will read the XML and RSS feeds very quickly, but PHP still has to load the files from the Twitter servers. AjaxTwits keeps the load time separate from your website, meaning it will load after your page is loaded and not effecting the user experience. Yes, the services still need to be loaded. But the loading is done afterward. The caching of results prevents the service to stop loading the feeds. Twitter has a build in limit of requests, so be gentle on their servers. This also helps to load AjaxTwits very quickly and output tweets in a few milliseconds! The twitter timeline is also limited to only your tweets and not those of other people. That's why AjaxTweets also supports search queries performed on [http://search.twitter.com/](http://search.twitter.com/). AjaxTwits has an easy build-in option to get all the reply messages of a user and mix them into the timeline. What do I need?
---------------

- PHP with JSON and SimpleXML support (PHP 5.2.0 or greater)
- A [Twitter account](https://twitter.com/signup) to consume or a Twitter account of [someone else](https://twitter.com/gayadesign)
- An FTP client to upload contents to the server

How to install:
---------------

 AjaxTwits is fairly easy to install, the following steps will enable AjaxTwits on your website! Step 1: Download and upload AjaxTwits
-------------------------------------

 Download AjaxTwits here: [http://www.gayadesign.com/scripts/ajaxtwits/ajaxtwits.zip](http://www.gayadesign.com/scripts/ajaxtwits/ajaxtwits.zip). Unzip the contents and upload them to your web server. Anywhere you'd like! Step 2: Adjust the request file
-------------------------------

 In the "*AjaxTwits*" folder you just uploaded****is a file called "*AjaxTwitsRequest.php*" and "*AjaxTwitsUpdate.php*". Open this file in an editor. 
```clike
//include AjaxTwits and create an object
include('AjaxTwits.php');
$ajaxTwits = new AjaxTwits;

//set the cache to a writable folder, to save xml files
$ajaxTwits->cachefolder = "AjaxTwits/cache";
//the amount of minutes the feed is cached
$ajaxTwits->cacheTime = 15;

//the amount of items you'll show
$ajaxTwits->itemCount = 6;

//add your twitter account feeds
$ajaxTwits->addTimeline("gayadesign");
$ajaxTwits->addReplies("gayadesign");

//this will output the information, JSON is for the Javascript application
$ajaxTwits->outputFeed("json");
```
 Adjust the following line to your likings: ***$ajaxTwits->cachefolder = "AjaxTwits/cache";***This is the folder where the XMLs will be cached. Enter the folder starting in the **root** of your website. So if you have AjaxTwits installed in */blog/AjaxTwits/* the cache folder should be *blog/AjaxTwits/cache.****$ajaxTwits->cacheTime = 15; ***The amount of minutes the XML should stay on your server before it will be refreshed.******This means that every 15 minutes the timeline will be updated on your site. Adjust to your likings. ***$ajaxTwits->itemCount = 6;*** The amount of items you want to output on your website. ***$ajaxTwits->addTimeline("gayadesign");*** Load the public timeline of the given username. ***$ajaxTwits->addReplies("gayadesign");*** Load the replies of the given user. Every tweet on Twitter containing [@gayadesign](http://twitter.com/gayadesign) in this case. Upload the adjusted file to your server if needed. Step 3: Make the cache folder writable
--------------------------------------

 Explore the server contents with an FTP client and make the cache folder (default: AjaxTwits/cache) writable using *chmod* 777. This is for saving XML on the server. Step 4: Include AjaxTwits on your webpage
-----------------------------------------

 In the header () of your HTML add the following code: 
```html
<script src="js/AjaxTwits.js" type="text/javascript"></script>
<link href='css/AjaxTwits.css' rel='stylesheet' type='text/css' />
```
 This will load the necessary Javascript + the styling of the widget. Step 5: Get the HTML of the widget ready
----------------------------------------

 Add this to your HTML on the place you want to include the widget: 
```html
<ul id='AjaxTwits'>
    <li id='AjaxTwitsLoader'>
        <em>Loading tweets</em>
    </li>
</ul>
<script type="text/javascript">
    getAjaxTwits("AjaxTwits/AjaxTwitsRequest.php", 6);
</script>
```
 The tweets that are loaded will be inserted into the unordered list with id *AjaxTwits*. The list item *AjaxTwitsLoader *will be deleted. Adjust ***getAjaxTwits("AjaxTwits/AjaxTwitsRequest.php", "AjaxTwits/AjaxTwitsUpdate.php", 6);*** to your preferences. The first parameter is the **location of the AjaxTwitsRequest.php file**. The second parameter is the **location of the AjaxTwitsUpdate.php file**. The third parameter is the **amount of items to show**. Conclusion:
-----------

 That's all you have to do! Not that much right? You can adjust the CSS and mess around with the Javascript if you like. Hope this will help you create a nice Twitter widget on your website.
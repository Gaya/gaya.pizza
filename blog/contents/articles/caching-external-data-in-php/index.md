---
title: Caching external data in PHP
author: Gaya
date: 2009-05-14
template: article.html
---
Caching data. If you are a developer you must have heard about it somewhere. Is it really that important? There is only one thing I can say to that: yes! There are a lot of reasons why you should start caching data that has been calculated. The most common reason is to keep the owner of the data happy, saving him/her bandwidth and server capacity. In this article I will be telling you how to cache data given from an external service, but can also be used to save local results. [![Caching external data in PHP](/articles/cachingpost.jpg "Caching external data in PHP")](http://www.gayadesign.com/diy/caching-external-data-in-php/)<span id="more-349"></span> Caching is also important for you! It can speed up your scripts and won't bug your visitors with long loading times (which will get them walking.) Imagine this: You have a very nice script which is very powerful but takes a while to load, since it calculates a whole lot of stuff. This action would take up about 4 seconds. Maybe it's time to question if this action is really necessary every time a page is loaded, will this data fluctuate that much? A great example of this problem is getting when you are getting your data from an external service. This will always require an other server to respond to your needs, slowing down the script. Wouldn't it be better to get the information you need and save it on your server for the times you need that data? There is also something else to keep in mind: How many times is the data updated and how many times do I need to refresh this data? If you are loading a list of things going on right at this moment, then you might not want to cache anything, for the information is real time. But if you want, let's say, a weekly report on something. Then obviously you only need to update this data once a week. To explain how to create your own caching method I am going to use [another Last.fm API function](http://www.last.fm/api/show?service=281). We are going to save last weeks favorite artist of a user and refresh this data once a week.

Getting the data to work with
-----------------------------

 First things first: create a folder using any FTP application. Make sure this folder is writable. I put a folder called "cache" in the root of my script folder. Make sure this folder is writable and readable for PHP, most people just CHMOD the folder to 777. We'll be writing our cached data in this folder. Also create the file you'll be caching too, I used an empty file called "lastfm.xml". Be sure to make it read and writable. Next you want to go and grab any service you'd like. an XML provider, an RSS feed or even your own script. It doesn't matter what you are caching. In this tutorial I am going to work with an XML providing service. Next up is to create a new PHP class which is going to handle our caching and the gathering of data. Let's create the class to do this for us. I created a file called "Caching.php" for the class to go in. Take a look at this skeleton: 
```clike
<?php
/*
* Caching A small PHP class to
*/

class Caching {

    var $filePath = "";
    var $apiURI = "";

    function __construct() {

    }

    function checkForRenewal() {

    }

    function getExternalInfo() {

    }

    function stripAndSaveFile() {

    }

}
?>
```
 This piece of code will serve as the foundation of our class which will cache our information. We'll be filling up each function step by step. First we need a constructor which will accept the path to the file and a URI to the API. In this case, the XML data can be requested by only calling an URL. The constructor will be executed the moment you instantiate the class. A few things we'll be doing in this function are: - Check the input variables.
- Check if the local file needs to be updated.
- Get new data if refresh is needed and save it.

 I've set up the following piece of code for the constructor: 
```clike
function __construct($filePath, $apiURI) {
    //check if the file path and api URI are specified, if not: break out of construct.
    if (strlen($filePath) > 0 && strlen($apiURI) > 0) {
        //set the local file path and api path
        $this->filePath = $filePath;
        $this->apiURI = $apiURI;

        //does the file need to be updated?
        if ($this->checkForRenewal()) {

            //get the data you need
            $xml = $this->getExternalInfo();

            //save the data to your file
            $this->stripAndSaveFile($xml);

        } else {
            //no need to update the file
            return true;
        }

    } else {
        echo "No file path and / or api URI specified.";
        return false;
    }
}
```
 The process of this function is quiet self explanatory. So now we need to go and enable all the function calls within the constructor. Making the functions work
-------------------------

 First up is the time check called "checkForRenewal". In this function we'll be checking the file that has been set in the constructor and see if the last adjusted time has been a week ago. To accomplish this, we are going to compare the times using time() and filemtime(). These methods are extremely easy to use and can add any given amount of seconds to the time, which we need to check whether the file is a week old. Use the following code for the "checkForRenewal" function: 
```clike
function checkForRenewal() {
    //set the caching time (in seconds)
    $cachetime = (60 * 60 * 24 * 7); //one week

    //get the file time
    $filetimemod = filemtime($this->filePath) + $cachetime;

    //if the renewal date is smaller than now, return true; else false (no need for update)
    if ($filetimemod < time()) {
        return true;
    } else {
        return false;
    }
}
```
 What this function does is get the time which the file was last modified and add the set seconds to it and see if that time is smaller than now. The cache time is defined in second, so 60 seconds * 60 minutes * 24 hours * 7 days would make a week worth of seconds. You can adjust this to any given time you want. *For debugging I suggest setting the time to only 60 seconds.* The next function will be how to get the external of the URI we specified in the constructor. I've written a post about [how to read XML in PHP](http://www.gayadesign.com/diy/reading-xml-with-php/) before, so I'll go over this function very briefly. Reading the XML and saving it
-----------------------------

 In getExternalInfo() we are going to make the API call and just return the result as an XML set. Take a look at the following code: 
```clike
function getExternalInfo() {
    if ($xml = @simplexml_load_file($this->apiURI)) {
        return $xml;
    } else {
        return false;
    }
}
```
 This must have been one of the shortest PHP function I ever wrote, this is all you need to do in order to get the XML you want (if the service provides XML through just doing simple URI calls.) Next up is going through the XML and only keeping parts you want to save in your XML file. Again: going to skip through some parts of the next function because you can [read more about reading xml in an older article](http://www.gayadesign.com/diy/reading-xml-with-php/). Looking at [the XML returned by Last.fm](http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=xgayax&api_key=b25b959554ed76058ac220b7b2e0a026) I saw the first problem: unnecessary information. The name of the artist and play count are the only things I am interested in. Mbid? Don't need that. Url? Not this time! So the next function, "stripAndSaveFile", will make us read XML, create our own and save it to a file. Sounds simple enough right? Take a look at what I wrote: 
```clike
function stripAndSaveFile($xml) {
    //put the artists in an array
    $artists = $xml->weeklyartistchart->artist;

    //building the xml object for SimpleXML
    $output = new SimpleXMLElement("<artists></artists>");

    //get only the top 10
    for ($i = 0; $i < 10; $i++) {

        //create a new artist
        $insert = $output->addChild("artist");

        //insert name and playcount childs to the artist
        $insert->addChild("name", $artists[$i]->name);
        $insert->addChild("playcount", $artists[$i]->playcount);
    }

    //save the xml in the cache
    file_put_contents($this->filePath, $output->asXML());
}
```
 First thing it does is put the node inside a new variable to keep everything readable. The next lines are to create a new SimpleXML object you can work with. new SimpleXMLElement("") means that I just created an XML document with as the root element. We'll be filling up this element with elements. Sounds logical? It sure does! In the the loop that comes next we're looping through the first ten entries and create a new artist for every time you are in the loop. $insert is a new node that will be inserted into the root. The and nodes are also inserted into the node with the information we got from the XML. Pfew! Now it's time to save the file on your file system! Which is the last line in this function. It will export the XML as a string and save it in the file. Making the call!
----------------

 Up until now we haven't called the function once. So create a new script and put the following code in it: 
```clike
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include('Caching.php');
$caching = new Caching("cache/lastfm.xml", "http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=xgayax&api_key=b25b959554ed76058ac220b7b2e0a026");
?>
```
 I've put the first two lines in to ensure errors will be shown. If you have that by default; feel free to remove these lines. Next is including the class file and then make a new instance of the class, giving the two required parameters: The path to the cache XML and the URL to the Last.fm API. You won't see anything if it's correct. Now check out your cache to see if your XML is saved. Congratulations! You just cached some information.
###The source

 Missed anything? Here is the source in it's full galore! The Caching class: 
```clike
<?php
/*
* Caching A small PHP class to get data from Last.fm and cache it
* Author: Gaya Kessler
* URL: http://www.gayadesign.com/
*/

class Caching {

    var $filePath = "";
    var $apiURI = "";

    function __construct($filePath, $apiURI) {
        //check if the file path and api URI are specified, if not: break out of construct.
        if (strlen($filePath) > 0 && strlen($apiURI) > 0) {
            //set the local file path and api path
            $this->filePath = $filePath;
            $this->apiURI = $apiURI;

            //does the file need to be updated?
            if ($this->checkForRenewal()) {

                //get the data you need
                $xml = $this->getExternalInfo();

                //save the data to your file
                $this->stripAndSaveFile($xml);

                return true;
            } else {
                //no need to update the file
                return true;
            }

        } else {
            echo "No file path and / or api URI specified.";
            return false;
        }
    }

    function checkForRenewal() {
        //set the caching time (in seconds)
        $cachetime = (60 * 60 * 24 * 7); //one week

        //get the file time
        $filetimemod = filemtime($this->filePath) + $cachetime;

        //if the renewal date is smaller than now, return true; else false (no need for update)
        if ($filetimemod < time()) {
            return true;
        } else {
            return false;
        }
    }

    function getExternalInfo() {
        if ($xml = @simplexml_load_file($this->apiURI)) {
            return $xml;
        } else {
            return false;
        }
    }

    function stripAndSaveFile($xml) {
        //put the artists in an array
        $artists = $xml->weeklyartistchart->artist;

        //building the xml object for SimpleXML
        $output = new SimpleXMLElement("<artists></artists>");

        //get only the top 10
        for ($i = 0; $i < 10; $i++) {

            //create a new artist
            $insert = $output->addChild("artist");

            //insert name and playcount childs to the artist
            $insert->addChild("name", $artists[$i]->name);
            $insert->addChild("playcount", $artists[$i]->playcount);

        }

        //save the xml in the cache
        file_put_contents($this->filePath, $output->asXML());
    }

}

?>
```
 Calling the scripts: 
```clike
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include('Caching.php');
$caching = new Caching("cache/lastfm.xml", "http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=xgayax&api_key=b25b959554ed76058ac220b7b2e0a026");
?>
```

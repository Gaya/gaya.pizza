---
title: "Reading XML with PHP"
author: Gaya
date: 2008-12-29
template: article.html
---
Since **webservices** and **RESTful** services are becoming more and more popular, **XML** is getting a common format to exchange information. XML is easy to read and has a nice tree structure, which can be easily interpreted.

This post will show you how easy it is to *read XML in PHP*.

[![Reading XML with PHP](/articles/reading-xml-with-php/xml.jpg "Reading XML with PHP")](/articles/reading-xml-with-php/)

<span class="more"></span>

In this tutorial I'll teach you how to read information which a simple webservice provides. The webservice I choose is [Last.fm](http://www.last.fm/api). It's quick, fun and has a lot of features. We'll use the **Recent Tracks** information of a user profile.

According to the [API of Last.fm](http://www.last.fm/api/) the XML which will be returned will look something like this:


```html
<?xml version="1.0" encoding="utf-8"?>
<lfm status="ok">
    <recenttracks user="xgayax">

        <track nowplaying="true">
            <artist mbid="1bc41dff-5397-4c53-bb50-469d2c277197">The Dillinger Escape Plan</artist>
            <name>Party Smasher</name>
            <streamable>1</streamable>
            <mbid></mbid>
            <album mbid="">Ire Works</album>
            <url>http://www.last.fm/music/The+Dillinger+Escape+Plan/_/Party+Smasher</url>
            <image size="small">http://userserve-ak.last.fm/serve/34s/19117171.jpg</image>
            <image size="medium">http://userserve-ak.last.fm/serve/64s/19117171.jpg</image>
            <image size="large">http://userserve-ak.last.fm/serve/126/19117171.jpg</image>
            <date uts="1230497786">28 Dec 2008, 20:56</date>
        </track>

        ...

    </recenttracks>
</lfm>
```


This is a part of the actual XML Last.fm gave me. We can see that is not too complicated, which is a good thing!

So what do we need to do now? First, we need that XML file in PHP. We can accomplish that by using the **simplexml_load_file** function in PHP *(Introduced with PHP5)*.

It only needs the URI to the XML file and it will convert the string into an XML object. Pretty neat.

Create a new PHP file and place this code somewhere:


```php
$completeurl = "http://ws.audioscrobbler.com/2.0/?method=&amp;user=xgayax" .
"&api_key=b25b959554ed76058ac220b7b2e0a026";
$xml = simplexml_load_file($completeurl);
```


This will load the given file into an object. The url can be adjusted to your needs, preferably the API key since I borrowed it from the Last.fm site.

All what's left for us to do is to loop through the given object.

Take a look at the following code:


```php
$tracks = $xml->recenttracks->track;

for ($i = 0; $i < 3; $i++) {
    $nowplaying = $tracks[$i]->attributes()->nowplaying;
    $trackname = $tracks[$i]->name;
    $artist = $tracks[$i]->artist;
    $url = $tracks[$i]->url;
    $date = $tracks[$i]->date;
    $img = $tracks[$i]->children();
    $img = $img->image[0];

    echo "<a href='" . $url . "' target='TOP'>";

    if ($nowplaying == "true") {
        echo "Now playing: ";
    }

    echo "<img src='" . $img . "' alt='album' />" . 
        $artist . " - " . $trackname . " @ " . $date . "
    </a>
    ";
}
```


To understand what is happening, I'll explain some of the actions I did to get the right information.

Going through the XML tree is easy.** $xml** will refer to the root element, which is **<lfm>** in this case. From this element we can navigate through the XML tree.  
 If you want: **<lfm><recenttracks><track>** you'll get **$xml->recenttracks->track** in PHP. And because **recenttracks **contains multiple **tracks** an array will be given.

The size of the loop is limited to 3, you can however replace this with **sizeof($tracks)** is you please.

Just like explained above, getting the information inside a tag is done like this: **$tracks[$i]->tagname**. You'll get the text which is inside (if it contains text, or else you'll get an object or an empty string.)

To read attribute information, you need to use the **attributes()** method. Like I did in this line: **$tracks[$i]->attributes()->nowplaying**. If the attribute doesn't exist you'll get an empty string.

I hope this gets you into reading XML's using PHP. It is easy and takes little time to learn.  
 I've used XML reading for serveral purposes now like synchronizing information with a database and displaying upcoming event information.

The power of XML is now in your hands.
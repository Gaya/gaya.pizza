---
title: "What to do with AJAX and what not to"
author: Gaya
date: 2009-03-20
template: article.html
---
[AJAX](http://en.wikipedia.org/wiki/Ajax_%28programming%29) is one the nicest concept I've seen in web development. The basics are simple and quite easy to use.  
 There are a lot of [AJAX frameworks](http://en.wikipedia.org/wiki/List_of_Ajax_frameworks) around like [jQuery](http://jquery.com/), [Prototype](http://www.prototypejs.org/) and [backbase](http://bdn.backbase.com/). These frameworks help you create an AJAX application with ease.  
 But is AJAX really that good? No, but if you use it correctly, it is!

In this article I wish to share my view on AJAX and the possibilities it gives to web developers and designers, and why AJAX is wrong in several situations.

<div class="border">[![What to do with AJAX and what not to](/articles/what-to-do-with-ajax-and-what-not-to/ajaxpost.jpg "What to do with AJAX and what not to")](http://www.gayadesign.com/articles/what-to-do-with-ajax-and-what-not-to/)</div><span class="more"></span>

**Case 1: Page loading**
------------------------

What's up with websites and dynamically loading pages through AJAX? Isn't it a bit strange that when you want to switch to another page, there is no real page switch?  
 Sure, I like it when content is loaded into the website dynamically, saving me bandwidth, time and irritation. But a whole page? Isn't that kind of missing the point?

- First of all: What about the back and forward buttons of your browser? No use for them if you load a whole page in AJAX.
- Second: Funny when a user tries to copy the URL and send it to a friend. Oops, the page is loaded without the content the user expected.
- Third: Search Engines can't pick it up since it is not really a new page.

A better way to load content through AJAX is to load only small parts of information on the page. If the users wishes to visit another page, let the browser go to another page.  
 Loading content in a small part of the page isn't a bad thing. If you have a container with tabbed content, it's easy to load the content of other tabs with AJAX, not a problem.

Loading a whole page in AJAX is just overusing the functionality and really missing the point of web browsing.

**Case 2: The content manager**
-------------------------------

Being able to adjust the information of your web profile on a web page with the use of AJAX is cool. Fast feedback, fast loading times and convenient. But is it really secure?  
 I've seen sites where the HTTP calls to the server contained the key and value of the part they wanted to configure. Which means the record which will be adjusted is defined. This means you could also change information of other rows in the database. Why? You need to wonder what parts of the profile can be adjusted, and if it applies only to the user who is trying to configure their information, why do you need a key to tell the server which record to adjust?  
 In PHP, for example, it only takes little effort to remember a value in a session. With this, you know which user is using the website and if you open the session in the AJAX server side pages, you can still read that session. Makes it easy to tell which record to update and doesn't give a user the opportunity to mess around in your system.

If you do want to send along a key + value, which could be needed in some situations (like inserting a comment), be sure to check the given values in the server side scripts. Can't say this enough to people, but please be sure the user that is trying to insert / update data has access to that data. This also applies to normal usage of forms, but adjusting an AJAX request is harder for most users. Still it is possible! So be on your guard.

**Case 3: One click update**
----------------------------

This one is something I love about AJAX. The vote buttons on sites, the follow button on Twitter, delete entry buttons and many more of those. The convenience of just clicking once without having to refresh the page is awesome. It's so simple, yet so powerful.  
 If you are using such a thing, keep *case 2* in mind.

**Case 4: Content loading**
---------------------------

One of the most important things of dynamic loading: it has to be quick. Sending a request to a server doesn't always have to take up most of the time, but loading the response can be a real pain.  
 Keep the response clean and small. I've seen examples (I've been guilty in the past) of people giving HTML back in the response. With this they'll adjust the innerHTML of a container. In the worst case they'll load a whole new page (like in *case 1*).

To solve this, please use [JSON](http://www.php.net/json_encode) or anything of that kind. JSON helps you convert server side variables to Javascript variables. The response the server will give are Javascript variables for Javascript to read. JSON has been implemented in PHP since version 5.2.0 and is easy to use.

Don't give HTML back to your web page, but arrays of information. This helps keeping the presentation of your site and the calculation apart from each other. Do the adjusting of the DOM in Javascript.

Case 5: External Services
-------------------------

When you use external services and feeds to build a web page in server side scripting, you rely on an external service. This can also result is pages loading slower than needed. The is why AJAX is ideal for loading external services.

You can see it in action on this very page. The [last.fm](http://www.last.fm/user/xgayax) loader actually makes a [request to last.fm for an XML](http://www.last.fm/api/show?service=278) and I am reading the XML in PHP and give it back to Javascript. This will prevent slow loading of the rest of the page and let's the information just easily slip in the page when it's ready.

I hope I've given my point of view on AJAX and how to use it. If you wish to discuss the things that I've said; please do so!

Share your AJAX stories with me =)
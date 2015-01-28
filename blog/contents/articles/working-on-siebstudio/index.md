---
title: "Working on Siebstudio"
author: Gaya
date: 2011-02-10
template: article.html
links:
  -
    title: Example
    desc: Visit the website (offline :( )
    url: http://www.siebstudio.com
---
Last week a friend of mine, [Sieb](http://www.siebstudio.com), launched his new website for his design company called [Siebstudio](http://www.siebstudio.com). The website got mentioned on [creattica](http://creattica.com/css/siebstudio/52315) and got some nice exposure through it. This article will explain my part in the development and what we did to create a site like this. [![](/articles/\/ssworkingon.jpg "Working on Siebstudio")](http://www.gayadesign.com/articles/working-on-siebstudio/)<span id="more-665"></span> As some of you might know, me and Sieb work [at the same place](http://www.cybox.nl) and we get together from time to time. We've created quite a lot of website in our time and I always like when we have to collaborate to make an awesome looking website that pops. So a couple of weeks ago I got to see the new and in progress Siebstudio website which instantaneously blew my mind. The one thing that wasn't done yet (because it's not Sieb's specialty) was the advanced code behind the site. Sieb did get a nice base for me too work on and got the effects ready as he wanted it. There were a couple of things missing though, and that's where I came in, using my jQuery / javascript magic. Let me just point out a few features of the site:

- Sorting elements on screen using [Masonry](http://desandro.com/resources/jquery-masonry/) (animated)
- Displaying different artwork and slides using [Cycle](http://jquery.malsup.com/cycle/)
- Loading the clicked items through AJAX
- Dynamically change the visiting url with Javascript making it possible to share / like / tweet links even though the content is loaded dynamically without a new HTTP request
- Different types of blocks so the content is not set to one layout

 After hours of coding, having fun, drinking beers and having smokes the website was finally done. Most annoying stuff I encountered was obviously getting it to work in Internet Explorer (that freaking browser!) and getting that twitter/facebook like urls to work. But it works now. Hope you like the website. I really think Sieb outdid himself again. My compliments. Drop any comments below, much appreciated. Take care, Gaya
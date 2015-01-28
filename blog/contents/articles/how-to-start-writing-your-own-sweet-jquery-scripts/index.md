---
title: "How to start writing your own sweet jQuery scripts"
author: Gaya
date: 2009-11-30
template: article.html
---
Sometimes it can be hard to start writing a Javascript script when you don't know what to do instantaneously. But luckily there is the Internet right? Just go to Google and type in what you want in a script. Good chance some jQuery or Javascript solution will show in the results, and you are basically done. The problem is that you still don't know how to do such things. In this article I'll discuss the viral points of planning out a Javascript / jQuery script with ease. [![How to start writing your own sweet jQuery scripts](/articles/how-to-start-writing-your-own-sweet-jquery-scripts/startjquery.jpg "How to start writing your own sweet jQuery scripts")](http://www.gayadesign.com/articles/how-to-start-writing-your-own-sweet-jquery-scripts/)<span id="more-592"></span> Before I start talking about Javascript and jQuery I want to take the time to do some shameless self-promotion. A few weeks ago I opened up [a small blog on tumblr](http://micro.gayadesign.com). I will be posting inspiration I've come by on the Internet, just to support the sharing of awesomeness on the web! The url is: [http://micro.gayadesign.com](http://micro.gayadesign.com) Now on with the article!

Good to know
------------

 Before you start working with jQuery, it's best you first understand Javascript and the difference with it and plain HTML and CSS. Most HTML elements are static, they don't move, they just sit there. A document (without any flash objects or gif images) looks like a still life. The only change you'll probably get is when you hover over links. You can't change the content of the page without generating a new document. This is where Javascript (in this case in addition jQuery) steps in, which you probably already know. The first thing I would like to advise is to start by learning basic Javascript and doing calculations in it. This will also help you experience the differences between browsers. But don't worry; jQuery solves a lot of these problems! I think that the following tutorials give you a great start in developing in Javascript: [http://www.w3schools.com/JS/](http://www.w3schools.com/JS/js_intro.asp). For people who prefer books; I found that "Professional JavaScript for Web Developers (Wrox Professional Guides)" is a pretty neat book to understand the basics of Javascript. If you're already into Javascripting, the previous steps would be out of the question. So we'll move on to jQuery. Go to the [jQuery website for the documentation](http://docs.jquery.com/Main_Page). There is a lot of information about how jQuery works and which functionality is available. In the next section I'll explain what to do before starting to write your own script. Before creating a script
------------------------

 The first thing you need (this is kind of a no-brainer) is a good idea. An idea for a nice effect, some sort of enhancement for your web page or effect of any kind. Most of the scripts I wrote were made because there was functionality I wanted, but wasn't available in plain HTML and CSS. Most of the things you'll create with jQuery would have never been possible without the use of Javascript. Once you've got an overall idea of what you want to achieve and which elements you want to adjust, you can start to create a layout in HTML and CSS. It is important that you give the right classes and ids to the elements, this will benefit in the jQuery development process. Elements that will be visible after a certain action can already be included in the document, but make sure to hide them from the user. A simple *display: none* in the CSS will suffice. It is a lot easier to use HTML that is already generated rather than generating it all in jQuery. I also like to keep "ghost elements" ready in the HTML, so I can copy a whole element and append / prepend the copied element with ease. This will minimize the jQuery scripting code. Now that you have the layout ready and have a basic idea of what you want, you can start to map out everything the script will do to your page. The basic idea is to list all events and happenings. I like to make short lists of different functions which the script will contain. I'll give an example of a very basic script; It displays thumbnails. When a user clicks on a thumbnail, the larger version is displayed. When a user hovers over a thumbnail some styling is added. This example can be divided into separate function with ease, but separating the events first is the easiest. We'll have an *onhover *and an *onclick *event which we have to lay out. Now that we know which events will take place we can write what these events should do, eg: **Hover**: Element should get a border and disposition a bit to the top. It should reset when the cursor leaves the element. **Click**: Get the source to the larger version and append this image to the display element. The actions can be easily scripted as functions. So that you'd only have to bind a function to the event. Now we can create the code layout for this example. I like to keep all my scripts clean, and to achieve this I put the whole script inside a new Javascript array. The following code will serve as the template for this script: 
```javascript
var ScriptName = {

    init: function() {
    //function that will initialize the script and do all the bindings

    },

    openLargeVersion: function(obj) {
    //when a thumbnail is clicked, this will be executed, given the clicked element

    },

    hoverThumb: function(obj) {
    //given the object, we'll manipulate the css

    },

    mouseoutThumb: function(obj) {
    //given the object, we'll reset the styling here

    }

}
```
 Using script layouts like these will really help in the development process. It gives a good idea of what every function should contain and will separate all the action (rather than putting all the Javascript in a file and summing up all functions and bindings.) Keep it simple
--------------

 Really! Keep it simple! Javascript can be used to adjust the presentation of the website, but please, please don't overdo it. It won't do any good on the experience, performance and goal of the script. On top of that the development process will probably be a killer. Just keep it simple (stupid!). It's good to plan out the different animations you want to achieve in the script. First move the element a bit and then change the colour and then and then... It's important to keep animations and actions in line with what you expect. Using the *init *function I created in the sample template code can really help you in separating different snippets of jQuery code. A simple 
```javascript
$("#element-id img.thumb").click(function() { ScriptName.openLargeVersion($(this)) });
```
 would be enough to bind the `openLargeVersion` function to every `img` element with the class `thumb`. When using functionality like .animate using callbacks can be really useful for chaining animations and keeping everything in line. Another thing I started to like is the use of cheat sheets. They save a lot of time clicking around in the jQuery docs. They list all the functionality which jQuery contains and gives you a small example of how you should write the code. I found the following cheat sheet very helpful: [Visual Cheat Sheet by Woork](http://woork.blogspot.com/2009/09/jquery-visual-cheat-sheet.html). Think of how you want to adjust your document's layout. A lot can be achieved by only adjusting the CSS presentation. The *animate *function in jQuery enables you to make changes over an amount of time. Imagine increasing the padding, it will look as if the element is growing. Same can be said about margins, but then the element would move around. Another little something: use [Firebug](https://addons.mozilla.org/en-US/firefox/addon/1843) in Firefox! [Firebug](https://addons.mozilla.org/en-US/firefox/addon/1843) will help you in the development process and gives you a lot of handy options to keep an eye on your HTML. It is very interesting to see the style of an element change thanks to jQuery. The possibility to execute Javascript code on the fly is also a really nice feature when writing Javascript code. It's the easiest way to do trail and error coding without having to upload a file and refreshing the page. This is a tool you cannot miss! Conclusion
----------

 I hope this is a nice step into creating your own jQuery scripts with a few things to keep in mind. It really isn't hard, just let your imagination run wild and try to translate it into logical steps. If you have something to add, please let me know in the comments below!
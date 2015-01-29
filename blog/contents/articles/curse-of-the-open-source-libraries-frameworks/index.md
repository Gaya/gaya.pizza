---
title: "Curse of the Open Source libraries and frameworks"
author: Gaya
date: 2013-10-30
template: article.html
seo_desc: "We're using a lot of open source frameworks and libraries in web development these days. We have to be careful though. This article goes over many pitfalls."
---
The web development population has grown significantly over the past years. A lot of people are choosing development as their trade and make a good living out of it.

The number of people using frameworks or libraries to speed up their development, or solve the parts of development they can't do themselves has increased as well.

Is it a good thing, or are we shooting ourselves in the foot? I will share my view on the matter in this article.

[![Curse of the Open Source libraries and frameworks](/articles/curse-of-the-open-source-libraries-frameworks/curse-of-the-open-source-libraries-frameworks1.jpg)](http://www.gayadesign.com/articles/curse-of-the-open-source-libraries-frameworks/)

<span class="more"></span>

Learning to code
----------------

More and more students are choosing to go into development, but also people from other fields of work are switching to writing code. Webdesigners in particular are switching to be frontend-developer more and more.

Most good webdesigners know how to write HTML and CSS, so that's a great foundation. The problem (in my eyes) is when people dive into learning Javascript by using jQuery immediately.

To me learning to code Javascript doesn't work well when you start by using jQuery. jQuery helps you with a lot of cross-browser compatibility and will make coding Javascript a lot easier, but you'll have to go back to plain Javascript some time in the learning process.

Go to Google and search for a Javascript question. Now replace the word "Javascript" with "jQuery". People are clearly asking the wrong thing because they don't know the fundamentals.

Missing out on the fundamentals
-------------------------------

Learning through a library or framework brings with it a problem that arises a lot of the time; the separation between the foundation of the language they're writing in and the library / framework they're using seems to disappears.

You are, for instance, still writing Javascript when you're using jQuery, and using jQuery's way might not be the answer you're looking for. In PHP we can say the same thing for the CMS's and frameworks that encourage a certain way of working.

To me it's important to understand how a website is build from the ground up. I tend to go deeper and deeper into web development technology to grasp the concepts of which our websites are build. This improves my understanding of what I am doing without just doing something and hoping it doesn't break later.

When I started making websites I started from the beginning: writing HTML only pages, moving on to CSS, then PHP and from there I learned all the knowledge needed to create my own dynamic website. Much later in the process I started learning to use frameworks. For me this improved the understanding of what the frameworks do apart from the language and platform you're writing in.

You can start learning through frameworks or libraries if you'd like, but at some point you're forced to go back to the beginning and learn the true principles of programming.

Don't get me wrong. Starting out learning using established frameworks like Symfony, Laravel and Grails will teach you some great principles. You'd have to know how to code before you dig into these frameworks.

Adding plugins to destroy your project
--------------------------------------

Before jQuery and similar libraries (which have been forgotten) we had to write most of our Javascript bottom up. This made it harder for webdesigners to get into coding Javascript next to their HTML and CSS. jQuery spawned a whole new group of coders who created their own Javascript powered pages.

This also unleashed a storm of plugins to the world. I too have released a few. These can help people with pieces of code they don't know how to or have no time to solve. It's very tempting to use them to solve your problem, but at the same time you don't really know what the impact on your site is.

I am not only aiming at jQuery in this case, but also at software like WordPress, which has a large resource of plugins whom users can install. This gives the unexperienced user and builder the change to improve their site with a piece of code they don't have to write themselves.

This means that you'll most likely add some code and functionality to your site you don't really need to have. This could make your site slower, bigger and break in some cases.

![Very bad practice](/articles/curse-of-the-open-source-libraries-frameworks/script-overload.jpg) One of the worst cases I've come across.

This webpage loads 88 resources, counting 37 scripts. That's an insanely large number. These guys have no clue what they're doing.

Staying clear from them is better in some cases. It just gets hard to filter the good from the bad these days.

Paid themes and plugin overkill
-------------------------------

I've bought templates on the internet to speed up the development process of a website. There are a lot of great ones out there. There is one problem though I run into every time, and that's jQuery plugins overkill.

One of the themes loaded 15 (!) different jQuery plugins to empower the site. Ranging from menu / dropdown behavior plugins to table sorting plugins. They seemed to fix the problems at hand, but included way too much clutter and unneeded code to the webpage, making it very slow and heavy to load.

It also made the site hard to manage and adjust because it was very dependent on these libraries. And I am not even talking about updates that break the site.

Sticking with a library
-----------------------

The library or framework you're working with may feel very safe and you know your way around it. Any problem you face you'll reflect on the tools you're used to working with. This doesn't mean that it's the best solution.

Take WordPress for instance. It's a great tool for creating websites and has great plugins (also a lot of bad ones). It is however not the best solution for some projects I've heard about. I understand that a developer can get used to using a single CMS for everything, but there is really a lot more out there.

Cursing yourself
----------------

Plugins, development tools and everything alike have one common curse: a user base. People who will be using your product and apply it to their project. The problem here of course is that you'll have to try and catch as many situations and exceptions as possible. This also makes it harder to improve your product when your users are not improving theirs.

You'll see a handful of great products out there that I for one can not live without. The problem with some of them is that the people who use the package are not as experienced programmers as the rest. This might lead to the problem that the people behind the software product are holding themselves back for the sake of those inexperienced people. Backwards compatible is not the best choice here.

I understand that you can increase your user base by targeting the less experienced coders and providing them with support for all the previous applications, but how are you so supposed to improve your own product when you can't get rid of the parts which are not as good?

Some closing words
------------------

I am not trying to tell you not to use frameworks and libraries. In fact: they can be super powerful if used correctly. Just use them wisely and do not go for a solution that might not be the best idea.

Go back to the basics and rethink your solutions so we can grow to become a better developers.
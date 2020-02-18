---
title: "Cleaning and Recycling Old Projects (or How I Simplified my Build)"
author: Gaya
date: 2020-02-18
template: article.html
seo_desc: "How to clean up an old project and make it manageable again"
poster: "/articles/cleaning-recycling-old-projects/cleaning-recycling-old-projects-poster.jpg"
---

Sometimes projects run for so long they get dusty. Not maintaining them will leave them to wither and slowly fade away. Even worse is when parts of your projects are too outdated to work and too scary to touch.

I was writing for my blog occasionally, but the system it was built on was terribly outdated and didn't work properly anymore. I haven't had the courage or time to actually fix the underlying system. It was time to change this.

In this article I want to take you through my process of dusting off and cleaning up an old project to breathe new life into it all without starting over completely from scratch.

[![Cleaning and Recycling Old Projects (or How I Simplified my Build)](/articles/cleaning-recycling-old-projects/cleaning-recycling-old-projects-poster.jpg "Cleaning and Recycling Old Projects (or How I Simplified my Build)")](/articles/cleaning-recycling-old-projects)

<span class="more"></span>

## The Reason for Cleaning up

Every time I wanted to write something on this blog, I had to make sure the conditions were perfect. The project ran on node.js version `0.10.35` and didn't install locally a lot of the times because of old packages which were out of date too.

I was still able to deploy new content, but getting it all to work was a drag and made me dread writing new stuff. Such a shame, since I really like sharing knowledge.

A solution was to write something new or learn from my previous mistakes and clean up. I choose the latter as creating something completely new from scratch could potentially introduce the same problems I have right now.

## The Goal

What I wanted to achieve is a much **simpler build pipeline** whilst **not changing too much** about the source material I had to work with.

I also wanted to clean the project of old and out-of-date dependencies and upgrade the required node.js version to a recent one.

The static site generator I am using, `wintersmith`, still serves its purpose perfectly, and I am not looking to replace it. This part will stay as is.

## Too Complicated to Replace

Have you ever had that feeling in a project where you looked at a piece of code or pipeline and thought: _"Well... I am not touching that."_

This is even more painful when that part of a project was introduced by yourself. But now imagine how complicated and confusing this must be for **another person** looking at it.

My blog had a pretty intricate way of building all its assets. All HTML content was statically generated, and that was perfectly fine to be honest. However, a large portion of the other assets were generated using various `gulp` tasks. Remember that? These were all painfully outdated and were not working anymore.

I needed to change this, because **it's better to write code that is easy to delete, rather than easy to extend**.

## Moving to NPM scripts instead on Gulp (or Grunt)

These days we have great web app bundlers like `webpack` which take a lot of manual pipeline building we used to do out of our hands. Every dependency is managed in our JavaScript bundles through importing. But that wasn't the case before.

There used to be a great interest in task running tools like `grunt` and `gulp`. These tools were not a bad idea, and allowed us to streamline our development processes.

What happened is that we lost sight of what we were really doing. Most of the stuff we were writing for these task runners could easily be **just a short CLI command**.

And this is exactly how I plan to solve the generating of my assets. Your old projects could possibly benefit from this too. Simplifying these step and moving them to a more streamlined bundling strategy will prevent over complicating your build pipeline.

## But what about watchers?

Yes, sure. Watchers are a nice to have, and `grunt` and `gulp` were mostly used for that, but can be replaced if you want.

Tools like `webpack` can be integrated with `webpack-dev-server` which allow to generate assets on change. You can also use file watchers in IDEs or in CLI to allow for a more streamlined development process.

For my blog this was not needed as the HTML, CSS, and the JS part of the project had already been written.

The static generator I use already has a watcher functionality build into their cli tool, so I can use that for writing.  

## Simplify JavaScript Bundles

First thing to fix was my JavaScript. I was inspecting what I was using and came to the conclusion that **I could throw away** everything except one small part which is handling how my header menu is rendered.

Previously it was bundling a couple of files using `browserify` and `gulp`. Then on release it was also minified using `Uglify`. This resulted in a bundle at a whooping `46kb`. Just for some minor tweaks and polyfills which were not even that necessary.

**The web is becoming more and more bloated**, and I want to reduce the impact the best I can. So adding all this fluff didn't make any sense. Especially since I was already putting a lot of effort in delivering content statically. 

If you run a website, blog, or something alike. Have a good look at what you're serving your visitors. Do you really need all these scripts you include on every page? I bet you there is a lot you can save by not adding useless stuff.

In the end I figured I could add a CLI command to `Uglify` the source file and place it in an output folder. The bundle is now `680bytes`.

## Oh my Sass

The Sass part of the project was something I dreaded doing, but in the end it was one of the easiest parts to do. I copied the settings and options I used in `gulp` and reused most of it.

To my surprise, even after updating all the `sass` dependencies, it worked just as expected.

## Handling image assets

There were two parts to handling images. Copy static assets from the source folder to my `/public` folder and afterwards optimise all the images in the `/public` folder. 

Because `wintersmith` automatically copies over post assets, these were all already in the correct folders. I added a simple `cp -r ./src/images ./public` to my NPM scripts to copy my other images to `/public/images`.

The most complicated part of this redo is how I optimise images. I am using `imagemin` and sadly it doesn't allow to scan for files and replace those with the optimised version in the same folder structures.

So I wrote a script in node.js which looks for all images in `/public`, optimises them one by one and saves them in the same place.

## The Result

In just a few hours **I removed a lot of unneeded dependencies** and am able to run my blog locally again. I didn't replace every part, and I **didn't opt-in to use the latest shiny technology stacks**. What I did do was **get rid of a lot of complicated steps** in building my blog.

I have a project right now that I know is easier to maintain since I chopped up the build pipeline is smaller easy to replace steps.

You can see all the steps needed in the [package.json file](https://github.com/Gaya/gaya.pizza/blob/main/package.json) of my blog's repository. All the step required can be executed by running `npm run build`.

Now The project feels a lot cleaner and nicer to work with. You do not have to throw away all previous effort to refresh and clean up your projects.

---
title: "Going Static from a WordPress blog"
author: Gaya
date: 2015-02-26
template: article.html
seo_desc: "GayaDesign.com was converted into a static blog from WordPress to Wintersmith. This article explains how."
---

Static websites are blazing fast and fun to make. The time of having your website calculated for every request is almost
gone. I went through the process of turning my WordPress version of this blog into a static served website.

This article explains the process and what I did to achieve the current static website.

<span class="more"></span>

##Why static?

WordPress was my platform of choice back in 2008 when I started writing and publishing articles. Back then I liked the
comfort of not having to write my own content management system for posting blogposts and the amount of plugins that
helped me with stuff I didn't know how to make really spoke to me.

Years later and a lot of experience later I learned that WordPress is not for me. I explained why in a [previous post
about rebranding Gaya Design](https://blog.gaya.ninja/articles/moving-gaya-design-to-gaya-ninja-blog/).

With static I could make my blog behave the way I think it should behave. Calculate the content before it will be served,
not at the time it is requested, like what happens on a typical system. You can kind of prevent calculations using
caching tools, but it still is no holy grail.

It was a nice challenge for me too since I never really made a statically generated site before. My weblog was the
perfect case for me to go and try it out. I was going to rebrand my name, so I might as well go ahead and create a new
site along with it.

##Planning it all out

There were a few requirements my new weblog had to meet. Since I am quite picky on the quality of my own workflow I
decided I wouldn't make it easy for myself.

The things I really wanted were:

1. Generate everything from a source. Do *not* have any compiled or generated content in my version controlling.
2. Write posts using MarkDown.
3. Being able to test and write for my site locally and deploy it with the same code.
4. Deployment from my weblog's repository. Having my server generate the whole thing before publishing.

This meant that I had to go and search for a static site generator that handles first. If it had blogging support it
would be even better.

##Looking for a Static Site Generator

To be more specific, I was really looking for a static blog generator. I played around with a few, one was [Jekyll](http://jekyllrb.com).
Which is pretty nice, but I came to the conclusion that I wanted to make a Node.js powered blog.

I quickly came across [Hexo](https://github.com/hexojs/hexo), [Assemble](http://assemble.io) and
[Wintersmith](http://wintersmith.io), which are all fine frameworks in their way.

Before I used [Gulp](http://gulpjs.com) I was using [Grunt](http://gruntjs.com), and in that time I had some experience
using Assemble. Which also has a bit of Gulp support, but it only works half of the time and is not recommended for
production environments. This options went out of the window pretty quick.

When I started using Wintersmith I completely fell in love. It's so quick and has a [great programmable interface](https://github.com/jnordberg/wintersmith#using-wintersmith-programmatically)
to work with. So that will work out perfectly if I want to integrate Wintersmith in my Gulp streamline.

The templating looked easy enough, and there is a [large variety of Wintersmith template plugins](https://github.com/jnordberg/wintersmith/wiki/Plugins#template-plugins)
available. Along with the dynamically generated stuff I was going to need, Wintersmith looked like a solid choice. Sorry
Hexo!

##Creating the templates

In order to go about and create the looks of the website I picked my typical workflow. First I setup my Gulp tasks to
handle generating my Sass files, JavaScript and [have BrowserSync serve](http://www.browsersync.io) it with the HTML to
my browser.

To process my Sass I used [gulp-sass](https://github.com/dlmanning/gulp-sass). It runs on [libsass](https://github.com/sass/libsass),
which makes it super fast too. That's a great thing when using BrowserSync because the newly generated assets will be
available in the browser really quick. Especially when you have two monitors where one holds a browser window and the
other your editor.

Frameworks I used for styling worth mentioning are: [Neat for responsive layout grids](http://neat.bourbon.io)
and [Bourbon for standard mixins](http://bourbon.io).

##SVG

For my SVG images on the site I used a SVG sprite generator. I choose not to include the SVGs as images in my DOM so I
could keep styling of icons out of my templates. This way I can keep my HTML clean. The only problem was that I needed
a way to calculate the SVG sprite width and height for each element to scale dynamically.

To generate the SVG sprite from a source folder I used [svg-sprite](https://github.com/jkphl/svg-sprite), a Node.js
module that gathers and optimises the output. It also always you to output a `.sass` file to be used. So with that I
generated a sass file that calculated all the necessary widths and heights. I'll get back to this in a later post.

##Working with Wintersmith

The first thing I noticed about Wintersmith is that it uses Jade, like a lot of other great Node.js project. I don't
really like it so much, so I looked for an alternative. [Nunjucks](http://mozilla.github.io/nunjucks/) is a templating
language heavily inspired by jinja2, which I was already familiar with. It looked pretty straight-forward, so I went
with it. Looking at [the examples of Wintersmith](https://github.com/jnordberg/wintersmith/tree/master/examples/blog/templates)
it was relatively easy to convert my HTML files to Wintersmith templates.

The only thing I had to do was to create a 404, about and contact page. And that was that. Pretty harmless task since
it already look care of most of my requirements.

As I said before, Wintersmith works really well as a Node.js module, so I create a watcher in Gulp that looks for changes
and regenerates the whole blog. The great thing is that it only takes about 1 second for Wintersmith to do that.

##Converting content from WordPress to Wintersmith

Wintersmith is pretty clean in its article structure. It follows a convention that allow me to create a new article in a
folder which contains the MarkDown file with the post. All the images that are used in the MarkDown file can be put in
the same folder.

The challenge here was to get all the posts from WordPress, add the correct meta data in YAML format and convert the
posts to MarkDown syntax while copying all the images. All the code snippets and internal URL in the posts had to be
changed as well.

I wrote a quick convert script for this and it saved me a lot of time. It was a dirty job, but I **had** to do it.

##Optimasing all the assets

From the source folder all the assets had to be optimised before serving them to the browser. This happens after all the
files are put in the folder that gets served. After which the server checks all the files and optimises them.

For image optimisation I used [imagemin](https://github.com/imagemin/imagemin), a pretty quick module that minifies the
images it gets passed in.

5. Optimaliseren van assets
    - imageop
    - critical
    - uglify

6. Server maken voor serven content
    - express
    - contact form
    - compression
    - serveStatic

7. Deployment
    - dokku
    - builden van site op server
    - na builden testen of het werkt
    - switch
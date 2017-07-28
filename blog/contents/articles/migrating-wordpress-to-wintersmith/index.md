---
title: "Migrating from WordPress to Wintersmith"
author: Gaya
date: 2015-02-26
template: article.html
seo_desc: "GayaDesign.com was converted into a static blog from WordPress to Wintersmith. This article explains how."
---

Static websites load blazing fast and are fun to make. Having your website calculated for each request is getting out
of style and is becoming less necessary.

I went through the process of turning the WordPress version of this blog into a statically served website. This article
explains the process behind it and what I did to achieve the current static website.

<span class="more"></span>

##Why static?

WordPress was my platform of choice back in 2008 when I started writing and publishing articles. Back then I liked the
comfort of not having to write my own content management system for posting blog posts. The amount of plugins available
helped me implement stuff I didn't really know how to make.

Years and a lot of web development related experience later I learned that WordPress is not for me. I explained why in
a [previous post about rebranding Gaya Design](https://blog.gaya.ninja/articles/moving-gaya-design-to-gaya-ninja-blog/).

With a static approach I could make my blog behave the way I think it should behave. Calculate the content before it
will is served, not at the time it is requested, like what happens on a typical blog system. You *can* kind of prevent
calculations using caching tools, but *it still is no holy grail*.

It was a nice challenge for me, since I never really made a statically generated site before. My weblog was the perfect
case for me to go and try it out. I was going to change my blog's name anyway, so I might as well go ahead and create a
new site along with it.

##Planning it all out

There were a few requirements my new weblog had to meet. Since I am quite picky on the quality of my own workflow I
decided I wouldn't make it easy for myself.

The things I really wanted were:

1. Generate everything from the source. Do **not** have any compiled or generated content in my repository.
2. Ability to write posts using MarkDown.
3. Being able to test and write for my site locally and deploy it with the same content.
4. Deployment from my weblog's repository. No uploading through FTP.

This meant that I had to go and search for a static site generator that meets these needs. If it had blogging support it
would be even better.

##Looking for a Static Site Generator

To be more specific, I was really looking for a static blog generator. I played around with a few, one was [Jekyll](http://jekyllrb.com).
Which is pretty nice, but I came to the conclusion that I wanted to make a Node.js powered blog. Ruby gems were also
driving me nuts, and I am no Ruby specialist, so I stopped there.

I quickly came across [Hexo](https://github.com/hexojs/hexo), [Assemble](http://assemble.io) and
[Wintersmith](http://wintersmith.io), which are all fine frameworks in their own way.

Before I used [Gulp](http://gulpjs.com) I was using [Grunt](http://gruntjs.com), and in that time I've had some experience
using Assemble. Which also has a bit of Gulp support, but it only works half of the time and is not recommended for
production environments. This options went out of the window pretty quickly.

When I started using Wintersmith I completely fell in love. It's so quick and has a [great programmable interface](https://github.com/jnordberg/wintersmith#using-wintersmith-programmatically)
to work with. So that works perfectly if I want to integrate Wintersmith in my Gulp streamline.

The templating looked easy enough, and there is a [large variety of Wintersmith template plugins](https://github.com/jnordberg/wintersmith/wiki/Plugins#template-plugins)
available. Along with the dynamically generated content I was going to need, Wintersmith looked like a solid choice.
Sorry Hexo! Looks like I didn't even give you a chance.

##Creating the templates

In order to go about and create the looks of the website I picked my typical workflow. First I setup my Gulp tasks to
handle processing my Sass files, JavaScript and [have BrowserSync serve](http://www.browsersync.io) it with the HTML to
my browser.

To process my Sass I used [gulp-sass](https://github.com/dlmanning/gulp-sass). It runs on [libsass](https://github.com/sass/libsass),
which makes it super fast too. That's a great thing when you're using BrowserSync because the newly generated assets
will be available in the browser really quickly. Especially when you have two monitors where one holds a browser window
and the other one your editor.

Frameworks I used for styling worth mentioning are: [Neat for responsive layout grids](http://neat.bourbon.io)
and [Bourbon for standard mixins](http://bourbon.io).

##SVG

For my SVG images on the site I used a SVG sprite generator. I choose not to include the SVGs as images in my DOM so I
could keep styling of icons out of my templates. This way I can keep my HTML clean. The only problem was that I needed
a way to calculate the SVG sprite width and height for each element to scale dynamically.

To generate the SVG sprite from a source folder I used [svg-sprite](https://github.com/jkphl/svg-sprite), a Node.js
module that gathers the SVGS and optimises the output. It also allows you to output a `.sass` file to be used. So with
that I generated a Sass file that calculated all the necessary widths and heights.

##Working with Wintersmith

The first thing I noticed about Wintersmith is that it, like a lot of other great Node.js projects, uses Jade. I don't
really like it that much, so I looked for an alternative. [Nunjucks](http://mozilla.github.io/nunjucks/) is a templating
language heavily inspired by jinja2, which I was already familiar with. It looked fairly straight-forward, so I went
with it. Looking at [the examples of Wintersmith](https://github.com/jnordberg/wintersmith/tree/master/examples/blog/templates)
it was relatively easy to convert my HTML files to Wintersmith templates.

The only thing I had to do was to create a 404, about and contact page. That was it. Pretty harmless task since
it already took care of most of my requirements.

As I said before, Wintersmith works really well as a Node.js module, so I created a watcher in Gulp that looks for
changes and regenerates the whole blog on change. The great thing is that it only takes about 1 second for Wintersmith
to do that.

##Converting content from WordPress to Wintersmith

Wintersmith is pretty clean in its article structure. It follows a convention that allow me to create a new article in a
folder which contains the MarkDown file with the post. All the images that are used in the MarkDown file can be put in
the same folder.

The challenge here was to get all the posts from WordPress, add the correct meta data in YAML format and convert the
posts to MarkDown syntax while copying all the images. All the code snippets and internal URLs in the posts had to be
changed as well.

I wrote a quick convert script for this and it saved me a lot of time. It was a dirty job, but I **had** to do it.

##Optimising all the assets

From the source folder all the assets had to be optimised before serving them to the browser. This happens after all the
files are put in the folder that gets served. After which the server checks all the files and optimises them.

For image optimisation I used [imagemin](https://github.com/imagemin/imagemin), a pretty quick module that minifies the
images that get passed in. This way I don't have to optimise the images myself before committing them.

For my JavaScript I used [uglify](https://github.com/terinjokes/gulp-uglify) after it had been bundled using [Browserify](http://browserify.org)
and my CSS is shrunk with [cssshrink](https://github.com/torrottum/gulp-cssshrink).

To optimise the loading speed of my pages I extracted and inlined the critical-path CSS from my generated pages. This
will allow the pages of my site to be loaded with visual content without blocking the loading with the external CSS file.
To do this I used [critical](https://github.com/addyosmani/critical) which scans my pages one by one and injects the
correct inline CSS.

##Creating a server to serve my content

What I needed was a simple web server that could serve static files (which were build by my tasks), compress those files
and create a fallback for pages that are not found. An easy way to get this done is to use [express](http://expressjs.com)
as the framework.

For serving content the [serve-static](https://github.com/expressjs/serve-static) middleware is really easy to use. For
compression of the output I used [compression](https://github.com/expressjs/compression). For the pages that are not
found I wrote my own middleware that serves my own `404.html` file I created.

All that was left was to build a middleware that handles my contact form submissions. I wrote up a little tool that
handles the given data, puts it in an email and sends it to me. It responds with a simple JSON object telling the sender
everything worked out.

##Deploying it all

I went a bit into deploying Node.js applications and came across [dokku](https://github.com/progrium/dokku). It behaves
like Heroku in a way that I can deploy my code on a repository that is hosted on my server and let dokku do the rest.

Once I push code to my dokku server through Git it will start to install all the dependencies defined in `package.json`.
It will than execute the npm scripts I defined in my `package.json` file. It will build the site, optimise everything and
test if it worked afterwards. Then it will switch my current running version with the new one. Perfect!

Now I can finally keep all my source the same on every machine and deploy my article whenever I want them to.

Have suggestions or found better ways to go static? Feel free to [reach out on Twitter](https://twitter.com/GayaKessler).

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

To be more specific, I was really looking for a static blog generator.

2. Opzoek naar een static site generator
    - Opties
    - Afwegen en uitproberen
    - Wintersmith

3. Bouwen templates
    - Gulp, Browserify, Sass en BrowserSync
    - Neat
    - SVG sprite

4. Wintersmith ombouwen
    - Nunjucks voor jinja2
    - templates ombouwen tot mijn html
    - pagina's aanmaken

4.5. WP to Wintersmith hell
    -

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
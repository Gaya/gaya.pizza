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

1. Reden van switch
    - WordPress sloom
    - Wil geen admin panel
    - Leuke uitdaging

1.5. Plan van Aanpak
    - source intakt
    - deployen van source -> genereren site
    - alles vanuit een repo

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
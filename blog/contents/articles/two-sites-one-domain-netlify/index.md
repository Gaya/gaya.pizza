---
title: "Two Sites on One Domain, with Netlify."
author: Gaya
date: 2018-08-03
template: article.html
seo_desc: "Explanation of how to get two sites in Netlify on the same domain name"
poster: "/articles/two-sites-one-domain-netlify/netlify-poster.jpg"
---
Recently I got into hosting my open source projects on Netlify because of how easy (and free) it is.

One of the web app projects was in need of a marketing website, but I didn't want to pollute the web
app's repository with the website's source.

I found out that it's possible to have Netlify show multiple sites on the same domain name. I'll try
to explain what the problem is I was trying to solve and how I solved it.

[![Two Sites on One Domain, with Netlify](/articles/two-sites-one-domain-netlify/netlify-poster.jpg)](/articles/two-sites-one-domain-netlify/)

<span class="more"></span>

A little note before I begin. [Netlify](https://netlify.com) is **not sponsoring** this article, nor did I ever have contact
with them about it. All views and opinions in this article are my own.

## The situation

In the beginning of this year I launched a [time tracking web application called Thyme](https://usethyme.com). This little
app was hosted on Netlify from the domain name [usethyme.com](https://usethyme.com).

Netlify allows you to create a "site" which is based of a git repository. The Thyme application is
based on the [public repository on Github](https://github.com/Gaya/thyme). Because the application
was bootstrapped using [create-react-app](https://github.com/facebook/create-react-app) it was
fairly easy for Netlify to recognize how it should build and host the app.

Every time I update the _master_ branch on the Github repository, Netlify will automatically release
a new version of the app on [usethyme.com](https://usethyme.com).

## The problem

After a while I decided that it would be good if [usethyme.com](https://usethyme.com) was used as a
front-face of the app. A website that details the functionality and has a bit of documentation on
the project.

This meant I had to create a website that Netlify can update and publish to [usethyme.com](https://usethyme.com).
I could add the website's source to the application repository, but felt like it was best if I keep
both projects in a separate repository since I didn't want people working on the application to get
the whole site too.

Netlify can assign a domain to a site so the built version of the repository is hosted on said domain.
A solution to having two sites on a single domain name is using subdomains. Sadly this was not a
possibility.

## Why not just a subdomain for the app?

Since Thyme heavily relies on the usage of localStorage, moving to a different subdomain would mean
all the current users would loose their access to data already stored in the `usethyme.com` storage.
If I were to put the application on `app.usethyme.com` the localStorage data from `usethyme.com`
wouldn't be accessible for good security reasons.

So what I had to figure out was if it was possible to have two separate sites, but have the
application running in a sub path of the website.

## The solution

When digging through the documentation of Netlify I found out you can [proxy content through redirects](https://www.netlify.com/docs/redirects/#proxying).
That's exactly what I needed! I could have `usethyme.com/thyme` on my website act as it was my app.

All I had to change to the app was that it was being served from `/thyme/` instead of `/`. All the
routing done in the app and the assets would have to be accessible through `usethyme.com/thyme`.

### The application part

`create-react-app` and `react-router` allow you to do this quite easily, but you have to know where
to change the source.

In order for `react-router` to work in a sub path of a domain, you have to pass it a `basename`. In
my case, the following change was enough:

```
<BrowserRouter basename={process.env.PUBLIC_URL}>
  ...
</BrowserRouter>
```

WebPack provides `process.env.PUBLIC_URL` while building and serving your project. This will tell
`react-router` what to root of your application is and will act accordingly.

For `create-react-app` you have to tell the application what it's public path is, which they call a
`homepage`. In your `package.json` of the app add a property called `homepage` and add the path where
the app will be located.

```
{
  "homepage": "/thyme/"
}
```

If you're not using `create-react-app`, you can provide the `PUBLIC_URL` to webpack to have the same
outcome.

### The Netlify part

For Netlify I had to make sure my website was being built and hosted correctly. I remove my custom
domain from my app's site and added it to my website's site in Netlify.

Right now my app was not available on `usethyme.com` anymore, but it would show my website. My app
was now living at `https://thyme.netlify.com`. Using proxying I had to proxy all traffic to
`usethyme.com/thyme` to `https://thyme.netlify.com/`.

Using the example I came up with the following content for `_redirects`:

```
/thyme/*  https://thyme.netlify.com/:splat  200
```

And it works perfectly! All my localStorage is still available and my application's assets are proxied
through to `usethyme.com/thyme`.

A little side note though. Since `create-react-app` uses service workers I had to put in a little
extra proxy line because it was not able to find the service worker on the website.

```
/service-worker.js  https://thyme.netlify.com/service-worker.js  200
```
---
title: "Kickstart app development for Spotify"
author: Gaya
date: 2012-01-26
template: article.html
seo_desc: "Want to create an app for Spotify? You might need some help since there are little tutorials around to get you going. Read this one to get started now."
---
So you've decided to go ahead and develop an app for Spotify. Great! Starting off might be a pain though if you're not well informed. In this article I'll give you a boost in developing for Spotify and warn you for common mistakes I've made. App development for Spotify is not hard! It's mainly HTML, CSS and Javascript, which you are probably already familiar with. [![Kickstart app development for Spotify](/articles/kickstart-app-development-for-spotify/spotify.jpg "Kickstart app development for Spotify")](http://www.gayadesign.com/diy/kickstart-app-development-for-spotify)<span class="more"></span> Here's a list of things I will discuss in this article:

1. [Before creating an app](#before)
2. [Your first page](#yourfirstpage)
3. [Debug!](#debug)
4. [manifest.json](#manifestjson)
5. [The API](#api)
6. [Store the info](#storage)
7. [Where to go from here](#wheretogofromhere)

Before creating an app
----------------------

 When you decide to create an app for Spotify you'll have to sign-up for a developers account. You can do that on this page: [http://developer.spotify.com/en/spotify-apps-api/developer-signup/](http://developer.spotify.com/en/spotify-apps-api/developer-signup/). If you already own a developers account you can move on to point 2. If you **don't** have an account yet you'll have to wait until it has been activated. There's no point to go on from here now, your application simply will not load in Spotify. ***Just be patient***. Spotify offers a special client for developers that has the latest API build in. It is useful to develop on this build since there might be some differences with the original client as to API calls etc, so get it here: [http://developer.spotify.com/en/spotify-apps-api/preview/](http://developer.spotify.com/en/spotify-apps-api/preview/). Oh, and since you're probably designing the app in Photoshop or something first, [this design resource](http://developer.spotify.com/download/spotify-apps-api/design_resources.zip) might be of great help.
###Your first page

 Got your account activated? GOOD! You can now finally start working on stuff. As the [integration guidelines](http://developer.spotify.com/download/spotify-apps-api/guidelines/) point out, you'll have to create a folder in your home directory called **"Spotify". **`~/Spotify` on Mac OS X and `My Documents\Spotify` on Windows. In this folder we will create another folder with your app's name. The only thing you really need to create now is an `index.html` file which will load once you open up the app in Spotify. But since we're creating an app that looks a lot like your typical web-app (technically speaking), we're going to create the folders for all our assets. What I like to do is just to create a folder for my javascript, images, and stylesheets. You know the drill. Now put something funny in your `index.html` file. Go original and put **"Hello World"** in there! (no HTML needed! Whoop) Now we can bring up the app in Spotify (have you already rebooted Spotify when you became a developer? If not: do it now.) First: Go to the search field in Spotify Type: `spotify:app:your_apps_folder_name` You should see something similar to this: <div class="border">![Hello world in Spotify](/articles/kickstart-app-development-for-spotify/spotify01.jpg "Hello world in Spotify")</div> You just included your app in Spotify. Nice. The "add application to sidebar" button will put it in the sidebar until you close Spotify again. This will come in handy when you're debugging the app. Keep in mind that next time you'll open up Spotify the app is not in the sidebar anymore. You'll have to search for it again. Debug!
------

 The great thing about developing apps for Spotify is that it renders it's pages with Chromium, so it kind of feels like you're developing for Chrome. To quote the integration guidelines: > Spotify currently uses the Chromium rendering engine to run and display your applications. However, this is an implementation detail and may change in the future. Please do not assume anything about the browser other than it is WebKit based (so WebKit-only CSS attributes can be used).

 This means that you can finally forget about Internet Explorer and get your HTML5 and CSS3 socks on! Isn't that just nice. Keep in mind that there are a few HTML5 elements and functions that are not added out of security reasons. To view the list of things that are available go to **"Develop"** in the taskbar and choose **"Show HTML5 Support"** and check if what you want to use is in there. To open up the inspector just right-click anywhere on the app and choose **"Show Inspector"**. The familiar inspector pops up and gives you all the functionality we are used to use when developing websites in Chrome. The inspector will save your life. manifest.json
-------------

 This file contains important information about your app Spotify needs to know. It's a JSON file which contains an object filled with variables. Just create a new file in the root of your app's folder called: `manifest.json`. The basic layout looks like this: 
```javascript
{
    "BundleType": "Application",
    "AppIcon": {
    "36x18": "tutorial.png"
},
    "AppName": {
    "en": "Tutorial"
},
    "SupportedLanguages": [
        "en"
    ]
}
```
 [A full list of variables](http://developer.spotify.com/download/spotify-apps-api/guidelines/#applicationmanifest) you can set are available in the integration guidelines. > **IMPORTANT:** if you change anything to this file a simple "Reload Application" is not enough. You'll have to restart Spotify and do a search for your app again. Keep this in mind.

 If you're going to include external resources (like doing an Ajax call or including images from a website) you'll have to add the `RequiredPermissions` variable like so: 
```javascript
"RequiredPermissions": [ 
    "http://*.gayadesign.com",
    "http://gayadesign.com",
    "http://ws.audioscrobbler.com" 
]
```
 Remember to restart Spotify and adjust the `RequiredPermissions` variable if Spotify won't load the resource. It might not have been included in the permissions yet. You'll just get 404 content. The API
-------

 All interactivity in the app can be done in Javascript. You can even add jQuery to your app if you feel more comfortable using that. The Spotify API is just plain Javascript, so some might feel that this is a step too far, but people: it's not hard. To include the API you'll only need to do this in your script (that you'll include in the index.html file obviously): 
```javascript
var sp = getSpotifyApi(1);
var models = sp.require("sp://import/scripts/api/models");
```
 This will first load the API and then require a Javascript file "models" that lets you create Spotify related objects in Javascript. In the [JSDoc of Spotify](http://developer.spotify.com/download/spotify-apps-api/reference/) you can see which object you can create and what you can do with them. You can control the player, get information about artists, tracks and albums, and configure the users' library for example. If you want to add searches to your app you can refer to [Spotify's Meta-data API](http://developer.spotify.com/en/metadata-api/overview/). Remember to add `http://ws.spotify.com` to your `RequiredPermissions` array in ****`manifest.json****`. You can easily get the information you need using this API and do plain AJAX calls to retrieve XML files with information. Couldn't be easier right? Store the info
--------------

 You can save settings of you app in HTML 5's Locale Storage. A brief explanation is available here: [http://www.webmonkey.com/2011/04/how-to-use-html5s-local-storage-tools-today/](http://www.webmonkey.com/2011/04/how-to-use-html5s-local-storage-tools-today/). The biggest problem with this is that it can only store strings. I made a little script that takes care of this problem and allows you to also save arrays and objects. You can download it from GitHub here: [http://github.com/Gaya/Locale-Storager](http://github.com/Gaya/Locale-Storager)Where to go from here
---------------------

 Now that you've got your app ready to be build; just go for it! It's not harder than building your regular website, you'll just have to look at the possibilities Spotify gives you with their API's and go from there. You can follow [@SpotifyPlatform](http://www.twitter.com/spotifyplatform) for updates concerning the API and go to [Stack Overflow's Spotify section](http://stackoverflow.com/questions/tagged/spotify) to ask your questions or hop into the conversations. I hope I tackled the start up problems and made everything a bit more clear. If you have anything good going on: Let me know! I'll be releasing an app myself. When it comes, you'll know.
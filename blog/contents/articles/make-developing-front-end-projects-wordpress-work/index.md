---
title: "Make Developing Front-end Projects in WordPress Work"
author: Gaya
date: 2014-11-21
template: article.html
seo_desc: "Front-end development for projects that will use WordPress is bad, but it can be fixed. Learn how to decouple front-end development from WordPress."
seo_title: "Make Developing Front-end Projects in WordPress Work"
links:
  -
    title: Download
    desc: Example project for Gulp, Twig and Timber
    url: https://github.com/Gaya/gulp-timber-example
---
Working as a front-end developer should be a job where you worry about the stuff you're good at: creating HTML, CSS and JavaScript. In a perfect setting you don't have to worry about the CMS or framework the website / app is going to use.  
 When the team chooses to use WordPress, you might be in for a struggle though. Separation between front and back-end development in WordPress is quite vague and is smeared all over the place.

This article is aimed to convince you why WordPress is bad to front-end developers, what has to be done about it, and finally how a better way of developing can be achieved.

[![Make Developing Front-end Projects in WordPress Work](make-developing-front-end-projects-wordpress-work1.jpg)](/articles/make-developing-front-end-projects-wordpress-work)<span class="more"></span>

TL;DR
-----

Because of the lengthy nature of this article I am going to put the main point of the article in the following paragraph.

Front-end development for projects that will use WordPress is bad, but it can be fixed. You can do completely decoupled front-end development for WordPress **without** using or touching WordPress itself.


- - - - - -

Why front-end development in WordPress is bad
---------------------------------------------

There are a few things that smell when you dig into WordPress' way of handling templates. The first thing that comes to mind when I think about front-end development is creating templates, styling them accordingly and making them interactive using scripts.

Idealy, the templates we create are generated after we've fed them with data and are compiled to some output. For browsers, this is HTML.

### WordPress offers no real separation between data and template

Proven design patterns like the Model View Controller pattern preach that we keep our views away from collecting any data. The views, HTML templates with just a small amount of logic, are only fed with data which they can utilize. If it doesn't have the correct data, it's not up to the views to figure that out, it's what the controller should do.

If you'd go about and request data from the system directly in your views you're relying upon the system at hand. In WordPress we use PHP to get posts and loop through them, even requesting information about the posts as we go. This should have been done before the view was loaded.

We can't move our code and use the templates in another project that doesn't use WordPress. We're too heavily coupled to WordPress.

![Architecture in WordPress gets pretty awkward since we can't really decouple front-end from server-side.](/articles/make-developing-front-end-projects-wordpress-work/architecture-wordpress.jpg)

Architecture in WordPress gets pretty awkward since we can't really decouple front-end from server-side.

### We're front-end developers, and we're using PHP

It's rather strange that we're being forced to use PHP when coding a theme in WordPress. This makes our project dependent not only on WordPress, but also on PHP. There is no way we can move our code to a Ruby on Rails project or a Node.js project that uses something like Handlebars to generate HTML.

We're using a server-side only language, why keep stacking up different languages on top of our development work? Is keeping track of HTML, CSS, JavaScript, template languages and pre-processors not enough?

### Where do you stop developing the front-end?

There is no real reason for a front-end developer to even have to use WordPress to work on a project. When the source of your templates have to be adjusted to the actual system it will be run on it's not perfect.

Are you just going to deliver some HTML, CSS and JavaScript to a back-end developer and let them do the rest? That sounds a lot like the waterfall project method, just throwing stuff over the fence.

There is no way for you to simultaneously work on the same project without one of the parties having to integrate each other's code.

### WordPress forces us to follow their structure

The root of a theme has to at least contain a `style.css` file and an `index.php` file. It's pretty weird that the information of the theme is stored in a CSS file in the root, while we might not want our stylesheet to live in this location. Why is there no configuration file that allows me to set these kind of parameters?

We can work around this problem, but still we're forced to use this strange way of passing information. It's cluttering our file structure.

### Adjusting your work along the way is a pain

You'll have to either work on the project that has been integrated in a WordPress theme directly, or deliver new lines of code and risk for the changes to be interpreted differently from what you meant them to be.

If there is one thing that's bad, it's having to run a complete WordPress install, import a database dump and setup WordPress to 'just' adjust a small problem in HTML, CSS or JavaScript.

Now imagine the project extending with new functionality. There we go again.


- - - - - -

What we need for it to work
---------------------------

Ranting about a subject is rather easy if it's in a really bad state, but saying what needs to be done is worth a lot more.

### We need a way to template without using WordPress

There is a simple need to be able to start up a project from scratch without thinking about which Content Management System or framework will be used later. As a front-end developer you can decide to use a templating language which your tools can generate HTML out of.

This way we can prevent WordPress from even touching our work and still make our HTML powered templates and styling. You do have to keep in mind which templating languages can be used.

### Have a way to create dynamic pages, generated from our templates

Without having WordPress to support generating our pages, we need a way to dynamically generate pages to be able to use a base template we can extend to generate different types of pages.

We want to be able to loop through simple data structures and output them dynamically through our templates. This test data we will provide ourselves.

### Defining the data

Before we can start creating templates we have to define the data we want to use. This way we can create a layer between our views and the underlaying information. It helps the back-end developer too, since they will know what information you need on certain pages.

It's also a good way to hand over your project to the back-end developers since they're already informed of the information the pages need in order to work correctly.

This also be reversed if the back-end developer defined the available information beforehand.

![No CMS allowed](/articles/make-developing-front-end-projects-wordpress-work/no-cms1.png)

### All previous points have to work independent of any CMS or framework

The views, templates, styles, and JavaScript you make should be able to work in different environments.

When a change has to be made along the way, you only have to adjust your work and it has to be able to be applied in different environments without testing it there. In this case WordPress.


- - - - - -

How to improve front-end development in WordPress
-------------------------------------------------

Luckily for us, more people struggle with seperation of data / logic and views in WordPress theming. [Timber](https://github.com/jarednova/timber) is a plugin that uses the [Twig Template Engine](http://twig.sensiolabs.org) to render HTML output.

Twig is heavily inspired by [Jinja](http://jinja.pocoo.org), which is also used by other templating languages used on different platforms. It makes for a good interchangeable way of templating.

### Use Timber for view and logic separation

Timber will serve as a simple layer between WordPress' theme approach and your templates. It will query data using its own methods in the theme's PHP files and pass it to your templates.

[![Timber](/articles/make-developing-front-end-projects-wordpress-work/timber-logo.png)](http://upstatement.com/timber/)

The great thing about this is that we can forget about using WordPress altogether and let the back-end developer take it from here. We've finally created a separation between front-end and back-end.

### Use Timber's starter theme

In the plugin source of Timber you can find [the starter theme](https://github.com/jarednova/timber/tree/master/timber-starter-theme). This gives you and the back-end developer a great way to start using Timber in WordPress.

I won't go deep into the functionality of Timber. The documentation is very clear and the learning curve is quite low.

### Twig.js to render templates

If we are going to stop using WordPress to render our templates, we have to start using another render engine. Since Timber uses Twig, we have to look for a front-end development stack friendly alternative.

With the popularity of build tools like Grunt and Gulp being used in development flows, it's great to know that there is a JavaScript implementation of Twig. It's called [Twig.js](https://github.com/justjohn/twig.js) and can be found on GitHub.

Use Twig.js to render your template files with mock-up data you provide.

### An example of rendering with Twig.js

Node.js can utilize Twig.js, feed it mock-up data and save the `*.twig` files as `*.html`

Given the following Twig template file:


```html
<html>
	<head>
		<title>{{ title }}</title>
	</head>

	<body>
		{% for item in arrayWithData %}
			{{ item }}
		{% endfor %}
	</body>
</html>
```


and the following script in Node.js:


```javascript
var Twig = require('twig'),
	twig = Twig.twig;

var html = twig({
	path: 'path/to/template.twig',
	async: false
}).render({
	arrayWithData: ["Twig", "is", "fun!"]
});
```


Running the code would result in the following HTML in the `var html`.


```html
<html>
	<head>
		<title>Title</title>
	</head>

	<body>
		Twig is fun!
	</body>
</html>
```


### Use it in your workflow!

There is a [Gulp plugin for Twig.js](https://www.npmjs.org/package/gulp-twig), and a [Twig.js plugin for Grunt](https://github.com/adamdicarlo/grunt-twig). You can use these to compile Twig files which can later be used in Timber.

This way you don't have to use WordPress to create dynamic webpages.

- - - - - -

My approach to developing front-end for WordPress and Timber using Gulp and Twig.js
-----------------------------------------------------------------------------------

In order to start working with Twig.js and Timber we need a way to convert our Twig templates to HTML and feed data to the templates while we do so. The next part shows an approach that can be used in combination with Gulp or just plain Node.js.

### What the Gulp task will do

When creating templates for Timber I use the [page template approach WordPress uses](http://codex.wordpress.org/Page_Templates). This also means I'll be naming my templates this way: `template-*.twig`. We only need to compile these files to see the pages we create.

We need a way to get these files, feed them some information about the site and optionally information about the page Twig is rendering at that point.

The task will do a few things:

- Look for `template-*.twig` files.
- Get the basic information.
- Extend the basic information with template specific information if available.
- Render the template file with the information it gathered.
- Save the HTML version somewhere.

### Installing dependencies

We need a few things in order for the script to work. Install them with `npm`.

```
npm install --save-dev twig underscore gulp
```

### The gulp task

The following is the gulp task I came up with. Feel free to fiddle with it a bit and test is out by running `gulp timber` in the terminal.

I've placed [an example of using only Gulp and Twig in a project on GitHub](https://github.com/Gaya/gulp-timber-example). It illustrates how to use the following task in Gulp.

```javascript
var gulp = require('gulp'),
    Twig = require('twig'),
    fs = require('fs'),
    _ = require('underscore');

var paths = {
	views: "./views", //path where your .twig files are
	data: "./data", //path to the data .json files
	dest: "./dist" //destination of the html files
};

gulp.task('timber', function (cb) {
	"use strict";
    //standard function called in Timber templates
    Twig.extendFunction("function", function (name) {
        return "<!--- function called " + name + " -->";
    });
    Twig.cache(false); //disable cache to prevent HTML not updating

    var files = fs.readdirSync("./" + paths.views); //read all the files in 'views'
    files.forEach(function (file) {
    	//if the file name doesn't match template-*.twig: skip this file
        if (file.substr(-5) !== ".twig" || file.indexOf("template-") === -1) {
        	return; 
        }

        var template = Twig.twig({
            path: paths.views + "/" + file,
            async: false
        }); //read the file with Twig

        //read the base Timber .json file
        var data = require(paths.data + "/timber.json");

        //check it template-*.json exists
        var templateData = file.replace(".twig", ".json");
        if (fs.existsSync(paths.data + "/" + templateData)) {
        	//if so, join its data with the base information
            _.extend(data, require(paths.data + "/" + templateData));
        }

        //replace .twig with .html in the file name, render the file and save the outcome
        fs.writeFile(paths.dest + "/" + file.replace(".twig", ".html"), template.render(data));
    });
    cb();
});
```

The [basic timber.json file](https://github.com/Gaya/gulp-timber-example/blob/master/data/timber.json) which is being referred to in the code can be used as a data template for the Twig template you can find in the Timber Starter Theme. It has the structure to get you going.

### Adding your own data

You can add global data that has to be applied on all templates in the `timber.json` file in `./data/`. To add template specific data you have to create a file with the same name in the `./data/` folder, but replace the extension with `.json` instead of `.twig`.


- - - - - -

The bad parts about the solution
--------------------------------

The only bad things I can say so far is that we're tied to Twig since Timber uses that. It also follows a pretty stict data structure as can be seen in the `timber.json` file, but once you get to know the structure of the data Timber gives you, it's not that hard to get used to it. Besides, Twig is almost 100% interchangeable with other template rendering solutions based on the same principles.

Conclusion and onwards
----------------------

Using the approach discussed earlier you can separate yourself completely from the server-side of web development in WordPress. You can focus on creating templates, while the back-end developer can focus on providing the correct data using your crafted template files.

Now you can create a deployment flow with your back-end developer as to how he will receive your templates. The great thing is that is that you never have to fiddle with getting a WordPress setup running before you can test your own templates. Adjust, test and validate them so you can give them to your back-end developer to apply them on production.

Developing in a team that uses WordPress has just become a bit less painful.
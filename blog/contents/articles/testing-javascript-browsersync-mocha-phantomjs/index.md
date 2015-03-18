---
title: "Testing JavaScript using BrowserSync, Mocha and PhantomJS"
author: Gaya
date: 2015-03-17
template: article.html
seo_desc: "Get started with testing using BrowserSync, Mocha and PhantomJs. This tutorial helps you to get started."
seo_title: "Testing JavaScript using BrowserSync, Mocha and PhantomJS"
---

It's a good idea to test your JavaScript application using a testing framework. It improves the integrity of your
software and enables you to do Test Driven Development.

You can do your testing in Mocha, but you can also expand it a bit further with browser specific behaviour testing. This
article is aimed to get you started with testing using BrowserSync, Mocha and PhantomJs.

<span class="more"></span>

What we're going to make
------------------------
We are going to make a fairly straightforward test that can be tested in the browser and on command-line. This way we can
also integrate our tests with services like Travis CI to automatically perform tests on future releases.

At the end of the article you'll have a project where you can write your tests in, have JavaScript code that can be
tested on command-line and a HTML page where the script you want to test will live. This allows us to actually *see* the
tests.

We're going to use Gulp for this workflow. You can also do without, but it comes in handy later when we want to watch
our files for changes and reloading the tests in BrowserSync.

For bundling our code and not breaking the Mocha way of testing NodeJS code we're going to use Browserify.

1. Getting started
------------------

First off, create a project folder which will hold the files and navigate to that folder in your terminal.

Init an npm project:

    npm init

Install Gulp globally if you haven't already:

    npm install -g gulp

Install all the dependencies we'll be using:

    npm install --save-dev browser-sync browserify gulp gulp-mocha-phantomjs mocha-phantomjs mocha vinyl-source-stream

The reason I install `gulp-mocha-phantomjs`, `mocha-phantomjs` and `mocha` is for easier access later on.

2. Creating something to test
-----------------------------

Let's say we want to create a JavaScript library that changes the text inside a given DOM element to something else.

To know what to do next is to determine the way the library will be used and what the outcome should be.

We'll call the library `TextChanger` which holds a method called `replaceText`. The `replaceText` method will accept two
parameters: a DOM element and a string with text which will be placed inside.

If we're going to follow a TDD approach we need to write tests for this method before even implementing the code of
`TextChanger`.

Create a new folder called `test` and place a file called `tests.js` in it. Place the following inside the file:

```javascript
var assert = require("assert");

describe('TextChanger', function(){
    var element = document.createElement("section");
        element.appendChild(
            document.createElement("span")
                .appendChild(
                    document.createTextNode("Replace me")
                )
        );
        document.body.appendChild(element);

    describe('#changeText(element, text)', function() {

        it('should replace the content of the element with given text', function() {
            assert.equal(false, true);
        });

        it('should throw and error if element is not a DOM element', function() {
            assert.equal(false, true);
        });

    });
});
```

These tests do not do anything yet. They fail because `false` is not `true`. I do this on purpose because we have to
write correct tests first.

Would you run this test using just `mocha test/tests.js` it would complain `ReferenceError: document is not defined`.
Mocha is not run in a browser environment, just like Node.js. In order to enable testing in a browser environment we are
going to use PhantomJS.

3. An HTML document to run the tests
------------------------------------

In order to run the tests in a browser environment we're going to need an HTML document which will load the necessary
scripts and styles. While Mocha can test `.js` files, Mocha PhantomJS takes `.html` files. In this document we're going
to load Mocha and our tests.

Create a new file in the `test` folder called `tests.html` and place the following content in it.

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>TextChanger tests</title>
    <link rel="stylesheet" href="../node_modules/mocha/mocha.css"/>
</head>
<body>
    <div id="mocha"></div>
    <script src="../node_modules/mocha/mocha.js"></script>
    <script>mocha.setup('bdd')</script>
    <script src="tests-browserify.js"></script>
    <script>
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        } else {
            mocha.run();
        }
    </script>
</body>
</html>
```

We are loading Mocha from the `node_modules` folder, our tests (which do not exist yet) and running the tests in the end.

The reason we need a different test file from the one we created earlier is because the browser doesn't understand
`require()`. We can solve this by using Browserify to bundle our script.

4. Watching and serving the tests
---------------------------------

In this step we're going to create our workflow. We'll use Gulp as our runner, use BrowserSync as our web server which
can automatically reload and Browserify to bundle our test script.

Create a `gulpfile.js` file in the root of your project. Add the following contents.

```javascript
var gulp = require("gulp"),
    browserSync = require("browser-sync"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    mochaPhantomJS = require("gulp-mocha-phantomjs");

gulp.task("browser-sync", function () {
    "use strict";
    browserSync({
        server: {
            //serve tests and the root as base dirs
            baseDir: ["./test/", "./"],
            //make tests.html the index file
            index: "tests.html"
        }
    });
});

gulp.task("browserify", function() {
    "use strict";
    return browserify("./test/tests.js")
        .bundle()
        .on("error", function (err) {
            console.log(err.toString());
            this.emit("end");
        })
        .pipe(source("tests-browserify.js"))
        .pipe(gulp.dest("test/"))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task("test", function () {
    "use strict";
    return gulp.src("./test/tests.html")
        .pipe(mochaPhantomJS());
});

gulp.task("serve", ["browserify", "browser-sync"], function () {
    "use strict";
    //when tests.js changes, browserify code and execute tests
    gulp.watch("test/tests.js", ["browserify", "test"]);
});
```

The `browser-sync` task makes sure the `test` folder and the root of the project get served as a web server. It will
also set `tests.html` as the index so it will open said file when browsing to `http://localhost:3000`. When this task
is run it automatically opens the link in your browser.

The `browserify` task bundles the `tests.js` file and creates a browser runnable tests file.

The `test` tasks executes `mocha-phantomjs` and outputs the outcome in the terminal. This is the same output you get in
your browser.

To start serving the tests and rerun them every time you make a change in the tests file you need to run the following
command in your terminal.

    gulp serve


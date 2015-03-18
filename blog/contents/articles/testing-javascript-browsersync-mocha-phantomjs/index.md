---
title: "Testing JavaScript using BrowserSync, Mocha and PhantomJS"
author: Gaya
date: 2015-03-18
template: article.html
seo_desc: "Get started with testing using BrowserSync, Mocha and PhantomJs. This tutorial helps you to get started."
seo_title: "Testing JavaScript using BrowserSync, Mocha and PhantomJS"
links:
  -
    title: Repository
    desc: Code of this tutorial
    url: https://github.com/Gaya/testing-javascript
---

It's a good idea to test your JavaScript applications using a testing framework. It improves the integrity of your
software and enables you to do Test Driven Development.

You can do your testing in Mocha, but you can also expand it a bit further with browser specific behaviour testing. This
article is aimed to get you started with testing using [BrowserSync](http://www.browsersync.io),
[Mocha](http://mochajs.org) and [PhantomJs](http://phantomjs.org).

<span class="more"></span>

What we're going to make
------------------------
We are going to make a fairly straightforward test that can be tested in the browser and on command-line. This way we
can also integrate our tests with services like [Travis CI](https://travis-ci.org/) to automatically perform tests on
future releases.

At the end of the article you'll have a project where you can write your tests in. You'll have JavaScript code that can
be tested on command-line and an HTML page where the script you want to test will live. It will allow us to actually
*see* the tests.

All changes will be watched and checked automatically. You can keep your focus on writing code while the test results
get updated elsewhere.

We're going to use [Gulp](http://gulpjs.com) for this workflow. You can also do without, but it comes in handy later
when we want to watch our files for changes and automatically reload the tests in BrowserSync.

For bundling our code and not breaking the Mocha way of testing Node.js code we're going to use
[Browserify](http://browserify.org).

1. Getting started
------------------

First off, create a project folder which will hold the files and navigate to that folder in your terminal.

Init an npm project:

    npm init

Install Gulp globally if you haven't already:

    npm install -g gulp

Install all the dependencies we'll be using:

    npm install --save browser-sync browserify gulp gulp-mocha-phantomjs mocha-phantomjs mocha vinyl-source-stream

The reason I install `gulp-mocha-phantomjs`, `mocha-phantomjs` and `mocha` is for easier access later on.

2. Creating something to test
-----------------------------

Let's say we want to create a JavaScript library that changes the text inside a given DOM element to something else.

In order to know what to do next is to determine the way our module will be used and what the outcome should be.

We'll call the module `TextChanger` which holds a method called `replaceText`. The `replaceText` method will accept two
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

Would you run this test using just `mocha test/tests.js`, Mocha would complain `ReferenceError: document is not defined`.
Mocha is not run in a browser environment, just like Node.js. In order to enable testing in a browser environment we
need to use PhantomJS.

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
    gulp.watch(["test/tests.js", "src/text-changer.js"], ["browserify", "test"]);
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

5. Finishing the tests
----------------------

If you have your web server running using the `gulp serve` command we just implemented you'll see a web page with two
errors complaining that `true` does not equal `false`. Which is good. Now we can make write some useful tests.

With the watcher in Gulp running it will run Browserify and reload the tests once you make a change. You don't have to
run the test command yourself.

Let's create a file where the source of `TextChanger` will be defined. Create a folder called `src` and create a new file
called `text-changer.js`. Leave it empty for now.

Open up the `test/tests.js` file, it's time to fill in the tests.

First we need to require the `TextChanger` module. Do so after `var assert = require("assert");` by adding:

```javascript
var assert = require("assert"),
    textChanger = require("../src/text-changer.js");
```

Now that we've included our empty module, we can use it in our tests. The first test will check if the given element
holds a `textNode` with a string value. The `textChanger` object will be a factory which returns an object which holds
the method `replaceText`. Given this info the first test can be made.

```javascript
it('should replace the content of the element with given text', function() {
    textChanger().replaceText(element, "test");

    assert.equal(element.childNodes[0].nodeValue, "test");
});
```

The second test checks if the method throws an error if no real DOM element is given. Which can be done by doing:

```javascript
it('should throw and error if element is not a DOM element', function() {
    assert.throws(function () {
        textChanger().replaceText(null, "test");
    }, /DOM element/);
});
```

Now that the tests are ready to check our implementation we can continue to coding the module. The biggest advantage we
have now is that we know what the implementation should look like.

6. Implementing your module
---------------------------

It is time to make our tests succeed. We know how the module has to work, now we have to make it work.

Open up the empty `src/text-changer.js` file.

At first we need a little base to fill in our implementation. Place the following content inside.

```javascript
var textChanger = {
    replaceText: function (element, newText) {
        //check if element is a DOM element

        //remove all the children

        //add textNode to element
    }
};

module.exports = function () {
    return Object.create(textChanger);
};
```

Now that we have this basis, we see that we might need two extra methods. I'll call them `isDomElement` and
`removeChildren`. You could (and should) go back to the tests file and write some tests for these methods too. To keep
this tutorial short, I'll skip this part.

Add two extra methods in the `textChanger` object called `isDomElement` and `removeChildren`. Give them the following
implementation:

```javascript
isDomElement: function (element) {
    return (element && element.nodeType && element.nodeType === 1);
},

removeChildren: function (element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
```

So far we're not doing anything in the `replaceText` method which gets called yet. It's time to implement the first rule
we defined in our tests: *"it should replace the content of the element with given text"*.

Place the following in the `replaceText` method and save the file:

```javascript
this.removeChildren(element);

element.appendChild(
    document.createTextNode(newText)
);
```

Look at your browser and terminal. You'll see that the first test is now succeeding. Great! Time to put a check for the
given `element` in the method as well.

Put the following code at the beginning of the `replaceText` method:

```javascript
if (!this.isDomElement(element)) {
    throw new Error("element is not a DOM element");
}
```

Save the file and... success! Both tests succeed and should be green in the future of your application. It's okay to
refactor your tests, as long the integrity stays the same.

The finished implementation should look like this:

```javascript
var textChanger = {
    replaceText: function (element, newText) {
        if (!this.isDomElement(element)) {
            throw new Error("element is not a DOM element");
        }

        this.removeChildren(element);

        element.appendChild(
            document.createTextNode(newText)
        );
    },

    isDomElement: function (element) {
        return (element && element.nodeType && element.nodeType === 1);
    },

    removeChildren: function (element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
};

module.exports = function () {
    return Object.create(textChanger);
};
```

Onwards
-------
Now you can easily test your JavaScript modules and scripts in your terminal and browser at the same time. Without
having to reload your browser or running a test task all the time.

Using the following command you can execute the test in your terminal:
`node ./node_modules/mocha-phantomjs/bin/mocha-phantomjs test/tests.html`. Keep in mind that you still have to
Browserify your code after you make changes to your tests and implementations.

I hope this gave you a quick intro into testing your JavaScript code. It takes some time to get used to write your tests
before your code, but it's worth it in the end.
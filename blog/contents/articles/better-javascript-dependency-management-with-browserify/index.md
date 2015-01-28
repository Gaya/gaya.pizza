Writing bundled JavaScript code for the browser tends to become a mess rather soon. We spend a lot of time arranging the code that has to be concatenated in the right order so every dependency gets loaded correctly. Browserify can require dependencies for JavaScript like modules in node.js. This brings a lot of advantages to the way we can handle our required libraries. [![better-javascript-dependency-management-with-browserify](/articles/better-javascript-dependency-management-with-browserify.jpg)](http://www.gayadesign.com/front-end/better-javascript-dependency-management-with-browserify/)<span id="more-1452"></span>

What is wrong with plain JavaScript concatenation?
--------------------------------------------------

 Most of the time when concatenating JavaScript files we'd list them all before running a concatenation task, making sure all the files are loaded in the correct order. We'd have to write out every single dependency by hand, especially when it comes to external libraries. In a Gruntfile I'd first define a few paths to dependencies I got through Bower, npm or downloaded manually. Then I'd have to point to each file and make sure the order is correct. 
```javascript
src: [
	//libraries
    'bower_components/eventie/eventie.js',
    'bower_components/eventEmitter/EventEmitter.js',
    'bower_components/imagesloaded/imagesloaded.js',
	/* I DON'T LIKE DOING THIS! */

	//other files
    'src/!(base).js',

    //the base has to be last
    'src/base.js'
]
```
 This might not look like such a big problem, but can be a pretty tedious task when you have to get new dependencies or when a dependency updates. The paths tend to leave a mess since most repositories have a different way of pointing to the main JavaScript files to include. Another downside is that the files you want to include in your concatenation have to be "compiled" and include all the project's code and its dependencies. Requiring JavaScript modules in browsers with Browserify
--------------------------------------------------------

 Node.js uses CommonJS to include modules in your code. We can install packages using npm and require them in our projects as modules. We can put these modules in an object to use and we don't have to worry about loading the correct files. We can define which module the current file depends on so we can let CommonJS solve the rest. This, however, doesn't work in the browser. Browsers can't require files like node.js does. This is where [Browserify](http://browserify.org/ "Browserify") comes in and creates a wrapper around our required npm modules so we can use `require()` in the browser versions of our JavaScript. 
```javascript
var _ = require('underscore'); // > node_modules/underscore/underscore.js
var picturefill = require('picturefill'); // > node_modules/picturefill/picturefill.js

/* We can now use both objects as modules */
```
 Browserify will bundle all the needed files into one and creates one output file. Better coding through dependency management
-------------------------------------------

 Using Browserify also means we can use npm modules in our browser. If we, for instance, would want to use the package uniq: all we need to do is to install the package into our project executing the following line in your terminal: 
```
npm install uniq
```
 and place the following code in your JavaScript: 
```javascript
var uniq = require('uniq');
```
 You can now use `uniq` as an object in your script. Using Browserify from command line
----------------------------------

 You can choose to run Browserify from your terminal, but you can also choose to run Browserify as a task in your favourite task runner. To use from CLI, install Browserify using npm: 
```
npm install -g browserify
```
 and bundle your package using: 
```
browserify ./path/to/your/source.js -o ./destination/file.js
```
 Using Browserify in Grunt
-------------------------

 Install the `grunt-browserify` package. 
```
npm install grunt-browserify
```
 and setup the correct source and destination in the grunt config: 
```javascript
browserify: {
  dist: {
    files: {
      'destination/file.js':  ['path/to/your/source.js'],
    }
}
```
 It gets even better using Browserify in Gulp
--------------------------------------------

 If you prefer to use Browserify in Gulp you can use the original package instead of a plugin. It's even not advised to use the Gulp plugin for Browserify. Add Browserify as a dependency to your project: 
```
npm install browserify --save-dev
```
 Require Browserify in your `gulpfile.js` and use the following code to add a gulp task: 
```javascript
var gulp = require('gulp'),
    browserify = require('browserify');

gulp.task('browserify', function() {
    return browserify('./path/to/your/source.js') //read the main javascript file
        .bundle()
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('output-name.js')) //name the file
        .pipe(gulp.dest('./output/folder/')); //output directory
});
```
 I added the `.on('error')` callback so that Browserify won't break the loop when you're using the task inside of a watcher. Creating your own (local) modules
---------------------------------

 Let's say we have a file called `main.js`. You can now include other files or packages with `var package = require('name-of-module')`, but we can also include our own modules pointing to the file. If we'd have a module in a file called `sum.js` in the same folder as `main.js` we can require that module using `var sum = require('./sum.js');`. Note the `./` at the start of the path which is necessary for `require()` to know it's a file and not a package which resides in `node_packages`. We can make our object or function available as a module by using `module.exports` in our code. Here is an example of what `sum.js` would look like: 
```javascript
function Sum(a, b) {
	this.a = a;
	this.b = b;
}

Sum.prototype.calculate = function () {
	return this.a + this.b;
};

module.exports = Sum;
```
 We can now use it in `main.js` like so: 
```javascript
var Sum = require('./sum.js');

var calculation = new Sum(400, 20).calculate();
```
 This makes creating your own npm packages a lot easier and makes them available for Browserify use instantly. It makes our code way more manageable and makes the writing of it a lot more structured. A lot of libraries are also available through npm
-------------------------------------------------

 Since the use of Browserify over Require.js or other methods is gaining a lot of ground, a lot of JavaScript libraries are also becoming available on npm. This is great news if you want to use Browserify, since it will improve our dependency management dramatically. I am currently rewriting a few of my libraries to be available as modules through npm. Consider doing this too. Wrapping up
-----------

 With Ecmascript 6 around the corner and front-end development moving forward very fast, this way of dependency management is finally something to hold on to. If you want to share your experience about creating npm packages and using Browserify for your module requiring in browsers, feel free to comment below. 
---
title: "Automating your JavaScript workflow using Grunt"
author: Gaya
date: 2013-11-17
template: article.html
seo_desc: "This article will go into detail about the way I like to use Grunt to improve my workflow and make it easier to maintain and test my JavaScript projects."
links:
  -
    title: Download
    desc: Gruntfile.js result from this tutorial
    url: https://gist.github.com/Gaya/7498780#file-build-gruntfile-js
---
Using tools like Grunt to improve your JavaScript development has been popular for quite a while. It's not a surprise since it will truly improve your workflow and takes care of pesky tasks we so hate to do. This article will go into detail about the way I like to use Grunt to improve my workflow and make it way easier to maintain and test my JavaScript projects. [![Automating your JavaScript workflow using Grunt](/articles/javascript-development-workflow-using-grunt/Automating-your-JavaScript-workflow-using-Grunt.png "Automating your JavaScript workflow using Grunt")](http://www.gayadesign.com/front-end/javascript-development-workflow-using-grunt/)<span class="more"></span> Grunt manages tasks automatically which we would otherwise do ourselves with separate tools. Think in the lines of concatenation, minification and other tasks which can become a drag if we have to do them yourself. Grunt will solves this for us. If you're not familiar with using Grunt, there is a really [good getting started guide on their site](http://gruntjs.com/getting-started "Getting started with Grunt") to get you going. It will immediately give you some insights.

What my workflow does.
----------------------

![Grunt logo](/articles/javascript-development-workflow-using-grunt/grunt-logo.png) It's basically a way to separate my development and production versions of my script while not changing the source for either of them. There will be two versions of our JavaScript file in the end, one I include in the development version of the website, one for the production version. While in development I want my script to give me as many debugging info as possible, run a few unit tests and is easy to debug when the console gives me an error. I production I want the script to be reduced to minimal bytes, stripped of console.log messages but with the same complete functionality as the development version. I'll tell Grunt to watch my project. So it automatically concatenates my source scripts and runs a few unit tests every time something changes in my source files. Now I won't have to tell Grunt to run each time I want to check the website if it's working. In the end, if I am happy with the result I'll tell Grunt to build my project for production (and maybe even deploy it for me). Setting up Grunt for development
--------------------------------

 In the development phase I only need to use concatenation and a tool which allows Grunt to watch my project. I like to keep all my website's assets in an "assets" folder. The following folder structure is used for this article: 
```
assets/
	css/
	images/
	js/
	src/
		js/
```
 In the root of your assets folder create a `package.json` file and a `Gruntfile.js` file. Grunt needs these to work. Put the following in the `package.json` file: 
```javascript
{
	"name": "project-name",
	"version": "0.1.0",
	"devDependencies": {
		"grunt": "~0.4.1"
	}
}
```
 For the development part we only need two grunt packages: [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) and [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch). Go to your assets folder in command line. Run the following commands to install these packages: 
```
npm install grunt-contrib-concat --save-dev
npm install grunt-contrib-watch --save-dev
```
 You'll see `npm` install all the dependancies of these packages. Great. Concat setup in Gruntfile.js
----------------------------

 Now we can move on to the `Gruntfile.js`. Place the following basics in the file: 
```javascript
module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});
};
```
 This file is just basic JavaScript which is used as a configuration file. Let's make Grunt load the tasks we need first. Before the end of the modules.export function we need to include the following: 
```javascript
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
```
 Now we can setup the tasks and how Grunt will be using them. First we'll setup the concatenation. We'll add configs to the object that is passed to the `grunt.initConfig` method. Add following configs after `pkg: grunt.file.readJSON('package.json'),`: 
```javascript
concat: {
	options: {
		separator: "\n", //add a new line after each file
		banner: "", //added before everything
		footer: "" //added after everything
	},
	dist: {
		// the files to concatenate
		src: [
			//include libs
			'libs/somelib/somelib.js',
			'libs/otherlib/otherlib.js',

			//own classes and files
			'src/**/!(base).js',

			//the last script I need
			'src/base.js'
		],
		// the location of the resulting JS file
		dest: 'js/<%= pkg.name %>.js'
	}
}
```
 What I like to do is to leave the options open but at least add a new line in between all the scripts which I want to concatenate. Banner and footer can become very useful, especially when creating jQuery plugins and you want to add noConflict compatibility. > Protip: Set banner to `(function($){` and footer to `})(jQuery);` in grunt-contrib-concat to wrap your script with jQuery noConflict mode.

 In `dist` we define the scripts which concat will combine for us and the path to where the script has to be distributed. First I like to include all libraries I want to include in my script, then I include every file in my `src` folder except for the `base.js` file. I want this file to be included at the end since it handles my object creations and inits. You can easily adjust this to your liking. When it's ready the file will be compiled to `js/project-name.js`. `<%= pkg.name %>` will get the information we put in the `package.json` file for `npm`. Watching the src folder
-----------------------

 Like SASS and Compass, you can watch projects with Grunt. You can let Grunt perform tasks automatically for you when your source files change. Add the following settings after the `concat` object we just added. 
```javascript
watch: {
	scripts: {
		files: ['src/**/*.js'],
		tasks: ['dev-watch'],
		options: {
			interrupt: true
		}
	}
}
```
 You're telling the watch package that it needs to watch for changes in all .js files in the src folder. If there is a change: execute the `dev-watch` task. Note that we haven't created the `dev-watch` task yet. So after loading the npm tasks at the end of the function register a new Grunt task: 
```javascript
//register the task
grunt.registerTask('dev-watch', ['concat:dist']);
```
 The Gruntfile.js file [should be looking like this](https://gist.github.com/Gaya/7498780#file-watch-gruntfile-js) by now. Check your file against this one. Now, go back to your command line and run `grunt watch`. Adjust a file in your src folder. If you get something like this, you're done with the first phase. ![Grunt watch in terminal example](/articles/javascript-development-workflow-using-grunt/grunt-watch-concat.gif) Example terminal output for `grunt watch` If you want to can also add unit testing tasks to your watch task set. It's a great time to run these so you immediately know if you messed up your scripts. Optimizing the output for production
------------------------------------

 Once we're ready with our development tasks we'll move on to the production output. We want to combine and minimize our JavaScript files (also our external libs). You can read why [minimizing round-trip times is a good practice](https://developers.google.com/speed/docs/best-practices/rtt#CombineExternalJS "Minimize round-trip times"). We're going to remove all the `console.log` since we don't want those messages in our production version. After that we're going to minimize the script and output it as the famous `*.min.js` file. We're going to use [grunt-remove-logging](https://npmjs.org/package/grunt-remove-logging "Grunt Remove Loggin") and [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify "Grunt UglifyJS") for this. Execute these commands in the assets folder to install the packages: 
```
npm install grunt-remove-logging --save-dev
npm install grunt-contrib-uglify --save-dev
```
 Removing console.log messages
-----------------------------

 Sometimes we log messages in the console we don't want the end user to read or there might be a certain browser which stops working when it comes across a console.log command. So let's just remove them all in the production version of our script. Let's put remove-logging's configuration in `Gruntfile.js`: 
```javascript
removelogging: {
	dist: {
		src: "js/<%= pkg.name %>.js",
		dest: "build/<%= pkg.name %>.js"
	}
}
```
 We're telling the task to pick our development version of the script and remove all the log messages and save the outcome to `build/project-name.js`. I am using a separate folder for my output so I can easily ignore this folder on deployment. Uglifing the script
-------------------

 When all is ready we're going to minimize the filesize and crop the script to it's optimal size. We're using UglifyJS for this. If you want to read more about how it works, check out the [UglifyJS GitHub page](https://github.com/mishoo/UglifyJS "UglifyJS on GitHub"). Put the following in your configuration: 
```javascript
uglify: {
	options: {
		banner: ""
	},
	build: {
		src: 'build/<%= pkg.name %>.js',
		dest: 'js/<%= pkg.name %>.min.js'
	}
}
```
 It tells UglifyJS to pick the file which has the `console.log` messages stripped and then save the outcome to `js/project-name.min.js`. Combine it all in a new "build" task
------------------------------------

 First we need to load the newly used packages in Grunt: 
```javascript
grunt.loadNpmTasks('grunt-remove-logging');
grunt.loadNpmTasks('grunt-contrib-uglify');
```
 Finish it of by registering a new task at the end: 
```javascript
grunt.registerTask('build', ['concat', 'removelogging', 'uglify']);
```
 Go back to command line and let Grunt execute your newly created task. 
```
grunt build
```
 ![grunt-build](/articles/javascript-development-workflow-using-grunt/grunt-build.gif)[The complete file outcome can be found as a Gist](https://gist.github.com/Gaya/7498780#file-build-gruntfile-js "The complete Gruntfile.js"). Further improvement
-------------------

 From here you can start optimizing your front-end workflow. You can also add tasks for automatic image optimalisation, copying files, parsing SASS / Compass etc etc. There are [a lot of great plugins](http://gruntjs.com/plugins "Grunt Plugins") available to use. If you have your own workflow, or if you want to share your thoughts: leave them in the comments. Happy Grunting!
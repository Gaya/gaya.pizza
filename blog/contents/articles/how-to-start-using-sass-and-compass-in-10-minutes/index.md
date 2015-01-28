---
title: How to start using Sass and Compass in 10 minutes
author: Gaya
date: 2013-09-20
template: article.html
links:
  -
    title: Download
    desc: Compass Boilerplate project
    url: https://github.com/Gaya/Compass-Boilerplate
---
Lately I've been getting a lot of questions from people how to begin using Sass and Compass. Even though it's pretty easy, a little push in the right direction is all you need to quickly start utilising Sass and Compass in your next project. I'll give you installing instructions, a bit of information on what happens and a sample project setup I use myself to get you started quickly. [![How to start using Sass and Compass in 10 minutes](/articles/how-to-sass-compass.jpg)](http://www.gayadesign.com/diy/how-to-start-using-sass-and-compass-in-10-minutes/ "How to start using Sass and Compass in 10 minutes")<span id="more-1304"></span>

What will Sass and Compass do for me?
-------------------------------------

 With Sass and Compass you can generate optimised css output to use on your webprojects. It will take your `.sass` or `.scss` source files and compile browser readable CSS for you. Since Compass helps a lot with handling other assets than just CSS, we'll be using it to generate our CSS. How does Compass work?
----------------------

 Most projects I've worked on have their images, CSS and other assets separated in different folders. Compass will help us organise our `.sass` or `.scss` code to work better with our other assets. In a Compass project we'll have a config file called `config.rb` in which the settings of the project are defined. Compass will read this and use the settings when compiling your css. The difference between .sass and .scss
--------------------------------------

 Only thing different about the two is the syntax. Both will be parsed by Compass. In this tutorial we'll use `.scss`. A more in-depth article of which syntax to pick can be found here: [http://thesassway.com/articles/sass-vs-scss-which-syntax-is-better](http://thesassway.com/articles/sass-vs-scss-which-syntax-is-better "Sass vs Scss"). What will we be doing?
----------------------

 This tutorial will take you through the following steps in understanding and setting up your project: 1. Install Compass on your computer
2. Use the test project
3. Watch Compass do its magic
4. Your first .scss
5. Trying out Compass' helpers

1. Install Compass on your computer
-----------------------------------

 First we're going to install Ruby. If you're on OS X; Ruby is already installed (great!). If you're working on a Windows machine you can grab [RubyInstaller for Windows](http://rubyinstaller.org/ "RubyInstaller"). Be sure to check the "export Ruby executables to PATH" box when installing. More detailed instructions can be found in ["Ruby for Newbies: Installing Ruby and Getting Started"](http://net.tutsplus.com/tutorials/ruby/ruby-for-newbies-installing-ruby-and-getting-started/ "Ruby for Newbies: Installing Ruby and Getting Started"). Now we can install Compass. So let's open up a *Terminal* (CMD on Windows).
###On Windows:

 `gem install compass`
###On OS X

 `sudo gem install compass` 2. Use the test project
-----------------------

 Compass is installed and we can start using it to watch our projects. Let's create a folder somewhere on your computer. We'll call it `compass-demo` for the purpose of this demo. Download the [Compass Boilerplate I created](https://github.com/Gaya/Compass-Boilerplate/archive/master.zip "Compass Boilerplate")  from Github and extract it in your `compass-demo` folder. The folder structure of the project should look like this: 
```
- compass-demo
	- assets
		- compass
			- sass
				style.scss
			config.rb
		- css
			style.css
		- images
			gaya-design-logo.png
```
 `assets` is the root folder of all our assets. Later on you can for example add a Javascripts directory. `compass` is the directory we will be 'watching' for changes. Notice the `config.rb` file. That file holds all the settings Compass needs to compile the CSS correctly. 3. Watch Compass do its magic
-----------------------------

 We need to tell Compass to 'watch' our `compass` folder. This will make Compass look for changes to the files in the `sass` folder of the project. In this case we have a `style.scss` file. Go to the `compass-demo/assets/compass` folder in your *Terminal *(or cmd). From here run the following command: `compass watch` It should say: `>>> Compass is polling for changes. Press Ctrl-C to Stop.` Good, we're now watching the `compass` folder because the `config.rb` file is in there. It's contents look like this: 
```
# Require any additional compass plugins here.

#Folder settings
relative_assets = true      #because we're not working from the root
css_dir = "../css"          #where the CSS will saved
sass_dir = "sass"           #where our .scss files are
images_dir = "../images"    #the folder with your images

# You can select your preferred output style here (can be overridden via the command line):
output_style = :expanded # After dev :compressed

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = true

# Obviously
preferred_syntax = :scss
```
 You can see all the references to the different directories Compass will need in order to compile your CSS. 4. Your first .scss
-------------------

 Let's open up the `sass/style.scss` file and add the following code: 
```scss
@import 'compass/css3';

.shadow {
    @include box-shadow(#000 5px 5px 5px);
}
```
 First we import Compass' CSS3 mixins and then give the selector `.shadow` a nice box-shadow. Now open the compiled css file in `assets/css/style.css`. You can see that Compass magically added all the CSS3 vendor prefixes for you. 5. Trying out Compass' helpers
------------------------------

 In the `config.rb` we also pointed out where our images are saved. This is because we can use Compass to get the url to our image, but also the width and the height. Pretty neat, right? Add the following code to your `style.scss`: 
```scss
.logo {
    background-image: image-url("gaya-design-logo.png");
    width: image-width("gaya-design-logo.png");
    height: image-height("gaya-design-logo.png");
}
```
 You'll see that the compiled CSS will point to the right image file and filled in the width and height in pixels. 
```css
.logo {
  background-image: url('../images/gaya-design-logo.png?1364137770');
  width: 102px;
  height: 87px;
}
```
 Just start using Compass!
-------------------------

 From here all I can tell you is to start using Compass and [dig into Compass' features](http://compass-style.org/reference/compass/ "Compass Reference"). It might be a good start to look for some in-dept tutorials, but you can also ask someone you know is great with Sass and Compass to fill you in. I hope this quick tutorial made your Compass working environment possible.
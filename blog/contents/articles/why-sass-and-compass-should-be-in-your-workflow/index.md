---
title: "Why SASS and Compass should be in your workflow"
author: Gaya
date: 2011-11-17
template: article.html
---
Admit it: CSS is awesome, but it's default syntax is insanely stupid. Are you tired of the way CSS is written and proves to be quite useless and cluttered once the project grows and gets more styling? It just takes up way too much of our time to organize and it's plain stupid if we stick with this kind of workflow. That's when CSS compilers came around, and it will change your life. This post will describe the benefits of CSS compiling and in which possible ways you can use it. [![Why SASS and Compass should be in your workflow](/articles/\/sassworkflow.jpg "Why SASS and Compass should be in your workflow")](http://www.gayadesign.com/articles/why-sass-and-compass-should-be-in-your-workflow/)<span id="more-728"></span>

Time to keep it simple, no time for the stupid!
-----------------------------------------------

 How many times have you done this? 
```css
ul { padding: 0px; margin: 0px; }
ul li { padding: 0px 5px; }
ul li a { color: #335345; }
ul li span { color: #434343; }
```
 Then sighed and thought: *Why the hell I am retyping "ul li" the whole time? IT'S JUST STUPID!* Yes it is. Let me go on. What about colors that are used in a project or just font-sizes / line-heights / margins that are recurrent and appear all over your CSS file. Imagine that you want to change that and realize it's all over your CSS file. Indeed, this is a pain. How about styles that appear all over your stylesheet? Getting tired of reusing the same styles over and over again? And "oh oops!" There is a style change. Now the pain begins of changing that piece of style to a amount of times that it will make your stylesheet more cluttered and inuseable. **This is CSS hell.** For these problems. [SASS](http://sass-lang.com/ "SASS - Syntactically Awesome Stylesheets"). Compiling CSS now? What?
------------------------

 Don't be scared if you are not a developer that knows his around the terminal (or Windows' ugly CMD.) There are a lot of solutions that prevent you from having to use the terminal to start watching projects, but let me take a step back. SASS will give you the opportunity to change the way you code your CSS and generate the "real" CSS file for you. What it basically does is look at the SASS file and generate the correct CSS representation from it. The thing is though, that once you want your CSS files to be generated you have to command SASS to "watch" your folder containing the SASS files. So once you save the SASS file, it won't have the CSS ready instantaneously, sadly. But a few seconds later, it will be ready. This will take a few minutes to get used to, but you sure will. Style nesting
-------------

 The first thing I loved about SASS and SCSS as it's syntax has nesting of the styles. This makes it way easier to work with your stylesheets. Imagine having this HTML: 
```html
<ul>
    <li>
        <a href="#">link 1</a>
    </li>
    <li class="last">
        <a href="#">link 2</a>
    </li>
</ul>
```
 In SASS, you would be able to style this the following way: 
```scss
ul {
    padding: 0px;
    margin: 0px;
    width: 210px;

    li {
        float: left;
        width: 100px;
        margin: 0px 10px 0px 0px;

        &.last {
            margin: 0px;
        }

        a {
            color: #232323;

            &:hover {
                color: #121212;
            }
        }
    }
}
```
 Isn't that just pretty? Finally you can nest your CSS the way you would in HTML. You can use any CSS selector to make the process even easier. I also put in a nice little feature which I use a lot in SASS: the `&` notation. This tells SASS to set an extra rule for the element you're in. So the `li` element with class `.last` is targeted through this method. Not having to create a new rule in the nesting for it. The hover on the anchor tag is also targeted through this method. Very handy! Variables, Mixins and Selector Inheritance
------------------------------------------

 The reuse of pieces of styling and making the CSS dynamic, that is what SASS is good at. Variables are simple. Define it and use it throughout your SASS file: 
```scss
$background: #040404;
$text-color: #fefefe;
$standard-margin: 16px;

body {
    background-color: $background;
    color: $text-color;

    input {
        background-color: $background;
        color: $text-color;
        margin: $standard-margin;
    }
}
```
 It's simple. Define a variable using `$varname: value` and use it throughout with: `$varname`. Mixins are like variables but for peaces of styling. You can just tell SASS to reuse a piece of code you wrote and include it in the style. You can even give parameters when including to make them dynamic. It's almost as if you're writing functions for your CSS. 
```scss
@mixin ptsans {
    font-family: 'PT Sans', sans-serif;
}

@mixin absolute-positioned($top, $left) {
    position: absolute;
    top: $top;
    left: $left;
}

body {
    @include ptsans;
    position: relative;

    #notifier {
        @include absolute-positioned(20px, 100px);
    }
}
```
 Defining a mixin with `@mixin mixinname { styling in here }` or `@mixin mixinname ($parameter1) { anystyle: $parameter1; }`. That is it. It is great for defining recurring styles and CSS3 fallback stuff. You can put a lot of styling in mixins and reuse it with very little effort. Last but not least is selector inheritance. This allows you to grab a piece of styling like you would in a mixin, but just extending the style. So you're putting the same CSS in the actual file but extending the CSS rules. Let me explain this through an example:
###Plain CSS:

 
```css
.error, .succes {
    border: 1px solid black;
    padding: 5px;
    color: red;
}

.succes {
    color: green;
    border-color: green;
}
```

###**SCSS:**

 
```scss
.error {
    border: 1px solid black;
    padding: 5px;
    color: red;
}

.succes {
    .error;
    color: green;
    border-color: green;
}
```
 Beautiful. For an extended tutorial on how to use SASS and use ruby to compile your files I point you to SASS' tutorial: [http://sass-lang.com/tutorial.html](http://sass-lang.com/tutorial.html)And now to make it even more awesome: Compass
---------------------------------------------

 The reason I didn't explain how to compile SASS is because I recently found [Compass](http://compass-style.org/) to do this for me. And I have to say: I am sold. As if SASS isn't awesome enough on it's own, Compass comes with an extra set of awesomeness. It's a layer on top of SASS which has some extra nifty tricks inside of it. Compass will also compile your SASS files and has a lot of options. To install Compass you can [read their install page](http://compass-style.org/install/). And if you, like me, are too lazy to bother with the command line stuff, try this app: [http://compass.handlino.com/](http://compass.handlino.com/). It's just $7 or you can build the project yourself to save some money. Why Compass?
------------

- It has build-in CSS3 mixins.
- A lot of handly CSS workarounds included.
- Lots of helpers to save work.
- Option to output SASS file as compressed CSS.
- Great docs.

 There is a lot to Compass, and I learn more and more every day. There are a few things that sold me immediately. Project workflow
----------------

 When you start up a Compass project, it will create a few folders for you. According to your config file, it will generate the output that you desire. In the config you can define the folder where the SASS files (.scss) are stored, it will then automatically watch that folder for changes. You can also define which folder contains your CSS images and where to output the generated CSS files. These can all be in different places. The great thing about this is the `image-url` helper for example. Don't you just hate stuff like this? 
```css
div { background: url(../../images/backgrounds/01.jpg); };
```
 With Compass (and the right settings) it will turn into this: 
```scss
div { background: image-url("backgrounds/01.jpg"); };
```
 Now THAT is convenient! The generated CSS will be the same as above though, but your SASS files will be way more organized. Stuff like `image-width` and `image-height` to get the width and height of an image in pixels, [support for Sprites](http://compass-style.org/reference/compass/utilities/sprites/) and an [out-of-box sticky footer](http://compass-style.org/reference/compass/layout/sticky_footer/) make our lives so much easier. CSS3 mixins, no more -webkit -moz and all that crap!
----------------------------------------------------

 The reason I hated CSS3 at first was the fact that a lot of times it involved having to set the properties for each browser using -webkit, -moz etc. This is a serious pain in the ass for us coders and always held me from using it. Using SASS' mixins and some parameters you can save yourself a lot of time when setting CSS3 properties. Compass has [all of these CSS3 mixins](http://compass-style.org/reference/compass/css3/) ready. This in particular convinced me to use Compass aside SASS. Imagine doing this from now on: 
```scss
div { @include border-radius(4px); }
```
 The way it supposed to if you ask me. Well it should have been in CSS in the first place. Luckily, SASS and Compass fix these problems for us. Further reading
---------------

 A nice presentation that goes into the functionality of SASS and Compass by [Brandon Mathis](http://brandonmathis.com/) can be found here: [http://speakerdeck.com/u/imathis/p/sass-compass-the-future-of-stylesheets-now](http://speakerdeck.com/u/imathis/p/sass-compass-the-future-of-stylesheets-now). It's really worth the skipping through. The leasons by Jeffrey Way on Nettuts are great too: [http://net.tutsplus.com/tutorials/other/mastering-sass-lesson-1/](http://net.tutsplus.com/tutorials/other/mastering-sass-lesson-1/)Conclusion
----------

 There is a lot to say about SASS and Compass, and there is [a lot more to Compass](http://compass-style.org/reference/compass/) than explained in this post. Using these compilers will save you a lot of work and make coding CSS fun again. Better syntax, managed code, dynamic parts, it's all better now. I hope to have convinced you into using SASS and Compass. Tell me what you think in the comments. Cheers.
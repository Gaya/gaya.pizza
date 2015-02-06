---
title: "Compound Selectors for Better Class Names in Sass"
author: Gaya
date: 2014-04-04
template: article.html
seo_desc: "Sass has the ability to compound selectors for your CSS. It gives you the power to nest long class names. This article explains how."
seo_title: "Compound Selectors for Better Class Names in Sass"
---
There are a few class naming conventions you can live by, the problem with most of them is writing long class names that tend to give your CSS a messy look without compound selectors.

Luckily Sass now supports compound selectors which will make our stylesheets a lot easier and better to maintain.

[![Better Class Names with Sass Compound Selectors](/articles/compound-selectors-for-better-class-names-in-sass/better-class-names-sass-compound-selectors.jpg)](/articles/compound-selectors-for-better-class-names-in-sass/)

<span class="more"></span>

Naming conventions
------------------

Web developers are always looking for a better way to create maintainable CSS for their projects. Giving class names to HTML elements can really get out of hand and reusable classes don't always have the best names.

Semantics are just as important in HTML as they are in CSS. Making the CSS not dependent on the HTML structure, or at least as little as possible, is desirable.

Whatever convention you're following, a structured one like [BEM for example](http://www.integralist.co.uk/posts/maintainable-css-with-bem/ "Maintainable CSS with BEM"), really helps you in this process. Whether you like to construct class name by appending more segments, or following a pattern: Sass can now help you make your code even better.

Compound Selectors in Sass
--------------------------

Sass has the ability to compound selectors for your CSS. You probably already knew that [you can append another class to a selector or a pseudo-element using the ampersand sign](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#parent-selector). Now we can also append parts of a class name.


```scss
.portfolio-items {
    margin: 1.5em 0px;
    
    &-item {
        border: 1px solid black;
        
        &-name {
            font-weight: bold;
        }
    }
    
    &-close-button {
        @extend .close-button;
    }
}
```


Will now become the following code:


```css
.portfolio-items { margin: 1.5em 0px; }
.portfolio-items-item { border: 1px solid black; }
.portfolio-items-item-name { font-weight: bold; }
.button, .portfolio-items-close-button { /* styling */ }
```


This gives use the power of nesting our selectors without long selectors to match for the browser. It helps us maintain a modular approach to our styling without making a lot of clashing or duplicate style.

Nesting problem solved
----------------------

Using this method we solve the problem of nesting to much in our Sass projects making long and a bit too specific selectors.

I hope you'll start using this functionality more often. I have a lot of old code to refactor now!
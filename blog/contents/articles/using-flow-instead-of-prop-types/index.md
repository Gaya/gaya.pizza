---
title: "Using Flow instead of prop-types in React"
author: Gaya
date: 2017-06-19
template: article.html
seo_desc: "Explaination on how to go from `prop-types` to static type checking with Flow in React."
---

One of the most used ways to check the "type" of a property which is passed to a React component is
through [`prop-types`](https://github.com/facebook/prop-types). The main problem is that all the
type checking is done on run-time, and not statically.

This article will explain how to go from type checking with `prop-types` to static type checking
with [Flow](https://flow.org).

<span class="more"></span>

Why Flow?
---------
The first and foremost reason for choosing Flow is that is opt-in. You can choose to type check a
file or not.

When a project is already alive and well the last thing we want to do is rewrite everything. Flow
enable you to add type checking step by step into your application. [Typescript](http://www.typescriptlang.org/)
forces you to go all the way though (which is a good idea for new projects!), but with Flow you can
go all the way too.

Type checking is a missing part in JavaScript which some developers fight about. Is is really needed?
Does it make your code better? Is type checking not just a tool for the developer?

The mean reason I choose to add a tool like Flow to my project is to ensure I think about what goes
in and goes out of my application. Type strictness helps my IDE understand what I type and what I
should pass in function and props of React Components.
Now I am already documenting my code in a way, which makes my developer self quite happy in a month.

Static versus runtime type checking
-----------------------------------

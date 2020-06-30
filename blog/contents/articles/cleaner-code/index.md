---
title: "Cleaner Code"
author: Gaya
date: 2020-06-30
template: article.html
seo_desc: "Writing clean software is a useful skill for you and your peers. Here are some pointers to get started."
poster: "/articles/cleaner-code/cleaner-code.jpg"
---

One of the things I take pride in is writing _simple, easy to follow, and clean code_. My peers and clients appreciate the fact that I can write code in a way that the next person is able to understand what I am trying to convey.

This makes my work a lot more usable and makes it easier for future programmers to be onboarded into the product I worked on.

I want to share with you some principles I keep in the back of my mind when writing code.

[![Cleaner Code](/articles/cleaner-code/cleaner-code.jpg "Cleaner Code")](/articles/cleaner-code)

<span class="more"></span>

Following are the key concepts that make my work better to understand and follow. This greatly improves the way I can teach people how to code or how they could think about writing code.

## Write as if The Next Person Reading Has Zero Context of The Problem You're Solving

Have you ever been asked to review a pull request and immediately saw a _large portion of code_ that made your head hurt? This is an **early warning** the code is going to be hard to understand.

The author might understand it perfectly, and you yourself might have written code like this before too: a large complex block of code that is using all kinds of cool tricks to create a desired outcome. While this can be smart, it _might be very hard to understand_ for the next person.

A simple trick I like to use is to **write code so that the next person reading it will be able to follow it without context**. This means I stay away from code that has the reader jump up and down in the code to be able to follow what's going on.

Write in short blocks of code, use clear naming, break it in smaller digestible bits, and give all your functions names. Good names.

**Code has to read like a story**. When it reads like a story, when it has simple instructions, it is easier for the next person to go through.

So the next time you finish a piece of code, go back and think: _"Would someone without any context understand this?"_ 

## Naming of Things

One of the hardest things in software engineering is _naming things_. Naming variables, functions, files, classes, folders, and the project itself.

It's really important to pick correct naming. Especially for the next person who's going to read your code. It helps to take the time to **think about a good name**, but do not overthink it. A function name or variable name taking up half the screen does not help either.

For variables, give it a name that reflects something in the real world, or simply put: **tell what it is**.

Instead of `items.forEach((item) => item.drive())` try to use naming like `cars.forEach((car) => car.drive())`.

In that same regard, always try to _avoid abbreviations and shortened names_. Name things by their name, instead of using a single letter or a few letters.

Consider the following:

```js
const list = getPersons();

list.forEach((i) => {
    doStuff(i.name);

    if (someCondition) {
        i.hire();
    }
})
```

Is hard to follow because you'd need to know what is in `list` to understand what `i` is. Only after you've seen `getPersons()` does the reader know there are persons in `list`. 

> The reader might not start reading code from the top!

You can make this easier to read when you formulate it like so:

```js
const persons = getPersons();

persons.forEach((person) => {
    doStuff(person.name);

    if (someCondition) {
        person.hire();
    }
})
```

From looking at the variable name `person`  I know I am looking at a list of persons. This creates a much _smaller mental model_ to work with.

As for classes and functions. **Try to keep the naming short and to the point**. If the function is doing too many things to give it a short name, _break the function up in smaller, easier to follow, parts_.

## Return Values Early

One simple trick to make your code much easier to follow is to return early. You can write every bit of code you want without using `else` by returning early.

When sorting objects in a list by age, you can use a compare function which can return 3 different outcomes: 1, -1, or 0.

```js
function sortByAge(firstPerson, secondPerson) {
  if (firstPerson.age > secondPerson.age) {
    return 1;
  } else if (secondPerson.age > firstPerson.age) {
    return -1;
  } else {
    return 0;
  }
}
```

You can also read this code if you read **all the if statements** to understand the code fully. In order to make this code more readable you can return early. Make the function stop without having to create if else statements.

```js
function sortByAge(firstPerson, secondPerson) {
  if (firstPerson.age > secondPerson.age) {
    return 1;
  }

  if (secondPerson.age > firstPerson.age) {
    return -1;
  }

  return 0;
}
```

This is but a simple example, but as your code and functions get more complex, this will _greatly improve the readability_ of your code. It takes a while to get used to writing like so, but it will pay off.

Another thing you can avoid is creating temporary variables which get assigned and changed later on in your code. The reader has to track all the possible changes which can be made throughout the code.

```js
let name;

if (user.loggedIn) {
  name = user.name;
} else {
  name = 'No name';
}

// VS

function getName(person) { 
  if (person.loggedIn) {
    return person.name;
  }
  
  return 'No name';
}

const name = getName(user);
```

It's not the greatest example, but avoiding using mutable variables will make following your narrative a lot easier, _especially in larger function bodies_. If you have to keep track of changes to variables in conditions, loops, and loops within loops, it will become **hard to follow** fast.

On that note... let's move on to working with pure functions.

## Pure and Simplicity

When creating functions, have it do one thing, and one thing good. Using pure functions will help you in making your code much easier to understand and reuse.

**It's easier to reason about a function that does one thing** instead of a function that manipulates data, does some calculations, and return something completely different.

A pure function _always returns the same result_ based on what is given to it, and has _no side effects_. A side effect is when a function touches another part of your application and causes a mutation outside of the function.

Pure functions are fundamentally mathematical. You provide them with input, and they'll return a result, **without touching the input** itself. That's very important.

For instance, rather than looping over a list to fill a new one, you can use `Array.map` to create a new one. Rather than changing a property inside of an object, let a function take the original as input and return a copy with the property changed.

Immutability has a lot of advantages, and one of them is _making the code easier to understand and follow_. You'll know for a fact that the input to functions will not be touched or changed in a way that's not expected.

Writing in pure functions need some getting used to, but once you start using them you'll never want to go back.

I know it's a bit ironic I didn't use 100% pure examples in this article, but I was trying to illustrate situations.

## Keep it Short and Simple

I'll close this article with one of the hardest things in programming. **Keep your code short and simple**. More often than not are we prone to write complex and large chunks of code.

By keeping your code in _short and concise chunks_ you can digest it a lot easier. Even when going back to your own code later you'll thank yourself for writing it in such a way.

So what if you can't make your code readable? Write the code that will reach the goal you want to reach the way you would, be it not so readable. It is time to rethink what you just wrote. What is really happening in the code? Can I simplify?

> Write once, then write the code again.

You'll see that this time what you wrote it a lot easier to understand and follow. This _trains your brain_ to think about future problems the same way and avoids making the same mistakes later. Making your code cleaner.

**The best way to solve a complex problem is more often than not a clean and simple solution.**



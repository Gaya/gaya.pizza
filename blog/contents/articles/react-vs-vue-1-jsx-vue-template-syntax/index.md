---
title: "React vs Vue pt. 1: JSX and Vue Template Syntax"
author: Gaya
date: 2018-04-26
template: article.html
seo_desc: "This article compares how React and Vue handle rendering. With some personal experience added."
---
For the last couple of years I’ve been working with React, and as of late I’ve been getting into Vue as well. A question lots of people ask me is:

“So tell me, which one is better?”

There is simply no short or correct answer to this question. There are a lot of factors which come into play. That’s why I wanted to start writing a mini-series on some topics which demonstrate differences between Vue and React and the pros and cons using either one of the frameworks.

In this first instalment of this “React vs Vue“ series, I want to get into how both frameworks allow you to render content.

<span class="more"></span>

## The articles in this series

1. [JSX and Vue Template Syntax](/articles/react-vs-vue-1-jsx-vue-template-syntax)
2. Component structure _(to be released)_
3. State management _(to be released)_
4. Learning and opportunities _(to be released)_
5. Tooling and community _(to be released)_
6. Recap and final thoughts _(to be released)_

## How To Render?

Rendering content on the page is one of the most important things React and Vue do for us. Given some data and definitions of how to render will give the desired output. That is the promise they give us.

First I want to take a look at how React does things. Which is mainly two different approaches. You can either go 100% plain old JavaScript or use JSX to simplify the process.

## JSX, createElement, and render() in React

React uses a `render` method in its components to create elements in the environment you’re running it in. I’ll take the browser and the DOM as the environment throughout this article.

Every time React thinks it should update a component (and its children) it will run the `render()` method of that component.
In this method, you’ll return a [React element](https://reactjs.org/docs/rendering-elements.html) which can, in turn, have nested children in it. Just like an HTML document is able to have.

You can do this by using the [`createElement`](https://reactjs.org/docs/react-api.html#createelement) function React provides. It creates the React element you need to return from the `render` method.

First it accepts what you want to create as its argument. Second is an object of props to pass to the element. And third is an array of children, all of which are React elements too.

A simple example of this would be:

```js
class Hello extends React.Component {
  render() {
    return React.createElement(
      'p',
      null,
      `Hello ${this.props.what}!`,
    );
  }
}

class App extends React.Component {
  render() {
    return React.createElement('div', null, [
      React.createElement(
        Hello,
        { what: 'world' },
        null,
      ),
    ]);
  }
}
```

The HTML for this would look like:

```html
<div>
  <p>Hello world!</p>
</div>
```

While this code looks very redundant, it’s the 100% JavaScript way of creating elements in React. Whenever `render()` is triggered, it will execute this method once again to create all the elements to show on the page. You can put JavaScript expressions anywhere you'd like in this code, just like any other part of your JavaScript code.

JSX is basically syntactical sugar around the `React.createElement` function. It’s a custom syntax which is not part of JavaScript, but [can be transpiled by a tool like Babel](https://babeljs.io/docs/plugins/transform-react-jsx/). If you choose to use JSX, you need to have a build system in place to handle this.

The example above would look a bit different, but not that different if written in JSX.

```js
class Hello extends React.Component {
  render() {
    return <p>Hello { this.props.what }!</p>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Hello what="world" />
      </div>
    );
  }
}
```

All JSX enables us to do is write shorter, easier to read and understand code to structure our React components. Your transpiler will eventually translate this code into something the browser can read, which is just using plain `React.createElement`.

You can use JavaScript expressions by using `{}` anywhere in your JSX. Want to pass a JavaScript variable as a prop? No problem. Want to do some `map` or `reduce` on an array? You can do that.

You only have to learn how JSX is transformed into plain JavaScript and that's all there is to it.

## Pros and cons to the React way
One **con** I have experienced when getting into React was the mental change I had to go through not to think in templates. I came from a Model-View-Controller approach using templates for my views. One of the things that got me the most, in the beginning, was creating lists. You can return an array of children just like you would in a `for` loop of a template language, but it just looked weird typing it like this.

```js
class Example {
  render() {
    const names = ['John', 'Harry', 'Tom'];

    return (
      <ul>
        { names.map(name => <li>{ name }</li>) }
      </ul>
    );
  }
}
```

The `map` method of the `names` array will return a new array with React elements returned by the arrow function. It's essentially the same `for` loop, but you have to get used to it.

Since data binding in React is just one way, you can not directly change values of a component, you have to explicitly tell React to update values of the state using `setState`. This makes React prefer immutability, which is kind of hard to get into if you're not used to it.

A **huge pro** which evolved out of this con is that you'll become a lot better at making your components clean and lean. Everything has to work in a pure functional way and should always return the same result given the same input. Given any state or props, the component will always turn out the same, at least that's the philosophy behind React.

Another **pro** is that everything you write is JavaScript in the end. You don't need to learn a new templating language, you're only learning how to use the React API to your advantage. The fact that everything is *just JavaScript* makes this method very predictable.

A **con**, in turn, is that everything *is* JavaScript, so there is not much to help you out of the box. For instance, the way I am rendering the list of names, I pass an arrow function inside of the `map` method. This arrow function is created each time the `render` method gets called, which could lead to performance issues. You see this a lot too when people want to bind `this` on an event listener.<br />
A solution to this is to bind or define all function before `render` is called. In the `constructor` of a component class for instance.

This is also a **pro** because it will teach you a lot about how JavaScript works. Maybe this a lot to take in when you first start out, but in the end, this will make you better understand how the language works and what its pitfalls are.

## Vue templates and render

You can use [Vue templates](https://vuejs.org/v2/guide/syntax.html) right in your HTML document. Which makes it super easy to get started with. When a Vue component thinks it should render it will read the template written on the page and render all the elements and binds all events it needs to.

A very basic example would look like:

```html
<div id="app">
  Hello {{ what }}!
</div>

<script>
var app = new Vue({
  el: '#app',
  data: {
    what: 'world',
  },
});
</script>
```

Vue allows you to do all kinds of great stuff in their templates. You can interpolate JavaScript values, you can set attributes with plain values or bind attributes to JavaScript values which live inside of the Vue component. You can do expressions too, to do some JavaScript calculation along the way.

It has its own way of rendering conditionally, rendering lists, binding events, and binding form inputs. Binding events and form inputs can come in quite handy as things like these are not build-in into React. It does introduce a little bit of magic, but since it's a templating language, that's fine a lot of the time.

However, if you feel like the template language is not suited for a case, or if you simply cannot achieve what you'd like using the template language, you can [use the `render` method of a Vue component](https://vuejs.org/v2/guide/render-function.html).

Yes. Vue too has a `render` method and it also uses the same concept as React by providing a `createElement` function.

```js
Vue.component('hello', {
  render(createElement) {
    return createElement('h1', {}, 'Hello!');
  }
})
```

Instead of importing a function from Vue itself, Vue provides the `createElement` function to use as the first argument of the `render` method.

Providing props and other data to `createElement` works a bit different from React, as Vue is more of a complete framework which provides you with a lot of functionality out of the box.<br />
You can read up on [the Vue data object](https://vuejs.org/v2/guide/render-function.html#The-Data-Object-In-Depth) in details in their docs.

## Two-way binding and Event binding

A concept which is used in Vue is two-way binding. People coming from Angular will definitely recognise this concept. Let's say we have an input in our Vue component we keep track of the value. We want the input to be able to adjust the value in the Vue component's data, but when the Vue's data changes: the input value should change too. Vue does this through the `v-model` on inputs. Vue also allows components to use two-way binding using `v-model`.

Events on elements can be directed to a method inside of your Vue component or can execute a JavaScript expression. The thing that comes in handy here is that `this` is automatically bound to the current Vue component you're in. So you do not need to go and bind `this` to the functions passed into event handlers.

```html
<div id="app">
  Count: {{ count }}
  <button v-on:click="increment" value="Increment" />
  <button v-on:click="count = count - 1" value="Decrement" />
</div>

<script>
var app = new Vue({
  el: '#app',
  data: {
    count: 0,
  },
  methods: {
    increment() {
      this.count = this.count + 1;
    },
  },
});
</script>
```

The benefit here is you have to write less code and know all is handled well under the hood.

Another great thing about event binding in Vue is that they allow you to use [event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers). They give you a simple way to bind modified event handlers on components. For instance, automatically do `event.preventDefault` before executing the function you bound to an element.

## Pros and cons of Vue template language
I want to start of with a **pro** off using Vue templates. It's quite easy to get going pretty quick. Most developers are familiar with using template languages and it does kind of resemble the outcome you're expecting in HTML.

The downside, however, is that you have to learn a new templating language. And that, in my opinion, is quite a **big con**. A lot of the times I am found reading the template language documentation pages over and over, to see what I am missing or just simply how to do something like a conditional rendering again. I know it's part of learning a framework like Vue, but outside of Vue, this skill is kind of useless.

A **pro** I cannot ignore is the event binding on elements. It's just so convenient. You have to accept the magic happening under the hood though. Everything inside Vue templates gets an automatic `this` reference. So instead of writing `{{ this.name }}` inside of the templates you just write `{{ name }}`.

What I also found is that using JavaScript expressions and references to data inside of my components always feel like a guessing game. I often times think to myself: "Will this work?". Sometimes it does. sometimes it doesn't. That's because of all the magic happening out of sight and that can become a little dangerous. I consider this a **con**.

**Small pro**, some people like to keep their templates out of their JavaScript (and think JSX is also a template). Vue templates do that, so it gives the illusion of separation of concerns. I don't see JSX as being the template, it's just a way to structure `createElement` code.

I found myself reaching for the `render` method at some points. There where situations where the templating language didn't have enough power to provide me with the functionality I needed, which is fine, but most of the times when I was using the templating language I just wanted to turn to the `render` function again. I know you can use JSX in Vue if you want, but I don't really see it used a lot in examples or in the community's code. I'd stay away from it and use templates as much as possible.

## Conclusion

With this article, I hope to have giving you a clear look at how React and Vue handle the creation of documents.

To me there is no clear winner here, it all depends on what you like more. If you're not afraid of learning a template language and don't have too complex components, Vue is pretty sweet.

Vue helps the developer solve a lot of "hard" stuff which is not baked into React. React on the other hand allows the developer more control over how the code works.

My personal preference goes to React + JSX, not just because I don't like templating languages in general, but because it's just JavaScript, and it made me a way better developer than I used to be, being way more conscious about what I was doing.

_Next time_ I am going to tell you about the component structure, file structure, and how both frameworks handle these problems differently.
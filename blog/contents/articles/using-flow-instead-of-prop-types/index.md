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
with [Flow](https://flow.org) in React.

<span class="more"></span>

Why Flow?
---------
The first and foremost reason for choosing Flow is that is opt-in. You can choose to type check a
file or not.

When a project is already alive and well **the last thing we want to do is rewrite everything**. Flow
enables you to add type checking step by step into your application.<br />
This is also true for [Typescript](http://www.typescriptlang.org/), but I choose Flow because it's
not a compiler, simply a checker. Babel can take care of the extra annotations.

Type checking is for some a missing part in JavaScript, which some developers might question. Is it
really necessary? Does it make my code any better? **Isn't type checking just a tool for the
developer?** (Yes it is)

The main reason I choose to add a tool like Flow to my projects is to ensure I think about what goes
in and goes out throughout my application. **Type strictness helps my IDE understand** what I type
and what I should pass in function and props of React Components.<br />
In a way I am already documenting my code, which makes my developer self quite happy if I look back
at components I made a month ago.

Because Flow checks types statically it can be run outside of the run-time environment. This makes
type checking errors in the browser a thing of the past and can be detected before building the
application.

Type checking with prop-types
-----------------------------
Consider the following setup, done with plain old `prop-types`.

```javascript
import React from 'react';
import { bool, node } from 'prop-types';

const propTypes = {
    visible: bool,
    children: node.isRequired,
};

const Toggle = ({ visible, children }) => (
    <div style={{ display: visible ? 'block' : 'none' }}>
        { children }
    </div>
);

Toggle.propTypes = propTypes;

const otherComponent = () => (
    <section>
        <Toggle visible=true /> {/* Error at run-time! Missing children */}
        <Toggle visible="true"> {/* Error at run-time! Not boolean */}
            ...
        </Toggle>
        <Toggle visible> {/* Passes */}
            ...
        </Toggle>
    </section>
);
```

In my opinion, throwing this error at run-time, most of the time in the browser, is kind of too
late.

Reporting the mistake a developer has made in the IDE or different tool he's using is a lot more
convenient. This also helps with components other developers made and how to use them.

Type strictness here would also be documenting the use of the component.

Type checking with Flow
-----------------------
Let's rewrite the previous example using Flow.

```javascript
// @flow

import React from 'react';
import type { Element, Children } from 'react';

// define the type of the props object which gets passed to the PureComponent
type toggleType = {
    visible?: boolean,     // visible is optional
    children: Children,    // children is mandatory
};

const Toggle = ({ visible, children }: toggleType): Element<any> => (
    <div style={{ display: visible ? 'block' : 'none' }}>
        { children }
    </div>
);

const otherComponent = (): Element<any> => (
    <section>
        <Toggle visible=true /> {/* Error! Missing children */}
        <Toggle visible="true"> {/* Error! Not boolean */}
            ...
        </Toggle>
        <Toggle visible> {/* Passes */}
            ...
        </Toggle>
    </section>
);
```

All the errors in the last example would have been reported in the IDE or when you run Flow. And
yes: Flow supports JSX, so that's pretty awesome!

In closing
----------

Flow makes it easier for me to enforce the correct use of my components in my applications. Adding
type checking on other parts of your application is also a great idea, as you might grow more aware
of the code you're writing.

There is a great [getting started guide](https://flow.org/en/docs/getting-started/) on Flow's website.
Also a page on how to [get Flow up and running in your favourite editor](https://flow.org/en/docs/editors/).

Happy checking!

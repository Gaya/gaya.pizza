---
title: "Leveraging Hooks to Fetch Data Async in React"
author: Gaya
date: 2019-06-25
template: article.html
seo_desc: "An in-depth view into async data fetching using hook in React."
poster: "/articles/leveraging-hooks-fetch-data-async-react/async_fetch_hooks_poster_1.jpg"
---
Most of the React mindset is thinking synchronous and has a lot of similarities with functional programming. Output is generated based on input and is calculated at each render. This means that handling information which is not available at the moment of rendering a bit harder.

This article aims to give a solution to this problem using React Hooks.

[![Leveraging Hooks to Fetch Data Async in React](/articles/leveraging-hooks-fetch-data-async-react/async_fetch_hooks_poster_1.jpg "Leveraging Hooks to Fetch Data Async in React")](/articles/leveraging-hooks-fetch-data-async-react)

<span class="more"></span>

We’re used to using lifecycle methods to fetch data on component mount or when props change, and it’s always something you have to implement outside of your render function. We don't want render functions causing side-effects.

Luckily for us, [React Hooks](https://reactjs.org/docs/hooks-intro.html) came out not too long ago which allows us to have side-effects and local state for functional (pure) components.

Managing Data
-------------

In an ideal situation, we’d request data at render of a component, and re-render the component when the data has resolved. Without state, we could only rely on the parent components to pass the correct data to functional components.

The container / presentation component principle works for this situation, but made for kind of complex container components in the end. Data is fetched on mount, a loading state is managed, and when the data is received it had to be updated. It even gets more complex when working with a state management solution like Redux.

Wouldn’t it be cool if we could request the data in the render function itself?

Async Data Fetching is a Side-effect
------------------------------------

A possible solution to handling async data is to threat resolving data as a side-effect. In the render function, we request the data using a hook. This hook will return the found data, if the data is still loading, and if there was an error fetching.

It’s a lot easier to reason about this information then having a lot of state triggering all over your app. The hook itself will handle the fetching, data resolving and error catching.

I tried to make the idea more clean using a flow diagram of how everything would play out using hooks:

![React Hooks Data Fetch Flow](/articles/leveraging-hooks-fetch-data-async-react/hooks-flow.png)

First the component will request the data from the hook. It will return nothing, as it has nothing, but also tells the component it is loading.

The hook will fire a side-effect and remembers it is busy. When the data is resolved it will update its state internally with the data it resolved. It will also update itself to a non-loading state. Updating the local state of the hook will tell React to re-render the component using the hook.

The component renders and requests the data again, but this time the data will resolve immediately, resulting in rendering of the data.

Advantages of Lifecycle Hooks
-----------------------------

You might ask yourself what the point is if we can do the same with state in the component and lifecycle hooks. The big difference here is that we can treat data fetching as a side-effect to data changing in the component.

If you want to fetch a profile based on the props, the profile data will be re-fetched once that information changes, automatically, without using lifecycle hooks. This is because `useEffect` is intelligent enough to trigger only when its dependency array changes.

Another great feature of hooks is that you can use it in any functional component without duplicating functionality across different component classes.

Hiding the handling of async data fetching in a hook makes the app a lot easier to reason about and prevents a lot of boilerplate code. A lot of Redux based applications suffer from this, which is not a problem of Redux, but the approach we take fetching data there.

A Simple Example
----------------

For the purpose of illustration I made a simple example app of how this hook can be implemented in your own applications.

Full code to this example can be found at [https://github.com/Gaya/fetch-with-react-hooks/tree/master/src](https://github.com/Gaya/fetch-with-react-hooks/tree/master/src)

The app has a component which displays profile information. It will request the data using a `Promise`. The profile will be loaded each time the requested profile id changes.

### Writing the Data Fetching Mechanism

First, let’s write the profile fetching mechanism inside our functional component:

```javascript
const id = 1;
const resolver = React.useCallback(() => fetchProfile(id), [id]);
```

We use `useCallback` to prevent React from creating a new function each time the component renders.

`fetchProfile` is a function which returns a `Promise` and resolves the requested profile information. [Read the implementation on GitHub](https://github.com/Gaya/fetch-with-react-hooks/blob/master/src/fetch.js).

### Preparing the Hook

We want to create a hook which will except the resolver from before and use it to return the data to use when it’s ready. It’s also good to have a loading state and error state would anything go wrong. The basis of the hook could look like the following.

```javascript
import { useState } from 'react';

function usePromise(resolver) {
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(undefined);
  const [resolvedValue, setValue] = useState(undefined);

  return [resolvedValue, isPending, error];
}
```

I am not using `useReducer` to keep the example as simple as possible. In this case it might be better to use `useReducer`, but for now let’s stick with `useState`.

This hook will be called in our logic component after the resolver we created earlier:

```javascript
const [profile, isPending, error] = usePromise(resolver);
```

If there is an error, we can render an error component. If the `Promise` is still pending, we can render a loader. If all is good, we can render the profile data. It’s as simple as that!

### Writing the Resolve Mechanism

Now we want to resolve the `Promise` provided to the hook as a side-effect of the hook being called.

We’re going to introduce `useEffect` for this to actually resolve and handle the `Promise`.

Here you’ll see why the `useCallback` from earlier is important. We’re going to use the callback function to trigger the side-effect.

```javascript
import { useState, useEffect } from 'react';

function usePromise(resolver) {
  // ... code from previous snippet

  useEffect(
    () => {
      // reset hook state values
      setPending(true);
      setError(undefined);

      // resolve the Promise
      resolver()
        .then((value) => {
          setValue(value);
        })
        .catch(e => {
          setError(e);
        })
        .then(() => {
          setPending(false);
        });
    },
    // if resolver changes, resolve again
    [resolver],
  );

  return [resolvedValue, isPending, error];
}
```

Each time the resolver changes, the side-effect will be triggered. If you didn’t use `useCallback` to wrap the resolver, it would trigger each render.

On each trigger of the side-effect we’ll reset the state values of the hook and set the pending state to `true`.

Next we try to resolve the `Promise`. If it succeeds it will update the value stored in the hook state. If it fails, it will set the error returned to the hook state. In the end, whether it failed or succeeded, we’ll tell the hook it’s no longer pending.

This will instruct React to re-render the component using the hook because the state inside the hook changed.

When the component calls the hook this next time, it will get the resolved data back.

Further Thoughts
----------------

The reason I came up with this strategy for fetching and handling async data was because I was finding different ways to handle Redux fetching and side effects.

I bet this way of fetching data async has been described before in a similar form, but I wanted to get it out here to share my thoughts on it.

The way I use it with Redux, or any context based approach is that the data to be fetched can also be cached. I wanted to have a selector which would result in: the data I selected, a loading state, or an error.

Redux in turn would fire the fetching of data as a side-effect when the data resulted from the selector proved non-existent. The resulting request would then fail or succeed.

Dispatching data received / fetch failed would happen as a side-effect just like my example before.

We can prevent the making complex constructions like this and make our apps easier to read and understand.

In Closing
----------

I keep falling in love with React Hooks more and more. The way we can approach problems is so much more clear and easy to follow right now. It’s almost a crime how complicated we were making things before. Luckily we can reason about what we make a lot easier using hooks.

I hope you liked reading about this and started thinking about other great stuff you could solve using hooks and side-effects. Feel free to reach out if you have any questions regarding my solution.

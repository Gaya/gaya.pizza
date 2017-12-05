---
title: "Orchestrate Actions with Redux Listeners"
author: Gaya
date: 2017-12-05
template: article.html
seo_desc: "Handling data flow and actions in Redux can be hard. This middleware will help you orchestrate Redux."
links:
  -
    title: redux-listeners
    desc: repository on GitHub
    url: https://github.com/Gaya/redux-listeners
---

There are multiple ways and libraries to handle asynchronous data flows in Redux. Some do a lot,
some do just a little.

[redux-listeners](https://github.com/Gaya/redux-listeners) is a small middleware for Redux which
makes handling async are orchestrating action in Redux a breeze.

It's the sweet spot in-between `redux-thunk` and `redux-saga`

<span class="more"></span>

## What is redux-listeners?

With [redux-listeners](https://github.com/Gaya/redux-listeners) I aim to make it easy to respond to
actions being dispatched to the store without adjusting the action itself.

It allows you to listen in on action types being dispatched to the store and dispatching new actions
afterwards. This way you can separate your action creators from the logic which follows the action.

The data flow can be described as such:

1. Action is dispatched to the store
2. `redux-listener` middleware sees type of action matches a registered listener
3. Listener is executed, which chooses to dispatch a new action to the store
4. Reducers of the original action are handled
5. New action will be dispatched to the store

## Example usage

```js
import { createStore, applyMiddleware } from 'redux';
import { createMiddleware } from 'redux-listeners';

// import your reducers
import rootReducer from './reducers';

// create action middleware
const listenMiddleware = createMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(listenMiddleware),
);

// registering the listeners
listenMiddleware.addListener('FETCH_DATA', async (dispatch) => {
  try {
    const response = await fetch('/some-data');
    dispatch({
      type: 'FETCH_DATA_SUCCESS',
      payload: await response.text(),
    });
  } catch (err) {
    dispatch({
      type: 'FETCH_DATA_FAILED',
      payload: err,
    })
  }
});

listenMiddleware.addListener('FETCH_DATA_FAILED', (dispatch, action) => {
  // display the error in console by reading the action
  console.error(action.payload.message);
});

// Make the listeners start fetching data
store.dispatch({ type: 'FETCH_DATA' });
```

## Documentation

Visit [`redux-listeners` on Github](https://github.com/Gaya/redux-listeners) for a full explanation,
how to install, and documentation.

## Separating actions from logic

In my opinion, actions creators should only contain create action objects to be dispatched on the
store. All side effects (like fetching data) should be handled elsewhere.

Most of the times you also want to keep logic like this out of your application to keep it as simple
as possible and make the logic behind actions flexible and easy to replace without touching the
application itself.

## Possible use cases

_Fetching data async_ is just one of the examples of how to use redux-listeners, but there are way
more ways you can use and combine redux-listeners with other principles.

redux-listeners is great for handling parts of the program which live *outside of the Redux cycle*.
You can orchestrate mutations on localStorage or other parts of the browser's API.

Redirecting to other pages after an action is dispatched is also a use case I use myself.

## Wrapping up

Use redux-listeners if you're looking for something other then `redux-thunk`, but not as complex and
big as `redux-saga`.

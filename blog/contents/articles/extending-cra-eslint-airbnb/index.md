---
title: "Extending Create React App's ESLint config"
author: Gaya
date: 2020-05-04
template: article.html
seo_desc: "Explains how to add ESLint config (Airbnb style guide) to the already existing one in Create React App."
poster: "/articles/extending-cra-eslint-airbnb/extending-cra-eslint-airbnb-poster.jpg"
---

Using [Create React App](https://create-react-app.dev/) you can easily start using React and develop
your own web applications. It also includes a linter which helps you write consistent and quality
code.

However, I really like to use a different style guide a top of the default. Luckily for us, Create
React App enables us to extend ESLint to use other configuration presets.

This article goes into how to set up the Airbnb style guide in Create React App. It also includes a
guide for when you're using TypeScript.

[![Extending Create React App's ESLint config](/articles/extending-cra-eslint-airbnb/extending-cra-eslint-airbnb-poster.jpg "Extending Create React App's ESLint config")](/articles/extending-cra-eslint-airbnb)

<span class="more"></span>

## Version disclaimer

At the time of writing, Create React App (`react-scripts`) is at 3.4.0, which is where this guide was
written for. In the mean time things can have changed, so take that in mind.

## No Config, No Problem.

I love the idea and project that is [Create React App](https://create-react-app.dev/). No hastle, no
config or setup, just start coding with the latest and greatest tools in React development.

It takes care of all config, but that also means it takes a bit away from customising the workflow
to your liking. I do not mind this sacrifice since it takes a lot of trouble out of your hands.

However, Create React App enables us to [extend their ESLint configuration](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config). Which is exactly what I want to add Airbnb's
style guide rules to the project.

## Adding Airbnb style guide to Create React App

For these steps I assume you've already created a Create React App project. If you haven't, please
read the [getting started guide](https://create-react-app.dev/docs/getting-started).

First thing we want to do is create an `.env` file in your project (if haven't already.)

### Enable extending in `.env`

In this `.env` file you'll need to put the following line:

```
EXTEND_ESLINT=true
```

This tells Create React App you're extending the ESLint config it provides. Without this, the next
steps will have no effect.

The official documentation has a great [article on how to and why you'd want to add environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) to your project.

### Install Airbnb style guide

Next we're going to install the Airbnb style guide into our project. We can do this by running the
following command:

```
npm install eslint-config-airbnb -D
```

There is no need to install peer-dependencies because they are already included in Create React App.

### Add Airbnb to the ESLint config

In the root of your project open the `package.json` file. In it you'll find a property called `eslintConfig`.

All you need to do here is add `"airbnb"` to the extends option.

```json
{
  "dependencies": { ... },
  "scripts": { ... },
  "eslintConfig": {
      "extends": ["react-app", "airbnb"]
  },
  "browserslist": { ... }
}
```

**And that's it!** Your project is now checked against the Airbnb JavaScript style guide.

First thing you might notice is that it will not want you to put JSX inside `.js` files, but rather in `.jsx` files.

**If you do not use TypeScript, you're done now.**

## Adding Airbnb style guide to a TypeScript project

If you're using [TypeScript with Create React App](https://create-react-app.dev/docs/adding-typescript)
you'll have to do a few extra steps.

Do all of the steps as described above to install the Airbnb style guide into your project.

### Install TypeScript import resolver

The airbnb style guide will enforce that your imports resolve, and ESLint can't automatically figure
imports of TypeScript source.

Run the following command:

```
npm install eslint-import-resolver-typescript -D
```

### Setting up the ESLint config

Open up your `package.json` and navigate to the `eslintConfig` property again. The following is a
base config to make Airbnb work for TypeScript files:

```json
{
 "eslintConfig": {
    "extends": [
      "react-app",
      "airbnb",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
      {
        "files": ["**/*.ts?(x)"],
        "rules": {
          "react/jsx-filename-extension": [
            1,
            { "extensions": [".tsx"] }
          ],
          "import/extensions": [
            "error",
            "ignorePackages",
            {
              "ts": "never",
              "tsx": "never"
            }
          ]
        }
      }
    ],
    "settings": {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"]
      },
      "import/resolver": {
        "typescript": {
          "alwaysTryTypes": true
        }
      }
    }
  }
}
```

It's a bit more scary for TypeScript, but this enables everything for the Airbnb style guide to
work properly with TypeScript.

### Bonus: lint from command line

If you're using TypeScript it is now possible to lint your code from the command line too! Execute
the following command and it will lint all your TypeScript files:

```
./node_modules/.bin/eslint . --ext .ts,.tsx
```

*Tip*: add this as a script in your `package.json` so your can run it more easily next time.

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx"  
  }
}
```

## Wrapping up

I hope this guide helped you in adding your favourite style guide to your Create React App project.

It's really cool to see that the project enables you to extend the ESLint config without having to
eject the project, which you should avoid doing at all times.

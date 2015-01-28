While working on a frontend project you'll easily come to a point where you need data from a webserver that will be retrieved through an Ajax call. Serving mockup data from those endpoints is a tricky thing when you don't run your frontend project on a webserver. Luckily there is a way to easily write middleware using Connect for NodeJS. Other great thing: works with task-runners! [![Static Mockup Data for your Endpoints with Connect](/articles/static-mockup-data-endpoints-connect.jpg)](http://www.gayadesign.com/front-end/static-mockup-data-endpoints-connect/)<span id="more-1434"></span> Separation between front and back-end development becomes more important every day. We see projects grow bigger and tasks are assigned a lot better in development teams. While one developer can focus mainly on the front-end part of the project, the back-end developer will handle all the server requests.

We need mockup data for Ajax responses
--------------------------------------

 When working on a front-end project which does a lot of Ajax calls to the server you might get stuck for needing mockup data. We need a JSON response if we request information from an endpoint. Let's say we need some user information when we do a `GET` request to `/user/get/username`. We can write a script on our local development server to handle these requests for us, but we can also use NodeJS and Connect for this. Using Connect as middleware to catch URLs
-----------------------------------------

[Connect](http://www.senchalabs.org/connect/ "Connect") can be used to intercept HTTP requests and give responses to the client. The great thing about this is that we don't need to write a lot of code to intercept these requests. We can use different task runners to run Connect and handle the middleware section for us. For the purpose of this tutorial I'll be using Grunt. Setting up Grunt
----------------

 First [you need to install Grunt](http://www.gayadesign.com/front-end/javascript-development-workflow-using-grunt/ "Automating your JavaScript workflow using Grunt"). After that you must add `grunt-contrib-connect` as a dependency to your project. Run in the terminal: 
```
npm install grunt-contrib-connect --save-dev
```
 Init a Gruntfile.js file. Now we can configure Grunt and use Connect. Now we need to make it possible for Grunt to run Connect. The Connect task will start a webserver and serve your files through HTTP to your browser. Load the task in Grunt using: 
```javascript
grunt.loadNpmTasks('grunt-contrib-connect');
```
 Now we can use the Connect task. Enter the following basic configuration to make it work. 
```javascript
connect: {
    server: {
        options: {
            port: grunt.option('port') || 8000,
            hostname: "localhost"
        }
    }
}
```
 Serving the server
------------------

 When you let Grunt start Connect it will run the server as long as the Grunt task persists. So if we'd call Connect directly in the state we've set it up it will create a webserver and immediately ends it as well. We can add a `keepalive` flag to the Connect task options, but we can also create our own Grunt task which starts the server and then starts a watch task. This will make sure the Grunt task keeps itself alive. The reason I use `watch` instead of the `keepalive` flag is because I want to run the server as long as I am developing and changing the source. By default Connect will serve the project root and its files as a webserver would. You can easily add `dest: 'dist/'` as an option value to serve the folder `dist` as the root for example. This will allows you to separate your source and distribution much better. Creating the middleware
-----------------------

 When you determine the endpoints to which your application can send Ajax calls to you can write a small middleware that will catch those endpoint URLs and serve static data. I choose to serve `.json` files from my disk, but I want to use endpoints like `/user/get/1/` and `/product/get/1/` and not put the files there. It's better for testing and separating front from back-end code to use the same endpoints in this stage as the ones your backend developer will implement. It's also because I tend to forget to adjust the URLs later on. Add the following template to handle middleware with Connect: 
```javascript
options: {
    port: grunt.option('port') || 8000,
    hostname: "localhost",
    middleware: function(connect, options, middlewares) {
        middlewares.push(function(req, res, next) {
            //stuff will go here
        }

        return middlewares;
    }
}
```
 Connect will loop through a collection of middleware functions and handle then one by one. Before a middleware function has ended the developer can choose to either continue the chain or end it and give a response back to the client. We're pushing our own middleware function to the middlewares list. We get three parameters to work with: `request`, `response` and `next`. Catching your endpoints
-----------------------

 The only thing we have to do now is to read the `response` and act accordingly. We can get the requested url by reading `req.url`. When the url is not an endpoint you want to catch you can let Connect continue in the middleware collection by returning `next`. That's the last parameter Connect gives to your middleware function we pushed earlier. Using `res.end()` we can give a response to the requesting client. The only thing you have to keep in mind is that you don't return the `next` object. I like to keep mockup data outside of my middleware code so I created JSON files that contain the data I want the webserver to serve. We can use `grunt.file.read("/path/to/file.json")` to get a file of your project as a string. This all comes together to something in the line of this: 
```javascript
middleware: function(connect, options, middlewares) {
    middlewares.push(function(req, res, next) {
        var endpoints = {
            "/user/": "json-files/user.json",
            "/product/": "json-files/product.json"
        };
        var match = false;
        var fileToRead = "";

        Object.keys(endpoints).forEach(function(url) {
            if (req.url.indexOf(url) == 0) {
                match = true;
                fileToRead = endpoints[url];
            }
        });

        //no match with the url, move along
        if (match == false) {
            return next();
        }

        res.end(grunt.file.read(fileToRead));
    });

    return middlewares;
}
```
 You can clone [the example project I put on GitHub](https://github.com/Gaya/mockup-data-middleware-with-connect) so you can run the webserver by entering the following command in the terminal: 
```javascript
grunt serve
```
 Save time rewriting endpoints
-----------------------------

 With this example you can easily create your own endpoints and link JSON file responses to them. I hope this will give you a boost into trying more with Grunt and Connect. Mocking up your data is a great way to start testing more easily and create a nice way to combine front with back-end later.
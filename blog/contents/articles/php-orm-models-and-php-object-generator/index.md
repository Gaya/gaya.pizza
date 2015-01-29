---
title: "PHP ORM: Models and PHP Object Generator"
author: Gaya
date: 2009-07-27
template: article.html
---
If you are a developer, especially in the object orientated parts, you must heard of the Model View Controller design pattern.  
 This post will tell you a bit about models and how you can use them to lift your code to a higher level and safe a lot of time in the development process.  
 I will also tell you about [PHP Object Generator](http://www.phpobjectgenerator.com/) (POG) to use for implementing your models.

[![PHP ORM: Models and PHP Object Generator](/articles/php-orm-models-and-php-object-generator/postimgpost.jpg "PHP ORM: Models and PHP Object Generator")](http://www.gayadesign.com/articles/php-orm-models-and-php-object-generator)

<span class="more"></span>

Models are the application's place for storing information. If you have your model right, the application tends to work out better than applications without models.  
 In the model you can store properties of all your objects (tables) and apply rules to them.

Making the model
----------------

To make a model all you need is some paper and a pen. But if you prefer software, there are a lot of tools around that enable you to make your own Physical Data Model. These tools also have some reverse engineering options and code generation possibilities. I use: [PowerDesigner](http://www.sybase.nl/products/modelingdevelopment/powerdesigner).

The good thing about models is that you can use them to implement ORM in your PHP application. Models are also needed if you want to develop an application in a framework like CakePHP. ORM has been made to decouple the controller and model, so it doesn't really matter where the information is saved, but rather that it will be saved. ORM will create the connection to the database and persist the object with the data source of choice.

Let's say we want to make a small web application for a client to save some information. We will create a small application for a small real estate company who offers homes in the region.  
 The client explains the following: "We offer homes in a certain region to our visitors. A home has information about its sizes and price etc. A home is inside a town, and the town is inside a region."  
 This information is enough to start drawing your first model. We don't know very much, but the basics of the model can now be made. I got the following with only the information given above:

![pogimg1](/articles/php-orm-models-and-php-object-generator/pogimg1.jpg "pogimg1")

What it basically says is: "There is a region, it contains a town. A town contains a home."

We also know there can be more towns in a region, and that a town has zero or more homes. Let's add that in the model:

![pogimg2](/articles/php-orm-models-and-php-object-generator/pogimg2.jpg "pogimg2")

You are now thinking object oriented, so this makes it quiet easier for developers to understand how their application will work.

As you might note, there are no properties for these objects yet. Let's say a region has a name and a description, the town and homes too. The only thing different is that the homes hold a lot more information like: the price, lot size, object size, build year etc.

With a few properties included, the model looks like this:

![pogimg3](/articles/php-orm-models-and-php-object-generator/pogimg3.jpg "pogimg3")

I hope this gives a clear view of what a model is to people who've never heard of them.

As you can see I already wrote the data types of the properties of the objects, this is to make sure you remember what goes in the field and you can also put a few restraints on the fields by doing this.  
 I used the {objectname}Id field because POG will generate objects with that field as the key. You don't have to do this, but it makes your model look better and the software modeling tools might require you to do this.

Let's move on to implementing the model inside your PHP application.

Implementing models inside PHP
------------------------------

I was looking for an easy way to implement ORM inside a PHP application without using a very large framework. I only needed a solution that knew what my model was and does the persistence with the database at the same time.  
 That's when I found PHP Object Generator ([http://www.phpobjectgenerator.com/](http://www.phpobjectgenerator.com/)), a project which is easy to use and easy to implement.  
 It's not recommended to use this for super huge projects, but POG is quiet scalable, clean, contains CRUD methods (Create, Read, Update and Delete) for the objects, extensible with plugins and open source.

First thing you need to do is to create the objects we have just defined in our model. Take a look at the following image:

![Picture 2](/articles/php-orm-models-and-php-object-generator/Picture-2.png "Picture 2")

This will generate the code for the region object. Note that I set "Town" as its child, this is also defined in the model, so don't forget this! Click submit and wait until the next screen comes.

Choose to download the zip, this contains the POG code base and the object you just generated. Unzip and upload the contents to your server.

Now it's time to make an object for "Town".

![Picture 3](/articles/php-orm-models-and-php-object-generator/Picture-3.png "Picture 3")

I've set "Region" as its parent and added "Home" as its child. Click submit again.

All you need to do is create a new file in a text editor and copy paste the code that in the text area that just came up.

![Picture 4](/articles/php-orm-models-and-php-object-generator/Picture-4.png "Picture 4")

Save the file as "class.town.php" inside the */objects/* folder.

Do the same for the "Home" object:

![Picture 6](/articles/php-orm-models-and-php-object-generator/Picture-6.png "Picture 6")

Now that we've got our objects ready it's time to use POG and do some actions.

Using POG in PHP
----------------

If you have all your files uploaded the folder structure should look something like this:

![Picture 7](/articles/php-orm-models-and-php-object-generator/Picture-7.png "Picture 7")

Now it's time to change the configuration of POG, this contains the database connection.  
 Open *configuration.example.php* and edit the following information:


```clike
$configuration['db'] = 'test'; // database name
$configuration['host'] = 'localhost'; // database host
$configuration['user'] = 'root'; // database user
$configuration['pass'] = 'pass'; // database password
$configuration['port'] = '3306'; // database port
```


and also:


```clike
//plugin settings
$configuration['plugins_path'] = '';
```


If you don't know the full path to the plugins folder, you can try `phpinfo()` and search for "document_root". Add "/plugins" to this variable (without a slash at the end.)

Save this file as "configuration.php" and upload it to the server.

Next thing we need to do is use POG to create our tables in the database. In your web browser; go to the root of the application and add /setup at the end of the URL. Click on "POG me up!" and you should see the following:

![Picture 8](/articles/php-orm-models-and-php-object-generator/Picture-8-300x251.png "Picture 8")

Yay! It worked! Basically, we can now start to use POG in our application, so let's do that.

Let's create a small test script to see how POG works and what it can do.  
 Create a file in the root called "test.php". Add the following lines of code:


```clike
include('configuration.php');
include('objects/class.database.php');

include('objects/class.region.php');
include('objects/class.town.php');
include('objects/class.home.php');
```


This will include all the necessary files needed to make POG work and include the classes we've made.

In the next piece of code I am going to create a region, give it a name and a description, create a town that belongs to that region and put a home inside the town.


```clike
//create a region
$region = new Region();

$region->name = 'Super region';
$region->description = 'We are in love with this region!';

$region->Save();

//create a town
$town = new Town();

$town->name = 'Townsville';
$town->description = 'We don't need a description.';
$town->SetRegion($region);

$town->Save();

//create a home
$home = new Home();

$home->name = 'Superstreet 29';
$home->description = 'A house with a lot of windows.';
$home->objectSize = '100';
$home->lotSize = '120';
$home->price = '100000';
$home->buildYear = '2008';
$home->SetTown($town);

$home->Save();
```


Take a look at your database. All the information has been saved and the objects have been linked to each other.  
 Neat isn't it?

In a later post I'll explain how to use POG for getting information and build your own content management system around it. This article was an introduction to models and ORM. I hope you enjoyed it and if you have any thoughts or other frameworks / applications that do the same: let me know in the comments.
---
title: "Notifications: the other approach"
author: Gaya
date: 2009-10-20
template: article.html
seo_desc: "A different approach to notifications. Lets you make the backend push messages once content changes, while the frontend just waits for input."
links:
  -
    title: Download
    desc: Get the code of this post
    url: http://gaya.github.io/scripts/notification/notification.zip
  -
    title: Example
    desc: Watch the example video
    url: http://vimeo.com/7160768
---
A normal problem: notifications or updates that have to be displayed on a website, but it's kind of overloading the backend. But as long as the page is open: please update the status dynamically (if necessary) without reloading the page.

I can hear you think: AJAX! Yes, I'll use AJAX for sure. But there is a little problem when it comes to how up-to-date you want these notifications to be without overloading the backend of the website.

In this article I'll approach pushing notifications from another perspective, regulating them in the backend rather than the frontend.

[![Notifications: the other approach](/articles/notifications-the-other-approach/notifications.jpg "Notifications: the other approach")](/articles/notifications-the-other-approach/)

<span class="more"></span>

Most of the applications that use AJAX to update the information that is on the screen use a simple request that fire every once in a while. This doesn't really make the notification instant and can cause the Javascript to make more calls than necessary to the server.

Expanding the interval time of the calls would lessen the requests, but that would take away a bit of the notification functionality don't you think? When there is something to notify: notify me!

With these problems in mind, there might be various solutions. A solution someone told me about got me interested; rather than letting Javascript determine whether to make a call to the server, let the server do it.

How it works:
-------------

How are we going to make the backend (in this case PHP) say when the frontend has to update?

The solution is quick and easy: only return information if PHP has some, and let PHP tell the frontend to reload. Simply put: if there is an answer: go and reload.  
 To make this a bit more clear, I've put together the following work flow:

- Frontend notifies the backend that it wants information.
- The backend goes in a loop waiting for information to give back to the frontend.
- If in the meantime information is available: return the results.
- The backend gives his answer (if available) and tells the frontend to do another request.

This approach is a bit different from letting Javascript interval the requests and making it load PHP the whole time.

Getting started:
----------------

In this example I am going to make a simple page that shows text from a txt file on the server and changes the text once changes are made on the server.

First we need a bit of code to get everything off the ground.

Start with this super easy HTML:


```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>Notification test</title>

    <script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js?ver=1.3.2'></script>
    <script type="text/javascript" src="notification/notification.js"></script>
</head>
<body>
<div id='content'>
    <h1>Notification test</h1>

    <p>
        This example will notify the user when changes have been made to updates.txt.
    </p>

    <div id='notify'>

    </div>

</div>
</body>
</html>
```


Nothing too complicated right? I won't go into details what I did here.

We are going to use jQuery for its AJAX functions (which are so convenient and make clean code.)

The next step would be to output information in the `#notify` element.

The Javascript code:
--------------------

What do we need in the Javascript:

- A function to make a request to the backend.
- In the callback of the jQuest AJAX function we need to load the notifications and output them if they exist.
- When callback is called: repeat the cycle.

Create a folder called `notification` and in that folder create the file: `notification.js`. From the root where the HTML file is in it would be: `notification/notification.js`. We'll use this folder to add other files too.

The basic Javascript I got is:


```javascript
var notification = {

    request_url: "notification/notification_request.php",

    do_request: function() {

    }

}

notification.do_request();
```


Notice that I separated the request URL from the actual AJAX call that will be the next step. I always to this so I can change this URL with ease, without changing all the code. Request URL change some times, and you don't want to have to mess around in the code too much.

Now to fill the `do_request` function, we'll make a post request to the URL and expect JSON back as its output. Also create a callback function that will be handling the output given by the server.

Now to fill `do_request`:


```javascript
do_request: function() {
    $.post(notification.request_url, {},
        function(data) {
            if (typeof(data.updates) != 'undefined') {
                $("#notify").html(data.updates);
            }
            notification.do_request();
        }, "json");
}
```


It requests the file given in the URL. Waits for it. Looks if there are updates in the answer and then call the function again (recursive loop.)

That was all the frontend code there is. Pretty small don't you think? That's why we are going to put all the logic in the backend.

The backend:
------------

To make the backend work I created a small (not that great) update condition: if a certain file on the server contains text; output it and empty the file again.

Your updates would probably be stored in a database and marked if the user has received them, but that's up to you. I'll use this simple case to show you a quick result.

Create two files in the `notification` folder: `notification_request.php` and `updates.txt`. Also make `updates.txt` *chmod 777* so PHP can edit that file.

The PHP script has to do the following:

- Determine the time the script can be put on hold.
- Constantly check if there are changes. If there are any, output the result.
- Wait a short while and check again. If the max time as been reach output an empty result.

The basic code will look like this:


```php
//determine the starting time and the max execution time

//set default response

while(/* max time has not been reached */) {

    //check and determine update
    
    //if update is available; output and break script
    
    //if not: wait a little and clear the output
}

//output the default result if there is no update
```


To determine the maximum execution time of a PHP script you can get this information from the PHP settings using `ini_get`, which can get a lot of information found in `phpinfo()`.

The first part of the script would look like this:


```php
//determine the starting time and the max timeout
$start_time = time();
$max_timeout = ini_get('max_execution_time');

//set default data
$data = array();
```


It determines the start time of the request and the maximum time PHP can put the script on hold. Also the default ouput is set (an empty array.)

Next part contains a bit more code:


```php
//go into the loop
while((time() - $start_time) < $max_timeout) {

    //set the updates available to false
    $update_available = false;

    //open the file and get its contents
    $updates = file_get_contents("updates.txt");

    //if there is any content, put it in the output
    if (strlen($updates) > 0) {
        //set update available
        $update_available = true;

        //set updates
        $data['updates'] = $updates;

        //empty file
        file_put_contents("updates.txt", "");
    }

    //if there was an update output it and exit the script
    if ($update_available) {
        echo json_encode($data);
        exit();
    }

    //go into sleep for a little while and try again
    sleep(1);
    flush();
}

//if there are no updates within the set time: echo the empty result
echo json_encode($data);
```



```javascript
if (iam > you && you < iam) {

}
```


Simply put, this script will return an update once the the file on the server ("updates.txt") has contents and gives this to the frontend.  
 If there is no update, it will give the frontend an empty response and the script will do the same request again.

The frontend script will output the contents of the file once it has been changed on the server, almost instantaneously!

The following clip will show you this functionality:

<iframe allowfullscreen="" frameborder="0" height="375" src="http://player.vimeo.com/video/7160768" width="500"></iframe>

Future:
-------

Now it's time to customize the script to meet your needs, not reading a file on the server, but rather getting updates from your database and creating a better output on the frontend side.

I didn't make this too fancy because I only wanted to show you another approach to the problem of pushing notifications to the frontend.  
 This example would work perfectly in cooperation with [sNotify, which I made a while ago](/articles/snotify-easy-notifications-in-jquery/).

If you have any ideas, suggestions and like to discuss this solution, please comment below.

I hope this helped you in developing an application with notifications and made you look at updating information in another way.
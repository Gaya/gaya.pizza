---
title: "Download counter in PHP using .htaccess"
author: Gaya
date: 2009-02-12
template: article.html
links:
  -
    title: Download
    desc: Counter in PHP using .htaccess
    url: http://gayadesign.nl/scripts/uploads/downloadhtaccess.zip
---
Ever had this thought: "I want to fire something **extra **up when somebody downloads a certain file."? This can be easily fixed by making all you download links link to a php page and output the download file for you. But what if the file is called directly in the browser, say [http://www.gayadesign.com/scripts/photonav/photonav.zip](http://www.gayadesign.com/scripts/photonav/photonav.zip)? Apache will happily give the file to the user, without me noticing it. Luckily for us, .htaccess is a great place to mess around with Apache.

This article will explain how to make pre-download conditions in php using .htaccess. I'll make a download counter in this one.

<div class="border">[![Download counter in PHP using .htaccess](/articles/download-counter-in-php-using-htaccess/downloadcounter.jpg "Download counter in PHP using .htaccess")](/articles/download-counter-in-php-using-htaccess/)</div><span class="more"></span>

Think of the possibilities! You could build a download counter, a place to check if the user has rights to download a certain file, create a bandwidth limit, and the list goes on and on.

Keeping track of downloads is a feature many developers want, even firing *"something"* (read: **doStuff()**) before a file is requested for download is handy.

Okay, what do you need?

- Apache web server with [rewrite module](http://httpd.apache.org/docs/1.3/mod/mod_rewrite.html) enabled (probably the case)
- a decent text editor (like [notepad++](http://notepad-plus.sourceforge.net/))
- *optional*: in this tutorial I'll be using PHP

First, we need to get an **.htaccess** rule going. To do this you have to adjust your .htaccess file, or create a new one. To create a new .htaccess file in Notepad++ just open a new file and save as **.htaccess**. This is a hidden file on a unix system, but don't worry.

Put the following lines in the **.htaccess** file:


```php
#Let's do rewriting!
RewriteEngine on
RewriteRule ^(.*).(rar|zip|pdf)$ /download.php?file=$1.$2 [R,L]
```


This redirects every *.rar*, *.zip* and *.pdf* to the **download.php** file and include the file path as a parameter. I already hear developers think: "And what if I prompted it to output a .php file though a browser call?". We'll fix that in the PHP file.

To add more extensions, separate them with a **|** (shift + ).

**A few notes on .htaccess:**  
 The file will work from the root of the folder you'll put this into at your web server. All folders beneath the root will be affected. If you place the file in say */files/*, the path will not be included in the **file** parameter. You'll have to either add this in the **download.php** file or **.htaccess** file.

Upload the file in your webroot.

Next up, we are going to create a table in MySQL. You can do this in phpMyAdmin, it's a small table.

If you already have a table called **download**, you have to change the SQL code.


```php
CREATE TABLE `download` (
`filename` varchar(255) NOT NULL,
`stats` int(11) NOT NULL,
PRIMARY KEY (`filename`)
)
```


Execute this SQL statement in the SQL window, it'll create a new table.

Now it's time to get the PHP to work.

The following code allows you to keep track of download requests in the table you created above:


```php
<?php

    //put connection to database here
    mysql_connect("localhost", "username", "password")
    or die ("Sorry, can't connect to database.");
    mysql_select_db("dbname");

    $filename = mysql_real_escape_string($_GET['file']);
    $path = $_SERVER['DOCUMENT_ROOT']."/"; //path of this file
    $fullPath = $path.$filename; //path to download file
    
    $filetypes = array("rar","zip","pdf");
    
    if (!in_array(substr($filename, -3), $filetypes)) {
        echo "Invalid download type.";
        exit;
    }

    if ($fd = fopen ($fullPath, "r")) {
        //add download stat
        $result = mysql_query("SELECT COUNT(*) AS countfile FROM download
        WHERE filename='" . $filename . "'");
        $data = mysql_fetch_array($result);
        $q = "";
    
        if ($data['countfile'] > 0) {
            $q = "UPDATE download SET stats = stats + 1 WHERE
            filename = '" . $filename . "'";
        } else {
            $q = "INSERT INTO download (filename, stats) VALUES
            ('" . $filename . "', 1)";
        }
        
        $statresult = mysql_query($q);
        
        //the next part outputs the file
        $fsize = filesize($fullPath);
        $path_parts = pathinfo($fullPath);
        
        header("Content-type: application/octet-stream");
        header("Content-Disposition: filename=".$path_parts["basename"]."");
        header("Content-length: $fsize");
        header("Cache-control: private"); //use this to open files directly
        while(!feof($fd)) {
            $buffer = fread($fd, 2048);
            echo $buffer;
        }
    }
    fclose ($fd);
    exit;

?>
```


Let me explain what you can change in the code in short; in the first part of the file, you'll connect to your database. Please change the values to match your settings.

You can change the **$filetypes** to your likings, this will contain the accepted file extensions.

The php script will eventually output the file to your browser, neat eh? [Download the zip file](http://gayadesign.nl/scripts/uploads/downloadhtaccess.zip) for a quick look in the files.

I hope this will help you to create pre-conditions on your downloads.

Good luck!
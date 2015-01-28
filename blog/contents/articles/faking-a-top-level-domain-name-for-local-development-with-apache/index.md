---
title: "Faking a top-level domain name for local development with Apache"
author: Gaya
date: 2013-04-09
template: article.html
---
Developing a website on your local webserver environment can become complicated when it comes to URLs. Not every CMS (looking at you Wordpress!) has relative paths to their content. These full paths get placed in the database, which makes it harder to test and create content with pointers to wrong URLs. This guide will tell you how to fake a top-level domain name so you can redirect any domain name to your local development environment and keep your source code in separate folders. [![Faking a top level domain name for local development with Apache](/articles/faking-a-top-level-domain-name-for-local-development-with-apache/poster-top-level-domain-dev.jpg "Faking a top level domain name for local development with Apache")](http://www.gayadesign.com/articles/faking-a-top-level-domain-name-for-local-development-with-apache/)<span id="more-1202"></span>

What we will be doing:
----------------------

 It's actually easier than I thought. There are a few things we need to do: 1. <span style="line-height: 13px;">Have a folder where our source code is in. Basically the root of your website.</span>
2. Have the virtual hosts file of your Apache installation point to these folders with a few rewrites.
3. Redirect a top-level domain name to your testing webserver's ip address.

Before we start. Get a local development environment.
-----------------------------------------------------

 You'll have to have a working local web development environment. An Apache environment in this case. Be it your native Apache on your machine, [MAMP](http://www.mamp.info/en/index.html "MAMP") or [WAMP](http://www.wampserver.com/ "WAMP"). Just install one and have a development environment running. Create a folder with the source.
--------------------------------

 I personally like to create a folder with all my web projects in a root folder. On OS X I went for: `~/Sites/www.domainname.com`. This can be any domain name you want it to be. Let's stick with this name for this example. The name of the folder with the source will be the HTTP address later on. So; making a folder called: `thisisawesome` will be `http://thisisawesome` later on. Let's continue shall we. Put an HTML file in the source folder called `index.html`. I created a sample HTML file: 
```html
<html>Hi, I work!</html>
```
 Adjusting the virtual hosts.
----------------------------

 First we have to find the `httpd.conf` file of your Apache installation. On Mac OS X `/etc/apache2/httpd.conf` using MAMP it's typically `/Applications/MAMP/conf/apache/httpd.conf`, with WAMP it should be in the installation folder too. Open that file in a text editor. Find this line: `# Virtual hosts` and remove the # at the beginning of **the next line** so it says something like: `Include /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf` (this is obviously for the MAMP version) Now open and edit the file in the line you just uncommented. Replace the content for the following: 
```clike
NameVirtualHost *:80

<Directory "/Users/username/Sites/*">
    Options Indexes MultiViews FollowSymLinks Includes
    AllowOverride All
    Order allow,deny
    Allow from all
</Directory>
<VirtualHost *:80>
	UseCanonicalName off
	VirtualDocumentRoot "/Users/username/Sites/%0"
	ServerName %0
</VirtualHost>
```
 Fix the folder paths if you went with a different structure. Don't forget Windows uses different slashes in folder paths! Make sure you restart Apache after this so it can start using the vhosts configuration. If you're using MAMP; preventing port 8888 in URLs.
---------------------------------------------------

 As you might have seen it says we're listening to port 80 in the vhosts configuration, this is not by default in MAMP. So we're going to map MAMP to port 80. If you have a native install of apache running; open `terminal` and type: `sudo apachectl -k stop` Now open MAMP and click on "preferences". Go to the "ports" tab and change the the port number to 80. ![Change Apache port to 80 in MAMP](/articles/faking-a-top-level-domain-name-for-local-development-with-apache/mampport801.png) Change Apache port to 80 in MAMP Save and restart MAMP. No more port 8888 in your URLs. Making your computer redirect domain names in the hosts file.
-------------------------------------------------------------

 There are a lot of ways you can change the DNS to think any domain name belongs to another ip-address, but in this example we're going to use the good old hosts file. Open up your hosts file in a text editor. On Mac: `/etc/hosts` On Windows: `%SystemRoot%\system32\drivers\etc\hosts` Add this line at the bottom: 
```plain
127.0.0.1		www.domainname.com
```
 Now open your browser and go to "www.domainname.com"
----------------------------------------------------

 When you have Apache running you should see this now: ![Result in the browser](/articles/faking-a-top-level-domain-name-for-local-development-with-apache/browsertest.png "Result in the browser") And that's it! Easy and effective. Hope you enjoyed my method of local development for top level domains.
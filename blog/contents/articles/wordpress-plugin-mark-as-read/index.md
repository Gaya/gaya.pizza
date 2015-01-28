---
title: WordPress Plugin: Mark as Read
author: Gaya
date: 2009-06-09
template: article.html
links:
  -
    title: Download
    desc: Get the plugin!
    url: http://wordpress.org/extend/plugins/mark-as-read/
---
For the first time ever I created my own plugin. Starting out as a hacking attempt, it quickly changed into a prototype plugin. What it basically does is list the articles that haven't been read yet by a logged in user. Whenever a change to the post is made or a new comment is posted, the post moves to the top of the unread list. [![WordPress Plugin: Mark as Read](/articles/markasread.jpg "WordPress Plugin: Mark as Read")](http://www.gayadesign.com/general/wordpress-plugin-mark-as-read/)<span id="more-395"></span>

Functionality:
--------------

 Mark as Read makes it easy for your users to keep track of changes on your blog. Whenever a post is published or updated the post will show up in this list. When a new comment is posted, the post will also go up in this list and will be marked as "unread". Features:
---------

- Keeps track of which articles a logged in user has read.
- Posts bump on new comments
- Posts bump on published / updates
- Customizable output
- Lists per category or all categories
- Usable non-output functions

Installation:
-------------

1. Download the plugin
2. Upload contents of the zip-archive (the folder) to the plugin directory of your WordPress installation (default: wp-content/plugins/)
3. Enable the plugin through the plugin admin panel
4. Paste code inside template file
5. Enjoy!

Usage:
------

 To output the list all you need to do is to put the following code inside a template file of your theme: 
```clike
<ul>
    <?php the_unread_posts(); ?>
</ul>
```
 This will output all the unread content of **all** categories. The following parameters are accepted: 
```clike
the_unread_posts($categoryID, $noPostsMessage, $updateText, $rowStyle);
```
 **$categoryID** (Optional, default: *"all"*): Supply this parameter if you want to show unread messages from one category only. Give the string "all" if you want to display all categories. **$noPostsMessage** (Optional, default: *"<li>No unread posts</li>"*): Sets the output of an empty list. **$updateText** (Optional, default: *array("New comment(s) and changes", "Changes", "New comment(s)")*): Sets the output of the different types. Give an array with 3 values; first one being the output when a post has new comments and is updated, second for updates only and third for new comments only. **$rowStyle** (Optional, default: *"<li><a href='%link%'>%type% on: %title%</a></li>"*): The HTML in which each post has to be shown. Use **%link%** to insert a permalink to the post, **%title%** for the post title and **%type%** for the type of change.
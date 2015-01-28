---
title: "WordPress Plugin: Complete Language Switcher"
author: Gaya
date: 2012-01-04
template: article.html
links:
  -
    title: Download
    desc: Download the plugin
    url: http://wordpress.org/extend/plugins/complete-language-switch/
---
A while ago I uploaded a new plugin to the Wordpress plugin directory called Complete Language Switcher. Using this plugin enables you to easily make a multilingual blog with Wordpress to give the user the best experience in a language you provide. [![Wordpress Plugin: Complete Language Switcher](/articles/completelangswitcher.jpg "Wordpress Plugin: Complete Language Switcher")](http://www.gayadesign.com/diy/wordpress-plugin-complete-language-switcher/)<span id="more-766"></span> Complete Language Switcher provides an easy way to filter out posts in a certain language. It will only display content in the set language and also view the template in the language set by the user. If there is no language set the plugin will pick the standard language set in the config of your Wordpress blog.

What do I need?
---------------

- A Wordpress blog (obviously.)
- [Xili-language](http://wordpress.org/extend/plugins/xili-language/), this is a very nice plugin which can separate posts into different languages. Use this in order to set languages to posts and link other versions of the post to itself.
- [Language files for Wordpress](http://codex.wordpress.org/WordPress_in_Your_Language) and your theme installed.
- [Complete Language Switcher](http://wordpress.org/extend/plugins/complete-language-switch/)

How do I install it?
--------------------

 Installing this plugin is easy. 1. Install and activate the xili-language plugin.
2. Upload the complete-language-switch folder to the `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in WordPress
4. Place `<?php cls_langs_html(); ?>` anywhere in your templates or hook it in your template using `<?php add_action('hook_name', 'cls_langs_html'); ?>`.

 You are done and can use the plugin now! A few notes:
------------

 Make sure you put `en_US.mo` files in the language folders when you use the default English language of Wordpress. Check the `/flags/` directory in the plugin folder to see if your flag is in there. Naming is the 2 last characters of the locale (eg. en_US) in lowercase in PNG format. So en_US would be: us.png Future:
-------

 Got in contact with the creator of Xili-language to improve the functionality of my plugin. This will involve better overall taxonomy filtering and also filtering out standard functions such as `wp_list_categories()`. More on this soon. Questions?
----------

 Let me know what you think in the comments. If you have any questions you can let me know. You can also file issues in the Wordpress Plugin directory.
---
title: "Using WordPress plugins as Symbolic Links"
author: Gaya
date: 2013-10-10
template: article.html
seo_desc: "Sadly, using plugins as symbolic links is not possible yet in WordPress. I will guide you through the solution I came up with to make them work after all."
links:
  -
    title: Download
    desc: SymbolicPress on GitHub
    url: https://gist.github.com/Gaya/6918966
---
If you want to use a single plugin on different WordPress installs you might want to go for a symlinked plugin folder. That way we can have one codebase and apply it on multiple installs.

That would be great right? Sadly, WordPress doesn't support this (yet). In this post I'll explain how I got WordPress to accept my plugins as symbolic links.

[![Using WordPress plugins as Symbolic Links](/articles/using-wordpress-plugins-as-symbolic-links/using-wordpress-plugins-as-symbolic-links.jpg "Using WordPress plugins as Symbolic Links")](http://www.gayadesign.com/diy/using-wordpress-plugins-as-symbolic-links)  
<span class="more"></span>

The Problem
-----------

There are a few functions we use in WordPress when it comes to plugin development. The ones that are causing the problems we run into when using symbolic links are `plugins_url`, `plugin_basename`, `register_activation_hook`, `register_deactivation_hook` and `register_uninstall_hook`.

These functions break because they assume all the plugin files are physically in the plugin folder defined in WordPress. It will remove the path to the WordPress plugins directory from the file path we pass to above functions. `__FILE__` is in a different folder physically on your system when you're using symbolic links.

In the future we'll surely see this solved in the core. You can [follow ticket #16953](http://core.trac.wordpress.org/ticket/16953 "Ticket #16953 on WordPress Trac") on Trac to see it's progress. For now, you can use my solution.

When to Use Symbolic Links
--------------------------

Plugin development in WordPress can be a pain when it comes to testing. I like to have a single place to work on my plugin, but testing it on multiple installs at the same time.

Using symlinks can be the solution when you want to use one codebase and use it in different places.

In this case we've got a plugin in `/Users/gaya/Git/awesome-plugin/` and want it available in `/Users/gaya/Sites/wordpress-test/wp-content/plugins/`

Open up terminal and run the following command (Mac OSX and Unix):


```
ln -s /User/gaya/Git/awesome-plugin/ /Users/gaya/Sites/wordpress-test/wp-content/plugins/awesome-plugin
```


Note that the target path has no trailing slash. Also change the paths to your situation.

The Solution: Symbolic Press
----------------------------

Download the [Symbolic Press helper class on GitHub](https://gist.github.com/Gaya/6918966 "Symbolic Press Class Gist on GitHub") and place it somewhere in your plugin directory. I like to keep my external classes in a seperate folder from my own classes. Save the file as `class-symbolic-press.php`.

In this case my plugin is called `awesome-plugin` so I can assume a file called `awesome-plugin.php` is in this directory.

Include the Symbolic Press class in this file and create a new instance of the class passing `__FILE__` as a parameter like so:


```php
include "libs/class-symbolic-press.php";
new Symbolic_Press(__FILE__);
```


Every time you use `plugins_url()` it won't include the path to your symlinked plugin folder. So first problem fixed!

What it does is this:


```php
add_filter( 'plugins_url', 'plugins_symbolic_filter' );

public function plugins_symbolic_filter( $url ) {
	//set the path to the plugin file
	$path = dirname( $this->plugin_path );

	//get the basename of the path
	$basename = basename( $path );

	//check if this plugin is in the basename that is checked
	if ( preg_match( '/' . $this->plugin_name . '$/', $basename ) ) {
		$path = dirname( $path );
	}

	return str_replace( $path, "", $url );
}
```


It will check if the plugin name is found in the path and remove the file path (which won't be removed by WordPress) from the URL. So now your assets will work again.

What about registration, deregistration and uninstall hooks?
------------------------------------------------------------

Registration hooks in WordPress bind actions on it's filenames. Since it uses the function `plugin_basename` it will bind it's action on a filename which doesn't exist.

What happens is that `plugin_basename` only removes the `WP_PLUGIN_DIR` and `WPMU_PLUGIN_DIR` from the file path, but since our plugin is not physically in either folders the path wont get stripped.

For this I created a small function in Symbolic Press: `plugin_basename`. Which can be called by using `Symbolic_Press::plugin_basename()`. Easy peasy.

The solution is a copy of the original `plugin_basename` but with two lines added before the `preg_replace` and a replacement for the `preg_replace`:


```php
$sp_plugin_dir = dirname( dirname( $sp_plugin_dir ) );
$sp_plugin_dir = preg_replace( '|/+|', '/', $sp_plugin_dir ); // remove any duplicate slash
$file          = preg_replace( '#^' . preg_quote( $sp_plugin_dir, '#' ) . '/|^' . preg_quote( $plugin_dir, '#' ) . '/|^' . preg_quote( $mu_plugin_dir, '#' ) . '/#', '', $file ); // get relative path from plugins dir
```


How do I use the registration, deregistration and uninstall hooks?
------------------------------------------------------------------

When you're using a registration or deregistration hook WordPress does no more than:


```php
add_action( 'activate_awesome-plugin/awesome-plugin.php', $function );
```


For this you can use:


```php
$plugin_basename = Symbolic_Press::plugin_basename( $file );

//bind the activation action
add_action( 'activate_' . $plugin_basename, $function );
```


Or the respectable static functions you can use to register these hooks.


```php
Symbolic_Press::register_activation_hook( $filepath, $function ); Symbolic_Press::register_deactivation_hook( $filepath, $function );
Symbolic_Press::register_uninstall_hook( $filepath, $function );
```


Conclusion
----------

It's a workaround, but it works very good. Now you can go and test your plugins agains multiple installs without any problems.

You can also create a single place to update and maintain your plugins on your production environment. That might get a bit tricky, but that's a completely different story.

Let me know what you think in the comments.
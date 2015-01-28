---
title: "Fight the spammers"
author: Gaya
date: 2009-02-08
template: article.html
---
In the first few weeks of [my website's](http://www.gayadesign.com/) existence, the spam machine left my website alone. But as soon as my site got linked on various webpages around the world. The spam started to slip in. Online casinos, free slot machines and oh-so-hot girls. There had to be something to quickly protect my site against spam. I know captcha works quite well, but the problem with captcha is that users always have to read unreadable images. These impossible captchas annoy the hell out of me, so that was out of the question. I know [Wordpress](http://wordpress.org/)****has a nice plugin called [Akismet](http://akismet.com/) which is filtering spam quite good. I've been using it for some time on my [DS article site](http://ds.gayadesign.nl/), and it has been filtering a lot of spam.

<div class="border">[![Fight the spammers](/articles/fight-the-spammers/akismet.jpg "Fight the spammers")](http://www.gayadesign.com/diy/fight-the-spammers/)</div><span id="more-135"></span> Here are the things I used to filter spam: - [http://www.achingbrain.net/stuff/php/akismet](http://www.achingbrain.net/stuff/php/akismet)
- [http://wordpress.com/api-keys/](http://wordpress.com/api-keys/)

 I already had the Wordpress API key because of my DS blog. You can also use one if you already have a Wordpress blog. The main thing you need to do in order to filter spam content is to let Akismet check the content of the posted data. This can be for comments, short messages or just any content a user is able to post. 
```clike
include('/path/to/akismet/class.php');
$WordPressAPIKey = 'aoeu1aoue';
$MyBlogURL = 'http://www.example.com/blog/';

$akismet = new Akismet($MyBlogURL ,$WordPressAPIKey);
$akismet->setCommentAuthor($name);
$akismet->setCommentAuthorEmail($email);
$akismet->setCommentAuthorURL($url);
$akismet->setCommentContent($comment);
$akismet->setPermalink("http://www.example.com/blog/alex/someurl/");

if($akismet->isCommentSpam()) {
    // store the comment but mark it as spam (in case of a mis-diagnosis)
} else {
    // store the comment normally
}
```
 It's just that easy! Include the PHP class, set some parameters and let Akismet do the checking. Be sure to store the spam also! Sometimes regular messages can be marked as spam, which is a bad thing. I just used an easy field in my comments table to mark it as spam or a normal message. If you want to implement Akismet on another platform you should check out: [http://akismet.com/development/](http://akismet.com/development/) Good luck giving the finger to spam without Captcha!
---
title: "Looking back at WordCamp Europe 2013"
author: Gaya
date: 2013-10-08
template: article.html
seo_desc: "WordCamp Europe in Leiden was very awesome. This article will go over the talks and tell a bit about the experience I had with the conference."
seo_title: "Looking back at WordCamp Europe 2013 - Gaya Design"
---
Last weekend I went to WordCamp Europe in Leiden. It was my first WordCamp and I have to say; it was very awesome. Can't believe I've never been to an event like this before and I should really start doing it more in the future. I'll fill you in on the experience, the speakers and give you my two cents of what I thought about the talks. [![Looking back at WordCamp Europe 2013](/articles/looking-back-at-wordcamp-europe-2013/looking-back-at-wordcamp-europe-2013.jpg "Looking back at WordCamp Europe 2013")](http://www.gayadesign.com/general/looking-back-at-wordcamp-europe-2013/)<span class="more"></span>

How I got into WordPress and going to WordCamp
----------------------------------------------

 When I started working at [Merchandise.nl](http://www.merchandise.nl "Merchandise.nl") a while ago this conference was one of the things Richard (my boss) talked to me about. He encouraged me to go for the whole weekend and contributors day, even if I just wanted to go for the experience. I didn't know what to expect since the only things I had done with WordPress back then were a few themes, managing my blog and writing a few plugins here and there. Most of my experience was based of personal projects. Since we have a lot of sites running on WordPress at Merchandise.nl it was quite logical for me to attend this kind of conference. So last friday, it was time to leave for [WordCamp Europe in Leiden](http://2013.europe.wordcamp.org/ "WordCamp Europe 2013 Leiden"). Day 0: Woo Ping dinner and whooping pubs
----------------------------------------

 Friday was a little warmup for all that was to come. Headed out for some drinks at the English pub and for Chinese food at the Sponsor/Speaker/Volunteers dinner. It was a good lot of fun and I got to talk to a lot of interesting people from the WordPress community. Of course we ended up at the English pub again and I stumbled back to the hotel at the end of the night. What a great start of the weekend! Day 1: The Talks
----------------

 After waking up with a huge headache and walking to the conference with Richard it was time to pickup our t-shirts (which we made in case you're wondering). I decided that most talks in the "build" section would be most fit for me.
###Unit Testing Like a Pirate - [Ptah Dunbar](https://twitter.com/ptahdunbar/ "Ptah Dunbar on Twitter")

 The first talk I joined was about unit testing in PHP like the title would suggest. It was a nice intro into unit testing in general but also how you could go about and write your own tests. Very interesting and important to people who are not doing it. I'd like to see even more unit tests in my own projects, not only on WordPress projects. TDD is something that takes getting used to, but it's important for the quality control of your product (if you have any). For those who are interested here are [the slides and resources to Ptah's talk](http://ptahdunbar.com/resources-for-unit-testing-like-a-pirate-talk-wceu/ "Resources for Unit testing like a Pirate talk").
###The Life of a Theme - Tammie Lister

 A pretty straightforward talk from a designer's perspective on how to take on a website project. She talked about the most logical waterfall approach to creating a website and it's design. Pretty good for people who don't have a clue how to handle such projects. I expected a different approach though, but this method works for a lot of people.
###Perfect Your Images Using WordPress - [Marko Heijnen](https://twitter.com/markoheijnen "Marko Heijnen on Twitter") & [Mike Schroder](https://twitter.com/GetSource "Mike Schroder on Twitter")

 Since WordPress 3.5 the image editor has been made into separate classes to encapsulate all the functionality. Two of those are specifically for the use of GD and Image Magick. It makes resizing, cropping or manipulating images in your code just a bit easier. The great thing here is that it has integrated WordPress specific features like saving. It was pretty interesting for me to see how they handled this because I am using Image Magick in one of our projects to gather the user's input and create output images we can use to print on different products we sell. I'll sure to be writing about that soon. You can find the [slides to perfecting image manipulation in WordPress](http://www.getsource.net/2013/10/wordcamp-europe-2013-perfect-images-using-wordpress/ "Slides for Perfect Your Images Using WordPress") on Mike's blog.
###Writing Secure WordPress Code - [Brad Williams](https://twitter.com/williamsba "Brad Williams on Twitter")

 Brad took us through the process of writing secure WordPress plugins and themes. He showed us the importance of sanitising input and escaping output in your themes / plugins. I think stuff like this should be mandatory when writing plugins and I believe a lot of plugin developers are missing this kind of professionalism. As much as I knew most of the stuff Brad was telling us, I felt like it was the best talk of the day. If we want to improve WordPress we should keep stuff like this and testing like Ptah explained in our workflows. The web is a scary place, we have to improve it so the foundation we stand on will be stronger. You can find [the slides to Writing Secure WordPress code](http://www.slideshare.net/williamsba/writing-secure-wordpress-code "Slides to Writing Secure WordPress code") here. The after (and in between) party
--------------------------------

 WordCamp is a great place to meet people, which I did throughout the first day. I didn't fill my time with going to all the talks, but I went to grab a beer now and then. It's great to see so many people from different countries come together with a similar interest and have such a good time doing just that. Had a lot of nice interesting conversations with people at the after party, but the music was kind of shitty and way too loud to have a normal conversation. The atmosphere was great though. Day 2: The Speakers
-------------------

 Waking up the day after the after party was a lot easier than I had expected. I was ready for day two of WordCamp.
###WordPress 3.7: Foundations - [Andrew Nacin](https://twitter.com/nacin "Andrew Nacin on Twitter")

 Andrew is the lead developer of WordPress and was going through the changes that are going to talk place in the next release of WordPress. One of the most interesting things Andrew told us about was that WordPress is going to have automatic updates. I am very glad security patches are getting pushed to some people's websites, but I for one like to stage my projects before putting them on my production server. An update might just break a site, we've all been there. We run over 30 WordPress websites at Merchandise.nl, so it's not really an option for us to stage all our updates. So an auto updater might come in handy. Although I like how [Infinite WordPress](http://infinitewp.com/ "Infinite WordPress") updates all our websites so I can instantly tell when one of the sites breaks.
###Practical WordPress Accessibility - [Bram Duvigneau](https://twitter.com/bramduvigneau "Bram Duvigneau on Twitter")

 We tend to forget how important accessibility is on the web. Bram showed us the struggle he has to go through browsing the web. Bram was born blind and showed us how he uses his screenreader and let us actually see what he sees. It's hard to comprehend this part of the web for a lot of us. The best we can do is keep ourselves to coding clean and semantic HTML. Bram didn't have any slides (of course) and showed us what he talked about throughout the talk. It surely was one the most interesting talks to have attended this WordCamp.
###To OOP or not to OOP - [Nikolay Bachiyski](https://twitter.com/nikolayb "Nikolay Bachiyski on Twitter")

 A great discussion, which has been going on for a long time. I tend to agree with Nikolay on this one. A project can get out of hand pretty quickly and if you have been putting your functions over different files and try to get any logic in them things tend to get a bit messy and hard to follow. Everything gets named improperly with prefixes and data doesn't really have a scope. I don't know if the WordPress development community is ready to elevate to a higher level of programming, but there are a lot of plugins (my older ones have the same problem) out there that are not meeting those standards. View [the slides to To OOP or not to OOP](https://speakerdeck.com/nb/wordpress-to-oop-or-not-to-oop "To OOP or not to OOP") here.
###Q & A - [Matt Mullenweg](https://twitter.com/photomatt "Matt Mullenweg")

 It was time for a round of questions to ask Matt Mullenweg who is the co-founder of WordPress. Matt is a charismatic guy on stage and answered the questions very nice. It's a pity the questions weren't as good. I'd wish he had prepared a talk himself, but it was nice to hear the philosophy behind some discussions that were made.
###Less is More: The Journey of happytables as a WordPress SaaS - [Noel Tock](https://twitter.com/noeltock "Noel Tock on Twitter")

 Noel Tock is the founder Happy Tables. A service that provides a way for restaurant owners to easily create a website specifically aimed for their audience with ease. It's interesting to see how they managed for change the looks and contenting process on WordPress in such way that it's focused on the tasks of the restaurant owner. Very valuable information.
###Real WordPress Security – Kill the Noise! - [Dre Armeda](https://twitter.com/dremeda "Dre Armeda on Twitter")

 Dre went over some pointers on how you can increase the security of your website with just some simple techniques. He told us how important things like strong passwords, being careful with our information and updating your software are. He also explained how some attacks go about and how we as WordPress users can prevent them, or at least make it harder to gain access to our websites. It's all pretty basic, but still very important. I found this talk very entertaining.
###The Victory of the Commons - [Joost de Valk](https://twitter.com/yoast "Joost de Valk on Twitter")

 Joost ended WordCamp with a talk about keeping the open-source community a healthy place to live in. It's sad to see so many great developers contributing to the open-source community but not getting anything back. We give stuff away for free and we can't make a living with it. Joost presented us a way to change our strategy to make money off it while still providing to the open-source community. Read more about [the victory of the commons](http://yoast.com/victory-commons/ "Victory of the Commons") on his blog. Day 3: Contributors day On contributors day all the nerds got together to contribute to the WordPress project. What I mainly learned here was how to contribute and got some insights from the lead developers. It's great to see such a vibrant community and how we work to make the product better every day. Closing words
-------------

 I am so glad I went and I am sure I'll be attending a lot more conferences in the future. It's great that Richard is giving me the opportunity to go to events like this. It was great meeting the speakers, crew, contributors and other attendees. You made this experience that much better.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
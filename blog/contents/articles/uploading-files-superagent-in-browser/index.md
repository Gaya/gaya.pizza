---
title: "Uploading files with superagent in the browser"
author: Gaya
date: 2015-08-16
template: article.html
seo_desc: "This article explains how to send multipart upload requests using superagent in the browser."
---

Sending files in the browser using XHR can give the user a great experience. I like to use [superagent](https://visionmedia.github.io/superagent/)
for sending requests, it's a great light-weight API which doesn't require other third party libraries and works great
when bundling with CommonJS.

Uploading files using a multipart requests in the browser is sadly not supported through their API at the moment, but
it's possible following a few short steps. I'll explain how I got multipart uploading to work using superagent in the
browser in this article.

<span class="more"></span>

The way we are used to
----------------------

Uploading files using a `<form>` in HTML takes a simple `<input type='file' />` and an attribute on your form set to
`enctype='multipart/form-data'`.

This will submit the file using multipart and you're be able to receive the file on your server.

Luckily we can send a similar request using JavaScript.

Multipart and superagent
------------------------

[superagent enables multipart building](https://visionmedia.github.io/superagent/#multipart-requests) on the server-side,
but the browser implementation is sadly missing.

Because you can use superagent on both server-side and client-side it uses different implementations in both cases. The
`.attach()` method is aimed to only work in the server at the moment.

Welcome, FormData
-----------------

[FormData](https://developer.mozilla.org/en/docs/Web/API/FormData) is a simple way to construct a key value paired data
object which can be send to the server. superagent accepts `FormData`, so we can send data using this method, and also
files.

Constructing `FormData` is done like so:

```js
var formData = new FormData();

formData.append('key', 'value');
```

Pretty straight forward.

Reading files from an input
---------------------------

Let's say we have an element which looks like this: `<input type='file' id='file_to_upload' />`. We can read the files
it contains using this `.files` property the element has.

For each file which is present in the `FileList`, we can append that data to `FormData`.

```js
var files = document.getElementById('file_to_upload').files;
var formData = new FormData();

for (var key in files) {
    // is the item a File?
    if (files.hasOwnProperty(key) && files[key] instanceof File) {
        formData.append(key, files[key]);
    }
}
```

Sending it with superagent
--------------------------

To wrap things up, we can now send this data with superagent using `.send()`.

```js
superagent.post('/some-url/')
  .send(formData)
  .end(function(err, response) {
    //upload done!
  });
```

This is how I send my files using superagent. You can include an upload indicator and send other data in the `FormData`
too.

Hope this article helped for those pulling out their hair.
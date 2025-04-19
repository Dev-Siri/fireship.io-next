---
date: 2019-02-27T09:32:30-07:00
draft: false

title: Call a Callable Function
description: How to Call a Callable Function from your Frontend Code
video: https://firebasestorage.googleapis.com/v0/b/fireship-app.appspot.com/o/courses%2Fcloud-functions-master-course%2F6-callit.mp4?alt=media&token=46aa1e58-1792-459f-afba-f4fd5abe94f7
vimeo: 320683625
free: true
weight: 23
emoji: ☎️
---

{{< file "js" "foo.js" >}}
```js
document.addEventListener('DOMContentLoaded', function() {

    let app = firebase.app();


    const sendText = firebase.functions().httpsCallable('sendText');

    sendText({ message: 'Hello World!' })
});
```
---
title: SSR & SEO in Next
description: Technical overview of server-side rendering and SEO
weight: 30
lastmod: 2021-02-01T10:23:30-09:00
draft: false
vimeo: 508681432
emoji: 🔎
video_length: 4:27
free: true
chapter_start: SSR
quiz: true
---

<quiz-modal options="client rendering:SSG:SSR:ISR" answer="SSG" prize="12">
  <h5>You have a page that doesn't change often, but will be shared on social media. Which strategy is ideal?</h5>
</quiz-modal>


In this section we will look at techniques for data fetching and server-side rendering in Next.js.

## Should I fetch data on the server?

{{< figure src="/courses/react-next-firebase/img/next-ssr-flowchart.png" caption="A flow chart to help you determine the right rendering strategy based on SEO and performance" >}}
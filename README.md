# fireship.io?

You might be wondering what this is. <br />
To put it simply, its a [fireship.io](https://fireship.io) version implemented in [Next](https://nextjs.org).

Thats it.

# Why?

Just thought it would be fun to migrate a project to React to see how much the codebase's size actually increases.

If we don't count the Hugo project, the codebase's size didn't really increase as much as I though it would lol. <br />
I would actually say the size decreased since now there is only one-framework project instead of two seperate tools.

### But why fireship.io? Why not any others?

Because I like to suffer. <br />
\+ you might get attention. (& I am fine with hate too)

# You will most probably hate this.

As I said, I am fine with hate.

PORTING A PERFECTLY WORKING **SVELTE** APP TO THE "WORST" FRAMEWORK (Library) IN **2023**?
\- HELL YEA

# Differences

So overall, I have tried to keep the same kinda structure and same amount of components (Just the implementation in React). <br />
But ofcourse I wasn't able to replicate the entire structure of the project 100% (More like 54%). There are many differences and some sacrifices I had to make because I simply didn't have any control over it. <br />
Also, due to my obsession for performance with a non-performant framework, I did a lot of weird & funky hacks that help ship less JS to the client and use GPU rendering with CSS. The "Less JS" ones are used a lot but you won't find many "Forced CSS GPU rendering" since I used them on certain things only.

- This ships 29.72% less client-side JS.
- `<web-components />` are now all `<JSX />`. The JSX components can also be used in Markdown with MDX
- Removed the Vimeo Video Player from the home screen. But since I don't have any control over where the vimeo videos are hosted, I had to DOWNLOAD the home screen video. IDK if its legal or not but that was my only option to reduce the client-side JS. But downloading was too repetitive for me so in the actual courses, the default vimeo player is still used. But hey, atleast the home page's JS is reduced ¯\\\_(ツ)\_/¯

You may notice that this app isn't all static like the original, I did use SSR in some parts. <br />
Mainly because I thought since this is a meta-framework, I could use SSR to improve the UX/Perf for some pages & route handlers. <br />
Yes this does mean that some pages/routes can't be exported with `next export`, (route handlers are the reason this ships 44kb less JS)
You can easily make the SSR pages statically render by doing client-side data fetching. This could potentially ship more JS but its possible. I didn't really see any advantage of doing this since server-side data fetching is better for better UX & Performance. <br />

This can possibly be faster. The svelte bundle on the original site was loaded on every page, and the same happens here but instead its React. If not logged in, then the original website _does_ ship a smaller bundle. But you could probably replicate this in SvelteKit and get an even smaller bundle. <br />

## Bad Structure

I have NEVER used @next/mdx before. I know its possible to use page extensions and I did use them for some pages like the terms or get-started page. But for some pages with definitive layout, I was not able to figure it out. Anyone else who has built a blog or some SSG site with Next 13 might be able to. But I can't.

## I don't trust myself

I know that many of the courses on fireship.io are paid. Ofcourse the obvious thing would be implement it correctly right? Well, I don't trust myself in creating something that actually works. So I just left the paid courses as they were in the `/content` folder. I don't want to accidentally make the course's security weak. (I had already removed a lot of features from the `<VideoPlayer />`) If you are looking for courses, just go on the [original one](https://fireship.io/courses).

Due to this reason, I have left two of the most important implementations empty:

- courses
  - courses/[slug]
- lessons
  - lessons/[slug]

## WARNING

I HAVE NOT TESTED SOME PARTS AND I HAVE ALSO LEFT SOME FUNCTIONALITY BROKEN SINCE I WAS **NOT** ABLE TO FIGURE OUT THE LOGIC. YOU HAVE TO FIX THESE ISSUES YOURSELF BEFORE DEPLOYING THIS.

I HAVE ALSO NOT TESTED ANY FIREBASE SERVICES PROPERLY. SINCE I OBVIOUSLY CAN'T TEST PROD SINCE I DON'T HAVE ACCESS TO THE FIREBASE PROJECT, I CAN'T TEST IT WITHOUT GETTING BLOCKED BY INSUFFICIENT PERMISSION OR SOMETHING ELSE. AND I KNOW THERE ARE SOME WAYS TO TEST IT LOCALLY, BUT I AM NOT THAT GOOD WITH FIREBASE TO FIGURE IT OUT SO IF YOU KNOW AND FIND AN ISSUE, JUST HIT ME UP WITH A PR.

## Do you even want to deploy this mess?

Yes, this is a mess. (Wasn't it obvious enough, because React automatically makes a website bad. This is pretty much a fact at this point)

`Less client-side JS === (complexity++)`

Anyway, this app isn't deployed anywhere but its very easy to host this on a service like Firebase. <br />

## Future updates

Well, I don't have any plans to update this to match the original fireship.io site. But I _might_ fix the shortcomings later. I am just leaving this in this state for now. <br />
Who knows, maybe Fireship v3 will come out someday and this project will become legacy.

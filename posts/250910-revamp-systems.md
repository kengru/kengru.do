---
title: Security and old projects
description: Revisiting old projects and updating blatant errors.
published: 10-09-2025
tags: project, tech
slug: revamp-1
---

I took some time to revise some of the projects I have under the [Odin Software](https://github.com/orgs/odin-software/)'s umbrella.

From security issues and stylistic choices, there were many considerations I didn't take when creating those projects because I really did not think of them as products that people could use, but two things dawned on me. One is that even if I didn't think that people would actually use it, if some people did use them (including me), it wouldn't account as a good experience for anyone. Even if when I created them I saw them as functional, the reality is that straight functionality is nothing to be desired out of an application.

The second one is that there is no real reason to leave a product that is going to be publicly available open to threaths. While checking [Nyusu](https://nyusu.odin.do)'s database I saw that besides my user (because I do use the application a lot) there were about 10 other users created all within a minute from each other which probably means a bad actor just created accounts because it was possible to do so without any meassure for it.

So for those reasons I decided that I was going to take the public sites I do have and improve on anything I could think of, trying to make them first secure enough and then usable enough. This also served as an exercise in product building since I took into account the user using them this time. These are some of the things I fixed/learned while working on this:

### Nyusu

- Even if you only need one piece of data, never save plain values in cookies. Always hash them.
- Cards look great as list of items.
- The user agent header is actually important in some cases. There was a blog that I could not get its feed because when requesting the URL it rejected the user agent header that Go uses, instead I just added Firefox default user agent and it did work. That's probably a security measure against agressive scrapping.

### Transformer

- If taking files as input, always make sure to sanitize the name. Bad actors could use the file name to access any other file on the system.
- In case it’s a file, there are ways to verify its integrity by checking certain bytes depending on the type of file.
- Jobs are a great concept, you can just have X amount of job workers do something out of a queue without blocking anything, just create ids and make the frontend poll for status on the items submitted.

### QR

- Always check if files you are accessing exists.
- If you are going to use a folder, also check if it exists.

Thank you for reading!

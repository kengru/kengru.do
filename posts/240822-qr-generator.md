---
title: Draft - QR Code Generator
description: Bytes, encoding and .
published: 26-08-2024
tags: tech, learning, project
slug: qr-generator
---

I wanted to create some QR codes to link people to articles in this page
and thought to myself: "How hard can it be to create a QR generator?".
Turns out, it has been kind of hard for me.

### QR code

A QR code is an image that has text data encoded into it. It could be
a link to a menu, a simple string of data or in cases of big warehouse,
it could identify a product for a robot to know which box to pickup.
It was invented in 1994 by a Japanese company for labelling automobile
parts. QR codes are everywhere nowadays and phone's cameras are expected
to read any QR code that you point it to, that has made it easy to pick
up for anything that can be transmitted by simple text like the link
to a restaurant's menu, which people
[don't like that much](https://www.delish.com/food-news/a60962765/customers-thrilled-qr-codes-menus/),
but that's whats in right now.

Anyways, I need QR codes to add the article of my artwork to the print
and figured it would be a good project to learn image manipulation and
data encoding.

### I have to start somewhere

I decided to use [Go](https://go.dev/) for this project because it's my
language of choice at the moment due to its robust standard library
and simplicity. While looking for libraries that created QR codes for
reference I stumbled upon
[Project Nayuki](https://www.nayuki.io/page/creating-a-qr-code-step-by-step)
which is the closest to a QR code RFC I could find. With the steps in
mind I quickly hit a wall when reading that I needed to convert the
characters of the text to encode to bits. I have never done that before,
even though it's an easy thing, I figured I needed to learn about
character encoding first.

This [article](https://medium.com/@tyler_brewer2/bits-bytes-and-byte-slices-in-go-8a99012dcc8f)
took me to
[Joel's The absolute minimum every software developer must know about unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/),
which in turn made me understand character encoding when using Unicode. I also learned
about [Endianness](https://en.wikipedia.org/wiki/Endianness),
[UTF-8](https://www.utf8.com/)
and [Bitmasks](https://www.practical-go-lessons.com/chap-27-enum-iota-and-bitmask#fig:AND-NOT).

I swear, this is the coolest function I have ever written/though of:

```
func GetEncodingMode(text string) EncodingMode {
	var r = 0b0111
	for _, t := range text {
		if t > 57 || t < 48 {
			r = r &^ int(NUMERIC_MODE)
		}
		if t >= 'a' && t <= 'z' {
			r = r &^ int(ALPHA_MODE)
		}
	}
	return EncodingMode(r & -r)
}
```

###

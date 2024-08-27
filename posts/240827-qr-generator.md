---
title: QR Code Generator
description: Creating a qr code generator on the web.
published: 27-08-2024
tags: tech, project
slug: qr-code-generator
---

This project started as a challenge to implement the entire
code required to encode any string into a [QR Code](https://en.wikipedia.org/wiki/QR_code),
turns out, it's kind of hard.

I got around to implement the [first few steps](https://github.com/odin-software/qr/commit/216ba4d1ecb114eb32f7c6454191e0d3848f4db3)
of encoding the string acording to the size and padding in the
[specifications](https://www.qrcode.com/en/about/standards.html).
What got me was the error correction step of the algorithm that
needed to be applied to the encoded string of bits. Just look at
[the math](<https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction#Constructions_(encoding)>),
it involves coding polynomial division. I repeat, coding
polynomial division.

I know that I could potentially work on that and get it done,
I just don't have the interest in me to spend those hours so
I gave up and started using this library to create the QR Code
image: [Yeqown's go-qrcode](https://github.com/yeqown/go-qrcode?tab=readme-ov-file).
I did however got to learn a bunch of new stuffs including a
better understanding of [unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses),
[endianess](https://en.wikipedia.org/wiki/Endianness) and
[bitmasks](https://www.practical-go-lessons.com/chap-27-enum-iota-and-bitmask#fig:AND-NOT).

The colors are from the palette I will be using for everything
under the Odin Software umbrella. Since I made a function to delete
all the images from the server every 5 minutes, this could potentially
be used by anybody and it would not incur much cost on storage, only
in traffic.

Thanks for reading! These is the link:

Link: [QR Code Generator](https://qr.odin.do)

Code: [Source Code](https://github.com/odin-software/qr)

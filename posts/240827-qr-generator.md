---
title: Generador de Código QR
description: Creando un generador de QR en la web.
published: 27-08-2024
tags: tech, project, go
slug: qr-code-generator
---

Este proyecto empezó como un reto de implementar todo el
código requerido para codificar cualquier texto en un
[Código QR](https://en.wikipedia.org/wiki/QR_code), resulta
que no tan trivial como suena.

Empecé con los primeros pasos para la codificación del texto de acuerdo
a el tamaño y el padding en las [especificaciones](https://www.qrcode.com/en/about/standards.html)
del estandar. Todo iba bien hasta que me encontré con el paso del correción de errores,
que es el algoritmo que se tiene que aplicar a los bits del texto
codificado. Solo miren la [matemática](https://en.wikipedia.org/wiki/Reed%E2%80%93Solomon_error_correction),
involucra programar división de polinómios... Algún día no seré intimidado por esto,
pero esta vez sí.

Sé que pude haber trabajado en eso e implementarlo, lo que no
tenía el interés en mi de usar esas horas que me hubiese tomado.
Así que me rendí y empecé a usar esta librería para generar la imagen
QR: [Yeqown's go-qrcode](https://github.com/yeqown/go-qrcode?tab=readme-ov-file).
Sin embargo, en camino a rendirme aprendí muchos conceptos nuevos, incluyendo
un mejor entendimiento de [unicode](https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses),
[endianess](https://en.wikipedia.org/wiki/Endianness) y
[bitmasks](https://www.practical-go-lessons.com/chap-27-enum-iota-and-bitmask#fig:AND-NOT).

Los colores son de la paleta de [Odin Software](https://github.com/odin-software)
que es la sombrilla en la que estoy desarrollando el software que uso.
El código tiene una función para borrar todas las imágenes cada 5
minutos, eso significa que podría ser usado por quien sea y no
incurriría costo en storage, que es importante.

![QR Code](/static/images/qr_c.png "QR Code")

¡Gracias por leer! Estos son los links:

Link: [QR Code Generator](https://qr.odin.do)

Código: [Source Code](https://github.com/odin-software/qr)

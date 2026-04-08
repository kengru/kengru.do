---
title: Seguridad y viejos proyectos
description: Revisitando projectos viejos y emliminando errores.
published: 10-09-2025
tags: project, tech
slug: revamp-1
---

Me tomé algo de tiempo para revisar algunos de los proyectos que tengo en [Odin Software](https://github.com/orgs/odin-software/).

Desde problemas de seguridad hasta cuestiones de estilo, hay muchas cosas que
no tomé en consideración creando algunos de los proyectos de los que he hablado aquí
será porque nunca los consideré como productos que alguien más los usaría aparte de mi,
pero me percaté de dos cosas. Una es que incluso si no pensara que la gente lo podría usar,
no contarían ninguna de esas aplicaciones con buenas experiencias.

La segunda es que no hay razón real para dejar un producto que va a estar público abierto a
amenazas de seguridad. Revisando la base de datos de [Nyusu](https://nyusu.odin.do) vi que aparte de mi usuario habían 10 otros mas creados dentro de un minuto. Lo cual es posible de hacer ya que yo no preveí eso.

Así que decidí tomar los sitios públicos que tengo y mejorarlos con lo que pudiera, primero haciéndolos más seguro y luego preocupándome por la funcionalidad. Esto también me sirvió como un ejercicio en la construcción de productos. Aquí algunas cosas que aprendí mientras arreglé lo que pude:

### Nyusu

- Incluso si solo necesitas un pedazo de data, nunca se deben guardar valores sin encriptar en las cookies.
- Las tarjetas se ven bien como una lista de ítemes.
- El campo `user-agent` en el header de los request es importante en algunos casos. Había un blog al que no podía acceder a su feed de rss porque tenía bloqueado el `user-agent` que usa Go por default.

### Transformer

- Si tomas archivos como input, siempre hay que asegurarse de sanitizar el nombre del archivo.
- Hay formas de verificar la integridad de un archivo verificando ciertos bytes dependiendo del tipo de archivo.
- Los jobs son un concepto genial.

### QR

- Siempre verificar que los archivos que trates de acceder existan.
- Si vas a usar folder, también verifica que existen.

¡Gracias por leer!

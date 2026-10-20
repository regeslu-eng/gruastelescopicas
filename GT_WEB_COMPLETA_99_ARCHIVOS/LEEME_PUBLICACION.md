# Grúas Telescópicas — Proyecto completo

Entrega: 20 de octubre de 2026. Versión de exactamente 99 archivos.

Se integraron tres archivos JavaScript dentro de los scripts principales y se eliminó una imagen duplicada idéntica. Se conservan las funciones, páginas e instrucciones.

Al reemplazar una instalación previa, usa únicamente el contenido de este ZIP: los archivos antiguos `js/gt-motion.js`, `js/gt-showcase.js`, `js/logo-data.js` y `assets/catalogo/plataforma-tijera-genie-gs1930-02.webp` ya no deben permanecer en el alojamiento.

Este paquete contiene el sitio completo listo para alojarse como página estática. No necesita base de datos, claves privadas, instalación de paquetes ni compilación.

## Publicarlo en tu proyecto de GitHub y Vercel

1. Descomprime el ZIP en tu computadora.
2. Sube **el contenido descomprimido** al repositorio que ya utiliza tu sitio. `index.html`, `vercel.json`, `assets`, `css` y `js` deben quedar en la raíz. No subas únicamente el ZIP ni dejes los archivos dentro de una carpeta adicional.
3. Guarda los cambios en la rama de producción del repositorio, normalmente `main`.
4. Si ese repositorio ya está conectado a Vercel, espera a que el nuevo despliegue aparezca como **Ready**. Con la integración de Git activa, los siguientes cambios en la rama de producción también se publican automáticamente.
5. Si es una instalación nueva: en Vercel, importa el repositorio, usa **Framework Preset: Other**, raíz del proyecto `./`, sin comando de instalación ni compilación y directorio de salida `.`. `vercel.json` ya incluye esta configuración. Pulsa **Deploy**.
6. Conserva el dominio `www.rentadegruastelescopicas.com` en el proyecto existente. No es necesario crear otro proyecto ni cambiar el dominio al actualizar el mismo repositorio.

No se ha realizado el despliegue en tu cuenta desde esta entrega. Si una configuración anterior de tu proyecto apunta a otra carpeta, verifica que la raíz sea la que contiene `index.html`.

## Lo que ya viene integrado

- 22 páginas: inicio, catálogo, cotizador, servicios, seguridad, privacidad y error 404.
- Diseño original y carrusel con flechas laterales y cambio cada 30 segundos.
- Catálogo con 38 registros de equipos y variantes, filtros y fichas.
- Imágenes del sitio y catálogo incluidas en el paquete, incluidas las siete imágenes de referencia que antes dependían de Wikimedia.
- Asistente comercial con orientación y precarga de formularios. Funciona con reglas locales; no requiere una API de inteligencia artificial.
- Formularios para informes y solicitudes de cotización con validación, ubicación y datos del proyecto.
- Borradores en el navegador; no existe un panel ni una base de datos central de solicitudes.
- Descarga de solicitud de cotización en PDF con folio y logo. El generador de PDF se incluye localmente.
- Contacto por WhatsApp, llamada y correo, con el número **442 179 1079** y el correo **gruastelescopicas27@gmail.com**, conservados del proyecto original.
- Verificación de Search Console original conservada, sitemap, robots y configuración de Vercel.
- Caché de recursos ajustada para que las actualizaciones puedan volver a validarse.

## Medición de Google

La etiqueta está integrada en las 22 páginas. No tienes que pegar los archivos TXT por separado.

| Destino | Identificador |
| --- | --- |
| Google Ads | `AW-18509848195` |
| Conversión Contacto | `AW-18509848195/Q3I4CN7CnaEdEIO9l_pE` |
| Google Analytics existente | `G-7QGGQWKEM0` |

La conversión Contacto se solicita al pulsar un enlace de WhatsApp, llamada o correo, o al abrir WhatsApp desde un formulario válido. También se cubren los enlaces generados por el asistente. Un doble clic inmediato en el mismo origen y canal no genera dos eventos.

Abrir una página, cambiar una diapositiva, entrar al cotizador, enviar un formulario inválido o descargar un PDF no dispara la conversión Contacto. No se mandan a estos eventos nombres, teléfonos, correos ni mensajes de formularios.

La medición registra **intención de contacto**. No confirma que se haya completado una llamada, enviado un mensaje o cerrado una venta. El visitante debe pulsar Enviar dentro de WhatsApp. Los importes del PDF continúan por confirmar, conforme al funcionamiento original; no se inventan tarifas.

Para comprobar la recepción en tu cuenta después de publicar, usa Google Tag Assistant sobre la URL pública y verifica los dos destinos y el evento Contacto al hacer una prueba de contacto. La recepción y atribución de Google dependen de la cuenta, el navegador, la conexión y los bloqueadores; no se han confirmado desde tu cuenta en esta entrega. No añadas de nuevo el fragmento de conversión a todas las páginas, porque contaría visitas como contactos.

## Comprobaciones de esta entrega

- Sintaxis de todos los JavaScript y lectura de configuraciones JSON.
- Referencias locales, anclas estáticas, imágenes y rutas del catálogo.
- Pruebas aisladas de medición, prevención de duplicados y contacto cuando Google o las ventanas emergentes están bloqueados.
- Generación real del PDF con la librería incluida y paginación de comentarios extensos.

La revisión visual y las interacciones completas en navegador no se pudieron ejecutar por el bloqueo de acceso a la vista previa de esta sesión. No se ha verificado el estado del dominio, el despliegue ni la recepción de eventos en la cuenta de Google.

## Referencias técnicas

- Google: https://support.google.com/google-ads/answer/6331304
- Google: https://developers.google.com/tag-platform/gtagjs/configure
- Vercel: https://vercel.com/docs/git

Las atribuciones de las imágenes de referencia se conservan en `LEGAL_IMAGENES.txt`.

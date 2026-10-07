# Dominio y Google — configuración final

Dominio configurado: **https://www.rentadegruastelescopicas.com/**

La web ya quedó preparada para producción con:

- Etiqueta de verificación de Google Search Console en `index.html`.
- Páginas comerciales con `index,follow`.
- `canonical` individual en cada página.
- `og:url`, Open Graph y Twitter Cards con URLs absolutas.
- Schema `LocalBusiness` / `Service` vinculado al dominio final.
- `robots.txt` abierto a rastreo y apuntando al sitemap.
- `sitemap.xml` de producción en la raíz.
- Cotizador, privacidad y 404 en `noindex,follow` por no ser páginas objetivo de posicionamiento.

## Pasos en Google Search Console

1. Publicar esta versión en Vercel/GitHub.
2. Confirmar que `https://www.rentadegruastelescopicas.com/` abre correctamente con SSL.
3. En Search Console, pulsar **Verificar** usando la etiqueta HTML ya incluida.
4. En **Sitemaps**, enviar: `https://www.rentadegruastelescopicas.com/sitemap.xml`.
5. Solicitar indexación de la página principal y páginas prioritarias de servicios.
6. Vincular el mismo dominio en el Perfil de Empresa en Google.

No retirar la etiqueta `google-site-verification` después de verificar.

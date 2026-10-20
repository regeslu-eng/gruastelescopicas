/* Google Ads + Analytics. No se envían nombres, teléfonos, correos ni mensajes. */
(function () {
  'use strict';
  if (window.GTContact) return;
  const ADS = 'AW-18509848195/Q3I4CN7CnaEdEIO9l_pE';
  const ANALYTICS = 'G-7QGGQWKEM0';
  const PHONE = '524421791079';
  const lastContact = new Map();
  const sources = new Set(['enlace', 'formulario_inicio', 'formulario_informes', 'formulario_cotizacion']);
  // Esta ruta omite la consulta y el fragmento, que pueden contener datos capturados.
  const page = location.origin + location.pathname;

  function track(channel, source, callback) {
    let finished = false;
    let timer;
    const done = function () {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      if (callback) callback();
    };
    const key = channel + ':' + source;
    const now = Date.now();
    if (now - (lastContact.get(key) || 0) < 1500) { done(); return; }
    lastContact.set(key, now);
    if (typeof window.gtag !== 'function') { done(); return; }
    if (callback) timer = setTimeout(done, 900);
    try {
      window.gtag('event', 'contact', {
        send_to: ANALYTICS,
        contact_method: channel,
        contact_source: sources.has(source) ? source : 'enlace',
        page_location: page
      });
      window.gtag('event', 'conversion', {
        send_to: ADS,
        page_location: page,
        event_callback: done,
        event_timeout: 900
      });
    } catch (_) { done(); }
  }

  function channelFor(href) {
    try {
      const url = new URL(href, location.href);
      if (url.protocol === 'tel:') return 'telefono';
      if (url.protocol === 'mailto:') return 'correo';
      if (url.protocol === 'https:' && ['wa.me', 'api.whatsapp.com', 'web.whatsapp.com'].includes(url.hostname)) return 'whatsapp';
    } catch (_) { /* Los demás enlaces no son contactos. */ }
    return '';
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0) return;
    const channel = channelFor(link.href);
    if (!channel || link.hasAttribute('download')) return;
    // Conservar pestañas nuevas, teclas modificadoras y los botones dinámicos del chat.
    if (link.target === '_blank' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      track(channel, 'enlace');
      return;
    }
    event.preventDefault();
    track(channel, 'enlace', function () { window.location.assign(link.href); });
  });

  window.GTContact = Object.freeze({
    openWhatsApp: function (message, source) {
      const url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message);
      // Abrir sin esperar a Google evita que el navegador bloquee la pestaña.
      const opened = window.open(url, '_blank');
      if (opened) {
        try { opened.opener = null; } catch (_) {}
        track('whatsapp', source);
      } else {
        track('whatsapp', source, function () { window.location.assign(url); });
      }
    }
  });
})();

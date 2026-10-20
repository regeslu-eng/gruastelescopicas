/* Google Ads – conversión "Contacto" (AW-18509848195/Q3I4CN7CnaEdEIO9l_pE)
   Se dispara SOLO cuando el visitante interactúa para contactar:
   clic en WhatsApp, clic en llamar (tel:) o envío real de solicitud/cotización.
   NO se dispara al abrir una página. */
(function(){
  var SEND_TO = 'AW-18509848195/Q3I4CN7CnaEdEIO9l_pE';
  var last = 0;
  window.gtAdsConversion = function(origen){
    var now = Date.now();
    if (now - last < 1500) return;           // evita duplicados por doble clic
    last = now;
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', { 'send_to': SEND_TO });
      }
    } catch (e) {}
  };
  // Clics en enlaces de WhatsApp o teléfono (incluye los creados dinámicamente: botón flotante y chat)
  document.addEventListener('click', function(ev){
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var h = (a.getAttribute('href') || '').toLowerCase();
    if (h.indexOf('https://wa.me/') === 0 || h.indexOf('https://api.whatsapp.com/') === 0 || h.indexOf('tel:') === 0) {
      window.gtAdsConversion(h.indexOf('tel:') === 0 ? 'llamada' : 'whatsapp');
    }
  }, true);
})();

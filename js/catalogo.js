(function(){
  if(!window.EQUIPOS)return;
  const grid=document.querySelector('#catalog-grid');
  const search=document.querySelector('#catalog-search');
  const buttons=[...document.querySelectorAll('.filter-btn')];
  const fallback='assets/fallback-equipo.svg';
  let category='todos';
  const visibleItems=()=>window.EQUIPOS.filter(x=>x.catalogVisible!==false);
  const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  const variants=item=>(item.variantes||[]).length?`<div class="variant-list"><strong>Opciones:</strong>${item.variantes.map(v=>`<span>${esc(v)}</span>`).join('')}</div>`:'';
  function render(){
    const q=(search?.value||'').toLowerCase().trim(); grid.innerHTML='';
    const items=visibleItems().filter(x=>(category==='todos'||x.categoria===category)&&(!q||`${x.nombre} ${x.etiqueta} ${x.uso} ${x.descripcion} ${(x.aliases||[]).join(' ')} ${(x.variantes||[]).join(' ')}`.toLowerCase().includes(q)));
    items.forEach(item=>{
      const el=document.createElement('article'); el.id=item.id; el.className='equipment-card reveal visible';
      el.innerHTML=`<div class="equipment-image"><img src="${esc(item.imagen)}" alt="${esc(item.imagenAlt||item.nombre)}" loading="lazy" decoding="async"><span class="card-tag">${esc(item.etiqueta)}</span></div><div class="equipment-body"><h3>${esc(item.nombre)}</h3><p>${esc(item.descripcion)}</p>${variants(item)}<div class="equipment-meta"><strong>Aplicaciones:</strong> ${esc(item.uso)}</div><div class="card-actions"><button type="button" class="btn ghost slim" data-detail="${esc(item.id)}">Ver equipo</button><a class="btn primary slim" href="cotizador.html?modo=cotizacion&equipo=${encodeURIComponent(item.id)}">Cotizar</a></div></div>`;
      el.querySelector('img').addEventListener('error',e=>e.currentTarget.src=fallback,{once:true}); grid.appendChild(el);
    });
    const count=document.querySelector('#catalog-count'); if(count)count.textContent=items.length?`${items.length} opciones encontradas`:'No encontramos coincidencias';
  }
  buttons.forEach(b=>b.addEventListener('click',()=>{buttons.forEach(x=>x.classList.remove('active'));b.classList.add('active');category=b.dataset.category;render()}));
  search?.addEventListener('input',render);
  grid?.addEventListener('click',e=>{const btn=e.target.closest('[data-detail]');if(!btn)return;const item=window.EQUIPOS.find(x=>x.id===btn.dataset.detail);if(item)openModal(item)});
  function openModal(item){
    let modal=document.querySelector('#equipment-modal'); if(!modal){modal=document.createElement('div');modal.id='equipment-modal';modal.className='equipment-modal';document.body.appendChild(modal)}
    const imgs=[item.imagen,...(item.galeria||[])].filter((v,i,a)=>v&&a.indexOf(v)===i);
    const thumbs=imgs.length>1?`<div class="modal-thumbs">${imgs.map((src,i)=>`<button type="button" class="${i===0?'active':''}" data-gallery-src="${esc(src)}" aria-label="Ver imagen ${i+1}"><img src="${esc(src)}" alt="${esc(item.nombre)} - vista ${i+1}" loading="lazy"></button>`).join('')}</div>`:'';
    modal.innerHTML=`<div class="equipment-modal-card"><div class="equipment-modal-media"><img data-gallery-main src="${esc(item.imagen)}" alt="${esc(item.imagenAlt||item.nombre)}"><span class="card-tag">${esc(item.etiqueta)}</span>${thumbs}</div><div class="equipment-modal-copy"><button type="button" data-close class="modal-close" aria-label="Cerrar">×</button><span class="eyebrow">Equipo y servicio</span><h2>${esc(item.nombre)}</h2><p>${esc(item.descripcion)}</p>${variants(item)}<div class="detail-card"><strong>Capacidad / configuración</strong><p>${esc(item.capacidad)}</p></div><div class="detail-card"><strong>Aplicaciones comunes</strong><p>${esc(item.uso)}</p></div><div class="card-actions"><a class="btn primary" href="cotizador.html?modo=cotizacion&equipo=${encodeURIComponent(item.id)}">Solicitar cotización</a>${item.pagina?`<a class="btn ghost" href="${esc(item.pagina)}">Más información</a>`:''}</div></div></div>`;
    const main=modal.querySelector('[data-gallery-main]'); main?.addEventListener('error',()=>main.src=fallback,{once:true});
    modal.querySelectorAll('[data-gallery-src]').forEach(btn=>btn.addEventListener('click',()=>{main.src=btn.dataset.gallerySrc;modal.querySelectorAll('[data-gallery-src]').forEach(x=>x.classList.remove('active'));btn.classList.add('active')}));
    modal.querySelectorAll('.modal-thumbs img').forEach(img=>img.addEventListener('error',()=>img.src=fallback,{once:true}));
    modal.querySelector('[data-close]').onclick=()=>modal.remove(); modal.onclick=e=>{if(e.target===modal)modal.remove()};
  }
  render();
})();

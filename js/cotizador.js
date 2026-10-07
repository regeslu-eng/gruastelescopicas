(function(){
  if(!window.EQUIPOS)return;
  const PHONE='524421791079';
  const CHAT_KEY='gtmx-chat-prefill-v9';
  const QUOTE_DRAFT='gtmx-cotizacion-manual-v9';
  const INFO_DRAFT='gtmx-informes-manual-v9';
  let ACTIVE_FOLIO='';

  const NEEDS={
    'elevar-carga':{label:'Elevar o montar una carga',ids:['grua-telescopica','grua-sany-stc350s','grua-todo-terreno','grua-titan','grua-hiab','maniobras-industriales'],preferred:'grua-telescopica',projects:['Montaje de estructura metálica','Montaje de maquinaria','Izaje de equipo industrial','Colocación de tanque / transformador','Carga o descarga pesada','Otro proyecto de izaje']},
    'cargar-trasladar':{label:'Cargar, trasladar y descargar',ids:['grua-titan','grua-hiab','lowboy','maniobras-industriales'],preferred:'grua-titan',projects:['Traslado y colocación de maquinaria','Carga y descarga de materiales','Movimiento de equipo industrial','Traslado de estructura','Otro traslado con maniobra']},
    'trabajo-altura':{label:'Trabajo de personal en altura',ids:['plataforma-aerea-articulada','plataforma-telescopica','plataforma-tijera','plataforma-personal','camion-canastilla'],preferred:'plataforma-aerea-articulada',projects:['Mantenimiento industrial','Instalación eléctrica','Trabajo en fachada','Pintura / mantenimiento exterior','Trabajo dentro de nave','Otro trabajo en altura']},
    'mover-carga':{label:'Mover carga en planta o almacén',ids:['montacargas-01','telehandler','manipulador-estabilizadores','patin-pallet','maniobras-industriales'],preferred:'montacargas-01',projects:['Carga y descarga de tráiler','Movimiento interno de maquinaria','Movimiento de tarimas','Reacomodo de equipos','Apoyo en instalación industrial','Otro movimiento interno']},
    'excavar':{label:'Excavar o mover material',ids:['retroexcavadora','bobcat'],preferred:'retroexcavadora',projects:['Excavación de zanja','Preparación de terreno','Nivelación','Movimiento de material','Limpieza de área','Apoyo en obra civil']},
    'transportar-maquinaria':{label:'Transportar maquinaria o equipo pesado',ids:['lowboy','plataforma-autos'],preferred:'lowboy',projects:['Traslado de maquinaria pesada','Traslado de equipo industrial','Movimiento entre plantas','Entrega o recolección en obra','Traslado vehicular']},
    'iluminar':{label:'Iluminar una zona de trabajo',ids:['torre-luz'],preferred:'torre-luz',projects:['Obra nocturna','Mantenimiento nocturno','Iluminación de patio','Operación temporal','Emergencia o contingencia']},
    'acceso-temporal':{label:'Andamios o acceso temporal',ids:['andamios','plataforma-tijera','plataforma-personal','camion-canastilla'],preferred:'andamios',projects:['Trabajo en fachada','Mantenimiento','Instalación','Obra civil','Acceso temporal']},
    'maniobra-integral':{label:'Maniobra industrial / montaje completo',ids:['maniobras-industriales','grua-telescopica','grua-titan','grua-hiab','montacargas-01','telehandler'],preferred:'maniobras-industriales',projects:['Montaje de maquinaria','Movimiento de línea o equipo','Instalación industrial','Desmontaje y reubicación','Proyecto especial']},
    'no-se':{label:'No sé qué equipo necesito',ids:window.EQUIPOS.filter(x=>x.catalogVisible!==false).map(x=>x.id),preferred:'',projects:['Montaje / izaje','Carga y descarga','Trabajo en altura','Movimiento interno','Excavación / obra','Transporte especializado','Proyecto especial / necesito asesoría']}
  };
  const LOCATIONS={
    'Querétaro':['Santiago de Querétaro','Corregidora','El Marqués','Huimilpan','Pedro Escobedo','San Juan del Río','Tequisquiapan','Colón','Ezequiel Montes','Cadereyta de Montes','Amealco de Bonfil','Jalpan de Serra','Pinal de Amoles','Landa de Matamoros','Arroyo Seco','Tolimán','Peñamiller','San Joaquín','Otra ciudad / municipio'],
    'Guanajuato':['León','Celaya','Irapuato','Salamanca','Silao','San Miguel de Allende','Guanajuato','Apaseo el Grande','Apaseo el Alto','San José Iturbide','Dolores Hidalgo','Acámbaro','Cortazar','Villagrán','Comonfort','Juventino Rosas','Valle de Santiago','Pénjamo','San Francisco del Rincón','Purísima del Rincón','Otra ciudad / municipio'],
    'Aguascalientes':['Aguascalientes','Jesús María','San Francisco de los Romo','Calvillo','Rincón de Romos','Pabellón de Arteaga','Asientos','Tepezalá','Cosío','El Llano','San José de Gracia','Otra ciudad / municipio'],
    'Jalisco':['Guadalajara','Zapopan','San Pedro Tlaquepaque','Tonalá','Tlajomulco de Zúñiga','El Salto','Lagos de Moreno','Tepatitlán de Morelos','Ocotlán','Puerto Vallarta','Zapotlanejo','Arandas','Atotonilco el Alto','La Barca','Zapotlán el Grande','Otra ciudad / municipio'],
    'San Luis Potosí':['San Luis Potosí','Soledad de Graciano Sánchez','Villa de Reyes','Matehuala','Rioverde','Ciudad Valles','Santa María del Río','Mexquitic de Carmona','Villa de Arriaga','Zaragoza','Otra ciudad / municipio'],
    'Zacatecas':['Zacatecas','Guadalupe','Fresnillo','Jerez','Calera','Ojocaliente','Loreto','Sombrerete','Río Grande','Nochistlán de Mejía','Otra ciudad / municipio'],
    'Estado de México':['Toluca','Tlalnepantla de Baz','Naucalpan de Juárez','Cuautitlán Izcalli','Tepotzotlán','Tultitlán','Ecatepec de Morelos','Atizapán de Zaragoza','Lerma','Metepec','Huixquilucan','Nicolás Romero','Chalco','Ixtapaluca','Texcoco','Otra ciudad / municipio'],
    'CDMX':['Álvaro Obregón','Azcapotzalco','Benito Juárez','Coyoacán','Cuajimalpa de Morelos','Cuauhtémoc','Gustavo A. Madero','Iztacalco','Iztapalapa','La Magdalena Contreras','Miguel Hidalgo','Milpa Alta','Tláhuac','Tlalpan','Venustiano Carranza','Xochimilco'],
    'Otro':['Otra ciudad / municipio']
  };
  const STATES=Object.keys(LOCATIONS);
  const eqName=id=>window.EQUIPOS.find(x=>x.id===id)?.nombre||id||'';
  const opt=(sel,items,placeholder,selected='')=>{sel.innerHTML=`<option value="">${placeholder}</option>`;items.forEach(x=>{const o=document.createElement('option');if(typeof x==='string'){o.value=x;o.textContent=x}else{o.value=x.value;o.textContent=x.label}if(o.value===selected)o.selected=true;sel.appendChild(o)})};
  const setStates=sel=>opt(sel,STATES,'Selecciona un estado');
  const isManual=(state,city)=>state==='Otro'||city==='Otra ciudad / municipio';
  const validPhone=v=>String(v||'').replace(/\D/g,'').length>=10;
  const needItems=Object.entries(NEEDS).map(([value,v])=>({value,label:v.label}));

  // ----- Modo de solicitud -----
  const modeButtons=[...document.querySelectorAll('[data-mode]')];
  const panels=[...document.querySelectorAll('[data-mode-panel]')];
  function setMode(mode,scroll=false){
    modeButtons.forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
    panels.forEach(p=>p.classList.toggle('active',p.dataset.modePanel===mode));
    const u=new URL(location.href);u.searchParams.set('modo',mode);history.replaceState({},'',u);
    if(scroll)document.querySelector('#solicitudes')?.scrollIntoView({behavior:'smooth',block:'start'});
  }
  modeButtons.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode,true)));

  // ----- Solicitud rápida de informes -----
  const infoForm=document.querySelector('#info-form');
  const infoService=document.querySelector('#info-servicio');
  const infoState=document.querySelector('#info-estado');
  const infoCity=document.querySelector('#info-ciudad');
  const infoManual=document.querySelector('#info-ciudad-manual');
  const infoManualWrap=document.querySelector('#info-ciudad-manual-wrap');
  const infoSources={};
  opt(infoService,needItems,'Selecciona una opción');setStates(infoState);

  function updateInfoCities(selected=''){opt(infoCity,LOCATIONS[infoState.value]||[],infoState.value?'Selecciona ciudad / municipio':'Selecciona primero el estado',selected);toggleInfoManual()}
  function toggleInfoManual(){const m=isManual(infoState.value,infoCity.value);infoManualWrap.hidden=!m;infoManual.required=m;if(!m&&infoSources.ciudad_manual!=='manual')infoManual.value=''}
  const infoCityValue=()=>!infoManualWrap.hidden&&infoManual.value.trim()?infoManual.value.trim():infoCity.value;
  function markInfoManual(name){infoSources[name]='manual';saveInfoManual()}
  function saveInfoManual(){
    try{const d={};[...infoForm.elements].forEach(el=>{if(!el.name||infoSources[el.name]!=='manual')return;d[el.name]=el.value});localStorage.setItem(INFO_DRAFT,JSON.stringify(d))}catch(e){}
  }
  function restoreInfoManual(){
    try{const d=JSON.parse(localStorage.getItem(INFO_DRAFT)||'null');if(!d)return;if(d.servicio){infoService.value=d.servicio;infoSources.servicio='manual'}if(d.estado){infoState.value=d.estado;infoSources.estado='manual';updateInfoCities(d.ciudad||'')}if(d.ciudad){infoCity.value=d.ciudad;infoSources.ciudad='manual'}if(d.ciudad_manual){infoManual.value=d.ciudad_manual;infoSources.ciudad_manual='manual'}['nombre','telefono','mensaje'].forEach(k=>{if(d[k]!==undefined&&infoForm.elements[k]){infoForm.elements[k].value=d[k];infoSources[k]='manual'}});toggleInfoManual()}catch(e){}
  }
  infoForm.addEventListener('input',e=>{if(e.target.name&&e.isTrusted)markInfoManual(e.target.name)});
  infoForm.addEventListener('change',e=>{if(!e.target.name||!e.isTrusted)return;infoSources[e.target.name]='manual';if(e.target===infoState){updateInfoCities();delete infoSources.ciudad;delete infoSources.ciudad_manual}if(e.target===infoCity)toggleInfoManual();saveInfoManual()});
  infoState.addEventListener('change',()=>{if(!infoState.value)updateInfoCities()});
  infoCity.addEventListener('change',toggleInfoManual);
  infoForm.addEventListener('submit',e=>{
    e.preventDefault();if(!infoForm.reportValidity())return;
    const d=Object.fromEntries(new FormData(infoForm).entries());if(!validPhone(d.telefono)){alert('Ingresa un teléfono de al menos 10 dígitos.');infoForm.elements.telefono.focus();return}
    const label=NEEDS[d.servicio]?.label||d.servicio;
    const msg=['Hola, quiero pedir informes sobre sus servicios.','',`Servicio / necesidad: ${label}`,`Ubicación: ${infoCityValue()}, ${d.estado}`,`Nombre: ${d.nombre}`,`Teléfono: ${d.telefono}`,`Pregunta: ${d.mensaje||'Quiero que me orienten sobre la mejor opción.'}`].join('\n');
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
  });

  // ----- Solicitud formal de cotización -----
  const form=document.querySelector('#quote-form');
  const need=document.querySelector('#quote-necesidad'),equipment=document.querySelector('#quote-equipo'),variant=document.querySelector('#quote-variante'),variantWrap=document.querySelector('#quote-variante-wrap'),project=document.querySelector('#quote-proyecto');
  const qState=document.querySelector('#quote-estado'),qCity=document.querySelector('#quote-ciudad'),qManual=document.querySelector('#quote-ciudad-manual'),qManualWrap=document.querySelector('#quote-ciudad-manual-wrap');
  const qDate=document.querySelector('#quote-fecha');
  const quoteSources={};
  opt(need,needItems,'Selecciona una opción');setStates(qState);
  const wizardPanels=[...form.querySelectorAll('.wizard-panel')],progress=[...form.querySelectorAll('.progress-step')];let step=1;

  function updateVariants(selected=''){
    const item=window.EQUIPOS.find(x=>x.id===equipment.value); const list=item?.variantes||[];
    if(!variant||!variantWrap)return;
    variantWrap.hidden=!list.length; variant.disabled=!list.length;
    if(!list.length){variant.innerHTML='<option value="">No aplica</option>';variant.value='';return}
    opt(variant,list,'Selecciona una variante',selected);
  }
  function configureNeed(keep='',source='system'){
    const cfg=NEEDS[need.value];
    if(!cfg){opt(equipment,[],'Selecciona primero el trabajo');opt(project,[],'Selecciona una opción');document.querySelector('#quote-recommendation').hidden=true;summary();return}
    const chosen=keep&&cfg.ids.includes(keep)?keep:cfg.preferred;
    opt(equipment,cfg.ids.map(id=>({value:id,label:eqName(id)})),cfg.preferred?'Selecciona una opción':'Necesito asesoría',chosen);
    opt(project,cfg.projects,'Selecciona una opción');updateVariants();
    if(chosen&&source!=='system'&&quoteSources.equipo!=='manual')quoteSources.equipo=source;
    const rec=document.querySelector('#quote-recommendation');rec.hidden=false;
    document.querySelector('#quote-recommend-title').textContent=cfg.preferred?`Sugerencia: ${eqName(cfg.preferred)}`:'Te ayudamos a elegir';
    document.querySelector('#quote-recommend-text').textContent=cfg.preferred?'Es una orientación inicial. La unidad final se confirma al revisar la maniobra.':'Puedes enviar la solicitud aunque todavía no conozcas el equipo.';
    summary();
  }
  function updateQuoteCities(selected=''){opt(qCity,LOCATIONS[qState.value]||[],qState.value?'Selecciona ciudad / municipio':'Selecciona primero el estado',selected);toggleQuoteManual()}
  function toggleQuoteManual(){const m=isManual(qState.value,qCity.value);qManualWrap.hidden=!m;qManual.required=m;if(!m&&quoteSources.ciudad_manual!=='manual')qManual.value=''}
  const quoteCityValue=()=>!qManualWrap.hidden&&qManual.value.trim()?qManual.value.trim():qCity.value;
  function showStep(n){step=Math.max(1,Math.min(3,n));wizardPanels.forEach(p=>p.classList.toggle('active',Number(p.dataset.step)===step));progress.forEach((p,i)=>{p.classList.toggle('active',i+1===step);p.classList.toggle('done',i+1<step)});if(innerWidth<900)form.scrollIntoView({behavior:'smooth',block:'start'})}
  function validateStep(n){const panel=form.querySelector(`.wizard-panel[data-step="${n}"]`);for(const el of panel.querySelectorAll('[required]')){if(el.closest('[hidden]'))continue;if(!el.checkValidity()){el.reportValidity();el.focus();return false}}return true}
  form.querySelectorAll('.next-step').forEach(b=>b.addEventListener('click',()=>{if(validateStep(step))showStep(step+1)}));
  form.querySelectorAll('.prev-step').forEach(b=>b.addEventListener('click',()=>showStep(step-1)));
  progress.forEach(b=>b.addEventListener('click',()=>{const n=Number(b.dataset.goStep);if(n<=step)showStep(n);else if(n===step+1&&validateStep(step))showStep(n)}));

  function markQuoteManual(name){quoteSources[name]='manual';saveQuoteManual()}
  function saveQuoteManual(){
    try{const d={};[...form.elements].forEach(el=>{if(!el.name||quoteSources[el.name]!=='manual')return;d[el.name]=el.value});localStorage.setItem(QUOTE_DRAFT,JSON.stringify(d));const status=document.querySelector('#draft-status');if(status){status.textContent='Guardado ✓';clearTimeout(saveQuoteManual.t);saveQuoteManual.t=setTimeout(()=>status.textContent='Guardado automático',900)}}catch(e){}
  }
  function inferNeedFromEquipment(id){return Object.keys(NEEDS).find(k=>NEEDS[k].ids.includes(id))||''}
  function inferStateFromCity(city){return Object.keys(LOCATIONS).find(st=>LOCATIONS[st].includes(city))||''}
  function restoreQuoteManual(){
    try{const d=JSON.parse(localStorage.getItem(QUOTE_DRAFT)||'null');if(!d)return;
      if(!d.necesidad&&d.equipo)d.necesidad=inferNeedFromEquipment(d.equipo);
      if(d.necesidad){need.value=d.necesidad;quoteSources.necesidad='manual';configureNeed(d.equipo||'','manual')}
      if(d.equipo&&[...equipment.options].some(o=>o.value===d.equipo)){equipment.value=d.equipo;quoteSources.equipo='manual';updateVariants(d.variante||'')}
      if(d.variante&&variant&&[...variant.options].some(o=>o.value===d.variante)){variant.value=d.variante;quoteSources.variante='manual'}
      if(d.proyecto&&[...project.options].some(o=>o.value===d.proyecto)){project.value=d.proyecto;quoteSources.proyecto='manual'}
      if(!d.estado&&d.ciudad)d.estado=inferStateFromCity(d.ciudad);
      if(d.estado){qState.value=d.estado;quoteSources.estado='manual';updateQuoteCities(d.ciudad||'')}
      if(d.ciudad){qCity.value=d.ciudad;quoteSources.ciudad='manual'}
      if(d.ciudad_manual){qManual.value=d.ciudad_manual;quoteSources.ciudad_manual='manual'}
      ['variante','fecha','duracion','peso','altura','maniobra','nombre','telefono','empresa','email','notas'].forEach(k=>{if(d[k]!==undefined&&form.elements[k]){form.elements[k].value=d[k];quoteSources[k]='manual'}});
      toggleQuoteManual();summary();
    }catch(e){}
  }

  form.addEventListener('input',e=>{if(e.target.name&&e.isTrusted){markQuoteManual(e.target.name);summary()}});
  form.addEventListener('change',e=>{
    if(!e.target.name||!e.isTrusted)return;
    quoteSources[e.target.name]='manual';
    if(e.target===need){configureNeed('', 'manual');quoteSources.equipo='manual';delete quoteSources.proyecto;delete quoteSources.variante}
    if(e.target===equipment){updateVariants();delete quoteSources.variante}
    if(e.target===qState){updateQuoteCities();delete quoteSources.ciudad;delete quoteSources.ciudad_manual}
    if(e.target===qCity)toggleQuoteManual();
    summary();saveQuoteManual();
  });

  function formData(){const d=Object.fromEntries(new FormData(form).entries());d.ciudad_final=quoteCityValue();return d}
  function summary(){const d=formData(),cfg=NEEDS[d.necesidad],it=window.EQUIPOS.find(x=>x.id===d.equipo);document.querySelector('#sum-necesidad').textContent=cfg?.label||'Por seleccionar';document.querySelector('#sum-equipo').textContent=it?`${it.nombre}${d.variante?' · '+d.variante:''}`:'Por seleccionar';document.querySelector('#sum-proyecto').textContent=d.proyecto||'Por definir';document.querySelector('#sum-ubicacion').textContent=d.ciudad_final?`${d.ciudad_final}${d.estado?', '+d.estado:''}`:(d.estado||'Por definir');document.querySelector('#sum-fecha').textContent=d.fecha||'Por definir'}
  function ensureValid(){const invalid=form.querySelector(':invalid');if(!invalid)return true;const n=Number(invalid.closest('.wizard-panel')?.dataset.step||1);showStep(n);invalid.reportValidity();invalid.focus();return false}
  function folio(){if(ACTIVE_FOLIO)return ACTIVE_FOLIO;const n=new Date(),z=x=>String(x).padStart(2,'0');ACTIVE_FOLIO=`GTMX-${String(n.getFullYear()).slice(-2)}${z(n.getMonth()+1)}${z(n.getDate())}-${z(n.getHours())}${z(n.getMinutes())}`;const el=document.querySelector('#sum-folio');if(el)el.textContent=ACTIVE_FOLIO;return ACTIVE_FOLIO}
  function quoteMessage(){const d=formData(),cfg=NEEDS[d.necesidad],it=window.EQUIPOS.find(x=>x.id===d.equipo),f=folio();return ['Hola, quiero solicitar una cotización.',`Folio: ${f}`,'',`Trabajo: ${cfg?.label||'Por definir'}`,`Equipo: ${it?.nombre||'Necesito asesoría'}${d.variante?' · '+d.variante:''}`,`Proyecto: ${d.proyecto}`,`Ubicación: ${d.ciudad_final}, ${d.estado}`,`Fecha: ${d.fecha}`,`Duración: ${d.duracion}`,`Peso: ${d.peso||'Por confirmar'}`,`Altura: ${d.altura||'Por confirmar'}`,`Maniobra: ${d.maniobra||'Sin descripción adicional'}`,'',`Nombre: ${d.nombre}`,`Teléfono: ${d.telefono}`,`Empresa: ${d.empresa||'N/A'}`,`Correo: ${d.email||'N/A'}`,`Comentarios: ${d.notas||'Sin comentarios adicionales'}`].join('\n')}
  document.querySelector('#quote-whatsapp')?.addEventListener('click',()=>{if(!ensureValid())return;const d=formData();if(!validPhone(d.telefono)){alert('Ingresa un teléfono de al menos 10 dígitos.');form.elements.telefono.focus();return}window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(quoteMessage())}`,'_blank','noopener')});
  form.addEventListener('submit',e=>{e.preventDefault();if(!ensureValid())return;const d=formData();if(!validPhone(d.telefono)){alert('Ingresa un teléfono de al menos 10 dígitos.');form.elements.telefono.focus();return}generatePdf()});

  async function generatePdf(){
    const d=formData(),cfg=NEEDS[d.necesidad],it=window.EQUIPOS.find(x=>x.id===d.equipo),f=folio();if(!window.jspdf){alert('No fue posible cargar el generador de PDF.');return}
    const {jsPDF}=window.jspdf,pdf=new jsPDF({unit:'mm',format:'a4'});let y=58,margin=15;
    const niceDate=v=>{if(!v)return 'Por definir';const [yy,mm,dd]=String(v).split('-');return yy&&mm&&dd?`${dd}/${mm}/${yy}`:v};
    const ensureSpace=(needed=18)=>{if(y+needed>276){pdf.addPage();y=22}};
    pdf.setFillColor(9,31,54);pdf.rect(0,0,210,48,'F');const logo=window.GDB_LOGO_DATA_URL;if(logo){pdf.setFillColor(255,255,255);pdf.roundedRect(10,6,40,34,3,3,'F');try{pdf.addImage(logo,'PNG',13,8.5,34,27.3,undefined,'FAST')}catch(e){}}
    pdf.setFont('helvetica','bold');pdf.setFontSize(18);pdf.setTextColor(255,255,255);pdf.text('SOLICITUD DE COTIZACIÓN',56,17);pdf.setFontSize(10);pdf.setTextColor(255,204,0);pdf.text('GRÚAS TELESCÓPICAS',56,24);pdf.setTextColor(255,255,255);pdf.setFont('helvetica','normal');pdf.setFontSize(9);pdf.text(`Folio ${f}`,56,31);pdf.text(`Emisión ${new Date().toLocaleDateString('es-MX')}`,56,36);pdf.text('WhatsApp / Tel. 442 179 1079',56,41);
    const section=t=>{ensureSpace(16);pdf.setFillColor(244,246,248);pdf.roundedRect(margin,y-5,180,10,2,2,'F');pdf.setTextColor(9,31,54);pdf.setFont('helvetica','bold');pdf.setFontSize(11);pdf.text(t,margin+4,y+1);y+=11};
    const row=(a,b)=>{ensureSpace(12);pdf.setFont('helvetica','bold');pdf.setFontSize(8.8);pdf.setTextColor(71,82,93);pdf.text(a,margin,y);pdf.setFont('helvetica','normal');pdf.setTextColor(17,24,32);const lines=pdf.splitTextToSize(String(b||'Por definir'),110);pdf.text(lines,78,y);y+=Math.max(7,lines.length*4.3+2);pdf.setDrawColor(232,235,239);pdf.line(margin,y-2,195,y-2)};
    const amountRow=(label,value,strong=false)=>{ensureSpace(9);pdf.setFont('helvetica',strong?'bold':'normal');pdf.setFontSize(strong?11:9.5);pdf.setTextColor(17,24,32);pdf.text(label,118,y);pdf.text(value,195,y,{align:'right'});y+=7};
    section('Servicio solicitado');row('Trabajo',cfg?.label||'Por definir');row('Equipo',`${it?.nombre||'Necesito asesoría'}${d.variante?' · '+d.variante:''}`);row('Proyecto',d.proyecto);
    section('Datos del proyecto');row('Ubicación',`${d.ciudad_final||'Por definir'}${d.estado?', '+d.estado:''}`);row('Fecha',niceDate(d.fecha));row('Duración',d.duracion);row('Peso aproximado',d.peso);row('Altura aproximada',d.altura);row('Maniobra',d.maniobra||'Sin descripción adicional');
    section('Datos del cliente');row('Nombre',d.nombre);row('Teléfono / WhatsApp',d.telefono);row('Empresa',d.empresa||'N/A');row('Correo',d.email||'N/A');if(d.notas)row('Comentarios',d.notas);
    section('Conceptos de la solicitud');
    row('Concepto 1',`${cfg?.label||'Servicio por definir'} · ${it?.nombre||'Equipo por confirmar'}${d.variante?' · '+d.variante:''}`);
    row('Concepto 2',`${d.proyecto||'Proyecto por definir'} · ${d.duracion||'Duración por confirmar'}`);
    row('Alcance',`${d.peso||'Peso por confirmar'} · ${d.altura||'Altura por confirmar'} · ${d.ciudad_final||'Ubicación por confirmar'}`);
    section('Resumen económico');
    pdf.setFont('helvetica','normal');pdf.setFontSize(8.5);pdf.setTextColor(71,82,93);pdf.text('Los importes se determinan después de revisar disponibilidad, capacidad, radio, accesos, duración y condiciones reales del servicio.',margin,y,{maxWidth:178});y+=12;
    amountRow('Subtotal','Por confirmar');amountRow('IVA','Por confirmar');pdf.setDrawColor(9,31,54);pdf.line(118,y-2,195,y-2);amountRow('TOTAL','Por confirmar',true);
    ensureSpace(35);y+=2;pdf.setFillColor(255,248,224);pdf.roundedRect(margin,y,180,27,2,2,'F');pdf.setTextColor(120,77,0);pdf.setFont('helvetica','bold');pdf.setFontSize(9);pdf.text('Condiciones de la solicitud',margin+4,y+6);pdf.setFont('helvetica','normal');pdf.setFontSize(8);const note=pdf.splitTextToSize('Documento generado con la información proporcionada por el cliente. No representa confirmación de disponibilidad ni precio final. La cotización económica se emite después de la revisión técnica y comercial del proyecto.',172);pdf.text(note,margin+4,y+12);y+=31;
    const pages=pdf.getNumberOfPages();for(let p=1;p<=pages;p++){pdf.setPage(p);pdf.setDrawColor(225,228,232);pdf.line(15,283,195,283);pdf.setTextColor(90,98,108);pdf.setFont('helvetica','normal');pdf.setFontSize(7.5);pdf.text('Grúas Telescópicas · 442 179 1079 · Querétaro y Bajío',15,289);pdf.text(`Página ${p} de ${pages}`,195,289,{align:'right'})}
    pdf.save(`Solicitud_Cotizacion_${f}.pdf`);toast('PDF generado correctamente');
  }
  function toast(t){let el=document.querySelector('.toast');if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2400)}

  // ----- Integración del chatbot -----
  function setChatValue(formEl,sources,name,value){
    if(value===undefined||value===null||value==='')return false;
    const el=formEl.elements[name];if(!el||sources[name]==='manual')return false;
    if(el.tagName==='SELECT'&&!Array.from(el.options).some(o=>o.value===value))return false;
    el.value=value;sources[name]='chat';return true;
  }
  function applyChatPrefill(data){
    if(!data||!data.mode)return;
    if(data.mode==='informes'){
      setMode('informes',false);
      if(data.servicio||data.necesidad)setChatValue(infoForm,infoSources,'servicio',data.servicio||data.necesidad);
      const keepInfoCity=infoSources.ciudad==='manual'?infoCity.value:'';
      const keepInfoManual=infoSources.ciudad_manual==='manual'?infoManual.value:'';
      if(data.estado&&infoSources.estado!=='manual'){infoState.value=data.estado;infoSources.estado='chat';updateInfoCities(keepInfoCity||data.ciudad||'')}
      if(keepInfoCity&&Array.from(infoCity.options).some(o=>o.value===keepInfoCity)){infoCity.value=keepInfoCity;infoSources.ciudad='manual'}else if(data.ciudad&&infoSources.ciudad!=='manual'){infoCity.value=data.ciudad;infoSources.ciudad='chat'}
      if(keepInfoManual){infoManual.value=keepInfoManual;infoSources.ciudad_manual='manual'}else if(data.ciudad_manual&&infoSources.ciudad_manual!=='manual'){infoManual.value=data.ciudad_manual;infoSources.ciudad_manual='chat'}
      ['nombre','telefono','mensaje'].forEach(k=>setChatValue(infoForm,infoSources,k,data[k]));toggleInfoManual();
      return;
    }
    if(data.mode==='cotizacion'){
      setMode('cotizacion',false);
      const keepEq=quoteSources.equipo==='manual'?equipment.value:'';
      const keepProject=quoteSources.proyecto==='manual'?project.value:'';
      const keepCity=quoteSources.ciudad==='manual'?qCity.value:'';
      const keepManualCity=quoteSources.ciudad_manual==='manual'?qManual.value:'';
      if(data.necesidad&&quoteSources.necesidad!=='manual'){
        need.value=data.necesidad;quoteSources.necesidad='chat';configureNeed(keepEq||data.equipo||'','chat');
        if(keepEq&&Array.from(equipment.options).some(o=>o.value===keepEq)){equipment.value=keepEq;quoteSources.equipo='manual'}
        if(keepProject&&Array.from(project.options).some(o=>o.value===keepProject)){project.value=keepProject;quoteSources.proyecto='manual'}
      }
      if(data.equipo&&quoteSources.equipo!=='manual'&&Array.from(equipment.options).some(o=>o.value===data.equipo)){equipment.value=data.equipo;quoteSources.equipo='chat'}
      if(data.proyecto&&quoteSources.proyecto!=='manual'&&Array.from(project.options).some(o=>o.value===data.proyecto)){project.value=data.proyecto;quoteSources.proyecto='chat'}
      if(data.estado&&quoteSources.estado!=='manual'){qState.value=data.estado;quoteSources.estado='chat';updateQuoteCities(keepCity||data.ciudad||'')}
      if(keepCity&&Array.from(qCity.options).some(o=>o.value===keepCity)){qCity.value=keepCity;quoteSources.ciudad='manual'}else if(data.ciudad&&quoteSources.ciudad!=='manual'){qCity.value=data.ciudad;quoteSources.ciudad='chat'}
      if(keepManualCity){qManual.value=keepManualCity;quoteSources.ciudad_manual='manual'}else if(data.ciudad_manual&&quoteSources.ciudad_manual!=='manual'){qManual.value=data.ciudad_manual;quoteSources.ciudad_manual='chat'}
      ['variante','fecha','duracion','peso','altura','maniobra','nombre','telefono','empresa','email','notas'].forEach(k=>setChatValue(form,quoteSources,k,data[k]));toggleQuoteManual();summary();
    }
  }
  function clearChatFields(){
    const manualInfoCity=infoSources.ciudad==='manual'?infoCity.value:'';
    const manualInfoCityText=infoSources.ciudad_manual==='manual'?infoManual.value:'';
    Object.keys(infoSources).forEach(name=>{if(infoSources[name]!=='chat')return;const el=infoForm.elements[name];if(el)el.value='';delete infoSources[name]});
    if(!infoState.value&&manualInfoCity){const st=inferStateFromCity(manualInfoCity);if(st){infoState.value=st;infoSources.estado='manual'}}
    if(infoState.value)updateInfoCities(manualInfoCity);else updateInfoCities();
    if(manualInfoCity&&Array.from(infoCity.options).some(o=>o.value===manualInfoCity)){infoCity.value=manualInfoCity;infoSources.ciudad='manual'}
    if(manualInfoCityText){infoManual.value=manualInfoCityText;infoSources.ciudad_manual='manual'}
    toggleInfoManual();

    const manualEq=quoteSources.equipo==='manual'?equipment.value:'';
    const manualProject=quoteSources.proyecto==='manual'?project.value:'';
    const manualCity=quoteSources.ciudad==='manual'?qCity.value:'';
    const manualCityText=quoteSources.ciudad_manual==='manual'?qManual.value:'';
    const chatQuote=Object.keys(quoteSources).filter(name=>quoteSources[name]==='chat');
    chatQuote.forEach(name=>{const el=form.elements[name];if(el)el.value=(name==='peso'||name==='altura')?'No lo sé / por confirmar':'';delete quoteSources[name]});

    if(!need.value&&manualEq){const inferred=inferNeedFromEquipment(manualEq);if(inferred){need.value=inferred;quoteSources.necesidad='manual'}}
    if(need.value){configureNeed(manualEq||equipment.value,quoteSources.necesidad==='manual'?'manual':'system');if(manualEq&&Array.from(equipment.options).some(o=>o.value===manualEq)){equipment.value=manualEq;quoteSources.equipo='manual'}if(manualProject&&Array.from(project.options).some(o=>o.value===manualProject)){project.value=manualProject;quoteSources.proyecto='manual'}}else configureNeed('','system');

    if(!qState.value&&manualCity){const st=inferStateFromCity(manualCity);if(st){qState.value=st;quoteSources.estado='manual'}}
    if(qState.value)updateQuoteCities(manualCity);else updateQuoteCities();
    if(manualCity&&Array.from(qCity.options).some(o=>o.value===manualCity)){qCity.value=manualCity;quoteSources.ciudad='manual'}
    if(manualCityText){qManual.value=manualCityText;quoteSources.ciudad_manual='manual'}
    toggleQuoteManual();summary();
  }
  window.addEventListener('gdb:chat-prefill-updated',e=>applyChatPrefill(e.detail));
  window.addEventListener('gdb:chat-reset',clearChatFields);

  // ----- Estado inicial -----
  const now=new Date();now.setMinutes(now.getMinutes()-now.getTimezoneOffset());qDate.min=now.toISOString().slice(0,10);
  restoreInfoManual();restoreQuoteManual();
  const params=new URLSearchParams(location.search);
  const eq=params.get('equipo');
  if(eq&&window.EQUIPOS.some(x=>x.id===eq)&&quoteSources.equipo!=='manual'){
    const key=inferNeedFromEquipment(eq)||'no-se';need.value=key;quoteSources.necesidad='manual';configureNeed(eq,'manual');equipment.value=eq;quoteSources.equipo='manual';updateVariants();summary();setMode('cotizacion',false);
  }else setMode(params.get('modo')==='cotizacion'?'cotizacion':'informes',false);
  const urlState=params.get('estado'),urlCity=params.get('ciudad');
  if(urlState&&LOCATIONS[urlState]&&quoteSources.estado!=='manual'){qState.value=urlState;quoteSources.estado='manual';updateQuoteCities(urlCity||'');if(urlCity&&LOCATIONS[urlState].includes(urlCity)){qCity.value=urlCity;quoteSources.ciudad='manual'}}
  try{applyChatPrefill(JSON.parse(sessionStorage.getItem(CHAT_KEY)||'null'))}catch(e){}
  showStep(1);summary();
})();

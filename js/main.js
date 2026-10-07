(function(){
  const FALLBACK = 'assets/fallback-equipo.svg';
  const PHONE = '524421791079';
  const PHONE_DISPLAY = '442 179 1079';
  const PHONE_2_DISPLAY = '';
  const COVERAGE = ['Querétaro','Guanajuato','Aguascalientes','Jalisco','San Luis Potosí','Zacatecas','Estado de México','CDMX'];

  document.querySelectorAll('img[data-fallback]').forEach(img=>img.addEventListener('error',()=>{img.src=img.dataset.fallback||FALLBACK},{once:true}));

  const menuBtn=document.querySelector('.menu-toggle');
  const nav=document.querySelector('.nav-links');
  if(menuBtn&&nav){
    menuBtn.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open))});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false')}));
  }

  const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));

  const y=document.querySelector('[data-year]'); if(y)y.textContent=new Date().getFullYear();

  const featured=document.querySelector('#featured-equipment');
  if(featured&&window.EQUIPOS){
    window.EQUIPOS.filter(x=>x.featured&&x.catalogVisible!==false).slice(0,6).forEach(item=>featured.appendChild(card(item)));
  }

  function card(item){
    const el=document.createElement('article');el.className='equipment-card reveal';
    el.innerHTML=`<div class="equipment-image"><img src="${item.imagen}" data-fallback="${FALLBACK}" alt="${item.imagenAlt||item.nombre}" loading="lazy" decoding="async"><span class="card-tag">${item.etiqueta}</span></div><div class="equipment-body"><h3>${item.nombre}</h3><p>${item.descripcion}</p><div class="equipment-meta"><strong>Uso:</strong> ${item.uso}</div><div class="card-actions"><a class="btn ghost slim" href="${item.pagina||`catalogo.html#${item.id}`}">Detalles</a><a class="btn primary slim" href="cotizador.html?modo=cotizacion&equipo=${item.id}">Cotizar</a></div></div>`;
    const img=el.querySelector('img');img.addEventListener('error',()=>img.src=FALLBACK,{once:true});setTimeout(()=>el.classList.add('visible'),30);return el;
  }

  const quickForm=document.querySelector('#quick-contact');
  if(quickForm){quickForm.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(quickForm);const msg=`Hola, quiero solicitar información sobre renta de equipo.\nNombre: ${f.get('nombre')}\nTeléfono: ${f.get('telefono')}\nServicio: ${f.get('servicio')}\nCiudad: ${f.get('ciudad')}`;window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,'_blank','noopener');});}

  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id&&id.length>1){const t=document.querySelector(id);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'})}}}));

  const progress=document.createElement('div');progress.className='scroll-progress';document.body.prepend(progress);
  const header=document.querySelector('.site-header');
  const updateScroll=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(h>0?Math.min(100,(window.scrollY/h)*100):0)+'%';header?.classList.toggle('scrolled',window.scrollY>16)};
  addEventListener('scroll',updateScroll,{passive:true});updateScroll();

  document.querySelectorAll('.equipment-grid,.process,.quickbar-card,.contact-grid').forEach(group=>{[...group.querySelectorAll('.reveal')].forEach((el,i)=>el.dataset.revealIndex=String((i%6)+1))});
  document.querySelectorAll('.quick-item,.step,.detail-card').forEach((el,i)=>{if(!el.classList.contains('reveal'))el.classList.add('reveal');el.dataset.revealIndex=String((i%6)+1);reveal.observe(el)});

  // Floating WhatsApp: icon only, no label.
  if(!document.querySelector('.floating-whatsapp')){
    const a=document.createElement('a');
    a.className='floating-whatsapp';
    a.href=`https://wa.me/${PHONE}?text=${encodeURIComponent('Hola, quiero informes sobre sus servicios.')}`;
    a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','Abrir WhatsApp');a.setAttribute('title','WhatsApp');
    a.innerHTML=`<svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.04 3C9.43 3 4.08 8.2 4.08 14.62c0 2.27.67 4.48 1.94 6.37L4 28.95l8.17-2.13a12.2 12.2 0 0 0 3.87.63h.01c6.6 0 11.96-5.2 11.96-11.61C28.01 9.4 22.65 3 16.04 3Zm0 22.34h-.01a10.1 10.1 0 0 1-3.46-.6l-.25-.09-4.85 1.27 1.29-4.59-.16-.26a9.3 9.3 0 0 1-1.5-5.05c0-5.12 4.27-9.29 9.52-9.29 5.24 0 9.51 4.17 9.51 9.29 0 5.12-4.27 9.32-9.55 9.32Zm5.22-6.95c-.29-.14-1.69-.81-1.95-.91-.26-.09-.45-.14-.64.14-.19.28-.74.91-.91 1.1-.17.19-.33.21-.62.07-.29-.14-1.22-.44-2.32-1.39-.86-.74-1.44-1.66-1.61-1.94-.17-.28-.02-.43.13-.57.13-.13.29-.33.43-.5.14-.16.19-.28.29-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.5-.88-2.05-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1  .95-1 2.32s1.03 2.7 1.17 2.88c.14.19 2.02 3.01 4.9 4.22.68.29 1.22.46 1.64.59.69.21 1.31.18 1.8.11.55-.08 1.69-.67 1.93-1.32.24-.65.24-1.2.17-1.32-.07-.12-.26-.19-.55-.33Z"/></svg>`;
    document.body.appendChild(a);
  }

  buildSmartAssistant();

  function buildSmartAssistant(){
    const CHAT_KEY='gtmx-chat-prefill-v9';
    const INACTIVITY_MS=5*60*1000;
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
    const NEEDS={
      'elevar-carga':{label:'Elevar o montar una carga',preferred:'grua-telescopica',projects:['Montaje de estructura metálica','Montaje de maquinaria','Izaje de equipo industrial','Colocación de tanque / transformador','Carga o descarga pesada','Otro proyecto de izaje']},
      'cargar-trasladar':{label:'Cargar, trasladar y descargar',preferred:'grua-titan',projects:['Traslado y colocación de maquinaria','Carga y descarga de materiales','Movimiento de equipo industrial','Traslado de estructura','Otro traslado con maniobra']},
      'trabajo-altura':{label:'Trabajo de personal en altura',preferred:'plataforma-aerea-articulada',projects:['Mantenimiento industrial','Instalación eléctrica','Trabajo en fachada','Pintura / mantenimiento exterior','Trabajo dentro de nave','Otro trabajo en altura']},
      'mover-carga':{label:'Mover carga en planta o almacén',preferred:'montacargas-01',projects:['Carga y descarga de tráiler','Movimiento interno de maquinaria','Movimiento de tarimas','Reacomodo de equipos','Apoyo en instalación industrial','Otro movimiento interno']},
      'excavar':{label:'Excavar o mover material',preferred:'retroexcavadora',projects:['Excavación de zanja','Preparación de terreno','Nivelación','Movimiento de material','Limpieza de área','Apoyo en obra civil']},
      'transportar-maquinaria':{label:'Transportar maquinaria o equipo pesado',preferred:'lowboy',projects:['Traslado de maquinaria pesada','Traslado de equipo industrial','Movimiento entre plantas','Entrega o recolección en obra','Traslado vehicular']},
      'iluminar':{label:'Iluminar una zona de trabajo',preferred:'torre-luz',projects:['Obra nocturna','Mantenimiento nocturno','Iluminación de patio','Operación temporal','Emergencia o contingencia']},
      'acceso-temporal':{label:'Andamios o acceso temporal',preferred:'andamios',projects:['Trabajo en fachada','Mantenimiento','Instalación','Obra civil','Acceso temporal']},
      'maniobra-integral':{label:'Maniobra industrial / montaje completo',preferred:'maniobras-industriales',projects:['Montaje de maquinaria','Movimiento de línea o equipo','Instalación industrial','Desmontaje y reubicación','Proyecto especial']},
      'no-se':{label:'No sé qué equipo necesito',preferred:'',projects:['Montaje / izaje','Carga y descarga','Trabajo en altura','Movimiento interno','Excavación / obra','Transporte especializado','Proyecto especial / necesito asesoría']}
    };
    const WEIGHTS=['No lo sé / por confirmar','Menos de 1 tonelada','1 a 5 toneladas','5 a 10 toneladas','10 a 20 toneladas','20 a 50 toneladas','Más de 50 toneladas'];
    const HEIGHTS=['No lo sé / por confirmar','A nivel de piso','Hasta 6 m','6 a 12 m','12 a 20 m','20 a 30 m','Más de 30 m'];
    const DURATIONS=['1 a 4 horas','4 a 8 horas','1 jornada','2 a 3 días','4 a 7 días','Más de una semana','Por proyecto / por confirmar'];

    document.querySelector('.chat-launcher')?.remove();
    document.querySelector('.chat-box')?.remove();

    const launcher=document.createElement('button');
    launcher.type='button';launcher.className='chat-launcher';launcher.setAttribute('aria-label','Abrir asistente');launcher.setAttribute('aria-expanded','false');launcher.innerHTML='<span aria-hidden="true">💬</span>';
    document.body.appendChild(launcher);

    const box=document.createElement('section');
    box.className='chat-box smart-chat';box.setAttribute('aria-label','Asistente de Grúas Telescópicas');
    box.innerHTML=`
      <div class="chat-head">
        <div class="chat-brand"><img src="assets/logo-gruas-telescopicas.png" alt=""><div><strong>Asistente</strong><div class="small">Grúas Telescópicas</div></div></div>
        <div class="chat-head-actions"><button type="button" data-chat-reset aria-label="Nueva consulta" title="Nueva consulta">↻</button><button type="button" data-chat-close aria-label="Cerrar asistente">×</button></div>
      </div>
      <div class="chat-messages" aria-live="polite"></div>
      <div class="chat-options"></div>
      <form class="chat-input-row" data-chat-form>
        <input type="text" data-chat-input autocomplete="off" placeholder="Escribe tu mensaje..." aria-label="Escribe tu mensaje">
        <button type="submit" aria-label="Enviar mensaje">➤</button>
      </form>
      <div class="chat-privacy">Los datos del chat se usan para ayudarte y precargar tu solicitud. <a href="privacidad.html">Protección de datos</a></div>`;
    document.body.appendChild(box);

    const messages=box.querySelector('.chat-messages');
    const options=box.querySelector('.chat-options');
    const close=box.querySelector('[data-chat-close]');
    const resetBtn=box.querySelector('[data-chat-reset]');
    const chatForm=box.querySelector('[data-chat-form]');
    const input=box.querySelector('[data-chat-input]');
    let context={topic:'start',awaiting:null};
    let session={mode:null};
    let inactivityTimer=null;
    let sessionActive=!!sessionStorage.getItem(CHAT_KEY);

    const strip=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
    const todayISO=(offset=0)=>{const d=new Date();d.setDate(d.getDate()+offset);d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10)};
    const validPhone=v=>String(v||'').replace(/\D/g,'').length>=10;
    const eqName=id=>window.EQUIPOS?.find(x=>x.id===id)?.nombre||({
      'grua-telescopica':'Grúa telescópica','grua-titan':'Grúa Titán','grua-hiab':'Grúa HIAB','plataforma-aerea-articulada':'Plataforma articulada','montacargas-01':'Montacargas','retroexcavadora':'Retroexcavadora','lowboy':'Lowboy / cama baja','torre-luz':'Torre de luz','andamios':'Andamios','maniobras-industriales':'Maniobras industriales'
    }[id]||id||'');

    launcher.addEventListener('click',()=>{const open=box.classList.toggle('open');launcher.setAttribute('aria-expanded',String(open));if(open){if(messages.children.length===0)start();input.focus();startInactivity()}});
    close.addEventListener('click',()=>{box.classList.remove('open');launcher.setAttribute('aria-expanded','false');if(sessionActive)startInactivity()});
    resetBtn.addEventListener('click',()=>resetConversation('manual'));
    chatForm.addEventListener('submit',e=>{e.preventDefault();const value=input.value.trim();if(!value)return;input.value='';addBubble(value,'user');handleText(value);markActivity()});

    ['pointerdown','keydown','scroll','touchstart','mousemove'].forEach(evt=>window.addEventListener(evt,markActivity,{passive:true}));
    if(sessionActive)startInactivity();

    function markActivity(){if(!sessionActive&&!box.classList.contains('open'))return;sessionActive=true;clearTimeout(inactivityTimer);inactivityTimer=setTimeout(()=>resetConversation('inactivity'),INACTIVITY_MS)}
    function startInactivity(){sessionActive=true;markActivity()}
    function stopInactivity(){clearTimeout(inactivityTimer);inactivityTimer=null}

    function addBubble(text,type='bot',html=false){const b=document.createElement('div');b.className=`bubble ${type}`;if(html)b.innerHTML=text;else b.textContent=text;messages.appendChild(b);messages.scrollTop=messages.scrollHeight;return b}
    function setOptions(items=[]){options.innerHTML='';items.forEach(item=>{const btn=document.createElement('button');btn.type='button';btn.className='chat-option';btn.textContent=item.label;btn.addEventListener('click',()=>{addBubble(item.label,'user');handleChoice(item);markActivity()});options.appendChild(btn)})}
    function linkButton(label,href,kind='primary'){return `<a class="chat-action ${kind}" href="${href}"${href.startsWith('http')?' target="_blank" rel="noopener"':''}>${label}</a>`}
    function wa(text){return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`}
    function persist(){sessionStorage.setItem(CHAT_KEY,JSON.stringify(session));window.dispatchEvent(new CustomEvent('gdb:chat-prefill-updated',{detail:session}));sessionActive=true;markActivity()}
    function clearChatData(){sessionStorage.removeItem(CHAT_KEY);session={mode:null};window.dispatchEvent(new CustomEvent('gdb:chat-reset'));}
    function resetConversation(reason='manual'){
      clearChatData();context={topic:'start',awaiting:null};messages.innerHTML='';options.innerHTML='';stopInactivity();sessionActive=box.classList.contains('open');
      if(box.classList.contains('open')){if(reason==='inactivity')addBubble('La conversación se reinició por 5 minutos de inactividad. Los datos precargados desde el chat se borraron; lo que hayas escrito manualmente en el formulario se conserva.');else addBubble('Listo, empezamos una nueva consulta.');start(false);startInactivity()}
    }
    function start(withGreeting=true){context={topic:'start',awaiting:null};if(withGreeting)addBubble('Hola. Puedo ayudarte con una cotización, elegir equipo, revisar cobertura o resolver dudas del servicio.');setOptions([{id:'quote',label:'Quiero cotizar'},{id:'info',label:'Solo quiero informes'},{id:'equipment',label:'¿Qué equipo necesito?'},{id:'coverage',label:'Revisar cobertura'},{id:'urgent',label:'Lo necesito pronto'}]);input.placeholder='Escribe tu pregunta...'}
    function finishOptions(){setOptions([{id:'more',label:'¿Te ayudo en algo más?'},{id:'quote',label:'Hacer una cotización'},{id:'info',label:'Pedir informes'}])}

    function handleChoice(item){
      const id=item.id;
      if(id==='more'||id==='reset')return resetConversation('manual');
      if(id==='quote')return beginQuote();
      if(id==='info')return beginInfo();
      if(id==='equipment')return equipmentFlow();
      if(id==='coverage')return coverageFlow();
      if(id==='urgent')return urgencyFlow();
      if(id.startsWith('need:'))return chooseNeed(id.split(':')[1]);
      if(id.startsWith('project:'))return chooseProject(item.value);
      if(id.startsWith('state:'))return chooseState(item.value);
      if(id.startsWith('city:'))return chooseCity(item.value);
      if(id.startsWith('date:'))return chooseDate(id.split(':')[1]);
      if(id.startsWith('duration:'))return chooseDuration(item.value);
      if(id.startsWith('weight:'))return chooseWeight(item.value);
      if(id.startsWith('height:'))return chooseHeight(item.value);
      if(id.startsWith('urgency:'))return urgencyAnswer(id.split(':')[1]);
      if(id.startsWith('equipinfo:'))return equipmentAnswer(id.split(':')[1]);
    }

    function handleText(raw){
      const text=strip(raw);
      if(context.awaiting==='city')return acceptTypedCity(raw);
      if(context.awaiting==='date')return acceptTypedDate(raw);
      if(context.awaiting==='name')return acceptName(raw);
      if(context.awaiting==='phone')return acceptPhone(raw);
      if(context.awaiting==='info-question')return acceptInfoQuestion(raw);
      if(context.awaiting==='project')return acceptProjectText(raw);
      if(context.awaiting==='state')return acceptStateText(raw);
      if(context.awaiting==='need')return acceptNeedText(raw);

      if(/cotiz|precio|presupuesto/.test(text))return beginQuote();
      if(/urgente|hoy|mañana|pronto|24|48/.test(text))return urgencyFlow();
      if(/cobertura|municipio|ciudad|estado|zona/.test(text))return coverageFlow();
      if(/montacargas|grua|grúa|plataforma|retro|lowboy|hiab|titan|titán|andamio|bobcat/.test(text))return answerEquipmentKeyword(text);
      if(/telefono|teléfono|llamar|contacto|correo|email|whatsapp/.test(text)){addBubble(`Puedes llamar o escribir por WhatsApp al ${PHONE_DISPLAY}.`);finishOptions();return}
      if(/catalogo|catálogo|productos|equipos/.test(text)){addBubble('El catálogo integra las familias y variantes disponibles de grúas, plataformas, montacargas, maquinaria, transporte y equipo de apoyo. Puedes buscar por equipo o por tipo de trabajo.');addBubble(`${linkButton('Ver catálogo','catalogo.html','secondary')}${linkButton('Cotizar','cotizador.html?modo=cotizacion')}`,'bot',true);finishOptions();return}
      if(/horario|disponib/.test(text)){addBubble('La disponibilidad depende del equipo, municipio y fecha. Para servicios cercanos conviene consultar en cuanto antes porque la agenda puede cambiar durante el día.');addBubble(`${linkButton('Consultar disponibilidad',wa('Hola, quiero consultar disponibilidad para un servicio.'),'wa')}${linkButton('Cotizar','cotizador.html?modo=cotizacion')}`,'bot',true);finishOptions();return}
      addBubble('Puedo orientarte con equipos, cobertura, disponibilidad, informes o una cotización. Si me dices qué necesitas hacer, te guío paso a paso.');start(false);
    }

    function beginQuote(){
      clearChatData();session={mode:'cotizacion'};context={topic:'quote',awaiting:'need'};persist();
      addBubble('Perfecto. Voy a tomar los datos básicos y los cargaré automáticamente en el cotizador. Primero: ¿qué necesitas hacer?');
      setOptions(Object.entries(NEEDS).filter(([k])=>k!=='no-se').map(([k,v])=>({id:'need:'+k,label:v.label})).concat([{id:'need:no-se',label:'No estoy seguro'}]));input.placeholder='También puedes escribirlo...';
    }
    function chooseNeed(key){const cfg=NEEDS[key]||NEEDS['no-se'];session.necesidad=key;session.equipo=cfg.preferred||'';context.awaiting='project';persist();addBubble(cfg.preferred?`Por lo que indicas, una primera opción a revisar es ${eqName(cfg.preferred)}. La unidad final se confirma con los datos de la maniobra.`:'No pasa nada. Con los datos del proyecto podemos orientarte.');addBubble('¿Qué tipo de proyecto es?');setOptions(cfg.projects.map(x=>({id:'project:'+x,label:x,value:x})));input.placeholder='Escribe el tipo de proyecto...'}
    function chooseProject(value){session.proyecto=value;context.awaiting='state';persist();addBubble('¿En qué estado será el servicio?');setOptions(Object.keys(LOCATIONS).map(x=>({id:'state:'+x,label:x,value:x})));input.placeholder='Escribe el estado...'}
    function chooseState(value){session.estado=value;delete session.ciudad;delete session.ciudad_manual;context.awaiting='city';persist();const cities=LOCATIONS[value]||LOCATIONS.Otro;addBubble(value==='Otro'?'Escribe la ciudad o municipio donde sería el servicio.':`¿En qué ciudad o municipio de ${value}? Puedes escribir cualquiera de los municipios disponibles.`);setOptions(cities.slice(0,8).map(x=>({id:'city:'+x,label:x,value:x})));input.placeholder='Escribe ciudad o municipio...'}
    function chooseCity(value){if(value==='Otra ciudad / municipio'){context.awaiting='city';addBubble('Escribe la ciudad o municipio.');setOptions([]);input.placeholder='Ciudad o municipio...';return}session.ciudad=value;context.awaiting='date';persist();askDate()}
    function askDate(){addBubble('¿Para qué fecha necesitas el servicio?');setOptions([{id:'date:today',label:'Hoy'},{id:'date:tomorrow',label:'Mañana'},{id:'date:unknown',label:'Por confirmar'}]);input.placeholder='También puedes escribir DD/MM/AAAA...'}
    function chooseDate(kind){if(kind==='today')session.fecha=todayISO(0);if(kind==='tomorrow')session.fecha=todayISO(1);if(kind==='unknown')delete session.fecha;persist();context.awaiting='duration';if(kind==='today'||kind==='tomorrow')addBubble('Para una fecha tan cercana, la disponibilidad puede cambiar rápido. Conviene enviar la solicitud cuanto antes para revisar equipo y horario disponibles.');addBubble('¿Cuánto tiempo calculas que necesitarás el equipo?');setOptions(DURATIONS.map(x=>({id:'duration:'+x,label:x,value:x})));input.placeholder='Selecciona una duración...'}
    function chooseDuration(value){session.duracion=value;context.awaiting='weight';persist();addBubble('¿Conoces el peso aproximado de la carga?');setOptions(WEIGHTS.map(x=>({id:'weight:'+x,label:x,value:x})));input.placeholder='Selecciona un rango...'}
    function chooseWeight(value){session.peso=value;context.awaiting='height';persist();addBubble('¿Y la altura aproximada de trabajo?');setOptions(HEIGHTS.map(x=>({id:'height:'+x,label:x,value:x})));input.placeholder='Selecciona una altura...'}
    function chooseHeight(value){session.altura=value;context.awaiting='name';persist();setOptions([]);addBubble('Ya casi. ¿A nombre de quién preparo la solicitud?');input.placeholder='Escribe tu nombre...'}
    function acceptName(value){session.nombre=value.trim();context.awaiting='phone';persist();addBubble(`Gracias, ${value.trim().split(' ')[0]}. ¿Qué teléfono o WhatsApp usamos para contactarte?`);input.placeholder='10 dígitos...'}
    function acceptPhone(value){if(!validPhone(value)){addBubble('Necesito un teléfono de al menos 10 dígitos para poder dejar lista la solicitud.');return}session.telefono=value.trim();context.awaiting=null;persist();showQuoteReady()}
    function showQuoteReady(){const cfg=NEEDS[session.necesidad]||NEEDS['no-se'];addBubble(`Listo. Ya cargué: ${cfg.label}, ${session.ciudad||session.ciudad_manual||'ubicación por confirmar'}${session.estado?', '+session.estado:''}, ${session.fecha||'fecha por confirmar'} y tus datos de contacto.`);addBubble('Puedes abrir el cotizador para revisar o completar lo que falte. Los campos que cargó el chat se borrarán si reinicias la conversación o pasan 5 minutos sin actividad; lo que escribas manualmente en el formulario se conserva.');addBubble(`${linkButton('Revisar cotización','cotizador.html?modo=cotizacion#solicitudes')}${linkButton('Enviar mensaje',wa('Hola, ya preparé una solicitud en el cotizador y quiero confirmar disponibilidad.'),'wa')}`,'bot',true);finishOptions();input.placeholder='¿Necesitas algo más?'}

    function acceptNeedText(raw){const t=strip(raw);const map=[[/altura|personal|fachada/,'trabajo-altura'],[/montacargas|almacen|almacén|tarima/,'mover-carga'],[/excav|tierra|nivelar|retro/,'excavar'],[/transport|lowboy|maquinaria.*traslad/,'transportar-maquinaria'],[/ilum|torre.*luz/,'iluminar'],[/andam|acceso/,'acceso-temporal'],[/maniobra|montaje completo/,'maniobra-integral'],[/cargar|descargar|trasladar/,'cargar-trasladar'],[/grua|grúa|elevar|izaje|montar/,'elevar-carga']];const hit=map.find(([re])=>re.test(t));chooseNeed(hit?hit[1]:'no-se')}
    function acceptProjectText(raw){session.proyecto=raw.trim();context.awaiting='state';persist();addBubble('¿En qué estado será el servicio?');setOptions(Object.keys(LOCATIONS).map(x=>({id:'state:'+x,label:x,value:x})));input.placeholder='Escribe el estado...'}
    function acceptStateText(raw){const t=strip(raw);const match=Object.keys(LOCATIONS).find(x=>strip(x)===t||strip(x).includes(t)||t.includes(strip(x)));if(!match){addBubble('No identifiqué el estado. Puedes elegir una opción o escribirlo de nuevo.');return}chooseState(match)}
    function acceptTypedCity(raw){const list=LOCATIONS[session.estado]||[];const t=strip(raw);const match=list.find(x=>strip(x)===t||strip(x).includes(t)||t.includes(strip(x)));if(match&&match!=='Otra ciudad / municipio'){session.ciudad=match}else{session.ciudad='Otra ciudad / municipio';session.ciudad_manual=raw.trim()}context.awaiting='date';persist();askDate()}
    function acceptTypedDate(raw){const t=strip(raw);if(/hoy/.test(t))return chooseDate('today');if(/mañana|manana/.test(t))return chooseDate('tomorrow');const m=raw.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);if(!m){addBubble('Escribe la fecha como DD/MM/AAAA, o usa “Hoy”, “Mañana” o “Por confirmar”.');return}const iso=`${m[3]}-${String(m[2]).padStart(2,'0')}-${String(m[1]).padStart(2,'0')}`;if(Number.isNaN(Date.parse(iso))){addBubble('Esa fecha no parece válida. Inténtalo de nuevo.');return}session.fecha=iso;persist();context.awaiting='duration';addBubble('¿Cuánto tiempo calculas que necesitarás el equipo?');setOptions(DURATIONS.map(x=>({id:'duration:'+x,label:x,value:x})));input.placeholder='Selecciona una duración...'}

    function beginInfo(){clearChatData();session={mode:'informes'};context={topic:'info',awaiting:'need'};persist();addBubble('Claro. Te pido solo lo necesario para que te contacten. ¿Sobre qué servicio necesitas informes?');setOptions(Object.entries(NEEDS).filter(([k])=>k!=='no-se').map(([k,v])=>({id:'need:'+k,label:v.label})).concat([{id:'need:no-se',label:'No estoy seguro'}]));input.placeholder='Escribe el servicio...'}
    // If quote/info uses the same need choices, continue according to mode.
    const originalChooseNeed=chooseNeed;
    chooseNeed=function(key){
      if(session.mode!=='informes')return originalChooseNeed(key);
      const cfg=NEEDS[key]||NEEDS['no-se'];session.servicio=key;session.necesidad=key;context.awaiting='state';persist();addBubble('¿En qué estado estás?');setOptions(Object.keys(LOCATIONS).map(x=>({id:'state:'+x,label:x,value:x})));input.placeholder='Escribe el estado...';
    };
    const originalChooseState=chooseState;
    chooseState=function(value){
      if(context.topic==='coverage')return coverageChooseState(value);
      if(session.mode!=='informes')return originalChooseState(value);
      session.estado=value;context.awaiting='city';persist();const cities=LOCATIONS[value]||LOCATIONS.Otro;addBubble('¿En qué ciudad o municipio?');setOptions(cities.slice(0,8).map(x=>({id:'city:'+x,label:x,value:x})));input.placeholder='Ciudad o municipio...';
    };
    const originalChooseCity=chooseCity;
    chooseCity=function(value){
      if(context.topic==='coverage')return coverageChooseCity(value);
      if(session.mode!=='informes')return originalChooseCity(value);
      if(value==='Otra ciudad / municipio'){context.awaiting='city';setOptions([]);addBubble('Escribe tu ciudad o municipio.');return}
      session.ciudad=value;context.awaiting='name';persist();setOptions([]);addBubble('¿Cuál es tu nombre?');input.placeholder='Tu nombre...';
    };
    const originalAcceptTypedCity=acceptTypedCity;
    acceptTypedCity=function(raw){
      if(context.topic==='coverage')return coverageTypedCity(raw);
      if(session.mode!=='informes')return originalAcceptTypedCity(raw);
      const list=LOCATIONS[session.estado]||[],t=strip(raw),match=list.find(x=>strip(x)===t||strip(x).includes(t)||t.includes(strip(x)));if(match&&match!=='Otra ciudad / municipio')session.ciudad=match;else{session.ciudad='Otra ciudad / municipio';session.ciudad_manual=raw.trim()}context.awaiting='name';persist();addBubble('¿Cuál es tu nombre?');setOptions([]);input.placeholder='Tu nombre...';
    };
    const originalAcceptName=acceptName;
    acceptName=function(value){
      if(session.mode!=='informes')return originalAcceptName(value);
      session.nombre=value.trim();context.awaiting='phone';persist();addBubble('¿Qué teléfono o WhatsApp usamos para contactarte?');input.placeholder='10 dígitos...';
    };
    const originalAcceptPhone=acceptPhone;
    acceptPhone=function(value){
      if(session.mode!=='informes')return originalAcceptPhone(value);
      if(!validPhone(value)){addBubble('Necesito un teléfono de al menos 10 dígitos.');return}session.telefono=value.trim();context.awaiting='info-question';persist();addBubble('¿Qué te gustaría saber? Puedes escribir tu duda o poner “listo”.');input.placeholder='Escribe tu duda...';
    };
    function acceptInfoQuestion(raw){if(strip(raw)!=='listo')session.mensaje=raw.trim();context.awaiting=null;persist();addBubble('Listo. Ya cargué tus datos en la solicitud rápida de informes.');addBubble(`${linkButton('Revisar informes','cotizador.html?modo=informes#solicitudes')}${linkButton('Enviar por WhatsApp',wa('Hola, quiero información sobre sus servicios.'),'wa')}`,'bot',true);finishOptions();input.placeholder='¿Necesitas algo más?'}

    function equipmentFlow(){context={topic:'equipment',awaiting:null};addBubble('¿Qué necesitas hacer? Te orientaré con base en el catálogo del sitio.');setOptions([{id:'equipinfo:lift',label:'Elevar o montar carga'},{id:'equipinfo:transport',label:'Cargar y trasladar'},{id:'equipinfo:height',label:'Trabajar en altura'},{id:'equipinfo:warehouse',label:'Mover carga en planta'},{id:'equipinfo:excavate',label:'Excavar o nivelar'},{id:'equipinfo:heavytransport',label:'Transportar maquinaria'}]);input.placeholder='También puedes describir el trabajo...'}
    function equipmentAnswer(kind){const map={lift:'Para izaje o montaje se revisan grúas telescópicas, todo terreno, SANY, Titán, HIAB y maniobras industriales. Peso, altura, radio y acceso determinan la selección.',transport:'Para cargar, trasladar y descargar suelen revisarse Titán, HIAB, plataformas tráiler o lowboy, según peso y ruta.',height:'Para trabajo en altura hay plataformas articuladas, telescópicas, tijera, elevadores personales y camión canastilla.',warehouse:'Para movimiento dentro de planta u obra se contemplan montacargas, telehandler, equipo especial de manipulación y patín pallet.',excavate:'Para excavación o nivelación se contemplan retroexcavadoras y Bobcat/minicargador.',heavytransport:'Para maquinaria o cargas especiales se contemplan lowboy/cama baja, plataforma tráiler y transporte de vehículos.'};addBubble(map[kind]||'Puedo ayudarte a revisar la opción adecuada si me dices qué necesitas mover o hacer.');addBubble(`${linkButton('Ver catálogo','catalogo.html','secondary')}${linkButton('Preparar cotización','cotizador.html?modo=cotizacion')}`,'bot',true);finishOptions()}
    function answerEquipmentKeyword(text){let kind='lift';if(/montacargas/.test(text))kind='warehouse';else if(/plataforma|canastilla|manlift|genie/.test(text))kind='height';else if(/retro|bobcat/.test(text))kind='excavate';else if(/lowboy/.test(text))kind='heavytransport';else if(/hiab|titan|titán/.test(text))kind='transport';equipmentAnswer(kind)}

    function coverageFlow(){context={topic:'coverage',awaiting:'state'};addBubble(`Actualmente se publica cobertura en ${COVERAGE.join(', ')}. Dime el estado y después revisamos municipio.`);setOptions(COVERAGE.map(x=>({id:'state:'+x,label:x,value:x})).concat([{id:'state:Otro',label:'Otra ubicación',value:'Otro'}]));input.placeholder='Escribe el estado...'}
    function coverageChooseState(value){context={topic:'coverage',awaiting:'city',coverageState:value};const cities=LOCATIONS[value]||LOCATIONS.Otro;if(value==='Otro'){addBubble('Esa ubicación no está dentro de la cobertura publicada. Escribe ciudad y estado y el área comercial puede confirmar si es posible atenderla.');addBubble(linkButton('Consultar ubicación',wa('Hola, quiero confirmar cobertura. Mi ciudad y estado son: '),'wa'),'bot',true);finishOptions();return}addBubble(`${value} sí está dentro de la cobertura publicada. ¿Qué ciudad o municipio necesitas revisar?`);setOptions(cities.slice(0,8).map(x=>({id:'city:'+x,label:x,value:x})));input.placeholder='Escribe ciudad o municipio...'}
    function coverageChooseCity(value){if(value==='Otra ciudad / municipio'){setOptions([]);addBubble('Escribe la ciudad o municipio.');return}addBubble(`${value} aparece dentro de las ubicaciones disponibles para ${context.coverageState}. La atención final depende del tipo de equipo, fecha y disponibilidad.`);addBubble(`${linkButton('Cotizar aquí',`cotizador.html?modo=cotizacion&estado=${encodeURIComponent(context.coverageState)}&ciudad=${encodeURIComponent(value)}`)}${linkButton('Consultar por WhatsApp',wa(`Hola, quiero consultar disponibilidad en ${value}, ${context.coverageState}.`),'wa')}`,'bot',true);finishOptions()}
    function coverageTypedCity(raw){const state=context.coverageState;const list=LOCATIONS[state]||[],t=strip(raw),match=list.find(x=>strip(x)===t||strip(x).includes(t)||t.includes(strip(x)));if(match&&match!=='Otra ciudad / municipio')return coverageChooseCity(match);addBubble(`No tengo ese municipio listado dentro de ${state}, pero el área comercial puede confirmar cobertura puntual.`);addBubble(linkButton('Confirmar ubicación',wa(`Hola, quiero confirmar cobertura en ${raw.trim()}, ${state}.`),'wa'),'bot',true);finishOptions()}
    function urgencyFlow(){context={topic:'urgent',awaiting:null};addBubble('¿Para cuándo necesitas el servicio? La disponibilidad cambia según equipo, municipio y fecha; para servicios cercanos conviene confirmar cuanto antes.');setOptions([{id:'urgency:today',label:'Hoy'},{id:'urgency:48h',label:'En 24–48 horas'},{id:'urgency:week',label:'Esta semana'},{id:'urgency:later',label:'Más adelante'}])}
    function urgencyAnswer(level){const near=level==='today'||level==='48h';if(near){addBubble('Para hoy o las próximas 48 horas, la disponibilidad puede cambiar durante el día. Lo más útil es enviar ubicación y tipo de servicio ahora para revisar equipo disponible.');addBubble(`${linkButton('Llamar ahora',`tel:+52${PHONE_DISPLAY.replace(/\D/g,'')}`,'secondary')}${linkButton('WhatsApp',wa('Hola, necesito un servicio con poca anticipación. Quiero confirmar disponibilidad. Mi ubicación es: '),'wa')}${linkButton('Cotizar','cotizador.html?modo=cotizacion')}`,'bot',true)}else{addBubble('Con más anticipación hay mejor margen para revisar logística, pero la unidad se confirma según disponibilidad de la fecha solicitada.');addBubble(`${linkButton('Preparar cotización','cotizador.html?modo=cotizacion')}${linkButton('Consultar disponibilidad',wa('Hola, quiero consultar disponibilidad para un servicio programado.'),'wa')}`,'bot',true)}finishOptions()}
  }
})();

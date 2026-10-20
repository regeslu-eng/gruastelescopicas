/* Motion layer for homepage only; intentionally does not change contact, chat or quotation logic. */
(()=>{'use strict';
 const mq=window.matchMedia('(prefers-reduced-motion: reduce)');
 const hero=document.querySelector('.gt-cinematic');
 if(!hero||mq.matches)return;
 const photo=hero.querySelector('.gt-depth-card img');
 if(!photo)return;
 let ticking=false;
 const update=()=>{ticking=false;
   if(window.innerWidth<900){photo.style.setProperty('--gt-y','0px');return;}
   const rect=hero.getBoundingClientRect();
   if(rect.bottom<0||rect.top>window.innerHeight)return;
   const offset=Math.max(-12,Math.min(12,(rect.top/window.innerHeight)*-11));
   photo.style.setProperty('--gt-y',offset.toFixed(1)+'px');
 };
 const onScroll=()=>{if(!ticking){window.requestAnimationFrame(update);ticking=true;}};
 window.addEventListener('scroll',onScroll,{passive:true});
 window.addEventListener('resize',onScroll,{passive:true});update();
})();

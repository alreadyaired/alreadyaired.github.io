/* Existing experiences, categories and booking destination; a new presentation only. */
(() => {
 'use strict';
 const section=document.querySelector('#whats-on'),list=section?.querySelector('ul');if(!list)return;
 const cards=[...list.children];
 const entries=[
  ['Safaris','Jungle Safari','A guided drive through Bandipur Tiger Reserve, Karnataka.','BOOK A SAFARI'],
  ['Theatre','A city playhouse','Independent theatre. New stages are joining EN3.','NOT OPEN YET'],
  ['Concerts','A rooftop listening room','Intimate live music, straight from the people behind it.','NOT OPEN YET'],
  ['Comedy','A comedy club','A small room, a microphone, and your next good laugh.','NOT OPEN YET'],
  ['Concerts','A live music bar','Live sets and new sounds, booked at the source.','NOT OPEN YET'],
  ['Safaris','A tiger reserve','More wild places and guided drives are on their way.','NOT OPEN YET'],
  ['Stays','A forest lodge','Stay a little longer. Independent places to switch off.','NOT OPEN YET'],
  ['Workshops','A pottery studio','Make something with your hands. More workshops soon.','NOT OPEN YET'],
  ['Concerts','A festival series','Different artists. One shared good time. Coming soon.','NOT OPEN YET']
 ];
 if(cards.length!==entries.length)return;
 section.classList.add('whatson-carousel');list.classList.add('whatson-track');list.id='whatson-track';
 cards.forEach((li,index)=>{
  const [kind,title,description,action]=entries[index],link=li.querySelector('a'),photo=index===0?li.querySelector('img'):null,icon=li.querySelector('svg');
  const card=document.createElement(link?'a':'article');card.className='whatson-card';if(link)card.href=link.getAttribute('href');
  const media=document.createElement('div');media.className='whatson-media';
  if(photo){photo.alt='Bandipur forest landscape';photo.draggable=false;media.append(photo);}else{
   const orbit=document.createElement('span');orbit.className='whatson-orbit';orbit.setAttribute('aria-hidden','true');media.append(orbit);
   if(icon){icon.setAttribute('aria-hidden','true');media.append(icon);}else{const mark=document.createElement('img');mark.src='/assets/brand/en3-mark-red.svg';mark.alt='';mark.style.cssText='width:70px;height:70px;object-fit:contain';media.append(mark);}
   const edition=document.createElement('span');edition.className='whatson-edition';edition.textContent='AT THE SOURCE / '+String(index+1).padStart(2,'0');edition.setAttribute('aria-hidden','true');media.append(edition);
  }
  const label=document.createElement('span');label.className='whatson-kind';label.textContent=kind;media.append(label);
  const status=document.createElement('span');status.className='whatson-status'+(link?' is-open':'');status.textContent=link?'Booking now':'Not open yet';media.append(status);
  const copy=document.createElement('div');copy.className='whatson-copy';const heading=document.createElement('h3');heading.textContent=title;const text=document.createElement('p');text.textContent=description;const cta=document.createElement('span');cta.className='whatson-action';cta.append(document.createTextNode(action));const arrow=document.createElement('span');arrow.textContent=link?'↗':'—';arrow.setAttribute('aria-hidden','true');cta.append(arrow);copy.append(heading,text,cta);card.append(media,copy);li.replaceChildren(card);
 });
 const viewport=document.createElement('div');viewport.className='whatson-viewport';viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label','Experiences carousel');list.before(viewport);viewport.append(list);
 const controls=document.createElement('div');controls.className='whatson-controls';controls.innerHTML='<p>DRAG TO EXPLORE / BOOK AT THE SOURCE</p><div class="whatson-buttons"><button type="button" data-carousel-pause aria-label="Play moving cards" aria-pressed="true">Play</button><button type="button" data-carousel-prev aria-label="Previous experiences" aria-controls="whatson-track">←</button><button type="button" data-carousel-next aria-label="Next experiences" aria-controls="whatson-track">→</button></div>';viewport.after(controls);
 const pause=controls.querySelector('[data-carousel-pause]'),prev=controls.querySelector('[data-carousel-prev]'),next=controls.querySelector('[data-carousel-next]');
 let period=0,loop=false,hover=false,focus=false,paused=true,inView=false,drag=null,dragged=false,hush=0,raf=0,last=0,autoPosition=0,building=false;
 const motion=()=>document.documentElement.dataset.motion!=='reduced';
 function build(){building=true;list.querySelectorAll('[data-carousel-clone]').forEach(el=>el.remove());viewport.scrollLeft=0;autoPosition=0;const visible=cards.filter(li=>!li.hidden),gap=parseFloat(getComputedStyle(list).columnGap)||24,width=visible.reduce((sum,li)=>sum+li.getBoundingClientRect().width+gap,0);period=width;loop=width>viewport.clientWidth+2;
  if(loop){const copies=Math.max(1,Math.ceil(viewport.clientWidth/width));for(let i=0;i<copies;i++)visible.forEach(li=>{const clone=li.cloneNode(true);clone.dataset.carouselClone='true';clone.setAttribute('aria-hidden','true');clone.classList.remove('reveal-ready','is-visible');clone.removeAttribute('style');clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));clone.querySelectorAll('a,button,input,[tabindex]').forEach(el=>el.tabIndex=-1);list.append(clone);});}
  prev.disabled=next.disabled=!loop;pause.disabled=!loop||!motion();pause.hidden=!loop;building=false;start();
 }
 function tick(now){raf=0;if(!last)autoPosition=viewport.scrollLeft;const dt=last?Math.min(40,now-last):16;last=now;if(loop&&inView&&!document.hidden&&motion()&&!paused&&!hover&&!focus&&!drag&&now>hush){autoPosition+=dt*.026;if(autoPosition>=period)autoPosition-=period;viewport.scrollLeft=autoPosition;}else autoPosition=viewport.scrollLeft;
  if(loop&&inView&&!document.hidden&&motion()&&!paused&&!hover&&!focus&&!drag)raf=requestAnimationFrame(tick);else last=0;
 }
 function start(){if(!raf&&loop&&inView&&motion()&&!paused)raf=requestAnimationFrame(tick);}
 function step(direction){hush=performance.now()+3500;const width=cards.find(li=>!li.hidden)?.getBoundingClientRect().width||340,gap=parseFloat(getComputedStyle(list).columnGap)||24;if(direction<0&&viewport.scrollLeft<1)viewport.scrollLeft=period;viewport.scrollBy({left:direction*(width+gap),behavior:motion()?'smooth':'instant'});start();}
 pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-label',paused?'Play moving cards':'Pause moving cards');pause.setAttribute('aria-pressed',String(paused));start();});prev.addEventListener('click',()=>step(-1));next.addEventListener('click',()=>step(1));
 viewport.addEventListener('pointerenter',()=>{hover=true;});viewport.addEventListener('pointerleave',()=>{hover=false;start();});viewport.addEventListener('focusin',()=>{focus=true;});viewport.addEventListener('focusout',event=>{focus=viewport.contains(event.relatedTarget);start();});
 viewport.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();step(event.key==='ArrowRight'?1:-1);}});
 viewport.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0)return;drag={x:event.clientX,left:viewport.scrollLeft,id:event.pointerId};dragged=false;});
 viewport.addEventListener('pointermove',event=>{if(!drag)return;const dx=event.clientX-drag.x;if(Math.abs(dx)>6&&!dragged){dragged=true;viewport.setPointerCapture(event.pointerId);viewport.classList.add('is-dragging');}if(dragged){viewport.scrollLeft=drag.left-dx;event.preventDefault();}});
 const endDrag=()=>{if(!drag)return;if(viewport.hasPointerCapture(drag.id))viewport.releasePointerCapture(drag.id);drag=null;viewport.classList.remove('is-dragging');hush=performance.now()+3000;setTimeout(()=>{dragged=false;},0);start();};viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);
 viewport.addEventListener('click',event=>{if(dragged){event.preventDefault();event.stopPropagation();dragged=false;}},true);viewport.addEventListener('dragstart',event=>event.preventDefault());
 viewport.addEventListener('scroll',()=>{if(!building&&loop&&viewport.scrollLeft>=period+1&&!focus&&performance.now()>hush)viewport.scrollLeft-=period;},{passive:true});
 let rebuild=0;const schedule=()=>{cancelAnimationFrame(rebuild);rebuild=requestAnimationFrame(build);};
 const changes=new MutationObserver(schedule);cards.forEach(card=>changes.observe(card,{attributes:true,attributeFilter:['hidden']}));new ResizeObserver(schedule).observe(viewport);
 new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;start();},{rootMargin:'80px'}).observe(viewport);
 new MutationObserver(()=>{pause.disabled=!loop||!motion();start();}).observe(document.documentElement,{attributes:true,attributeFilter:['data-motion']});document.addEventListener('visibilitychange',start);document.fonts.ready.then(build);build();
})();

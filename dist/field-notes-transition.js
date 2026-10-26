/* Reference-inspired rings, linked to ordinary scrolling. No extra height or wheel capture. */
(() => {
 const journal=document.querySelector('.champ-journal');if(!journal||document.documentElement.dataset.motion==='reduced')return;
 const wipe=document.createElement('div');wipe.className='field-notes-wipe';wipe.setAttribute('aria-hidden','true');wipe.hidden=true;
 for(let i=0;i<6;i++)wipe.append(document.createElement('i'));document.body.append(wipe);
 const circles=[...wipe.children],clamp=n=>Math.max(0,Math.min(1,n));let radius=1,current=0,target=0,raf=0,last=0,initialized=false;
 function measure(){const nav=document.querySelector('.champ-nav').offsetHeight;wipe.style.top=nav+'px';radius=Math.hypot(document.documentElement.clientWidth/2,innerHeight-nav)*1.06;wipe.style.setProperty('--ring-diameter',radius*2+'px');update();}
 function paint(now){raf=0;const dt=last?Math.min(48,now-last):16;last=now;current+=(target-current)*(1-Math.exp(-dt/65));if(Math.abs(current-target)<.0001)current=target;
  wipe.hidden=current<=.001||current>=.999;
  if(!wipe.hidden){circles.forEach((circle,i)=>{const local=clamp((current-i*.055)/.53);circle.style.transform='translate3d(-50%,50%,0) scale('+local.toFixed(5)+')';});const inner=clamp((current-.33)/.53)*radius;wipe.style.maskImage='radial-gradient(circle at 50% 100%,transparent '+inner.toFixed(2)+'px,#000 '+(inner+1).toFixed(2)+'px)';}
  wipe.dataset.progress=current.toFixed(3);if(current!==target)raf=requestAnimationFrame(paint);else last=0;
 }
 function update(){const nav=document.querySelector('.champ-nav').offsetHeight,lead=Math.min(260,innerHeight*.38),range=Math.max(1,innerHeight-nav-lead),top=journal.getBoundingClientRect().top;target=clamp((innerHeight-lead-top)/range);if(!initialized||top>=innerHeight-lead||top<=nav){current=target;initialized=true;wipe.hidden=true;}if(!raf)raf=requestAnimationFrame(paint);}
 addEventListener('scroll',update,{passive:true});addEventListener('resize',measure);new ResizeObserver(measure).observe(document.body);document.fonts.ready.then(measure);measure();
})();

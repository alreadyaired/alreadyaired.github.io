(() => {
 'use strict';
 const hero=document.querySelector('.home2-grid-hero');if(!hero)return;
 const root=document.documentElement,paused=root.dataset.motion==='reduced';
 const labels=['BANDIPUR','VEDA NĀDA','JUNGLE SAFARI','IN CONCERT','FOREST STORIES','LIVE AT THE SOURCE','MORNING DRIVE','LIVING MELODY','WILD ENCOUNTERS','THE PEOPLE BEHIND IT','A FULL HOUSE','FIELD NOTES','YOUR NEXT EXPERIENCE','SHOW UP','DISCOVER MORE','ONE PASS','GOOD TIMES','AT THE SOURCE'];
 // Original vector motifs inspired by the reference's modular geometric tiles.
 const red='#bd3122',cream='#eeeae2',ink='#090a0d';
 const dots=Array.from({length:16},(_,i)=>'<circle cx="'+(20+i%4*20)+'" cy="'+(20+Math.floor(i/4)*20)+'" r="5"/>').join('');
 const petals=Array.from({length:4},(_,i)=>'<g transform="translate('+(i%2*50)+' '+(Math.floor(i/2)*50)+')"><path d="M25 25Q0 0 0 25Q0 50 25 25Q50 50 50 25Q50 0 25 25Z"/></g>').join('');
 const scales=Array.from({length:20},(_,i)=>'<path d="M'+(i%4*25)+' '+(Math.floor(i/4)*20)+'h24a12 12 0 0 1-24 0Z"/>').join('');
 const motifs=[
  [red,cream,'<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="18"/>'],
  [cream,red,petals],
  [red,cream,'<path d="M0 0h100v100A100 100 0 0 0 0 0Z"/><path d="M0 50a50 50 0 0 1 50 50H0Z" fill="'+red+'"/>'],
  [cream,red,dots],
  [red,cream,'<path d="m50 8 18 18-18 18-18-18Zm-24 24 18 18-18 18L8 50Zm48 0 18 18-18 18-18-18ZM50 56l18 18-18 18-18-18Z"/>'],
  [cream,red,'<g fill="none" stroke="currentColor" stroke-width="5"><path d="M8 92V8h84v68H24V24h52v36H40V40h20v4"/><path d="M8 92h84M92 8v84"/></g>'],
  [red,cream,scales],
  [cream,red,'<g fill="none" stroke="currentColor" stroke-width="5"><path d="m50 5 45 45-45 45L5 50Z"/><path d="m50 21 29 29-29 29-29-29Z"/><path d="m50 36 14 14-14 14-14-14Z"/><path d="M35 4v23M65 4v23M35 73v23M65 73v23M4 35h23M4 65h23M73 35h23M73 65h23"/></g>'],
  [red,cream,'<circle cx="0" cy="0" r="100"/><circle cx="0" cy="0" r="76" fill="'+red+'"/><circle cx="0" cy="0" r="52"/><circle cx="0" cy="0" r="28" fill="'+red+'"/>'],
  [cream,red,'<path d="M44 92V48C14 49 7 25 10 9c26 0 40 11 40 34C50 20 66 9 91 9c3 16-4 40-35 39v44Z"/><path d="M50 91V42M15 15l29 28M85 15 56 43" fill="none" stroke="'+cream+'" stroke-width="3"/>'],
  [red,cream,'<path d="M10 10h25v25H10Zm55 0h25v25H65ZM37 37h26v26H37ZM10 65h25v25H10Zm55 0h25v25H65Z"/>'],
  [cream,red,'<g fill="none" stroke="currentColor" stroke-width="7"><path d="m20 5 20 20-20 25 20 25-20 20M80 5 60 25l20 25-20 25 20 20M50 5v20L30 50l20 25v20M50 5v20l20 25-20 25v20"/></g>'],
  [ink,cream,'<circle cx="50" cy="50" r="39"/><circle cx="50" cy="50" r="21" fill="'+red+'"/>'],
  [red,cream,'<path d="M10 10h18v18H10Zm24 0h18v18H34ZM10 34h18v18H10Zm24 0h18v18H34Zm24 0h18v18H58ZM10 58h18v18H10Zm24 0h18v18H34Zm24 0h18v18H58Zm24 0h18v18H82ZM10 82h18v18H10Zm24 0h18v18H34Zm24 0h18v18H58Zm24 0h18v18H82Z"/>']
 ];
 function pattern(index){const [bg,fg,shape]=motifs[index%motifs.length];return '<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" style="background:'+bg+';color:'+fg+'" fill="currentColor">'+shape+'</svg>';}
 const tileArt=i=>'<div class="h2-grid-pattern">'+pattern((i*5+Math.floor(i/12))%motifs.length)+'</div>';
 const linkIcon=i=>'<i class="h2-pattern-icon" aria-hidden="true">'+pattern(i)+'</i>';
 const headline='<h1 aria-label="Book the safari, concert or event, at the source.">Book the<br><span class="hero-word-window" aria-hidden="true"><span class="hero-word-sizer">Concert,</span><span class="hero-word-track"><span>Safari,</span><span>Concert,</span><span>Event,</span><span>Safari,</span></span></span><br><span class="hero-source-line">at the source.</span></h1>';
 hero.innerHTML='<div class="h2-experience-grid"><span class="h2-grid-hint">MOVE THROUGH THE GRID / PATTERNS IN PLAY</span>'+Array.from({length:72},(_,i)=>'<div class="h2-grid-tile" aria-hidden="true" style="--tile-index:'+i+'">'+tileArt(i)+'<span>'+labels[i%labels.length]+'</span></div>').join('')+'<a class="h2-grid-cta h2-grid-safari" href="/bandipur/book/jungle-safari"><small>03</small>'+headline+'</a><a class="h2-grid-cta h2-grid-contact" href="/contact"><small>05</small><span>GET IN<br>TOUCH</span></a><nav class="h2-grid-bottom" aria-label="More from EN3"><a href="/blog">'+linkIcon(7)+'JOURNAL ↗</a><a href="/tickets">'+linkIcon(4)+'MY TICKETS ↗</a><a href="/partners">'+linkIcon(5)+'BECOME A PARTNER ↗</a><button type="button" class="h2-motion-control"><i aria-hidden="true">'+(paused?'▶':'Ⅱ')+'</i>'+(paused?'PLAY MOTION':'PAUSE MOTION')+'</button></nav></div>';
 // Use the shared menu's 1.4 second reveal and neighbouring tile trail.
 const grid=hero.firstElementChild,tiles=[...grid.querySelectorAll('.h2-grid-tile')],timers=new Map();let active=-1;
 function light(index){
  if(index<0||index>=tiles.length)return;
  const tile=tiles[index];clearTimeout(timers.get(index));
  tile.classList.add('lit');tile.classList.toggle('trail',!paused);tile.classList.toggle('cream',index%7===0);
  timers.set(index,setTimeout(()=>{tile.classList.remove('lit','trail','cream');timers.delete(index);},paused?100:1400));
 }
 function reveal(event){
  const tile=event.target.closest('.h2-grid-tile');
  if(!tile){active=-1;return;}
  const index=tiles.indexOf(tile);if(index===active)return;active=index;light(index);
  if(!paused){const columns=innerWidth<=800?6:12;light(index-1);setTimeout(()=>light(index+columns),80);}
 }
 grid.addEventListener('pointermove',reveal,{passive:true});
 grid.addEventListener('pointerleave',()=>{active=-1;});
 grid.addEventListener('touchstart',event=>{const tile=event.target.closest('.h2-grid-tile');if(tile)light(tiles.indexOf(tile));},{passive:true});
 hero.querySelector('.h2-motion-control').addEventListener('click',()=>{try{localStorage.setItem('en3-design-motion',paused?'full':'reduced');}catch{}location.reload();});
 const nav=document.querySelector('.champ-nav');
 const fit=()=>hero.style.setProperty('--h2-nav',(nav&&getComputedStyle(nav).display!=='none'?nav.getBoundingClientRect().height:0)+'px');
 if(nav)new ResizeObserver(fit).observe(nav);addEventListener('resize',fit,{passive:true});fit();
})();

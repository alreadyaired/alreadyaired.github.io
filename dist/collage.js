(() => {
 const stage=document.querySelector('.scroll-collage');if(!stage||stage.hidden||document.documentElement.dataset.motion==='reduced')return;
 const pieces={ticket:stage.querySelector('[data-collage=ticket]'),nature:stage.querySelector('[data-collage=nature]'),music:stage.querySelector('[data-collage=music]'),brand:stage.querySelector('[data-collage=brand]')},background=stage.querySelector('.collage-background'),heading=stage.querySelector('.collage-heading');
 let visible=false,frame=0;const clamp=v=>Math.max(0,Math.min(1,v)),ease=v=>1-Math.pow(1-v,3);
 function render(){frame=0;if(!visible)return;const box=stage.getBoundingClientRect(),nav=innerWidth<=800?60:68,p=clamp((nav-box.top)/Math.max(1,box.height-innerHeight+nav)),enter=ease(clamp(p/.5)),exit=ease(clamp((p-.84)/.16)),small=innerWidth<=800,distance=small?190:370;
  pieces.ticket.style.transform=`translate3d(${-distance*(1-enter)}px,${160*(1-enter)-35*exit-12*p}px,0) rotate(${-23+16*enter-3*exit+3*p}deg)`;
  pieces.nature.style.transform=`translate3d(${distance*(1-enter)}px,${-130*(1-enter)-50*exit}px,0) rotate(${25-18*enter+4*exit}deg)`;
  pieces.music.style.transform=`translate3d(${distance*(1-enter)}px,${190*(1-enter)+35*exit}px,0) rotate(${-17+26*enter-4*exit}deg)`;
  pieces.brand.style.transform=`translate3d(0,${210*(1-enter)+55*exit}px,0) rotate(${-20+31*enter}deg) scale(${.7+.3*enter})`;
  background.style.transform=`translate3d(0,${-3*p}%,0) scale(${1.03+.025*p})`;heading.style.transform=`translate3d(0,${-24*p}px,0)`;
 }
 function schedule(){if(visible&&!frame)frame=requestAnimationFrame(render);}
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{rootMargin:'30% 0px'}).observe(stage);
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
})();

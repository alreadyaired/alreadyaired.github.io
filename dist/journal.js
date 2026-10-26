(() => {
 const buttons=[...document.querySelectorAll('[data-journal-filter]')],stories=[...document.querySelectorAll('.editorial-index [data-journal-kind]')];
 const filterBar=document.querySelector('.editorial-filters'),indicator=document.createElement('span');indicator.className='editorial-filter-indicator';indicator.setAttribute('aria-hidden','true');filterBar?.prepend(indicator);
 function placeIndicator(){const selected=buttons.find(button=>button.getAttribute('aria-pressed')==='true');if(!filterBar||!selected)return;indicator.style.width=selected.offsetWidth+'px';indicator.style.height=selected.offsetHeight+'px';indicator.style.transform='translate('+selected.offsetLeft+'px,'+selected.offsetTop+'px)';}
 if(filterBar){new ResizeObserver(placeIndicator).observe(filterBar);document.fonts.ready.then(placeIndicator);const visible=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){filterBar.classList.add('is-scrolling');setTimeout(()=>filterBar.classList.remove('is-scrolling'),2000);visible.disconnect();}});visible.observe(filterBar);}
 function filter(kind){buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.journalFilter===kind)));placeIndicator();let count=0;stories.forEach(story=>{story.hidden=kind!=='all'&&story.dataset.journalKind!==kind;if(!story.hidden)count++;});const empty=document.querySelector('#journal-empty');if(empty)empty.hidden=count>0;}
 buttons.forEach(b=>b.addEventListener('click',()=>{filter(b.dataset.journalFilter);history.replaceState(null,'',b.dataset.journalFilter==='all'?'/blog':'/blog?kind='+b.dataset.journalFilter);}));if(buttons.length)filter(new URLSearchParams(location.search).get('kind')||'all');
 if(document.documentElement.dataset.motion!=='reduced'){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.editorial-story,.editorial-cover,.editorial-body h2').forEach(el=>{el.classList.add('reveal-ready');io.observe(el);});}
 const contents=document.querySelector('.editorial-reading>aside nav');
 if(contents){const links=[...contents.querySelectorAll('a[href^="#"]')],targets=links.map(link=>document.getElementById(link.hash.slice(1)));let readingFrame=0;
  function updateReading(){readingFrame=0;const marker=(document.querySelector('.champ-nav')?.offsetHeight||68)+110;let current=0;targets.forEach((target,index)=>{if(target&&target.getBoundingClientRect().top<=marker)current=index;});links.forEach((link,index)=>{if(index===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
  addEventListener('scroll',()=>{if(!readingFrame)readingFrame=requestAnimationFrame(updateReading);},{passive:true});updateReading();
 }

})();

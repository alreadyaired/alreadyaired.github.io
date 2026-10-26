/* Page-only composition; retain all calculator inputs and enquiry field nodes. */
(() => {
 const page=document.querySelector('#partner-page');if(!page)return;
 page.classList.add('partner-redesign');
 const hero=page.firstElementChild,facts=hero.nextElementSibling,features=[...page.querySelectorAll('#what-you-get>section')],form=page.querySelector('#get-your-page'),savings=page.querySelector('#savings');
 const sections=[hero,savings,...features,form];
 sections.forEach(section=>{section.classList.add('pp-screen');const grid=section.firstElementChild;grid.classList.add('pp-grid');[...grid.children].forEach(child=>child.classList.add(child.querySelector('h1,h2')?'pp-copy':'pp-visual'));});
 hero.classList.add('pp-hero');facts.classList.add('pp-screen','pp-facts');features.forEach(section=>section.classList.add('pp-feature'));
 savings.firstElementChild.classList.add('pp-calculator-ticket');savings.firstElementChild.children[0].classList.add('pp-calculator-inputs');savings.firstElementChild.children[1].classList.add('pp-comparison-ticket');
 hero.querySelector('.pp-copy>p:nth-of-type(2)')?.classList.add('pp-hero-price');
 const art=hero.querySelector('.pp-visual');
 art.innerHTML='<div class="pp-brand-stage" aria-label="EN3 branded booking page and fee preview — fictional presentation"><div class="pp-stage-grid" aria-hidden="true"></div><div class="pp-site-ticket"><div class="pp-site-top"><span class="pp-site-brand"><img src="/assets/brand/favicon.svg" alt="">EN3.LIVE</span><span>YOUR OWN BOOKING PAGE</span></div><div class="pp-site-poster"><small>YOUR IDENTITY. YOUR AUDIENCE.</small><strong>YOUR SHOW.<br>YOUR RULES.</strong></div><div class="pp-site-bottom"><b>BOOK AT THE SOURCE.</b><span>CONCERTS / SAFARIS / STAYS / SHOWS</span></div></div><div class="pp-fee-ticket"><img src="/assets/brand/en3-mark.svg" alt=""><strong>₹5</strong><span>A TICKET.<br>NEVER A PERCENTAGE.</span></div></div>';
 const herd=page.querySelector('.partner-herd-grid')?.closest('section');
 if(herd){herd.classList.add('pp-screen','pp-herd');herd.firstElementChild.classList.add('pp-grid');herd.querySelector('h2')?.parentElement.classList.add('pp-copy');}
 const examples=[...page.children].find(el=>el.tagName==='SECTION'&&el.querySelector('a[href="/bandipur"]'));
 if(examples)examples.classList.add('pp-screen','pp-examples');
 features.forEach((section,index)=>{const p=section.querySelector('.pp-copy>p');if(p){p.classList.add('pp-eyebrow');p.prepend(String(index+2).padStart(2,'0')+' / ');}});
 const nav=document.querySelector('.champ-nav');const measureNav=()=>{const size=(getComputedStyle(nav).display==='none'?0:nav.getBoundingClientRect().height)+'px';page.style.setProperty('--pp-nav',size);document.documentElement.style.setProperty('--pp-scroll-offset',size);};new ResizeObserver(measureNav).observe(nav);measureNav();
 // Consistent browser chrome around the captured and code-rendered presentations.
 page.querySelectorAll('.pp-visual figure>div:first-child,.pp-visual .demo-browser').forEach(bar=>{
  const address=bar.textContent.match(/(?:partner\.)?en3\.live[^\s]*|studio03\.en3\.live/)?.[0];if(!address)return;
  bar.className='pp-browser-chrome';bar.setAttribute('aria-hidden','true');
  bar.innerHTML='<span class="pp-browser-dots"><i></i><i></i><i></i></span><span class="pp-browser-address"><svg viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="7" width="8" height="6" rx="1"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg><span></span></span><span class="pp-browser-menu">⋮</span>';
  bar.querySelector('.pp-browser-address>span').textContent=address;
 });
 // Long phone panels become separate normal-flow screens, without clipped content.
 const result=savings.firstElementChild.children[1],formIntro=form.firstElementChild.children[0];
 const resultSlot=document.createElement('section'),formSlot=document.createElement('section');resultSlot.className='pp-screen pp-split-result';resultSlot.setAttribute('aria-label','Your estimated savings');formSlot.className='pp-screen pp-split-form';formSlot.setAttribute('aria-label','Your EN3 page');savings.after(resultSlot);form.before(formSlot);form.setAttribute('aria-label','Request your EN3 page');
 const compact=matchMedia('(max-width:900px)');
 const split=()=>{if(compact.matches){resultSlot.append(result);formSlot.append(formIntro);}else{savings.firstElementChild.append(result);form.firstElementChild.prepend(formIntro);}};compact.addEventListener('change',split);split();
 const phone=matchMedia('(max-width:640px)'),placeHeroArt=()=>{if(phone.matches)hero.querySelector('h1').after(art);else hero.firstElementChild.append(art);};phone.addEventListener('change',placeHeroArt);placeHeroArt();
 if(document.documentElement.dataset.motion!=='reduced'){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('pp-visible');observer.unobserve(entry.target);}}),{threshold:.08});
  page.querySelectorAll('.pp-copy,.pp-visual,.pp-facts dl>div,.pp-examples>ul>li,.pp-split-result,.pp-split-form').forEach(el=>{el.classList.add('pp-enter');observer.observe(el);});
 }
})();
/* Partner-page controls only. Native values/validation and the local calculator stay intact. */
(() => {
 const page=document.querySelector('.partner-original');if(!page)return;
 const sliders=[...page.querySelectorAll('#savings input[type=range]')];
 sliders.forEach((slider,index)=>{
  slider.classList.add('partner-range');const label=slider.closest('label');label.classList.add('partner-range-field');label.querySelector('span span')?.classList.add('partner-range-value');
  const wrap=document.createElement('div');wrap.className='partner-range-wrap';slider.before(wrap);wrap.append(slider);
  const visual=document.createElement('span');visual.className='partner-range-visual';visual.setAttribute('aria-hidden','true');visual.innerHTML='<i class="partner-range-filled"></i><i class="partner-range-empty"></i><i class="partner-range-grip"></i>';wrap.append(visual);
  const ends=document.createElement('span');ends.className='partner-range-ends';ends.setAttribute('aria-hidden','true');
  const format=value=>index===0?'₹'+Number(value).toLocaleString('en-IN'):index===3?value+'%':Number(value).toLocaleString('en-IN');
  ends.innerHTML='<span>'+format(slider.min)+'</span><span>'+format(slider.max)+'</span>';label.append(ends);
  const paint=()=>{const fill=((Number(slider.value)-Number(slider.min))/(Number(slider.max)-Number(slider.min))*100)+'%';slider.style.setProperty('--range-fill',fill);wrap.style.setProperty('--range-fill',fill);slider.setAttribute('aria-valuetext',format(slider.value));};
  slider.addEventListener('input',paint);slider.addEventListener('change',paint);paint();
 });
 const savingsAmount=page.querySelector('#savings [aria-live=polite],.pp-split-result [aria-live=polite]');
 if(savingsAmount){const comparison=savingsAmount.parentElement;comparison.classList.add('partner-comparison');[...comparison.querySelectorAll('.mt-10 > div')].forEach((row,index)=>{row.classList.add('partner-comparison-row');row.dataset.comparison=index?'en3':'other';const fill=row.querySelector('.h-full');if(fill){fill.classList.add('partner-comparison-fill');fill.parentElement.classList.add('partner-comparison-track');}});}
 page.querySelectorAll('figure').forEach(figure=>figure.classList.add('partner-product-frame'));
 page.querySelectorAll('img[src="/assets/eb888d2ce29ada40.webp"]').forEach(img=>img.classList.add('partner-pass-image'));
 page.querySelectorAll('img[src="/assets/db946caf6606639e.webp"]').forEach(img=>img.closest('figure')?.classList.add('partner-phone-shell'));
 page.firstElementChild?.firstElementChild?.children[1]?.classList.add('partner-hero-artboard');
 const native=page.querySelector('#venue_type');if(!native)return;
 const root=document.createElement('div');root.className='partner-combobox';native.before(root);root.append(native);native.classList.add('partner-native-select');native.tabIndex=-1;native.setAttribute('aria-hidden','true');
 const trigger=document.createElement('button');trigger.type='button';trigger.className='partner-combobox-trigger';trigger.id='partner-venue-trigger';trigger.setAttribute('role','combobox');trigger.setAttribute('aria-label','What you run');trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-controls','partner-venue-list');trigger.setAttribute('aria-expanded','false');
 trigger.innerHTML='<span class="partner-combobox-value"></span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7 5 5 5-5"/></svg>';
 native.labels?.forEach(label=>label.setAttribute('for','partner-venue-trigger'));
 const list=document.createElement('ul');list.id='partner-venue-list';list.className='partner-combobox-options';list.setAttribute('role','listbox');list.setAttribute('aria-label','What you run');list.hidden=true;
 const options=[...native.options],items=options.map((option,index)=>{const item=document.createElement('li');item.id='partner-venue-option-'+index;item.setAttribute('role','option');item.dataset.index=index;item.textContent=option.textContent;list.append(item);return item;});
 root.append(trigger,list);let active=native.selectedIndex,search='',searchTimer;
 function selected(){trigger.querySelector('span').textContent=options[native.selectedIndex].textContent;items.forEach((item,index)=>item.setAttribute('aria-selected',String(index===native.selectedIndex)));}selected();
 function highlight(index){active=(index+options.length)%options.length;items.forEach((item,i)=>item.classList.toggle('is-active',i===active));trigger.setAttribute('aria-activedescendant',items[active].id);items[active].scrollIntoView({block:'nearest'});}
 function close(){list.hidden=true;trigger.setAttribute('aria-expanded','false');trigger.removeAttribute('aria-activedescendant');root.classList.remove('is-open');}
 function open(){list.hidden=false;root.classList.add('is-open');trigger.setAttribute('aria-expanded','true');root.classList.remove('opens-up');const box=trigger.getBoundingClientRect();if(innerHeight-box.bottom<Math.min(list.scrollHeight,260)&&box.top>innerHeight-box.bottom)root.classList.add('opens-up');highlight(native.selectedIndex);}
 function choose(index){native.selectedIndex=index;native.dispatchEvent(new Event('change',{bubbles:true}));selected();close();trigger.focus();}
 trigger.addEventListener('click',()=>list.hidden?open():close());
 list.addEventListener('click',event=>{const item=event.target.closest('[role=option]');if(item)choose(Number(item.dataset.index));});
 trigger.addEventListener('keydown',event=>{
  if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();const wasClosed=list.hidden;if(wasClosed)open();if(event.key==='Home')highlight(0);else if(event.key==='End')highlight(options.length-1);else if(!wasClosed)highlight(active+(event.key==='ArrowDown'?1:-1));return;}
  if(event.key==='Enter'||event.key===' '){event.preventDefault();if(list.hidden)open();else choose(active);return;}
  if(event.key==='Escape'){event.preventDefault();close();return;}if(event.key==='Tab'){close();return;}
  if(event.key.length===1&&!event.ctrlKey&&!event.metaKey){clearTimeout(searchTimer);search+=event.key.toLowerCase();searchTimer=setTimeout(()=>search='',600);const index=options.findIndex(option=>option.textContent.toLowerCase().startsWith(search));if(index>=0){if(list.hidden)open();highlight(index);}}
 });
 document.addEventListener('pointerdown',event=>{if(!root.contains(event.target))close();});
 native.addEventListener('change',selected);native.addEventListener('invalid',event=>{event.preventDefault();trigger.focus();open();});
 native.labels?.forEach(label=>label.addEventListener('click',event=>{if(!event.target.closest('button,[role=option]')){event.preventDefault();trigger.focus();}}));
 native.form?.addEventListener('reset',()=>setTimeout(()=>{selected();close();},0));
})();

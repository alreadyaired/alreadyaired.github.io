/* Phone landing directory and navigation; the desktop composition is retained. */
(() => {
 'use strict';
 const root=document.documentElement,body=document.body,phone=matchMedia('(max-width:640px)'),header=document.querySelector('.champ-nav');
 if(!header)return;
 // Keep the shared navbar outside the captured reserve hero's flex layout.
 if(location.pathname.replace(/\/$/,'')==='/bandipur'&&header.parentElement!==body){
  body.prepend(header);const sharedMenu=document.querySelector('#champ-menu');if(sharedMenu)header.after(sharedMenu);
 }
 const home=location.pathname==='/'||location.pathname==='/index.html',directory=document.createElement('section'),main=document.querySelector('main');
 if(home&&!main.id)main.id='home';
 directory.className='en3-mobile-directory';directory.id='en3-mobile-directory';directory.setAttribute('aria-label','EN3 mobile navigation');directory.tabIndex=-1;
 directory.innerHTML='<div class="mobile-directory-topline"><span>INDEPENDENT EXPERIENCES / EN3</span><button type="button" class="mobile-directory-close" aria-label="Close navigation">×</button></div><nav class="mobile-directory-links" aria-label="Choose your EN3 page"><a class="mobile-directory-link" href="/#home"><small>01</small><span>Home Page</span><i aria-hidden="true">↗</i></a><a class="mobile-directory-link" href="/tickets"><small>02</small><span>My tickets</span><i aria-hidden="true">↗</i></a><a class="mobile-directory-link" href="/blog"><small>03</small><span>Journal</span><i aria-hidden="true">↗</i></a><a class="mobile-directory-link" href="/contact"><small>04</small><span>Contact us</span><i aria-hidden="true">↗</i></a></nav><div class="mobile-directory-theme"><span>MAKE IT<br>YOUR THEME.</span><div class="mobile-theme-options" role="group" aria-label="Colour theme"><button type="button" data-mobile-theme="light" aria-pressed="false">☀ Light</button><button type="button" data-mobile-theme="dark" aria-pressed="false">☾ Dark</button></div></div><div class="mobile-directory-foot"><span>BOOK AT THE SOURCE.</span><button class="mobile-motion-toggle" type="button">Pause motion</button></div>';
 const logo=header.querySelector('.brand').cloneNode(true);logo.classList.add('mobile-directory-brand');logo.href='/#home';logo.setAttribute('aria-label','EN3 live — open homepage');
 directory.querySelector('.mobile-directory-topline').after(logo);body.prepend(directory);
 const footerContact=document.querySelector('.en3-footer-contact-cell');
 if(footerContact){const partnerLink=document.createElement('a');partnerLink.className='mobile-footer-partner';partnerLink.href='/partners';partnerLink.innerHTML='<span>Become a partner</span><i aria-hidden="true">↗</i>';footerContact.append(partnerLink);}
 const menuButton=header.querySelector('.nav-menu'),closeButton=directory.querySelector('.mobile-directory-close'),motion=directory.querySelector('.mobile-motion-toggle');
 let opened=false,lastFocus=null;
 function sync(){
  const landing=phone.matches&&home,overlay=phone.matches&&opened,active=landing||overlay;
  body.classList.toggle('mobile-landing-active',landing);body.classList.toggle('mobile-directory-active',overlay);
  directory.setAttribute('aria-hidden',String(!active));directory.inert=!active;
  if(overlay){directory.setAttribute('role','dialog');directory.setAttribute('aria-modal','true');}else{directory.removeAttribute('role');directory.removeAttribute('aria-modal');}
  for(const el of [header,main,document.querySelector('footer')])if(el)el.inert=overlay;
  if(phone.matches){menuButton.setAttribute('aria-expanded',String(overlay));menuButton.setAttribute('aria-controls','en3-mobile-directory');menuButton.setAttribute('aria-label',overlay?'Close navigation':'Open navigation');}
  else{opened=false;menuButton.setAttribute('aria-controls','champ-menu');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');}
  if(!active&&body.style.overflow==='hidden')body.style.overflow='';
 }
 function close(){opened=false;sync();lastFocus?.focus({preventScroll:true});}
 menuButton.addEventListener('click',event=>{if(!phone.matches)return;event.preventDefault();event.stopImmediatePropagation();lastFocus=document.activeElement;opened=!opened;sync();if(opened)closeButton.focus();},true);
 closeButton.addEventListener('click',close);
 directory.querySelectorAll('a').forEach(link=>link.addEventListener('click',event=>{opened=false;sync();if(home&&link.hash==='#home'){event.preventDefault();history.pushState(null,'','#home');main.scrollIntoView({block:'start',behavior:root.dataset.motion==='reduced'?'instant':'smooth'});}}));
 window.addEventListener('hashchange',()=>{opened=false;sync();});phone.addEventListener('change',()=>{opened=false;sync();});
 directory.addEventListener('keydown',event=>{if(event.key==='Escape'&&opened){event.preventDefault();close();}if(event.key!=='Tab'||!opened)return;const items=[...directory.querySelectorAll('a,button')].filter(el=>el.getClientRects().length),first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}});
 directory.querySelectorAll('[data-mobile-theme]').forEach(button=>button.addEventListener('click',()=>{if(root.dataset.theme!==button.dataset.mobileTheme)header.querySelector('.nav-theme').click();}));
 function syncTheme(){directory.querySelectorAll('[data-mobile-theme]').forEach(button=>button.setAttribute('aria-pressed',String(root.dataset.theme===button.dataset.mobileTheme)));const paused=root.dataset.motion==='reduced';motion.textContent=paused?'Play motion':'Pause motion';motion.setAttribute('aria-pressed',String(paused));}
 new MutationObserver(syncTheme).observe(root,{attributes:true,attributeFilter:['data-theme','data-motion']});
 motion.addEventListener('click',()=>{try{localStorage.setItem('en3-design-motion',root.dataset.motion==='reduced'?'full':'reduced');}catch{}location.reload();});syncTheme();sync();
 let entryCancelled=false;
 const stopEntryHint=()=>{entryCancelled=true;body.classList.remove('mobile-entry-nudge');};
 for(const event of ['pointerdown','touchstart','wheel','keydown'])addEventListener(event,stopEntryHint,{once:true,passive:true});
 const entryHint=()=>{if(!phone.matches||!home||location.hash||root.dataset.motion==='reduced'||entryCancelled||scrollY>4)return;requestAnimationFrame(()=>{if(entryCancelled)return;body.classList.add('mobile-entry-nudge');body.addEventListener('animationend',event=>{if(event.animationName==='en3-mobile-entry-nudge')body.classList.remove('mobile-entry-nudge');});});};
 document.fonts.ready.then(()=>requestAnimationFrame(entryHint));
 // On phones the hero follows the landing directory: wait until its artwork is seen.
 const ticketScene=home&&document.querySelector('.en3-ticket-scene');
 if(ticketScene){
  const entrance=new IntersectionObserver(entries=>{
   if(!phone.matches)return;
   if(entries.some(entry=>entry.isIntersecting&&entry.intersectionRatio>=.25)){
    ticketScene.classList.add('ticket-scene-entered');entrance.disconnect();
   }
  },{threshold:[0,.25]});
  entrance.observe(ticketScene);
 }
})();

/* Isolated preview: no production requests, authentication, or payment calls. */
(() => {
 'use strict';
 const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
 const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
 function notice(text){let el=$('.local-toast');if(!el){el=document.createElement('div');el.className='local-toast';el.role='status';document.body.append(el);}el.textContent=text;clearTimeout(notice.timer);notice.timer=setTimeout(()=>el.remove(),5500);}
 const themeButtons=[...new Set([...$$('.nav-theme'),...$$('#theme-toggle'),...$$('button[aria-label^="Switch to"]')])];
 function theme(value){const mode=value==='light'?'light':'dark';document.documentElement.dataset.theme=mode;themeButtons.forEach(button=>{const label=mode==='dark'?'Switch to light mode':'Switch to dark mode';button.setAttribute('aria-label',label);button.title=label;button.setAttribute('aria-pressed',String(mode==='light'));});try{localStorage.setItem('en3-preview-theme',mode);}catch{}}
 let initialTheme=document.documentElement.dataset.theme;try{initialTheme=localStorage.getItem('en3-preview-theme')||initialTheme;}catch{}theme(initialTheme);
 themeButtons.forEach(button=>button.addEventListener('click',()=>theme(document.documentElement.dataset.theme==='dark'?'light':'dark')));
 addEventListener('storage',event=>{if(event.key==='en3-preview-theme')theme(event.newValue);});
 const menu=$('#champ-menu'), menuButton=$('.nav-menu');
 function closeMenu(){if(!menu)return;menu.hidden=true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');document.body.style.overflow='';}
 menuButton?.addEventListener('click',()=>{let open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');document.body.style.overflow=open?'hidden':'';if(open)$('a',menu)?.focus();});
 menu?.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu?.hidden){closeMenu();menuButton.focus();}if(e.key==='Tab'&&menu&&!menu.hidden){let targets=[menuButton,...$$('a,button',menu)],first=targets[0],last=targets.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
 const clockFormat=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:true});
 function clock(){const el=$('#india-clock');if(!el)return;const now=new Date(),parts=Object.fromEntries(clockFormat.formatToParts(now).map(part=>[part.type,part.value])),value=parts.hour.padStart(2,'0')+':'+parts.minute,suffixText=' '+parts.dayPeriod+' IST / LIVE';el.dateTime=now.toISOString();el.setAttribute('aria-label',value+' '+parts.dayPeriod+' Indian Standard Time, live');
  if(!el.dataset.initialized){el.dataset.initialized='true';const digits=document.createElement('span');digits.className='clock-digits';digits.setAttribute('aria-hidden','true');let index=0;for(const character of value){const slot=document.createElement('span');slot.className=character===':'?'clock-colon':'clock-slot';const glyph=document.createElement('span');glyph.className='clock-glyph';glyph.textContent=character;glyph.style.setProperty('--clock-index',index++);slot.append(glyph);digits.append(slot);}const suffix=document.createElement('span');suffix.className='clock-suffix';suffix.textContent=suffixText;suffix.setAttribute('aria-hidden','true');el.replaceChildren(digits,suffix);
   if(document.documentElement.dataset.motion!=='reduced'){const card=el.closest('.nav-location');card.classList.add('location-flip-pending');const start=()=>{requestAnimationFrame(()=>{card.classList.remove('location-flip-pending');card.classList.add('location-flip');setTimeout(()=>card.classList.remove('location-flip'),1700);});};if(document.documentElement.classList.contains('en3-font-loading')){const watcher=new MutationObserver(()=>{if(!document.documentElement.classList.contains('en3-font-loading')){watcher.disconnect();start();}});watcher.observe(document.documentElement,{attributes:true,attributeFilter:['class']});}else start();}
  }else{$$('.clock-glyph',el).forEach((glyph,i)=>{if(glyph.textContent!==value[i])glyph.textContent=value[i];});const suffix=$('.clock-suffix',el);if(suffix.textContent!==suffixText)suffix.textContent=suffixText;}
 }clock();setInterval(clock,1000);

 // Keep third-party account systems out of the isolated preview.
 $$('a[href^="https://partner.en3.live"]').forEach(a=>{a.href='/resources/FEATURE-MAP.md';a.title='Partner console requires the production backend';});
 $$('a[href^="http"]').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer';});
 $$('button[aria-label*="background slideshow"]').forEach(b=>{b.addEventListener('click',()=>{let paused=b.getAttribute('aria-label').startsWith('Pause');b.setAttribute('aria-label',(paused?'Play':'Pause')+' background slideshow');b.innerHTML=paused?'▶':'Ⅱ';document.documentElement.classList.toggle('slideshow-paused',paused);});});

 // Public experience categories, including the original upcoming-partner tiles.
 const discover=$('#whats-on');
 if(discover){const group=$('[aria-label="Filter by kind"]',discover),buttons=$$('button',group),cards=$$('ul > li',discover),list=$('ul',discover),types=['Safaris','Theatre','Concerts','Comedy','Concerts','Safaris','Stays','Workshops','Concerts'];
  group.classList.add('experience-filters');
  let filterScrollbarShown=false;
  const showFilterScrollbar=()=>{if(filterScrollbarShown||!matchMedia('(max-width:640px)').matches)return;filterScrollbarShown=true;group.classList.add('is-scrolling');setTimeout(()=>group.classList.remove('is-scrolling'),2000);};
  const filterVisibility=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){showFilterScrollbar();filterVisibility.disconnect();}});filterVisibility.observe(group);
  const indicator=document.createElement('span');indicator.className='filter-indicator';indicator.setAttribute('aria-hidden','true');group.prepend(indicator);
  buttons.forEach(b=>{$$('span.absolute',b).forEach(x=>x.remove());b.classList.remove('text-white');});
  let selected=buttons.find(b=>b.getAttribute('aria-pressed')==='true')||buttons[0],revision=0;
  const running=new Set(),motion=()=>document.documentElement.dataset.motion!=='reduced';
  function animate(el,frames,options){const animation=el.animate(frames,options);running.add(animation);animation.finished.catch(()=>{}).finally(()=>running.delete(animation));return animation;}
  function placeIndicator(){const box=group.getBoundingClientRect(),target=selected.getBoundingClientRect();indicator.style.width=target.width+'px';indicator.style.height=target.height+'px';indicator.style.transform='translate('+(target.left-box.left+group.scrollLeft-group.clientLeft)+'px,'+(target.top-box.top+group.scrollTop-group.clientTop)+'px)';}
  new ResizeObserver(placeIndicator).observe(group);document.fonts.ready.then(placeIndicator);placeIndicator();requestAnimationFrame(()=>group.classList.add('filters-ready'));
  buttons.forEach(button=>button.addEventListener('click',async()=>{
   if(button===selected)return;
   selected=button;const turn=++revision,kind=button.textContent.trim();
   running.forEach(animation=>animation.cancel());running.clear();
   buttons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));placeIndicator();
   const visible=cards.filter(card=>!card.hidden),previous=new Map(visible.map(card=>[card,card.getBoundingClientRect()])),oldHeight=list.getBoundingClientRect().height;
   if(motion())await Promise.all(visible.map(card=>animate(card,[{opacity:1},{opacity:0}],{duration:120,easing:'ease-out'}).finished.catch(()=>{})));
   if(turn!==revision)return;
   cards.forEach((card,i)=>{card.hidden=kind!=='All'&&types[i]!==kind;});
   const next=cards.filter(card=>!card.hidden),newHeight=list.getBoundingClientRect().height;
   if(motion()){
    animate(list,[{height:oldHeight+'px',overflow:'clip'},{height:newHeight+'px',overflow:'clip'}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'});
    next.forEach((card,i)=>{const before=previous.get(card),after=card.getBoundingClientRect(),x=before?before.left-after.left:0,y=before?before.top-after.top:18;
     animate(card,[{opacity:0,transform:'translate('+x+'px,'+y+'px)'},{opacity:1,transform:'translate(0,0)'}],{duration:380,delay:i*18,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    });
   }
   let status=$('#filter-status');if(!status){status=document.createElement('p');status.id='filter-status';status.className='champ-kicker';status.setAttribute('aria-live','polite');discover.append(status);}status.textContent=next.length+' experiences / '+kind;
  }));
 }

 // Published partner fee calculation. All arithmetic is local.
 const savings=$('#savings-heading')?.closest('section');
 if(savings){const sliders=$$('input[type=range]',savings),sold=$('input[type=checkbox]',savings),amount=$('[aria-live=polite]',savings);sliders.forEach((r,i)=>r.setAttribute('aria-label',['Average ticket price','Tickets per show','Shows a year','Other platform percentage'][i]));sold?.setAttribute('aria-label','My shows sell out');
  let comparisonScale=0;
  function calculate(){const [price,tickets,shows,cut]=sliders.map(x=>Number(x.value));const count=tickets*shows,other=count*price*cut/100*1.18,ours=sold.checked?0:count*5*1.18;sliders.forEach((s,i)=>{$('span span',s.closest('label')).textContent=i===0?money(s.value):i===3?s.value+'%':Number(s.value).toLocaleString('en-IN');});amount.textContent=money(other-ours);amount.nextElementSibling.textContent='more on en3, from '+count.toLocaleString('en-IN')+' tickets.';const rows=$$('.mt-10 > div',amount.parentElement);if(rows.length===2){let spans=$$('span',rows[0]);spans[0].textContent='A platform taking '+cut+'%';spans[1].textContent=money(other);spans=$$('span',rows[1]);spans[0].textContent=sold.checked?'en3, a verified full house':'en3, ₹5 a ticket';spans[1].textContent=money(ours);
   // A shared monetary axis lets BOTH costs move. Retain headroom while editing down.
   const peak=Math.max(other,ours,1)*1.1,unit=10**Math.floor(Math.log10(peak)),step=[1,2,5,10].find(n=>n*unit>=peak)||10;
   comparisonScale=Math.max(comparisonScale,step*unit);
   rows.forEach((row,index)=>{const value=index?ours:other,fill=$('.h-full',row),track=fill.parentElement;fill.style.width=(value/comparisonScale*100)+'%';track.setAttribute('role','meter');track.setAttribute('aria-label',index?'EN3 annual platform fees':'Other platform annual fees');track.setAttribute('aria-valuemin','0');track.setAttribute('aria-valuemax',Math.round(comparisonScale));track.setAttribute('aria-valuenow',Math.round(value));track.setAttribute('aria-valuetext',money(value));});
   let scale=$('.partner-comparison-scale',amount.parentElement);if(!scale){scale=document.createElement('p');scale.className='partner-comparison-scale';rows[0].parentElement.after(scale);}scale.textContent='Shared scale: ₹0 — '+money(comparisonScale)+' in annual fees';
  }}
  sliders.forEach(r=>r.addEventListener('input',calculate));sold?.addEventListener('change',calculate);calculate();
 }
 $$('form:not(#demo-login)').forEach(form=>{if(form.closest('#book'))return;if(!form.dataset.demo){let info=document.createElement('p');info.className='local-notice';info.textContent='Preview form: try with fictional details. Nothing is sent or saved.';form.prepend(info);}form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;let success=$('.form-result',form);if(!success){success=document.createElement('p');success.className='form-result local-notice';success.role='status';form.append(success);}success.textContent='Your preview request is complete. No request was sent to EN3.';success.scrollIntoView({block:'nearest',behavior:'smooth'});});});

 // The focused sign-in flow is implemented in ticket-auth.js.

 // A progressive safari prototype using captured display data, never live inventory.
 const book=$('#book');
 if(book){const steps=$$('section.glass',book).slice(0,5),dateOptions=$$('[role=option]',book),sessionButtons=$$('button',steps[0]).filter(b=>!b.hasAttribute('role')),summaries=$$('p.text-label',book).filter(p=>p.textContent==='Your booking').map(p=>p.parentElement),counts=[0,0,0,0],categories=['Indian adult','Indian child','Foreign adult','Foreign child'];let session='',vehicle='',selectedDate='Wednesday, 28 October',capacity=5;
  let info=document.createElement('p');info.className='local-notice';info.textContent='Local booking demo. Dates, fares and seats are captured examples, not live availability. Use fictional details. No seats are held and no payment is taken.';steps[0].prepend(info);
  function activate(n,content){let step=steps[n];step.classList.remove('pointer-events-none','opacity-45');let body=$('.local-step',step);if(!body){body=document.createElement('div');body.className='local-step';step.append(body);}if(content!==undefined)body.innerHTML=content;return body;}
  function status(){let total=counts.reduce((a,b)=>a+b,0),adults=counts[0]+counts[2],children=counts[1]+counts[3],valid=total>0&&adults>=1;const prompt=!session?'Pick a date and time.':!vehicle?'Choose a vehicle.':!valid?'Add at least one adult.':'Complete the fictional visitor and contact details.';for(const box of summaries){$('p.text-sm',box).textContent=selectedDate+(session?' · '+session:'')+(vehicle?' · '+vehicle:'');$('.text-data-lg',box).textContent=money(total*2);$('p.mt-3',box).textContent=prompt;let btn=$('button',box);btn.disabled=!valid;btn.textContent='Review demo booking';btn.onclick=()=>{const fields=$$('input,select',steps[3]).concat($$('input',steps[4]));if(fields.some(f=>!f.reportValidity()))return;notice('Demo complete. No booking, payment or ticket was created.');let result=$('#demo-booking-result');if(!result){result=document.createElement('div');result.id='demo-booking-result';result.className='demo-ticket';result.role='status';book.append(result);}result.innerHTML='<span class="champ-kicker">PREVIEW COMPLETE / NOT VALID FOR ENTRY</span><h2>Jungle Safari</h2><p>'+selectedDate+' · '+session+' · '+vehicle+'</p><p>'+total+' visitors · Captured example total '+money(total*2)+'</p><p>No seats have been held. No payment has been taken. Nothing has been sent to EN3.</p>';result.scrollIntoView({behavior:'smooth',block:'center'});};}
   $$('.quantity-row',steps[2]).forEach((row,i)=>{let controls=$$('button',row);controls[0].disabled=counts[i]===0;controls[1].disabled=total>=Math.min(10,capacity)||(i%2===0?adults>=6:children>=4);$('output',row).value=counts[i];});
   if(valid){let detail=activate(3);let number=adults,existing=$$('fieldset',detail);while(existing.length>number){existing.pop().remove();}while(existing.length<number){let i=existing.length,field=document.createElement('fieldset');field.className='local-fields';field.style.marginTop='20px';field.innerHTML='<legend>Adult visitor '+(i+1)+'</legend><label>Full name<input required maxlength="120" autocomplete="off" placeholder="Fictional name"></label><div class="local-grid"><label>Age<input type="number" min="13" max="120" required></label><label>Gender (optional)<select><option value="">Select…</option><option>Female</option><option>Male</option><option>Other</option></select></label></div><div class="local-grid"><label>Nationality<input value="Indian" required autocomplete="off"></label><label>ID type<select required><option value="">Select…</option><option>Aadhaar (last 4 digits only)</option><option>Passport</option><option>Driving licence</option><option>Voter ID</option><option>PAN</option></select></label></div><label>Fictional ID number<input required autocomplete="off" placeholder="Use sample data only"></label>';detail.append(field);existing.push(field);}
    if(!$('.local-step',steps[4]))activate(4,'<div class="local-fields"><label>Your name<input required autocomplete="off" placeholder="Fictional name"></label><label>Email<input type="email" required autocomplete="off" placeholder="you@example.com"></label><label>Mobile number<input type="tel" required pattern="[0-9]{10}" maxlength="10" placeholder="Fictional 10-digit number" autocomplete="off"></label><p class="local-notice">Preview only. This contact is not verified or saved. No OTP will be sent.</p></div>');
   }else{[3,4].forEach(i=>{steps[i].classList.add('pointer-events-none','opacity-45');$('.local-step',steps[i])?.remove();});}}
  dateOptions.forEach((b,i)=>{const d=new Date(2026,9,26+i,12);b.dataset.previewDate=d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});b.addEventListener('click',()=>{dateOptions.forEach(x=>x.setAttribute('aria-selected',String(x===b)));selectedDate=b.dataset.previewDate;status();});});
  sessionButtons.forEach(b=>b.addEventListener('click',()=>{session=b.textContent.includes('Morning')?'Morning':'Evening';sessionButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));activate(1,'<p class="local-notice">Captured example inventory. Shared rides · ₹2 per person in this snapshot.</p>'+['Gypsy / Jeep','Bus','Canter / Camper'].map((name,i)=>'<button type="button" class="local-option" data-vehicle="'+name+'" data-capacity="'+[5,56,8][i]+'"><span><strong>'+name+'</strong><br><small>Shared · captured example fare ₹2</small></span><span>'+[5,56,8][i]+' sample seats</span></button>').join(''));$$('[data-vehicle]',steps[1]).forEach(v=>v.addEventListener('click',()=>{vehicle=v.dataset.vehicle;capacity=Number(v.dataset.capacity);counts.fill(0);$$('[data-vehicle]',steps[1]).forEach(x=>x.setAttribute('aria-pressed',String(x===v)));let body=activate(2,categories.map((name,i)=>'<div class="quantity-row"><span>'+name+'<br><small>₹2'+(i%2?' · Ages 3–12':'')+'</small></span><div class="local-count"><button type="button" aria-label="Decrease '+name+'">−</button><output aria-label="'+name+' count">0</output><button type="button" aria-label="Increase '+name+'">+</button></div></div>').join('')+'<p class="local-notice">At least 1 adult. Up to 6 adults and 4 children, within the sample vehicle capacity.</p>');$$('.quantity-row',body).forEach((row,i)=>$$('button',row).forEach((btn,j)=>btn.addEventListener('click',()=>{counts[i]+=j?1:-1;status();})));status();}));status();}));status();
 }
 const search=$('#resource-search');search?.addEventListener('input',()=>{let q=search.value.toLowerCase().trim(),matches=0;$$('[data-resource-search]').forEach(row=>{row.hidden=!row.dataset.resourceSearch.includes(q);if(!row.hidden)matches++;});$('#resource-empty').hidden=matches>0;});
})();

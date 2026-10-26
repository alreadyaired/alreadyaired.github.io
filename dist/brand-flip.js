(() => {
 const logos=[...document.querySelectorAll('.brand-unfolder')];if(!logos.length||document.documentElement.dataset.motion==='reduced')return;
 let timer;
 function start(){clearInterval(timer);if(document.hidden)return;timer=setInterval(()=>logos.forEach(logo=>logo.classList.toggle('is-ticket')),3500);}
 function ready(){if(document.documentElement.classList.contains('en3-font-loading'))return;watcher?.disconnect();start();}
 let watcher;
 if(document.documentElement.classList.contains('en3-font-loading')){watcher=new MutationObserver(ready);watcher.observe(document.documentElement,{attributes:true,attributeFilter:['class']});}else start();
 document.addEventListener('visibilitychange',start);
})();

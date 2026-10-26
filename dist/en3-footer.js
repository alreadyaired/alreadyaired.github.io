(() => {
 const footer=document.querySelector('.en3-footer');if(!footer)return;
 const headline=footer.querySelector('[data-footer-hello]'),hello=headline?.closest('.hello');
 if(headline&&hello){
  let frame=0;
  const fit=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{headline.style.transform='none';headline.style.fontSize=Math.max(48,hello.clientHeight*1.05)+'px';const natural=headline.getBoundingClientRect().width,style=getComputedStyle(hello),space=hello.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);if(natural>0)headline.style.transform='scaleX('+(space/natural)+')';});};
  new ResizeObserver(fit).observe(hello);document.fonts.ready.then(fit);fit();
 }
 footer.querySelector('[data-to-top]')?.addEventListener('click',event=>{
  event.preventDefault();
  window.scrollTo({top:0,behavior:document.documentElement.dataset.motion==='reduced'?'instant':'smooth'});
 });
})();

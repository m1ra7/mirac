(() => {
  const gallery = document.querySelector('.ustax-web-gallery');
  const images = [...gallery.querySelectorAll('img')];
  const prev = document.querySelector('[data-web-prev]');
  const next = document.querySelector('[data-web-next]');
  const count = document.querySelector('.web-gallery-count');
  let index = 0;
  function update() {
    const left = gallery.getBoundingClientRect().left;
    index = images.reduce((best, img, i) => Math.abs(img.getBoundingClientRect().left - left) < Math.abs(images[best].getBoundingClientRect().left - left) ? i : best, 0);
    count.textContent = `${index + 1} / ${images.length}`;
    prev.disabled = index === 0;
    next.disabled = index === images.length - 1;
  }
  function move(delta) {
    const target = images[Math.max(0, Math.min(images.length - 1, index + delta))];
    gallery.scrollBy({left:target.getBoundingClientRect().left-gallery.getBoundingClientRect().left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  gallery.addEventListener('scroll', update, {passive:true});
  gallery.addEventListener('keydown', event => {
    if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') {event.preventDefault();move(event.key === 'ArrowLeft'?-1:1);}
  });
  window.addEventListener('resize', update);
  update();
})();

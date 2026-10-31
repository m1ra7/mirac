(() => {
  const dialog = document.querySelector('.image-viewer');
  const stage = dialog.querySelector('.viewer-stage');
  const preview = stage.querySelector('img');
  const caption = dialog.querySelector('.viewer-caption');
  const zoom = dialog.querySelector('.viewer-zoom');
  const close = dialog.querySelector('.viewer-close');
  const t = key => window.miracsoftI18n.t(key);
  let opener;
  function setZoom(enabled) {
    stage.classList.toggle('zoomed', enabled);
    preview.style.width = enabled ? `${Math.max(preview.naturalWidth, stage.clientWidth * 1.5)}px` : '';
    zoom.textContent = t(enabled ? 'imageFit' : 'imageZoom');
    zoom.setAttribute('aria-pressed', String(enabled));
  }
  function open(image, trigger) {
    opener = trigger;
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    caption.textContent = image.alt;
    setZoom(false);
    dialog.showModal();
    document.body.classList.add('viewer-open');
    close.focus();
  }
  document.querySelectorAll('.project img:not(.project-app-icon)').forEach(image => {
    const trigger = image.closest('a') || image;
    trigger.setAttribute('role', 'button');
    trigger.tabIndex = 0;
    const label = () => trigger.setAttribute('aria-label', `${t('imageOpen')}: ${image.alt}`);
    label();
    document.getElementById('language-select').addEventListener('change', label);
    trigger.addEventListener('click', event => { event.preventDefault(); open(image, trigger); });
    trigger.addEventListener('keydown', event => {
      if (event.key === ' ' || (event.key === 'Enter' && trigger.tagName !== 'A')) {
        event.preventDefault(); open(image, trigger);
      }
    });
  });
  close.addEventListener('click', () => dialog.close());
  zoom.addEventListener('click', () => setZoom(!stage.classList.contains('zoomed')));
  preview.addEventListener('click', () => setZoom(!stage.classList.contains('zoomed')));
  stage.addEventListener('click', event => { if (event.target === stage) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('viewer-open');
    preview.removeAttribute('src');
    opener?.focus();
  });
})();

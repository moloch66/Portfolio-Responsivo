/* =========================================
   Arc Gallery — Carrossel infinito animado
   ========================================= */

(function () {
  const CARD_W_DESKTOP = 220;
  const CARD_H_DESKTOP = 280;
  const CARD_W_MOBILE  = 160;
  const CARD_H_MOBILE  = 200;
  const GAP = 16;
  const SPEED = 0.6; // px por frame

  function cardSize() {
    return window.innerWidth < 768
      ? { w: CARD_W_MOBILE, h: CARD_H_MOBILE }
      : { w: CARD_W_DESKTOP, h: CARD_H_DESKTOP };
  }

  const TOTAL_CARDS = 10;

  function getPlaceholderSrc(w, h) {
    return `https://placehold.co/${w}x${h}/1c1c1c/2a2a2a?text=+`;
  }

  let rafId = null;

  function buildCarousel() {
    const section = document.querySelector('.arc-gallery');
    if (!section) return;

    // Cancela animação anterior ao rebuild (resize)
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    section.innerHTML = '';

    const { w, h } = cardSize();
    const src = getPlaceholderSrc(w, h);

    const track = document.createElement('div');
    track.className = 'arc-gallery__track';

    // Duplica os cards para loop seamless
    const total = TOTAL_CARDS * 2;
    for (let i = 0; i < total; i++) {
      const el = document.createElement('div');
      el.className = 'arc-gallery__item';

      const img = document.createElement('img');
      img.src       = src;
      img.alt       = '';
      img.loading   = 'lazy';
      img.draggable = false;

      el.appendChild(img);
      track.appendChild(el);
    }

    section.appendChild(track);

    // Ponto de reset: largura de um set completo
    const setWidth = TOTAL_CARDS * (w + GAP);

    let x = 0;
    let paused = false;

    // Pausa ao hover
    track.addEventListener('mouseenter', () => { paused = true; });
    track.addEventListener('mouseleave', () => { paused = false; });

    // Respeita prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      // Sem animação: mostra os cards sem movimento
      track.style.transform = `translateX(0px)`;
      return;
    }

    function animate() {
      if (!paused) {
        x -= SPEED;
        if (x <= -setWidth) x += setWidth;
        track.style.transform = `translateX(${x}px)`;
      }
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildCarousel);
  } else {
    buildCarousel();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildCarousel, 200);
  });
})();

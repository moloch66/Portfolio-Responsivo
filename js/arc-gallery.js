/* =========================================
   Arc Gallery — semicircular photo layout
   Cards fixos em arco, sem textos
   ========================================= */

(function () {
  const isMobile = () => window.innerWidth < 768;

  // 10 cards com tamanhos variados
  const ITEMS = [
    { w: 100, h: 130 },
    { w: 90,  h: 115 },
    { w: 85,  h: 108 },
    { w: 95,  h: 120 },
    { w: 80,  h: 100 },
    { w: 80,  h: 100 },
    { w: 95,  h: 120 },
    { w: 85,  h: 108 },
    { w: 90,  h: 115 },
    { w: 100, h: 130 },
  ];

  function buildArc() {
    const section = document.querySelector('.arc-gallery');
    if (!section) return;

    const scene = section.querySelector('.arc-gallery__scene');
    if (!scene) return;

    const mobile = isMobile();
    const sceneW  = mobile ? 360 : 800;
    const sceneH  = mobile ? 320 : 560;
    scene.style.width  = sceneW + 'px';
    scene.style.height = sceneH + 'px';

    const cx     = sceneW / 2;
    const cy     = sceneH + (mobile ? 20 : 60); // centro abaixo da cena
    const radius = mobile ? 260 : 520;

    // arco de -175° a -5° (semicírculo superior)
    const startAngle = -175;
    const endAngle   = -5;

    scene.innerHTML = '';

    ITEMS.forEach((item, i) => {
      const t        = i / (ITEMS.length - 1);
      const angleDeg = startAngle + t * (endAngle - startAngle);
      const angleRad = (angleDeg * Math.PI) / 180;

      const x = cx + radius * Math.cos(angleRad) - item.w / 2;
      const y = cy + radius * Math.sin(angleRad) - item.h / 2;

      // inclinar o card para seguir a tangente do arco
      const tiltDeg = angleDeg + 90;

      const el = document.createElement('div');
      el.className = 'arc-gallery__item';
      el.style.cssText = `
        width: ${item.w}px;
        height: ${item.h}px;
        left: ${x}px;
        top: ${y}px;
        transform: rotate(${tiltDeg}deg);
      `;

      // Placeholder branco gelo sem texto
      const img = document.createElement('img');
      img.src    = `https://placehold.co/${item.w}x${item.h}/1c1c1c/2a2a2a?text=+`;
      img.alt    = '';
      img.loading = 'lazy';
      img.draggable = false;
      el.appendChild(img);

      // hover: escala mantendo rotação
      el.addEventListener('mouseenter', () => {
        el.style.transform = `rotate(${tiltDeg}deg) scale(1.1)`;
        el.style.zIndex = '20';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = `rotate(${tiltDeg}deg) scale(1)`;
        el.style.zIndex = '';
      });

      scene.appendChild(el);
    });

    // Animação: cada card aparece com fade + translateY ao entrar na viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const cards = scene.querySelectorAll('.arc-gallery__item');
        cards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.4s var(--ease-out-expo)`;
          setTimeout(() => { card.style.opacity = '1'; }, i * 80 + 100);
        });
        observer.disconnect();
      });
    }, { threshold: 0.2 });

    observer.observe(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildArc);
  } else {
    buildArc();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildArc, 200);
  });
})();

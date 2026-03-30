/* =========================================
   Global Falling Particles
   Direction: top → bottom only
   Colors: white/ice tones
   Speeds up while scrolling
   ========================================= */

const Particles = (() => {
  let canvas, ctx, particles = [], animId;

  // Branco gelo
  const COLORS = ['#e8e8e8', '#d4d4d4', '#f0f0f0', '#c8c8c8', '#ffffff'];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile  = () => window.innerWidth < 768;

  // Velocidade base e multiplicador de scroll
  let scrollMultiplier = 1;
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;

  // Detectar velocidade do scroll
  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    scrollVelocity = Math.abs(currentY - lastScrollY);
    lastScrollY = currentY;
    // Multiplicador: 1 em repouso, até 5x ao rolar rápido
    scrollMultiplier = 1 + Math.min(scrollVelocity * 0.15, 4);
  }, { passive: true });

  // Decai suavemente quando para de rolar
  setInterval(() => {
    scrollVelocity *= 0.85;
    scrollMultiplier = 1 + Math.min(scrollVelocity * 0.15, 4);
  }, 50);

  function targetCount() {
    if (reduced) return 30;
    return mobile() ? 80 : 180;
  }

  function spawn(startSpread) {
    return {
      x:         Math.random() * (canvas?.width  || window.innerWidth),
      y:         startSpread ? Math.random() * (canvas?.height || window.innerHeight) : -6,
      r:         0.8 + Math.random() * 2,
      baseSpeed: reduced ? 0.1 : 0.3 + Math.random() * 0.9,
      drift:     (Math.random() - 0.5) * 0.18,
      opacity:   0.15 + Math.random() * 0.38,
      color:     COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    particles = Array.from({ length: targetCount() }, () => spawn(true));

    window.addEventListener('resize', onResize);
    loop();
  }

  function onResize() {
    resize();
    particles.forEach(p => {
      if (p.x > canvas.width) p.x = Math.random() * canvas.width;
    });
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function loop() {
    animId = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const n = targetCount();
    while (particles.length < n) particles.push(spawn(false));
    if (particles.length > n) particles.length = n;

    particles.forEach(p => {
      // Velocidade aumenta com scroll
      const speed = p.baseSpeed * scrollMultiplier;

      p.y += speed;
      p.x += p.drift;

      if (p.y > canvas.height + 6) {
        p.y = -6;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -6 || p.x > canvas.width + 6) {
        p.x = Math.random() * canvas.width;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  }

  function destroy() {
    if (animId) cancelAnimationFrame(animId);
    window.removeEventListener('resize', onResize);
  }

  return { init, destroy };
})();

window.Particles = Particles;

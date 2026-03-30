/* =========================================
   Starfield 3D — Profundidade Z → tela
   Partículas nascem no ponto de fuga (centro)
   e voam em direção ao usuário (frente da tela)
   ========================================= */

const Particles = (() => {
  let canvas, ctx, stars = [], animId;

  /* ── Paleta (igual ao original) ── */
  const COLORS = ['#e8e8e8', '#d4d4d4', '#f0f0f0', '#c8c8c8', '#ffffff'];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile  = () => window.innerWidth < 768;

  /* ── Parâmetros 3D ── */
  const MAX_Z    = 900;   // profundidade máxima (longe)
  const MIN_Z    = 1;     // profundidade mínima (prestes a sair da tela)
  const FOV      = 380;   // distância focal — controla abertura do cone
  const MAX_R    = 1.1;   // raio máx quando bem próxima

  /* ── Aceleração de scroll (mantida) ── */
  let scrollMultiplier = 1;
  let lastScrollY      = 0;
  let scrollVelocity   = 0;

  window.addEventListener('scroll', () => {
    const cur    = window.scrollY;
    scrollVelocity   = Math.abs(cur - lastScrollY);
    lastScrollY      = cur;
    scrollMultiplier = 1 + Math.min(scrollVelocity * 0.20, 6);
  }, { passive: true });

  setInterval(() => {
    scrollVelocity   *= 0.82;
    scrollMultiplier  = 1 + Math.min(scrollVelocity * 0.20, 6);
  }, 50);

  /* ── Quantas estrelas ── */
  function targetCount() {
    if (reduced) return 60;
    return mobile() ? 180 : 420;
  }

  /* ── Criar uma estrela ──
     spreadZ = true  → distribui em toda a profundidade (init)
     spreadZ = false → nasce lá no fundo (loop)              */
  function mkStar(spreadZ) {
    return {
      x:     (Math.random() - 0.5) * MAX_Z * 2.2,
      y:     (Math.random() - 0.5) * MAX_Z * 2.2,
      z:     spreadZ ? Math.random() * MAX_Z : MAX_Z,
      pz:    MAX_Z,
      // Tamanhos variados: 60% pequenas, 30% menores, 10% minúsculas
      sizeClass: Math.random() < 0.1 ? 'tiny' : Math.random() < 0.4 ? 'small' : 'normal',
      speed: reduced ? 0.4 : (0.84 + Math.random() * 1.96) * 0.7, // 30% mais lento
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  /* ── Setup ── */
  function init() {
    canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    resize();
    stars = Array.from({ length: targetCount() }, () => mkStar(true));
    window.addEventListener('resize', onResize);
    loop();
  }

  function onResize() { resize(); }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /* ── Loop principal ── */
  function loop() {
    animId = requestAnimationFrame(loop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const n  = targetCount();
    while (stars.length < n) stars.push(mkStar(false));
    if (stars.length > n)    stars.length = n;

    const cx = canvas.width  / 2;
    const cy = canvas.height / 2;

    stars.forEach(s => {
      /* guarda z anterior para o streak */
      s.pz = s.z;

      /* avança em direção ao usuário */
      s.z -= s.speed * scrollMultiplier;

      /* recicla quando passa pela câmera */
      if (s.z <= MIN_Z) {
        s.x  = (Math.random() - 0.5) * MAX_Z * 2.2;
        s.y  = (Math.random() - 0.5) * MAX_Z * 2.2;
        s.z  = MAX_Z;
        s.pz = MAX_Z;
        return;
      }

      /* ── Projeção perspectiva 3D → 2D ── */
      const sx  = (s.x  / s.z)  * FOV + cx;
      const sy  = (s.y  / s.z)  * FOV + cy;

      /* descarta o que está fora do canvas */
      if (sx < -20 || sx > canvas.width  + 20 ||
          sy < -20 || sy > canvas.height + 20) return;

      /* progresso: 0 = distante, 1 = perto */
      const progress = 1 - (s.z / MAX_Z);

      /* tamanho varia por classe: tiny < small < normal */
      const sizeMultiplier = s.sizeClass === 'tiny' ? 0.25 : s.sizeClass === 'small' ? 0.55 : 1.0;
      const r       = (0.15 + MAX_R * (progress * progress)) * sizeMultiplier;
      const opacity = Math.min(0.06 + progress * (s.sizeClass === 'tiny' ? 0.3 : 0.52), 0.65);

      ctx.globalAlpha = opacity;

      /* ── Streak (rastro) para partículas próximas e rápidas ── */
      if (progress > 0.35) {
        const psx = (s.x / s.pz) * FOV + cx;
        const psy = (s.y / s.pz) * FOV + cy;
        const trailLen = Math.hypot(sx - psx, sy - psy);

        if (trailLen > 1.2) {
          ctx.beginPath();
          ctx.moveTo(psx, psy);
          ctx.lineTo(sx,  sy);
          ctx.strokeStyle = s.color;
          ctx.lineWidth   = r * 0.65;
          ctx.lineCap     = 'round';
          ctx.stroke();
        }
      }

      /* ── Ponto central ── */
      ctx.beginPath();
      ctx.arc(sx, sy, r, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
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

/* =========================================
   Custom Cursor — ring + canvas trail
   Desktop (hover: hover) only.
   ========================================= */

(function () {
  const isTouchOnly = () => !window.matchMedia('(hover: hover)').matches;
  if (isTouchOnly()) return;

  /* ---- Elements ---- */
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  /* ---- State ---- */
  let mouse   = { x: -200, y: -200 };
  let visible = false;

  // Trail particles: [{ x, y, life, vx, vy }]
  const particles = [];

  // Palette (white ice)
  const PALETTE = [
    [240, 248, 255],   // alice blue
    [220, 235, 245],   // ice white
    [200, 220, 240],   // light ice
    [225, 240, 255],   // white ice
    [240, 248, 255],   // alice blue
  ];

  function pickColor(t) {
    const n = PALETTE.length - 1;
    const i = Math.floor(t * n);
    const j = Math.min(i + 1, n);
    const f = t * n - i;
    const a = PALETTE[i], b = PALETTE[j];
    return [
      a[0] + (b[0] - a[0]) * f,
      a[1] + (b[1] - a[1]) * f,
      a[2] + (b[2] - a[2]) * f,
    ];
  }

  /* ---- Canvas resize ---- */
  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  /* ---- Mouse events ---- */
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (!visible) {
      visible = true;
      dot.classList.add('visible');
    }

    // Spawn trail particle
    particles.push({
      x: e.clientX,
      y: e.clientY,
      life: 1,
      r: 5 + Math.random() * 6,
      colorIdx: Math.random(),
    });
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    visible = false;
    dot.classList.remove('visible');
  });

  /* ---- Render loop ---- */
  const lerp = (a, b, t) => a + (b - a) * t;

  function render() {
    requestAnimationFrame(render);

    // Dot snaps exactly
    dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`;

    // Trail canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= 0.048;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      const alpha = p.life * 0.45;
      const radius = p.r * p.life;
      const [r, g, b] = pickColor(p.colorIdx);

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 2.5);
      grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.4})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  render();
})();

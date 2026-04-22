/* ================================================
   VIVE — Executive Health Platform
   main.js — Interactions & Animations
   ================================================ */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Cursor Spotlight ──────────────────────────── */
  const spot = document.getElementById('cursorSpot');
  if (spot && !prefersReduced) {
    document.addEventListener('mousemove', e => {
      spot.style.left = e.clientX + 'px';
      spot.style.top  = e.clientY + 'px';
    });
    document.addEventListener('mouseenter', () => spot.style.opacity = '1');
    document.addEventListener('mouseleave', () => spot.style.opacity = '0');
  }

  /* ── Navbar Scroll State ───────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Mobile Drawer ─────────────────────────────── */
  const hamburger    = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose  = document.getElementById('drawerClose');

  function openDrawer()  { mobileDrawer?.classList.add('open');  document.body.style.overflow = 'hidden'; }
  function closeDrawer() { mobileDrawer?.classList.remove('open'); document.body.style.overflow = ''; }

  hamburger?.addEventListener('click',    openDrawer);
  drawerClose?.addEventListener('click',  closeDrawer);
  mobileDrawer?.addEventListener('click', e => { if (e.target === mobileDrawer) closeDrawer(); });

  mobileDrawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ── Scroll Reveal ─────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ── Counter Animation ─────────────────────────── */
  const counters = document.querySelectorAll('.counter[data-to]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        counterObserver.unobserve(entry.target);
        animateCounter(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.to);
    const decimals = parseInt(el.dataset.decimals  || '0', 10);
    const suffix   = el.dataset.suffix || '';
    const duration = prefersReduced ? 0 : 1600;
    const start    = performance.now();

    function tick(now) {
      const t       = Math.min((now - start) / duration, 1);
      const eased   = 1 - Math.pow(1 - t, 3);
      const current = (target * eased).toFixed(decimals);
      el.textContent = current + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }

    if (prefersReduced) {
      el.textContent = target.toFixed(decimals) + suffix;
    } else {
      requestAnimationFrame(tick);
    }
  }

  /* ── Card 3D Tilt ──────────────────────────────── */
  const tiltCards = document.querySelectorAll('[data-tilt]');
  if (tiltCards.length && !prefersReduced) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect   = card.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        card.style.setProperty('--tx', `${-dy * 8}deg`);
        card.style.setProperty('--ty', `${dx  * 8}deg`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tx', '0deg');
        card.style.setProperty('--ty', '0deg');
      });
    });
  }

  /* ── Magnetic Buttons ──────────────────────────── */
  const magnetics = document.querySelectorAll('.magnetic');
  if (magnetics.length && !prefersReduced) {
    magnetics.forEach(wrap => {
      const btn = wrap.querySelector('button, a') || wrap;

      wrap.addEventListener('mousemove', e => {
        const rect   = wrap.getBoundingClientRect();
        const cx     = rect.left + rect.width  / 2;
        const cy     = rect.top  + rect.height / 2;
        const dx     = (e.clientX - cx) / (rect.width  / 2);
        const dy     = (e.clientY - cy) / (rect.height / 2);
        btn.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
      });

      wrap.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── Smooth Scroll ─────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  });

  /* ── Comparison Tab Toggle ─────────────────────── */
  const compareTabs = document.querySelectorAll('.compare-tab');
  compareTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      compareTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  /* ── Hero Orb Parallax ─────────────────────────── */
  const orbs = document.querySelectorAll('.orb-1, .orb-2, .orb-3');
  if (orbs.length && !prefersReduced) {
    document.addEventListener('mousemove', e => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 10;
        orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
      });
    });
  }

})();

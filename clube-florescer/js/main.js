/* =========================================================
   CLUBE FLORESCER EXECUTIVOS — Main JavaScript
   Landing page interactions, scroll animations, navbar
   ========================================================= */

'use strict';

// ── Navbar scroll behavior ────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const navCTADesktop = document.getElementById('navCTADesktop');
  const navAppLink    = document.getElementById('navAppLink');

  function onScroll() {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);

    if (navCTADesktop) navCTADesktop.style.display = scrolled ? 'inline-flex' : 'none';
    if (navAppLink)    navAppLink.style.display    = scrolled ? 'inline-flex' : 'none';
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Mobile menu ───────────────────────────────────────────
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn   = document.getElementById('mobileClose');

  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  // Close on backdrop tap
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) closeMenu();
  });

  // Expose for inline onclick handlers in HTML
  window.closeMobileMenu = closeMenu;
})();

// ── Scroll reveal (IntersectionObserver) ─────────────────
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

// ── Hero particles ─────────────────────────────────────────
(function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const COUNT = 18;

  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('div');

    const size  = 2 + Math.random() * 4;
    const x     = Math.random() * 100;
    const y     = 10 + Math.random() * 80;
    const dur   = 6 + Math.random() * 10;
    const delay = Math.random() * 6;
    const opacity = 0.05 + Math.random() * 0.2;

    Object.assign(p.style, {
      position:   'absolute',
      left:       x + '%',
      top:        y + '%',
      width:      size + 'px',
      height:     size + 'px',
      background: 'rgba(212, 168, 67, ' + opacity + ')',
      borderRadius: Math.random() > 0.5 ? '50%' : '1px',
      transform:  'rotate(45deg)',
      animation:  `float ${dur}s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    });

    container.appendChild(p);
  }

  // Add float keyframes if not present
  if (!document.getElementById('particleStyles')) {
    const style = document.createElement('style');
    style.id = 'particleStyles';
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: rotate(45deg) translateY(0px); opacity: var(--op, 0.1); }
        50%       { transform: rotate(45deg) translateY(-20px); opacity: calc(var(--op, 0.1) * 1.5); }
      }
    `;
    document.head.appendChild(style);
  }
})();

// ── Diamond logo micro-animation on hover ─────────────────
(function initLogoAnimation() {
  const logos = document.querySelectorAll('.nav-logo svg');
  logos.forEach(function(svg) {
    svg.parentElement.addEventListener('mouseenter', function() {
      svg.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      svg.style.transform  = 'rotate(15deg) scale(1.1)';
    });
    svg.parentElement.addEventListener('mouseleave', function() {
      svg.style.transform = 'rotate(0deg) scale(1)';
    });
  });
})();

// ── Smooth active nav link highlighting ───────────────────
(function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(function(link) {
            const isActive = link.getAttribute('href') === '#' + id;
            link.style.color = isActive
              ? 'var(--brand-gold)'
              : 'var(--brand-cream-70)';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();

// ── Usage bar animation trigger (for landing phone mockup) ─
(function initMockupBars() {
  const bars = document.querySelectorAll('.bar-fill[style*="width:"]');
  if (!bars.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observer = new IntersectionObserver(
    function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // The bars are already set via inline style; add a CSS transition
          entry.target.style.transition = 'width 1.2s cubic-bezier(0.0, 0, 0.2, 1) 0.3s';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  bars.forEach(b => {
    const targetWidth = b.style.width;
    b.style.width = '0%';
    setTimeout(() => observer.observe(b), 100);
    b.dataset.target = targetWidth;
  });
})();

// ── Comparison table row hover ────────────────────────────
(function initTableHover() {
  const rows = document.querySelectorAll('.comparison-table tbody tr');
  rows.forEach(function(row) {
    row.addEventListener('mouseenter', function() {
      row.style.background = 'rgba(212,168,67,0.04)';
    });
    row.addEventListener('mouseleave', function() {
      row.style.background = '';
    });
  });
})();

// ── Focus management for accessibility ───────────────────
(function initFocusStyles() {
  // Add visible focus ring to all interactive elements
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');
    }
  });

  document.addEventListener('mousedown', function() {
    document.body.classList.remove('using-keyboard');
  });

  if (!document.getElementById('focusStyles')) {
    const style = document.createElement('style');
    style.id = 'focusStyles';
    style.textContent = `
      body.using-keyboard *:focus {
        outline: 3px solid #D4A843 !important;
        outline-offset: 2px !important;
      }
    `;
    document.head.appendChild(style);
  }
})();

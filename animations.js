/* =========================================
   GSAP ScrollTrigger Animations + Anime.js
   Fabrica-inspired interactions
   ========================================= */

const Animations = (() => {
  const isMobile = () => window.innerWidth < 768;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initGSAP() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // ---- About: head tag ----
    const aboutHead = document.querySelector('.about__head');
    if (aboutHead) {
      gsap.to(aboutHead, {
        opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '#about', start: 'top 80%', once: true },
      });
    }

    // ---- About: headline ----
    const aboutHeadline = document.querySelector('.about__headline');
    if (aboutHeadline) {
      gsap.to(aboutHeadline, {
        opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: '#about', start: 'top 75%', once: true },
        delay: 0.1,
      });
    }

    // ---- About: bio ----
    const aboutBio = document.querySelector('.about__bio');
    if (aboutBio) {
      gsap.to(aboutBio, {
        opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '#about', start: 'top 72%', once: true },
        delay: 0.22,
      });
    }

    // ---- About: stats grid ----
    const aboutStats = document.querySelector('.about__stats');
    if (aboutStats) {
      gsap.to(aboutStats, {
        opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '.about__stats', start: 'top 80%', once: true },
      });
    }

    // ---- About: skills ----
    const aboutSkills = document.querySelector('.about__skills');
    if (aboutSkills) {
      gsap.to(aboutSkills, {
        opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '.about__skills', start: 'top 82%', once: true },
        onComplete: () => animateSkills(document.querySelector('.skills-grid')),
      });
    }

    // ---- Portfolio: head ----
    const portfolioHead = document.querySelector('.portfolio__head');
    if (portfolioHead) {
      gsap.to(portfolioHead, {
        opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '#portfolio', start: 'top 80%', once: true },
      });
    }

    // ---- Portfolio: cards stagger ----
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length) {
      gsap.to(projectCards, {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '#portfolio', start: 'top 72%', once: true },
      });
    }

    // ---- Services: head ----
    const servicesHead = document.querySelector('.services__head');
    if (servicesHead) {
      gsap.to(servicesHead, {
        opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: '#services', start: 'top 80%', once: true },
      });
    }

    // ---- Services: rows stagger ----
    const serviceRows = document.querySelectorAll('.service-row');
    if (serviceRows.length) {
      gsap.to(serviceRows, {
        opacity: 1, y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: '#services', start: 'top 72%', once: true },
      });
    }

    // ---- Services: CTA pill ----
    const servicesCta = document.querySelector('.services__cta-wrap');
    if (servicesCta) {
      gsap.to(servicesCta, {
        opacity: 1, y: 0, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: servicesCta, start: 'top 88%', once: true },
      });
    }

    // ---- Contact section ----
    const contactInner = document.querySelector('.contact__inner');
    if (contactInner) {
      gsap.to(contactInner, {
        opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: '#contact', start: 'top 75%', once: true },
      });
    }

    // ---- Scroll progress bar ----
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progressBar.style.width = `${self.progress * 100}%`;
        },
      });
    }
  }

  // ---- Skill tags stagger (Anime.js) ----
  function animateSkills(grid) {
    if (!grid || typeof anime === 'undefined') return;
    anime({
      targets: grid.querySelectorAll('.skill-tag'),
      opacity: [0, 1],
      translateY: [8, 0],
      duration: 380,
      delay: anime.stagger(50, { start: 80 }),
      easing: 'easeOutExpo',
    });
  }

  // ---- Card tilt on hover (desktop) ----
  function initCardTilt() {
    if (isMobile() || prefersReduced) return;

    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const maxTilt = 5;
        const imgWrap = card.querySelector('.project-card__img-wrap');
        if (imgWrap) {
          imgWrap.style.transform = `perspective(900px) rotateY(${dx * maxTilt}deg) rotateX(${-dy * maxTilt}deg)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        const imgWrap = card.querySelector('.project-card__img-wrap');
        if (imgWrap) {
          imgWrap.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
          imgWrap.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
          setTimeout(() => { imgWrap.style.transition = ''; }, 500);
        }
      });
    });
  }

  // ---- Service row hover (subtle lift via GSAP) ----
  function initServiceRowHover() {
    if (prefersReduced) return;
    document.querySelectorAll('.service-row').forEach(row => {
      row.addEventListener('mouseenter', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(row, { x: 6, duration: 0.3, ease: 'power2.out', overwrite: 'auto' });
        }
      });
      row.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(row, { x: 0, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' });
        }
      });
    });
  }

  // Typewriter (kept for hero tagline compatibility)
  const Typewriter = (() => {
    let el, text, speed = 60, timerId, cursor;

    function start(targetEl, str) {
      if (prefersReduced) { targetEl.textContent = str; return; }
      el = targetEl; text = str; el.textContent = '';
      cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      el.parentNode.insertBefore(cursor, el.nextSibling);
      let i = 0;
      function type() {
        if (i < text.length) { el.textContent += text[i++]; timerId = setTimeout(type, speed); }
        else { cursor.classList.add('done'); }
      }
      type();
    }

    function reset(newText) {
      clearTimeout(timerId);
      if (cursor) { cursor.remove(); cursor = null; }
      if (el) start(el, newText);
    }

    return { start, reset };
  })();

  window.Typewriter = Typewriter;

  function init() {
    initGSAP();
    initCardTilt();
    initServiceRowHover();
  }

  return { init, Typewriter };
})();

window.Animations = Animations;

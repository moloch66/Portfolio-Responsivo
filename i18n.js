/* =========================================
   i18n — PT / EN Toggle
   Traduções embutidas (sem fetch) para
   compatibilidade total com GitHub Pages
   ========================================= */

const I18n = (() => {
  const STORAGE_KEY = 'portfolio_lang';
  let currentLang = 'pt';
  let translations = {};

  /* ---- Traduções embutidas ---- */
  const LOCALES = {
    pt: {
      nav: { about: 'Sobre', portfolio: 'Portfólio', services: 'Serviços', contact: 'Contato' },
      langToggle: { label: 'Mudar idioma para Inglês' },
      hero: {
        name: 'Janderson Vinicius',
        title: 'Visual Studio',
        subtitle: 'jandervs',
        tagline: 'Transformo problemas complexos em experiências digitais intuitivas.',
        cta_projects: 'Ver Projetos',
        cta_contact: 'Entrar em Contato'
      },
      about: {
        section_label: 'Sobre mim',
        heading: 'Criando experiências que importam',
        bio_1: 'Designer UI/UX com foco em criar experiências digitais que unem estética e funcionalidade.',
        bio_2: 'Com domínio em Figma, prototipagem e design systems, transformo desafios complexos em interfaces intuitivas e memoráveis.',
        bio_3: 'Apaixonado por motion design e novas tecnologias, sempre buscando a interseção entre arte e tecnologia.',
        skills_heading: 'Ferramentas & Habilidades',
        skills: ['Figma','Adobe XD','Illustrator','Photoshop','After Effects','Protopie','Framer','HTML/CSS','Pesquisa UX','Design System']
      },
      portfolio: {
        section_label: 'Portfólio',
        heading: 'Projetos Selecionados',
        filter_all: 'Todos', filter_ux: 'UX', filter_ui: 'UI', filter_branding: 'Branding', filter_motion: 'Motion',
        modal_tags: 'Tags', modal_visit: 'Ver projeto online',
        projects: [
          { id:'project-1', title:'Filabar', category_label:'UX Design', description:'App de gerenciamento de filas para bares e restaurantes, com painel admin em tempo real.', full_description:'Sistema de fila digital desenvolvido para bares e restaurantes. O cliente entra na fila pelo celular, acompanha sua posição em tempo real e é chamado quando a mesa fica disponível. Inclui painel administrativo com visão ao vivo das filas, histórico de atendimentos e chamada de próximo cliente.', tags:['UX Design','Prototipação','User Flow'], link:'https://moloch66.github.io/filabar/' },
          { id:'project-2', title:'Project 2', category_label:'UI', description:'Descrição breve do projeto 2.', full_description:'Descrição completa do projeto 2 com detalhes sobre o processo de design e os resultados obtidos.', tags:['Figma','UI Design','Design System'], link:'#' },
          { id:'project-3', title:'Project 3', category_label:'Branding', description:'Descrição breve do projeto 3.', full_description:'Descrição completa do projeto 3 com detalhes sobre o processo de design e os resultados obtidos.', tags:['Illustrator','Branding','Identidade Visual'], link:'#' },
          { id:'project-4', title:'Project 4', category_label:'Motion', description:'Descrição breve do projeto 4.', full_description:'Descrição completa do projeto 4 com detalhes sobre o processo de design e os resultados obtidos.', tags:['After Effects','Motion','Animação'], link:'#' },
          { id:'project-5', title:'Project 5', category_label:'UX', description:'Descrição breve do projeto 5.', full_description:'Descrição completa do projeto 5 com detalhes sobre o processo de design e os resultados obtidos.', tags:['Figma','UX','Wireframe'], link:'#' }
        ]
      },
      services: {
        section_label: 'Serviços', heading: 'O que eu faço', cta: 'Vamos conversar?',
        items: [
          { title:'UX Research & Design', description:'Pesquisa com usuários, mapeamento de jornada, wireframes e prototipagem.' },
          { title:'UI Design', description:'Interfaces visuais de alta fidelidade e design systems escaláveis.' },
          { title:'Branding Digital', description:'Identidade visual e sistemas de marca com posicionamento único.' },
          { title:'Motion & Interação', description:'Animações de interface e micro-interações que elevam a experiência.' }
        ]
      },
      contact: {
        section_label: 'Disponível para projetos', heading: 'Vamos criar algo extraordinário.', cta: 'Entrar em contato',
        success: 'Mensagem enviada com sucesso!', error: 'Erro ao enviar. Tente novamente.',
        form: { submit: 'Enviar mensagem', submitting: 'Enviando...', char_count: 'caracteres restantes' },
        errors: { name_required:'Nome é obrigatório.', name_min:'Nome muito curto.', email_required:'E-mail é obrigatório.', email_invalid:'E-mail inválido.', message_required:'Mensagem é obrigatória.', message_min:'Mensagem muito curta.', message_max:'Mensagem muito longa.' }
      },
      footer: { made_with: 'Feito com', and: 'e muito café', rights: 'Todos os direitos reservados' }
    },

    en: {
      nav: { about: 'About', portfolio: 'Portfolio', services: 'Services', contact: 'Contact' },
      langToggle: { label: 'Switch language to Portuguese' },
      hero: {
        name: 'Janderson Vinicius',
        title: 'Visual Studio',
        subtitle: 'jandervs',
        tagline: 'I turn complex problems into intuitive digital experiences.',
        cta_projects: 'View Projects',
        cta_contact: 'Get in Touch'
      },
      about: {
        section_label: 'About me',
        heading: 'Creating experiences that matter',
        bio_1: 'UI/UX Designer focused on creating digital experiences that unite aesthetics and functionality.',
        bio_2: 'With expertise in Figma, prototyping and design systems, I transform complex challenges into intuitive and memorable interfaces.',
        bio_3: 'Passionate about motion design and new technologies, always seeking the intersection between art and technology.',
        skills_heading: 'Tools & Skills',
        skills: ['Figma','Adobe XD','Illustrator','Photoshop','After Effects','Protopie','Framer','HTML/CSS','UX Research','Design System']
      },
      portfolio: {
        section_label: 'Portfolio',
        heading: 'Selected Projects',
        filter_all: 'All', filter_ux: 'UX', filter_ui: 'UI', filter_branding: 'Branding', filter_motion: 'Motion',
        modal_tags: 'Tags', modal_visit: 'View project online',
        projects: [
          { id:'project-1', title:'Filabar', category_label:'UX Design', description:'Queue management app for bars and restaurants, with a real-time admin panel.', full_description:'Digital queue system built for bars and restaurants. Customers join the queue from their phones, track their position in real time, and get called when a table is ready. Includes an admin panel with live queue view, attendance history and next-customer calling.', tags:['UX Design','Prototyping','User Flow'], link:'https://moloch66.github.io/filabar/' },
          { id:'project-2', title:'Project 2', category_label:'UI', description:'Brief description of project 2.', full_description:'Full description of project 2 with details about the design process and results achieved.', tags:['Figma','UI Design','Design System'], link:'#' },
          { id:'project-3', title:'Project 3', category_label:'Branding', description:'Brief description of project 3.', full_description:'Full description of project 3 with details about the design process and results achieved.', tags:['Illustrator','Branding','Visual Identity'], link:'#' },
          { id:'project-4', title:'Project 4', category_label:'Motion', description:'Brief description of project 4.', full_description:'Full description of project 4 with details about the design process and results achieved.', tags:['After Effects','Motion','Animation'], link:'#' },
          { id:'project-5', title:'Project 5', category_label:'UX', description:'Brief description of project 5.', full_description:'Full description of project 5 with details about the design process and results achieved.', tags:['Figma','UX','Wireframe'], link:'#' }
        ]
      },
      services: {
        section_label: 'Services', heading: 'What I do', cta: "Let's talk?",
        items: [
          { title:'UX Research & Design', description:'User research, journey mapping, wireframes and prototyping.' },
          { title:'UI Design', description:'High-fidelity visual interfaces and scalable design systems.' },
          { title:'Digital Branding', description:'Visual identity and brand systems with unique positioning.' },
          { title:'Motion & Interaction', description:'Interface animations and micro-interactions that elevate the experience.' }
        ]
      },
      contact: {
        section_label: 'Available for projects', heading: "Let's create something extraordinary.", cta: 'Get in touch',
        success: 'Message sent successfully!', error: 'Error sending. Please try again.',
        form: { submit: 'Send message', submitting: 'Sending...', char_count: 'characters remaining' },
        errors: { name_required:'Name is required.', name_min:'Name is too short.', email_required:'Email is required.', email_invalid:'Invalid email.', message_required:'Message is required.', message_min:'Message is too short.', message_max:'Message is too long.' }
      },
      footer: { made_with: 'Made with', and: 'and lots of coffee', rights: 'All rights reserved' }
    }
  };

  function t(path) {
    return path.split('.').reduce((obj, key) => obj?.[key], translations) ?? path;
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.documentElement.lang = currentLang;
    updateToggleUI();
    rebuildProjects();
    rebuildServices();
    rebuildSkills();

    if (window.Typewriter) {
      window.Typewriter.reset(t('hero.tagline'));
    }
  }

  function updateToggleUI() {
    const toggle = document.querySelector('.lang-toggle');
    if (!toggle) return;
    const ptEl = toggle.querySelector('[data-lang="pt"]');
    const enEl = toggle.querySelector('[data-lang="en"]');
    ptEl?.classList.toggle('active', currentLang === 'pt');
    enEl?.classList.toggle('active', currentLang === 'en');
    const label = currentLang === 'pt' ? 'Mudar idioma para Inglês' : 'Switch language to Portuguese';
    toggle.setAttribute('aria-label', label);
  }

  function rebuildProjects() {
    const grid = document.querySelector('.projects-grid');
    if (!grid) return;
    const projects = t('portfolio.projects');
    if (!Array.isArray(projects)) return;
    grid.querySelectorAll('.project-card').forEach((card, i) => {
      const p = projects[i];
      if (!p) return;
      const category = card.querySelector('.project-card__category');
      const title    = card.querySelector('.project-card__title');
      const desc     = card.querySelector('.project-card__desc');
      if (category) category.textContent = p.category_label;
      if (title)    title.textContent    = p.title;
      if (desc)     desc.textContent     = p.description;
      card.dataset.projectId = p.id;
    });
  }

  function rebuildServices() {
    const cards = document.querySelectorAll('.service-card');
    const items = t('services.items');
    if (!Array.isArray(items)) return;
    cards.forEach((card, i) => {
      const item = items[i];
      if (!item) return;
      const title = card.querySelector('.service-card__title');
      const desc  = card.querySelector('.service-card__desc');
      if (title) title.textContent = item.title;
      if (desc)  desc.textContent  = item.description;
    });
  }

  function rebuildSkills() {
    const grid = document.querySelector('.skills-grid');
    if (!grid) return;
    const skills = t('about.skills');
    if (!Array.isArray(skills)) return;
    grid.innerHTML = skills.map(s => `<span class="skill-tag">${s}</span>`).join('');
  }

  function switchTo(lang) {
    if (lang === currentLang && Object.keys(translations).length) return;
    translations = LOCALES[lang] || LOCALES['pt'];
    currentLang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {}
    applyTranslations();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function init() {
    let saved = 'pt';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'pt'; } catch(e) {}
    switchTo(saved);

    const toggle = document.querySelector('.lang-toggle');
    toggle?.addEventListener('click', () => {
      switchTo(currentLang === 'pt' ? 'en' : 'pt');
    });
  }

  return { init, t, switchTo, get lang() { return currentLang; } };
})();

window.I18n = I18n;

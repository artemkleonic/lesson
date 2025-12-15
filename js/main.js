'use strict';

/**
 * REPRONOVA main.js (исправлено)
 * - AOS animations
 * - Swiper sliders
 * - Header scroll + back-to-top
 * - Mobile menu (ESC / click outside / close on link)
 * - Smooth scroll with correct offset under fixed header
 * - Counters
 * - i18n каркас
 * - Forms
 * - Dynamic CSS var: --header-current
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==================== AOS ==================== */
  if (window.AOS) {
    AOS.init({
      once: true,
      duration: 700
    });
  }

  /* ==================== SWIPER ==================== */
  if (window.Swiper) {
    new Swiper('.swiper-services', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: '.services-pagination',
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });

    new Swiper('.swiper-testimonials', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      pagination: {
        el: '.testimonials-pagination',
        clickable: true
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  }

  /* ==================== DOM ELEMENTS ==================== */
  const header = document.getElementById('site-header');
  const backToTop = document.getElementById('back-to-top');
  const burger = document.getElementById('burger');
  const navMobile = document.getElementById('nav-mobile');
  const langSwitcherEl = document.getElementById('lang-switcher');

  /* ==================== HELPERS ==================== */

  function setHeaderCurrentVar() {
    const h = header ? header.offsetHeight : 0;
    document.documentElement.style.setProperty('--header-current', `${h}px`);
  }

  function getScrollOffset() {
    // небольшой зазор, чтобы заголовок секции “дышал”
    const h = header ? header.offsetHeight : 0;
    return h + 10;
  }

  /* ==================== HEADER SCROLL + BACK TO TOP ==================== */

  function handleScroll() {
    const y = window.scrollY || window.pageYOffset;

    if (header) {
      header.classList.toggle('scrolled', y > 40);
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', y > 300);
    }

    // после смены класса scrolled высота меняется — обновляем var
    setHeaderCurrentVar();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', setHeaderCurrentVar);
  setHeaderCurrentVar();
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==================== MOBILE MENU ==================== */

  function setMenuState(open) {
    if (!burger || !navMobile) return;

    if (open) {
      burger.classList.add('active');
      navMobile.classList.add('open');
      document.body.classList.add('menu-open');
    } else {
      burger.classList.remove('active');
      navMobile.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  }

  function toggleMenu(forceState) {
    if (!burger || !navMobile) return;

    const shouldOpen =
      typeof forceState === 'boolean'
        ? forceState
        : !navMobile.classList.contains('open');

    setMenuState(shouldOpen);
  }

  // Открытие/закрытие по бургеру
  if (burger && navMobile) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Закрытие по клику на ссылку
    navMobile.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        toggleMenu(false);
      }
    });

    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('open')) {
        toggleMenu(false);
      }
    });

    // Клик “вне меню” (на документе)
    document.addEventListener('click', (e) => {
      if (!navMobile.classList.contains('open')) return;

      const clickInsideMenu = navMobile.contains(e.target);
      const clickOnBurger = burger.contains(e.target);

      if (!clickInsideMenu && !clickOnBurger) {
        toggleMenu(false);
      }
    });
  }

  /* ==================== SMOOTH SCROLL FOR ANCHORS ==================== */

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      getScrollOffset();

    window.scrollTo({ top, behavior: 'smooth' });

    if (navMobile && navMobile.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  /* ==================== COUNTERS ==================== */

  const counters = document.querySelectorAll('[data-counter]');

  function setCounterFinalValue(el) {
    const target = Number(el.getAttribute('data-counter')) || 0;
    if (target >= 1000) el.textContent = String(target);
    else el.textContent = `${target}+`;
  }

  if ('IntersectionObserver' in window && counters.length) {
    const countersObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = Number(el.getAttribute('data-counter')) || 0;
          const duration = 1500;
          const start = performance.now();

          function animate(time) {
            const progress = Math.min((time - start) / duration, 1);
            const value = Math.floor(target * progress);

            if (target >= 1000) el.textContent = String(value);
            else el.textContent = `${value}+`;

            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((c) => countersObserver.observe(c));
  } else {
    counters.forEach(setCounterFinalValue);
  }

  /* ==================== I18N (КАРКАС) ==================== */

  const translations = window.REPRONOVA_TRANSLATIONS || {};
  let currentLang = 'en';

  function applyTranslations() {
    const dict = translations[currentLang];
    if (!dict) return;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = dict[key];
      if (!value) return;

      const tag = el.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') el.placeholder = value;
      else el.textContent = value;
    });
  }

  function updateLangSwitcherUI(lang) {
    if (!langSwitcherEl) return;

    const currentBtn = langSwitcherEl.querySelector('.lang-current');
    if (currentBtn) currentBtn.textContent = lang.toUpperCase();

    langSwitcherEl.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  function setLanguage(lang) {
    if (!translations[lang] && Object.keys(translations).length) return;

    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('repronovaLang', lang);

    updateLangSwitcherUI(lang);
    applyTranslations();
  }

  (function initLanguage() {
    const saved = localStorage.getItem('repronovaLang');
    const browser = (navigator.language || navigator.userLanguage || 'en').slice(0, 2);

    if (saved && (translations[saved] || !Object.keys(translations).length)) {
      currentLang = saved;
    } else if (translations[browser]) {
      currentLang = browser;
    } else {
      currentLang = 'en';
    }

    updateLangSwitcherUI(currentLang);
    applyTranslations();
  })();

  if (langSwitcherEl) {
    langSwitcherEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang]');
      if (!btn) return;
      const lang = btn.dataset.lang;
      if (!lang) return;
      setLanguage(lang);
    });
  }

  /* ==================== FORMS ==================== */

  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const dict = translations[currentLang] || {};
      const defaultText = 'Thank you! We will get back to you within 1–2 business days.';
      formMessage.textContent = dict['contact.success'] || defaultText;

      contactForm.reset();
    });
  }

  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeMessage = document.getElementById('subscribe-message');

  if (subscribeForm && subscribeMessage) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('subscribe-email');
      if (!emailInput || !emailInput.value.trim()) return;

      const dict = translations[currentLang] || {};
      const defaultText = 'Thank you for subscribing!';
      subscribeMessage.textContent = dict['footer.subscribe.success'] || defaultText;

      subscribeForm.reset();
    });
  }
});

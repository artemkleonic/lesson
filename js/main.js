'use strict';

/**
 * REPRONOVA main.js
 * - AOS animations
 * - Swiper sliders
 * - Header scroll + back-to-top
 * - Mobile menu
 * - Smooth scroll
 * - Counters
 * - i18n каркас (можно подключить переводы позже)
 * - Forms
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
    // Services slider
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

    // Testimonials slider
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

  /* ==================== HEADER SCROLL + BACK TO TOP ==================== */

  function handleScroll() {
    const y = window.scrollY || window.pageYOffset;

    if (header) {
      header.classList.toggle('scrolled', y > 40);
    }

    if (backToTop) {
      const visible = y > 300;
      backToTop.classList.toggle('visible', visible);
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // начальное состояние

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
      document.body.style.overflow = 'hidden';
    } else {
      burger.classList.remove('active');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
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

  if (burger && navMobile) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Закрытие по клику на фон или ссылку
    navMobile.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link) {
        toggleMenu(false);
        return;
      }
      if (e.target === navMobile) {
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

    const offset = header ? header.offsetHeight + 10 : 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });

    // Если открыт мобильный меню — закрываем
    if (navMobile && navMobile.classList.contains('open')) {
      toggleMenu(false);
    }
  });

  /* ==================== COUNTERS ==================== */

  const counters = document.querySelectorAll('[data-counter]');

  function setCounterFinalValue(el) {
    const target = Number(el.getAttribute('data-counter')) || 0;
    if (target >= 1000) {
      el.textContent = String(target);
    } else {
      el.textContent = `${target}+`;
    }
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
            if (target >= 1000) {
              el.textContent = String(value);
            } else {
              el.textContent = `${value}+`;
            }
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach((c) => countersObserver.observe(c));
  } else {
    // fallback, если IntersectionObserver нет
    counters.forEach(setCounterFinalValue);
  }

  /* ==================== I18N (КАРКАС) ==================== */

  /**
   * Ожидается, что где-то до main.js подключат глобальный объект:
   * window.REPRONOVA_TRANSLATIONS = {
   *   en: { 'nav.about': 'About us', ... },
   *   es: { ... },
   *   ...
   * };
   */
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

      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    });
  }

  function updateLangSwitcherUI(lang) {
    if (!langSwitcherEl) return;

    // Обновляем текст "EN" в кнопке
    const currentBtn = langSwitcherEl.querySelector('.lang-current');
    if (currentBtn) {
      currentBtn.textContent = lang.toUpperCase();
    }

    // Подсветка выбранного языка в меню
    langSwitcherEl
      .querySelectorAll('[data-lang]')
      .forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });
  }

  function setLanguage(lang) {
    if (!translations[lang] && Object.keys(translations).length) {
      // Если переводы есть, но для этого языка нет — не меняем
      return;
    }

    currentLang = lang;
    document.documentElement.lang = lang;
    localStorage.setItem('repronovaLang', lang);

    updateLangSwitcherUI(lang);
    applyTranslations();
  }

  // Инициализация языка
  (function initLanguage() {
    const saved = localStorage.getItem('repronovaLang');
    const browser =
      (navigator.language || navigator.userLanguage || 'en').slice(0, 2);

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

  // Обработчик клика по dropdown языков
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

  // Contact form (fake send)
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const dict = translations[currentLang] || {};
      const defaultText =
        'Thank you! We will get back to you within 1–2 business days.';

      formMessage.textContent =
        dict['contact.success'] || defaultText;

      contactForm.reset();
    });
  }

  // Subscribe form (fake send)
  const subscribeForm = document.getElementById('subscribe-form');
  const subscribeMessage = document.getElementById('subscribe-message');

  if (subscribeForm && subscribeMessage) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = document.getElementById('subscribe-email');
      if (!emailInput || !emailInput.value.trim()) return;

      const dict = translations[currentLang] || {};
      const defaultText = 'Thank you for subscribing!';

      subscribeMessage.textContent =
        dict['footer.subscribe.success'] || defaultText;

      subscribeForm.reset();
    });
  }
});

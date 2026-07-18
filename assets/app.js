(function () {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const langToggle = document.getElementById('langToggle');
  const projectNums = document.querySelectorAll('.project-num');

  function getStored(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  function setStored(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable (private mode, etc.) — ignore */
    }
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
  }

  function applyLang(lang) {
    const dict = I18N[lang];
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    langToggle.textContent = lang === 'ar' ? 'EN' : 'ع';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    projectNums.forEach((el, i) => {
      el.textContent = PROJECT_NUMS[lang][i];
    });
  }

  let theme = getStored('nq-theme', 'light');
  let lang = getStored('nq-lang', 'en');
  applyTheme(theme);
  applyLang(lang);

  themeToggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    setStored('nq-theme', theme);
    applyTheme(theme);
  });

  langToggle.addEventListener('click', () => {
    lang = lang === 'ar' ? 'en' : 'ar';
    setStored('nq-lang', lang);
    applyLang(lang);
  });

  // scroll-reveal
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .forEach((entry, i) => {
            entry.target.style.transitionDelay = i * 80 + 'ms';
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();

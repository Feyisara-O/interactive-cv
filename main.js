/* =====================================================
   FEYISARA CV — script.js
   Sections:
   1. Theme Toggle
   2. Hamburger Menu
   3. Scroll Reveal
===================================================== */


/* ─── 1. THEME TOGGLE ────────────────────────────────── */
(function () {
  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');

  const saved = localStorage.getItem('cv-theme') || 'dark';
  html.setAttribute('data-theme', saved);

  toggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('cv-theme', next);
  });
})();


/* ─── 2. HAMBURGER MENU ──────────────────────────────── */
(function () {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuLinks  = mobileMenu.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu when a link is tapped
  menuLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ─── 3. SCROLL REVEAL ───────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  sections.forEach(function (el) {
    observer.observe(el);
  });
})();
// script.js -- typing animation, theme toggle, mobile menu, smooth scroll, reveal on scroll

document.addEventListener('DOMContentLoaded', () => {
  // 1) Typing animation
  const skills = [
    "Java","Spring boot","Rest API","PostgreSQL","MySQL","Mongodb","JavaScript",
    "Docker","Microservices","Spring MVC","HTML","CSS", "Render", "Bug fixing"
  ];
  const typedEl = document.getElementById('typed');

  let skillIndex = 0, charIndex = 0, deleting = false;
  const TYPING_SPEED = 80;
  const DELETING_SPEED = 40;
  const PAUSE = 1000;

  function typeLoop() {
    const current = skills[skillIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, PAUSE);
        return;
      }
      setTimeout(typeLoop, TYPING_SPEED);
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        skillIndex = (skillIndex + 1) % skills.length;
        setTimeout(typeLoop, 300);
        return;
      }
      setTimeout(typeLoop, DELETING_SPEED);
    }
  }
  typeLoop();

  // 2) Theme toggle (dark/light)
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const iconLight = document.getElementById('icon-light');
  const iconDark = document.getElementById('icon-dark');

  // Load saved theme
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
    iconLight.classList.remove('hidden');
    iconDark.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    iconLight.classList.add('hidden');
    iconDark.classList.remove('hidden');
  }

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    if (isDark) {
      localStorage.setItem('theme', 'dark');
      iconLight.classList.remove('hidden');
      iconDark.classList.add('hidden');
    } else {
      localStorage.setItem('theme', 'light');
      iconLight.classList.add('hidden');
      iconDark.classList.remove('hidden');
    }
  });

  // 3) Mobile menu
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // 4) Smooth scroll for nav links (works for anchors)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile menu
          if (!mobileMenu.classList.contains('hidden')) mobileMenu.classList.add('hidden');
        }
      }
    });
  });

  // 5) Reveal on scroll
  const reveals = document.querySelectorAll('section, .project-card, .p-6');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(r => {
    r.classList.add('reveal');
    obs.observe(r);
  });

  // 6) Fill footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // 7) Contact form (demo behaviour)
  const contactForm = document.getElementById('contact-form');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Normally you'd submit via fetch to your backend.
    alert('Thanks! Message sent (demo).');
    contactForm.reset();
  });

  // Accessibility: close mobile menu on pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
    }
  });

});

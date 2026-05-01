// ══ NAV SCROLL ══
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ══ MOBILE MENU ══
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');

function closeMenu() {
  links.classList.remove('open');
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function openMenu() {
  links.classList.add('open');
  document.body.classList.add('menu-open');
  toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

toggle.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = links.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

// Close menu when clicking on the backdrop
document.addEventListener('click', (e) => {
  if (links.classList.contains('open') && !nav.contains(e.target)) {
    closeMenu();
  }
});

// ══ CONTACT FORM ══
const form = document.getElementById('contactForm');
const btn = document.getElementById('btnSend');

// Le formulaire utilise l'action native vers FormSubmit.co
// Lors de la soumission, l'utilisateur sera redirigé pour activer son adresse mail (la première fois).

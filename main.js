// ══ NAV SCROLL ══
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ══ MOBILE MENU ══
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
links.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ══ CONTACT FORM ══
const btn = document.getElementById('btnSend');
if (btn) {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById('contactForm').innerHTML = `
        <div class="form-success">
          <div class="form-success-icon">🕊️</div>
          <p class="form-success-title">Message envoyé !</p>
          <p class="form-success-msg">Merci pour votre message.<br>Delphine vous répondra sous 24h avec toute l'attention que vous méritez.</p>
        </div>`;
    }, 1000);
  });
}

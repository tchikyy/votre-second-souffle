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

// ══ CONTACT FORM (AJAX) ══
const form = document.getElementById('contactForm');
const btn = document.getElementById('btnSend');

if (form && btn) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI State: Loading
    const originalBtnText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Envoi en cours...';
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        // Success
        btn.innerHTML = 'Message envoyé ! ✓';
        btn.style.background = '#3a7a3a';
        form.reset();
        
        // Reset button after 5s
        setTimeout(() => {
          btn.disabled = false;
          btn.innerHTML = originalBtnText;
          btn.style.background = '';
        }, 5000);
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      btn.disabled = false;
      btn.innerHTML = 'Erreur. Réessayer ?';
      btn.style.background = '#d9534f';
      console.error(error);
    }
  });
}

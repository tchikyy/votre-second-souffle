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
const form = document.getElementById('contactForm');
const btn = document.getElementById('btnSend');

if (form && btn) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Changer le texte du bouton et désactiver
    const originalBtnContent = btn.innerHTML;
    btn.innerHTML = 'Envoi en cours… <span style="font-size:0.8em">⏳</span>';
    btn.disabled = true;

    // Récupérer les données du formulaire
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Envoyer via FormSubmit (AJAX)
    fetch("https://formsubmit.co/ajax/victor.92.blanc@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      if(data.success === "true" || data.success) {
        // Message de succès
        form.innerHTML = `
          <div class="form-success">
            <div class="form-success-icon">🕊️</div>
            <p class="form-success-title">Message envoyé !</p>
            <p class="form-success-msg">Merci pour votre message.<br>Delphine vous répondra dans les meilleurs délais sur votre adresse : <strong>${data.email || formData.get('email')}</strong>.</p>
          </div>`;
      } else {
        throw new Error('Erreur API FormSubmit');
      }
    })
    .catch(error => {
      console.error('Erreur:', error);
      btn.innerHTML = 'Erreur. Réessayer ❌';
      btn.disabled = false;
      alert("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.");
    });
  });
}

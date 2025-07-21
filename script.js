// ===================== Navbar Toggle =====================
const navToggle = document.querySelector('.nav__toggle');
const navList   = document.getElementById('primary-navigation');

navToggle?.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// ===================== Smooth Scroll =====================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
    if (navList.classList.contains('is-open')) {
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
    }
  });
});

// ===================== Dummy Projects & Filter =====================
const projects = [
  { id: 1, cat: 'design',      title: 'Ouroboros',            desc: 'Modulares Möbelsystem' },
  { id: 2, cat: 'branding',    title: 'Natoure',              desc: 'Branding für nachhaltige Mode' },
  { id: 3, cat: 'development', title: 'Tactile Constellations', desc: 'Interaktive Installation' },
  { id: 4, cat: 'design',      title: 'Sphaira',              desc: 'VR-Interface für Museumsräume' },
  { id: 5, cat: 'branding',    title: 'Fondue',               desc: 'Variable Typo-Logo-System' },
  { id: 6, cat: 'development', title: 'Drift XR',             desc: 'WebXR-Prototyp Surf-Simulator' },
];

const grid = document.getElementById('project-grid');
const btns = document.querySelectorAll('.filter-btn');

function render(cat = 'all') {
  btns.forEach(b =>
    b.setAttribute(
      'aria-pressed',
      b.dataset.filter === cat || (cat === 'all' && b.dataset.filter === 'all')
    )
  );

  grid.innerHTML = projects
    .filter(p => cat === 'all' || p.cat === cat)
    .map(
      p => `<article class="card" data-cat="${p.cat}">
              <div class="card__img" aria-hidden="true"></div>
              <h3>${p.title}</h3>
              <p>${p.desc}</p>
            </article>`
    )
    .join('');
}
btns.forEach(b => b.addEventListener('click', () => render(b.dataset.filter)));
render();

// ===================== Swiper (optional) =====================
/*
new Swiper('.swiper-container', {
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
});
*/

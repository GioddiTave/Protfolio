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
  { cat: 'design',      title: 'Ouroboros',            desc: 'Modulares Möbelsystem', url:   'project.html'  },
  { cat: 'branding',    title: 'Natoure',              desc: 'Branding für nachhaltige Mode' },
  { cat: 'development', title: 'Tactile Constellations', desc: 'Interaktive Installation' },
  { cat: 'design',      title: 'Sphaira',              desc: 'VR-Interface für Museumsräume' },
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
    .map(p => `
      <a href="${p.url}" class="card" data-cat="${p.cat}">
        <div class="card__img" aria-hidden="true"></div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </a>
    `)
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



/* ===== eigenes Projekt-Skript (nur falls Slider gebraucht wird) ===== */
if (document.querySelector('.swiper-container')) {
  new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 32,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      800: { slidesPerView: 1.2 },
      1200: { slidesPerView: 1.6 },
    },
  });
}

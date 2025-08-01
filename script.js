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

/* ---------- HERO SWIPER ---------- */
if(document.querySelector('.hero-swiper')){
  new Swiper('.hero-swiper',{
    loop:true,
    effect:'fade',
    autoplay:{ delay:5000, disableOnInteraction:false },
  });
}

/* ---------- SIMPLE i18n ---------- */
const dict = {
  de:{ home:'Home', about:'Über mich', projects:'Projekte', contact:'Kontakt', view:'Ansehen' },
  en:{ home:'Home', about:'About', projects:'Projects', contact:'Contact', view:'View' },
  it:{ home:'Home', about:'Chi sono', projects:'Progetti', contact:'Contatto', view:'Vedi' },
};
const langBtns = document.querySelectorAll('.lang-switch button');
langBtns.forEach(b => b.onclick = () => setLang(b.dataset.lang));
function setLang(l){
  localStorage.setItem('lang',l);
  document.querySelectorAll('[data-i18n]')
          .forEach(el => el.textContent = dict[l][el.dataset.i18n] || el.textContent);
  langBtns.forEach(b => b.setAttribute('aria-pressed',b.dataset.lang===l));
}
setLang(localStorage.getItem('lang')||'de');

/* ---------- SKILL-BARS ---------- */
function buildSkillBars(){
  const list = document.getElementById('skillList');
  if(!list) return;

  /* Counts aus data-tools */
  const counts = {};
  document.querySelectorAll('[data-tools]').forEach(card=>{
    card.dataset.tools.split(' ').forEach(t => counts[t] = (counts[t]||0)+1);
  });

  /* Prozent­werte relativ zum häufigsten Tool */
  const max = Math.max(...Object.values(counts));
  list.innerHTML = '';                               // leeren & neu aufbauen
  Object.entries(counts).forEach(([tool,val])=>{
    const li   = document.createElement('li'); li.className = 'skill';
    li.innerHTML = `
      <img src="icons/${tool.toLowerCase()}.svg" class="skill__icon" alt="${tool} Icon">
      <div class="skill__bar"><span style="width:${val/max*100}%"></span></div>
      <span class="skill__percent">${Math.round(val/max*100)}%</span>
    `;
    list.appendChild(li);
  });
}
buildSkillBars();
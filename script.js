// (1) Scroll-Restoration ausschalten, immer zum Hero scrollen:
document.addEventListener("DOMContentLoaded", () => {
  // Verhindert, dass der Browser die Scrollposition beim Reload wiederherstellt
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  // Sofort nach oben
  window.scrollTo(0, 0);
});


// (2) Beispiel-Swiper (unverändert, wenn du ihn nutzt)
var swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {                  // NEU: Autoplay hinzugefügt
    delay: 3000,               // 3000ms Delay
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// (3) Deine Projekte (unverändert)
const projects = [
  { id: 1, category: 'design', title: 'Projekt 1', description: 'Ein modernes Möbeldesign.' },
  { id: 2, category: 'branding', title: 'Projekt 2', description: 'Branding für eine nachhaltige Mode-Marke.' },
  { id: 3, category: 'development', title: 'Projekt 3', description: 'Eine interaktive Installation.' },
];

let currentPage = 1;
const projectsPerPage = 10;

function renderProjects(filter = 'all', page = 1) {
  const filteredProjects = (filter === 'all') ? projects : projects.filter(p => p.category === filter);
  const start = (page - 1) * projectsPerPage;
  const end = start + projectsPerPage;
  const paginatedProjects = filteredProjects.slice(start, end);

  const projectGrid = document.querySelector('.project-grid');
  projectGrid.innerHTML = paginatedProjects.map(project => `
    <div class="project-card" data-category="${project.category}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </div>
  `).join('');

  document.getElementById('page-indicator').textContent = `Seite ${page} von ${Math.ceil(filteredProjects.length / projectsPerPage)}`;
}

// Filter-Buttons (unverändert)
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderProjects(button.dataset.filter);
  });
});

document.getElementById('next-page').addEventListener('click', () => {
  currentPage++;
  renderProjects(document.querySelector('.filter-btn.active').dataset.filter, currentPage);
});

document.getElementById('prev-page').addEventListener('click', () => {
  currentPage--;
  renderProjects(document.querySelector('.filter-btn.active').dataset.filter, currentPage);
});

// Smooth Scroll für Nav-Links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// (4) Scrollabhängige Animation für die drei Wörter im About-Bereich
const aboutSection = document.getElementById('about');
const movingTexts = document.querySelectorAll('.moving-text');
let lastScrollY = window.scrollY;
let inAbout = false; // Ob der User im About-Bereich ist

// Intersection Observer: Sobald About zu 10% sichtbar ist, blenden wir die Wörter ein
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      inAbout = true; // Wir sind im About-Bereich
      // Alle Wörter sichtbar machen (opacity=1), Position bleibt vorerst bei +150px
      movingTexts.forEach(text => {
        text.style.opacity = '1';
      });
    } else {
      inAbout = false; // Wir verlassen About-Bereich
      // Optional: Wörter wieder ausblenden
      movingTexts.forEach(text => {
        text.style.opacity = '0';
      });
    }
  });
}, {
  threshold: 0.1
});
aboutObserver.observe(aboutSection);

// (5) Scroll-Event: Wenn wir im About-Bereich sind, bewegen wir die Wörter
function updateTextPosition() {
  let currentScrollY = window.scrollY;
  let scrollDirection = (currentScrollY > lastScrollY) ? -1 : 1; 
  // 1 = Runterscrollen, -1 = Hochscrollen

  if (inAbout) {
    movingTexts.forEach((text) => {
      let speed = parseFloat(text.dataset.speed) || 0.5;
      // offset: Wie weit rechts sie starten
      let offset = 150;
      let movement;

      if (scrollDirection === 1) {
        // Nach links bewegen (runter scrollen)
        // Je größer currentScrollY * speed, desto weiter links
        // Wir clampen min. 0, max. 150
        movement = Math.max(0, (currentScrollY * speed) - offset);
      } else {
        // Nach rechts bewegen (hoch scrollen)
        movement = Math.min(150, (currentScrollY * speed) - offset);
      }

      text.style.transform = `translateX(${movement}px)`;
    });
  }
  lastScrollY = currentScrollY;
}
window.addEventListener('scroll', updateTextPosition);

// Initial
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  // Wörter anfangs ganz rechts + unsichtbar
  movingTexts.forEach(text => {
    text.style.transform = 'translateX(150px)';
    text.style.opacity = '0';
  });
});

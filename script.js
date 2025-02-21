// Swiper Initialisierung
var swiper = new Swiper('.swiper-container', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Beispielprojekte
const projects = [
  { id: 1, category: 'design', title: 'Projekt 1', description: 'Ein modernes Möbeldesign.' },
  { id: 2, category: 'branding', title: 'Projekt 2', description: 'Branding für eine nachhaltige Mode-Marke.' },
  { id: 3, category: 'development', title: 'Projekt 3', description: 'Eine interaktive Installation.' },
  // Füge hier weitere Projekte hinzu...
];

let currentPage = 1;
const projectsPerPage = 10;

function renderProjects(filter = 'all', page = 1) {
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);
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

// Einfache Scroll-Animation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const movingTexts = document.querySelectorAll(".moving-text");
  let lastScrollY = window.scrollY;

  function updateTextPosition() {
      let currentScrollY = window.scrollY;
      let scrollDirection = currentScrollY > lastScrollY ? -1 : 1; // 1 = nach unten, -1 = nach oben

      movingTexts.forEach((text, index) => {
          let speed = parseFloat(text.dataset.speed);// Geschwindigkeit aus dem HTML-Attribut
          let delay = parseInt(text.dataset.delay); 
          let movement;

          // Bewegung basierend auf der Scroll-Richtung
          if (scrollDirection === 1) {
              // Nach links bewegen (bei Scroll nach unten)
              movement = Math.max(150, currentScrollY * speed -150); // Begrenzung auf -150px
          } else {
              // Nach rechts bewegen (bei Scroll nach oben)
              movement = Math.min(0, currentScrollY * speed -150); // Begrenzung auf 150px
          }

          // Textposition aktualisieren
          text.style.transform = `translateX(${movement}px)`;

          // Deckkraft (Opacity) steuern
          if (Math.abs(movement) >= 150) {
              text.style.opacity = "0"; // Unsichtbar, wenn Bewegung außerhalb des Bereichs
          } else {
              text.style.opacity = "1"; // Sichtbar, wenn Bewegung innerhalb des Bereichs
          }
      });

      lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", updateTextPosition);
  updateTextPosition(); // Initialer Aufruf
});

// Initial rendering
renderProjects();
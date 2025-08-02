// =======================  script.js  =========================
/* ----------  NAVBAR TOGGLE  ---------- */
const navToggle=document.querySelector('.nav__toggle');
const navList=document.getElementById('primary-navigation');
navToggle?.addEventListener('click',()=>{
  const isOpen=navList.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded',isOpen);
  navToggle.textContent=isOpen?'✕':'☰';
});

/* ----------  SMOOTH SCROLL  ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const target=document.querySelector(link.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
    if(navList.classList.contains('is-open')){
      navList.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded',false);
      navToggle.textContent='☰';
    }
  });
});

/* ----------  PROJECTS & FILTER  ---------- */
const projects=[
  {
    cat:'development',
    title:'Koimesis XR',
    desc:'Master Thesis: Reconstruction of the Koimesis Church in Nicaea',
    url:'project-koimesis.html',
    tools:'Rhino UnrealEngine Blender Illustrator SubstanceDesigner Photoshop Twinmotion',
    img:'images/DIM/Thesis/Element.png'
  },
  {
    cat:'development',
    title:'ChessARena',
    desc:'Coming soon: Project with Nick Häcker',          // NEW (typo fix)
    url:'project-chessarena.html',                         // NEW
    tools:'Unity Blender Photoshop',
    img:'images/projects/chessarena.jpg'                   // NEW
  },
  {
    cat:'development',
    title:'The round table',
    desc:'Congress poster for Dr. Gabriele Schnapper MSC, Healthcare Institution South Tyrol',
    url:'project-roundtable.html',                         // NEW
    tools:'Illustrator InDesign VSCode HTML CSS JS',
    img:'images/projects/roundtable.jpg'                   // NEW
  }
];

const grid=document.getElementById('project-grid');
const btns=document.querySelectorAll('.filter-btn');

function render(cat='all'){
  btns.forEach(b=>b.setAttribute('aria-pressed',
    b.dataset.filter===cat||(cat==='all'&&b.dataset.filter==='all')));

  grid.innerHTML=projects
    .filter(p=>cat==='all'||p.cat===cat)
    .map(p=>`
      <a href="${p.url}" class="card" data-cat="${p.cat}" data-tools="${p.tools}">
        <div class="card__img" style="background-image:url('${p.img||'images/placeholder.svg'}')"></div>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </a>`).join('');

  buildSkillBars();
}
btns.forEach(b=>b.addEventListener('click',()=>render(b.dataset.filter)));
render();

/* ----------  HERO-SWIPER  ---------- */
if(document.querySelector('.hero-swiper')){
  new Swiper('.hero-swiper',{
    loop:true,
    effect:'fade',
    fadeEffect:{crossFade:true},
    pagination:{el:'.hero-swiper .swiper-pagination',clickable:true},
    autoplay:{delay:10000,disableOnInteraction:false}
  });
}

/* ----------  GALLERY-SWIPER  ---------- */
if(document.querySelector('.swiper-container')){
  new Swiper('.swiper-container',{
    loop:true,
    slidesPerView:1,
    spaceBetween:32,
    navigation:{nextEl:'.swiper-button-next',prevEl:'.swiper-button-prev'},
    breakpoints:{800:{slidesPerView:1.2},1200:{slidesPerView:1.6}}
  });
}

/* ----------  SIMPLE i18n  ---------- */
const dict={
  de:{home:'Home',about:'Über mich',projects:'Projekte',contact:'Kontakt',view:'Ansehen'},
  en:{home:'Home',about:'About',projects:'Projects',contact:'Contact',view:'View'},
  it:{home:'Home',about:'Chi sono',projects:'Progetti',contact:'Contatto',view:'Vedi'}
};
const langBtns=document.querySelectorAll('.lang-switch button');
langBtns.forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
function setLang(l){
  localStorage.setItem('lang',l);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent=dict[l][el.dataset.i18n]||el.textContent;
  });
  langBtns.forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===l));
}
setLang(localStorage.getItem('lang')||'de');

/* ----------  SKILL-BARS  ---------- */
function buildSkillBars(){
  const list=document.getElementById('skillList');
  if(!list)return;
  const counts={};
  document.querySelectorAll('[data-tools]').forEach(card=>{
    card.dataset.tools.split(' ').forEach(t=>counts[t]=(counts[t]||0)+1);
  });
  const max=Math.max(...Object.values(counts));
  list.innerHTML='';
  Object.entries(counts).forEach(([tool,val])=>{
    const li=document.createElement('li');
    li.className='skill';
    li.innerHTML=`
      <img src="icons/SVG/${tool.toLowerCase()}.svg" class="skill__icon" alt="${tool} Icon">
      <div class="skill__bar"><span style="width:${val/max*100}%"></span></div>
      <span class="skill__percent">${Math.round(val/max*100)}%</span>`;
    list.appendChild(li);
  });
}
buildSkillBars();

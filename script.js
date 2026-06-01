// =====================
// LOADER
// =====================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2000);
});

// =====================
// CUSTOM CURSOR
// =====================
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateTrail() {
  tx += (mx - tx) * 0.15;
  ty += (my - ty) * 0.15;
  trail.style.left = tx + 'px';
  trail.style.top = ty + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .service-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    trail.style.width = '50px';
    trail.style.height = '50px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    trail.style.width = '36px';
    trail.style.height = '36px';
  });
});

// =====================
// SCROLL PROGRESS + NAV SCROLL
// =====================
window.addEventListener('scroll', () => {
  const el = document.documentElement;
  const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// =====================
// TYPING EFFECT
// =====================
const phrases = [
  'Web Developer',
  'Graphics Designer',
  'UI/UX Designer',
  'Creative Problem Solver',
  'Currently learning AI/ML 🤖'
];
let pi = 0, ci = 0, deleting = false;

function type() {
  const phrase = phrases[pi];
  const el = document.getElementById('typed');
  if (!deleting) {
    el.textContent = phrase.substring(0, ci + 1);
    ci++;
    if (ci === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    el.textContent = phrase.substring(0, ci - 1);
    ci--;
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 60 : 100);
}
setTimeout(type, 1000);

// =====================
// THEME TOGGLE
// =====================
let dark = true;

function toggleTheme() {
  dark = !dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  const icon1 = document.getElementById('themeIcon');
  const icon2 = document.getElementById('themeIconMobile');
  [icon1, icon2].forEach(i => { if (i) i.className = dark ? 'fa fa-moon' : 'fa fa-sun'; });
}

document.getElementById('themeToggle').onclick = toggleTheme;
document.getElementById('themeToggleMobile').onclick = toggleTheme;

// =====================
// HAMBURGER / MOBILE NAV
// =====================
const ham = document.getElementById('hamburger');
const mNav = document.getElementById('mobileNav');
ham.onclick = () => mNav.classList.toggle('open');
document.querySelectorAll('.mobile-link').forEach(a => {
  a.onclick = () => mNav.classList.remove('open');
});

// =====================
// REVEAL ON SCROLL (IntersectionObserver)
// =====================
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.querySelectorAll) {
        e.target.querySelectorAll('.skill-fill').forEach(b => {
          b.style.width = b.dataset.w;
        });
      }
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));

// =====================
// SKILLS
// =====================
const skills = [
  { name: 'HTML5',            icon: '🌐', type: 'Frontend', level: 95 },
  { name: 'CSS3',             icon: '🎨', type: 'Frontend', level: 92 },
  { name: 'JavaScript',       icon: '⚡', type: 'Frontend', level: 85 },
  { name: 'Responsive Design',icon: '📱', type: 'Frontend', level: 90 },
  { name: 'Web Dev Tools',    icon: '🛠️', type: 'Tools',    level: 88 },
  { name: 'Figma',            icon: '🖌️', type: 'Design',   level: 87 },
  { name: 'Canva',            icon: '✏️', type: 'Design',   level: 93 },
  { name: 'Adobe Photoshop',  icon: '🖼️', type: 'Design',   level: 80 },
  { name: 'Python',           icon: '🐍', type: 'Learning', level: 45 },
  { name: 'AI/ML',            icon: '🤖', type: 'Learning', level: 30 },
];

const sg = document.getElementById('skillsGrid');
skills.forEach((s, i) => {
  const d = document.createElement('div');
  d.className = 'skill-card reveal';
  d.style.transitionDelay = `${i * 0.05}s`;
  d.innerHTML = `
    <span class="skill-icon">${s.icon}</span>
    <div class="skill-name">${s.name}</div>
    <div class="skill-type">${s.type}</div>
    <div class="skill-bar"><div class="skill-fill" data-w="${s.level}%" style="width:0"></div></div>
  `;
  sg.appendChild(d);
  obs.observe(d);
});

// =====================
// PROJECTS
// =====================
const projects = [
  {
    emoji: '🌐', bg: 0,
    title: 'Portfolio Website',
    desc: 'A modern, animated personal portfolio built with cutting-edge web technologies, featuring dark/light mode and smooth scroll animations.',
    tags: ['HTML', 'CSS', 'JS'],
    github: '#', demo: '#'
  },
  {
    emoji: '🏢', bg: 1,
    title: 'Business Landing Page',
    desc: 'High-converting business landing page with persuasive copy layout, animated hero, service cards, and an integrated contact form.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    github: '#', demo: '#'
  },
  {
    emoji: '🛒', bg: 2,
    title: 'E-commerce UI Design',
    desc: 'Complete UI/UX design for a modern e-commerce platform — product pages, cart flow, and checkout experience crafted in Figma.',
    tags: ['Figma', 'UI/UX', 'Design'],
    github: '#', demo: '#'
  },
  {
    emoji: '📊', bg: 3,
    title: 'Dashboard UI',
    desc: 'Admin analytics dashboard with real-time data visualization, dark mode, and a fully responsive sidebar-based layout.',
    tags: ['HTML', 'CSS', 'JS', 'Figma'],
    github: '#', demo: '#'
  },
];

const pg = document.getElementById('projectsGrid');
projects.forEach((p, i) => {
  const d = document.createElement('div');
  d.className = 'project-card reveal';
  d.style.transitionDelay = `${i * 0.1}s`;
  d.innerHTML = `
    <div class="project-img project-img-${p.bg}">
      <span style="font-size:5rem">${p.emoji}</span>
      <div class="project-overlay">
        <a href="${p.github}" class="btn btn-outline" style="padding:0.5rem 1rem;font-size:0.8rem;cursor:none"><i class="fab fa-github"></i> GitHub</a>
        <a href="${p.demo}" class="btn btn-primary" style="padding:0.5rem 1rem;font-size:0.8rem;cursor:none"><i class="fa fa-external-link"></i> Live</a>
      </div>
    </div>
    <div class="project-body">
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-title">${p.title}</div>
      <p class="project-desc">${p.desc}</p>
      <div class="project-links">
        <a href="${p.github}" class="btn btn-outline" style="padding:0.5rem 1rem;font-size:0.8rem;cursor:none"><i class="fab fa-github"></i> GitHub</a>
        <a href="${p.demo}" class="btn btn-primary" style="padding:0.5rem 1rem;font-size:0.8rem;cursor:none"><i class="fa fa-external-link"></i> Demo</a>
      </div>
    </div>
  `;
  pg.appendChild(d);
  obs.observe(d);
});

// =====================
// SERVICES
// =====================
const services = [
  { icon: 'fa fa-code',          title: 'Web Development',   desc: 'Clean, semantic, and performant websites built with modern HTML, CSS, and JavaScript standards.' },
  { icon: 'fa fa-mobile-screen', title: 'Responsive Design', desc: 'Pixel-perfect layouts that look stunning on every screen — from mobile phones to widescreen displays.' },
  { icon: 'fa fa-pencil-ruler',  title: 'UI/UX Design',      desc: 'Intuitive, user-centered interface design using Figma, focusing on clarity and delightful interactions.' },
  { icon: 'fa fa-image',         title: 'Graphic Design',    desc: 'Professional visual content — logos, banners, social media graphics, and brand identity using Canva & Photoshop.' },
  { icon: 'fa fa-rotate',        title: 'Website Redesign',  desc: 'Breathing new life into outdated websites with modern design principles, improved UX, and better performance.' },
];

const srvg = document.getElementById('servicesGrid');
services.forEach((s, i) => {
  const d = document.createElement('div');
  d.className = 'service-card reveal';
  d.style.transitionDelay = `${i * 0.1}s`;
  d.innerHTML = `
    <div class="service-icon"><i class="${s.icon}"></i></div>
    <div class="service-title">${s.title}</div>
    <p class="service-desc">${s.desc}</p>
  `;
  srvg.appendChild(d);
  obs.observe(d);
});

// =====================
// EXPERIENCE / TIMELINE
// =====================
const exps = [
  {
    date: '2022 – Present',
    title: 'Freelance Web Developer & Designer',
    company: 'Self-Employed · Remote',
    desc: 'Delivering end-to-end web solutions for clients ranging from local businesses to international startups. Specializing in modern, responsive websites and compelling UI/UX designs that drive conversions.',
    tags: ['HTML', 'CSS', 'JS', 'Figma', 'Photoshop']
  },
  {
    date: '2021 – 2022',
    title: 'Junior Frontend Developer',
    company: 'Creative Projects · Contract',
    desc: 'Built and maintained responsive web interfaces for multiple client projects. Collaborated with designers and stakeholders to translate wireframes and mockups into pixel-perfect, functional code.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design']
  },
  {
    date: '2020 – 2021',
    title: 'Graphic Designer',
    company: 'Freelance · Remote',
    desc: 'Created visual assets including logos, banners, social media graphics, and marketing materials. Developed strong aesthetic sensibility and attention to detail that now informs my development work.',
    tags: ['Canva', 'Photoshop', 'Figma', 'Branding']
  },
];

const tl = document.getElementById('timelineEl');
exps.forEach((e, i) => {
  const d = document.createElement('div');
  d.className = 'timeline-item reveal';
  d.style.transitionDelay = `${i * 0.15}s`;
  d.innerHTML = `
    <div class="timeline-dot"></div>
    <div class="timeline-card">
      <div class="timeline-date">${e.date}</div>
      <div class="timeline-title">${e.title}</div>
      <div class="timeline-company">${e.company}</div>
      <div class="timeline-desc">${e.desc}</div>
      <div class="timeline-tags">${e.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
  `;
  tl.appendChild(d);
  obs.observe(d);
});

// =====================
// CONTACT FORM
// =====================
function submitForm() {
  const n = document.getElementById('f-name').value;
  const e = document.getElementById('f-email').value;
  const m = document.getElementById('f-message').value;
  if (!n || !e || !m) {
    showToast('Please fill in all required fields ⚠️');
    return;
  }
  showToast("Message sent successfully! I'll respond soon. ✅");
  document.getElementById('f-name').value = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-subject').value = '';
  document.getElementById('f-message').value = '';
}

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// =====================
// CV BUTTON
// =====================
document.getElementById('cvBtn').onclick = (e) => {
  e.preventDefault();
  showToast('CV download will be available soon! 📄');
};
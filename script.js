// CUSTOM CURSOR 
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

function animateRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover effects 
document.querySelectorAll('a, button, .stat-box-3d, .skill-3d-card, .project-3d-card, .contact-3d-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.background = 'var(--coral)';
    cursor.style.boxShadow = '0 0 20px var(--coral)';
    ring.style.width = '60px';
    ring.style.height = '60px';
    ring.style.borderColor = 'var(--coral)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.background = 'var(--amber)';
    cursor.style.boxShadow = '0 0 20px var(--amber)';
    ring.style.width = '36px';
    ring.style.height = '36px';
    ring.style.borderColor = 'rgba(245, 166, 35, 0.5)';
  });
});


// MOBILE MENU
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    if (navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn?.classList.remove('active');
    navLinks?.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const target = document.querySelector(targetId);
    if (target) {
      const navHeight = window.innerWidth <= 900 ? 80 : 100;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ACTIVE NAVIGATION
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const scrollPosition = window.scrollY + 150;
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.style.color = 'var(--amber)';
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// GLITCH EFFECT - AMBER/CORAL
const heroName = document.querySelector('.hero-name');
if (heroName) {
  setInterval(() => {
    if (Math.random() > 0.7) {
      heroName.style.transform = `skew(${Math.random() * 10 - 5}deg)`;
      heroName.style.textShadow = `
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 var(--amber),
        ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 var(--coral)
      `;
      
      setTimeout(() => {
        heroName.style.transform = '';
        heroName.style.textShadow = '';
      }, 150);
    }
  }, 2000);
}

// TYPING ANIMATION
const heroTag = document.querySelector('.hero-tag');
if (heroTag) {
  const words = ['Fullstack Engineer', 'Android Developer', 'ML Enthusiast', 'UI/UX Designer'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      heroTag.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      heroTag.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeEffect, 500);
    } else {
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
  }
  
  setTimeout(typeEffect, 2000);
}

// SCROLL PROGRESS BAR - AMBER
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
document.body.appendChild(progressBar);

const style = document.createElement('style');
style.textContent = `
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--amber), var(--coral), #ff8c42);
    z-index: 1001;
    transition: width 0.1s ease;
    box-shadow: 0 0 20px var(--amber);
  }
`;
document.head.appendChild(style);

window.addEventListener('scroll', () => {
  const winScroll = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + '%';
});

// INITIAL LOAD
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  console.log('🌋 Volcanic 3D Portfolio Loaded!');
});
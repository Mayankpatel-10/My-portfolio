// MOUSE COORDINATES FOR PARTICLE BACKGROUND & 3D PC MODEL
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
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
  initParticleBackground();
  initContactForm();
  initHero3DPC();
});

// INTERACTIVE PARTICLE BACKGROUND
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let particles = [];
  let particleCount = window.innerWidth <= 768 ? 30 : 70; // Optimised for mobile
  const connectionDistance = 110;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124, 58, 237, 0.3)';
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
      
      if (typeof mx !== 'undefined' && typeof my !== 'undefined') {
        const dx = particles[i].x - mx;
        const dy = particles[i].y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance * 1.5) {
          const alpha = (1 - dist / (connectionDistance * 1.5)) * 0.2;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(124, 58, 237, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  animate();
}

// SECURE FORM TRANSMISSION TERMINAL LOGIC
function initContactForm() {
  const form = document.getElementById('contactForm');
  const logContainer = document.getElementById('terminalLog');
  if (!form || !logContainer) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btn = form.querySelector('.btn-transmit');
    const btnText = btn.querySelector('.btn-text');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    const name = nameInput.value;
    
    // Capture form data BEFORE disabling inputs (disabled fields are excluded from FormData)
    const formData = new FormData(form);
    
    btn.disabled = true;
    nameInput.disabled = true;
    emailInput.disabled = true;
    subjectInput.disabled = true;
    messageInput.disabled = true;
    
    logContainer.innerHTML = '';
    btnText.textContent = 'CONNECTING...';
    
    function addLogLine(text, status = '') {
      const p = document.createElement('div');
      p.className = 'log-line';
      if (status) p.classList.add(status);
      p.textContent = text;
      logContainer.appendChild(p);
      logContainer.scrollTop = logContainer.scrollHeight;
    }
    
    // Run console logging steps
    await new Promise(r => setTimeout(r, 200));
    addLogLine(`> Starting connection...`);
    
    await new Promise(r => setTimeout(r, 400));
    addLogLine(`> Verifying details...`);
    
    await new Promise(r => setTimeout(r, 400));
    addLogLine(`> Connection established.`);
    
    await new Promise(r => setTimeout(r, 400));
    addLogLine(`> Packaging your message...`);
    
    await new Promise(r => setTimeout(r, 400));
    addLogLine(`> Securing message for '${name}'...`);
    
    await new Promise(r => setTimeout(r, 400));
    addLogLine(`> Sending message to secure relay...`);
    btnText.textContent = 'SENDING...';
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        addLogLine(`> Success! Your message has been sent successfully.`, 'success');
        btnText.textContent = 'MESSAGE SENT!';
        
        setTimeout(() => {
          const modal = document.createElement('div');
          modal.className = 'success-modal-overlay';
          modal.innerHTML = `
            <div class="success-modal glass-card">
              <div class="tech-corner tl"></div>
              <div class="tech-corner tr"></div>
              <div class="tech-corner bl"></div>
              <div class="tech-corner br"></div>
              
              <div class="modal-icon"><i class="fas fa-satellite-dish"></i></div>
              <h3>MESSAGE SENT</h3>
              <p>Thank you! Your message has been sent to Mayank. I'll get back to you soon.</p>
              <div class="modal-meta">[Sent at ${new Date().toLocaleTimeString()}]</div>
              <button class="modal-close-btn btn-primary"><span>CLOSE</span></button>
            </div>
          `;
          
          document.body.appendChild(modal);
          
          const closeBtn = modal.querySelector('.modal-close-btn');
          closeBtn.addEventListener('click', () => {
            modal.style.opacity = '0';
            setTimeout(() => {
              modal.remove();
              form.reset();
              btn.disabled = false;
              nameInput.disabled = false;
              emailInput.disabled = false;
              subjectInput.disabled = false;
              messageInput.disabled = false;
              btnText.textContent = 'SEND MESSAGE';
              logContainer.innerHTML = '<div class="log-line">> Ready... Please fill out the form to send a message.</div>';
            }, 300);
          });
        }, 600);
        
      } else {
        addLogLine(`> Error: Transmission rejected by server.`, 'error');
        addLogLine(`> Reason: ${result.message || 'Invalid Access Key'}`, 'error');
        addLogLine(`> Action: Please check/update your Access Key in index.html.`);
        
        btn.disabled = false;
        nameInput.disabled = false;
        emailInput.disabled = false;
        subjectInput.disabled = false;
        messageInput.disabled = false;
        btnText.textContent = 'SEND MESSAGE';
      }
      
    } catch (error) {
      addLogLine(`> Error: Connection lost. Failed to connect to server.`, 'error');
      addLogLine(`> Action: Please check your internet connection and try again.`);
      
      btn.disabled = false;
      nameInput.disabled = false;
      emailInput.disabled = false;
      subjectInput.disabled = false;
      messageInput.disabled = false;
      btnText.textContent = 'SEND MESSAGE';
    }
  });
}

// HERO 3D PC WIREFRAME ENGINE
function initHero3DPC() {
  const canvas = document.getElementById('hero-3d-pc');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;
  
  let width = canvas.width = container.clientWidth || 400;
  let height = canvas.height = container.clientHeight || 400;
  
  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth || 400;
    height = canvas.height = container.clientHeight || 400;
  });

  // Define components in 3D space (perfectly centered around X=0)
  const components = {
    // 3D Office Table (Tabletop and Legs)
    table: {
      top: [
        {x: -1.1, y: -0.65, z: -0.6}, // 0: Top Front Left
        {x:  1.1, y: -0.65, z: -0.6}, // 1: Top Front Right
        {x:  1.0, y: -0.65, z:  0.4}, // 2: Top Back Right
        {x: -1.0, y: -0.65, z:  0.4}, // 3: Top Back Left
        
        {x: -1.1, y: -0.69, z: -0.58}, // 4: Bottom Front Left
        {x:  1.1, y: -0.69, z: -0.58}, // 5: Bottom Front Right
        {x:  1.0, y: -0.69, z:  0.38}, // 6: Bottom Back Right
        {x: -1.0, y: -0.69, z:  0.38}  // 7: Bottom Back Left
      ]
    },
    // Studio Monitor Speakers (Shifted slightly inward to fit at larger scale)
    speakers: {
      left: [
        {x: -0.94, y: -0.65, z: -0.31}, // 0: BLF
        {x: -0.82, y: -0.65, z: -0.31}, // 1: BRF
        {x: -0.82, y: -0.65, z: -0.19}, // 2: BRB
        {x: -0.94, y: -0.65, z: -0.19}, // 3: BLB
        {x: -0.94, y: -0.45, z: -0.31}, // 4: TLF
        {x: -0.82, y: -0.45, z: -0.31}, // 5: TRF
        {x: -0.82, y: -0.45, z: -0.19}, // 6: TRB
        {x: -0.94, y: -0.45, z: -0.19}  // 7: TLB
      ],
      right: [
        {x: 0.56, y: -0.65, z: -0.31}, // 0: BLF
        {x: 0.68, y: -0.65, z: -0.31}, // 1: BRF
        {x: 0.68, y: -0.65, z: -0.19}, // 2: BRB
        {x: 0.56, y: -0.65, z: -0.19}, // 3: BLB
        {x: 0.56, y: -0.45, z: -0.31}, // 4: TLF
        {x: 0.68, y: -0.45, z: -0.31}, // 5: TRF
        {x: 0.68, y: -0.45, z: -0.19}, // 6: TRB
        {x: 0.56, y: -0.45, z: -0.19}  // 7: TLB
      ]
    },
    // Monitor (Centered slightly left at X = -0.2)
    monitor: {
      // Front bezel points (ends curve forward in Z)
      front: [
        {x: -0.75, y:  0.42, z: -0.15}, // 0: Top-left
        {x: -0.28, y:  0.42, z: -0.04}, // 1: Top-mid-left
        {x:  0.20, y:  0.42, z: -0.04}, // 2: Top-mid-right
        {x:  0.68, y:  0.42, z: -0.15}, // 3: Top-right
        {x:  0.68, y: -0.30, z: -0.15}, // 4: Bottom-right
        {x:  0.20, y: -0.30, z: -0.04}, // 5: Bottom-mid-right
        {x: -0.28, y: -0.30, z: -0.04}, // 6: Bottom-mid-left
        {x: -0.75, y: -0.30, z: -0.15}  // 7: Bottom-left
      ],
      // Back bezel cover
      back: [
        {x: -0.75, y:  0.42, z: -0.05}, // 8: Top-left back
        {x: -0.28, y:  0.42, z:  0.06}, // 9: Top-mid-left back
        {x:  0.20, y:  0.42, z:  0.06}, // 10: Top-mid-right back
        {x:  0.68, y:  0.42, z: -0.05}, // 11: Top-right back
        {x:  0.68, y: -0.30, z: -0.05}, // 12: Bottom-right back
        {x:  0.20, y: -0.30, z:  0.06}, // 13: Bottom-mid-right back
        {x: -0.28, y: -0.30, z:  0.06}, // 14: Bottom-mid-left back
        {x: -0.75, y: -0.30, z: -0.05}  // 15: Bottom-left back
      ],
      // Display panel mesh
      display: [
        {x: -0.71, y:  0.38, z: -0.14}, // 0: TL
        {x: -0.26, y:  0.38, z: -0.04}, // 1: TML
        {x:  0.18, y:  0.38, z: -0.04}, // 2: TMR
        {x:  0.64, y:  0.38, z: -0.14}, // 3: TR
        {x:  0.64, y: -0.26, z: -0.14}, // 4: BR
        {x:  0.18, y: -0.26, z: -0.04}, // 5: BMR
        {x: -0.26, y: -0.26, z: -0.04}, // 6: BML
        {x: -0.71, y: -0.26, z: -0.14}  // 7: BL
      ],
      stand: [
        // Neck (placed behind curved screen)
        {x: -0.24, y: -0.25, z:  0.05}, // 0: Neck Top Left
        {x: -0.16, y: -0.25, z:  0.05}, // 1: Neck Top Right
        {x: -0.24, y: -0.62, z:  0.12}, // 2: Neck Bot Left
        {x: -0.16, y: -0.62, z:  0.12}, // 3: Neck Bot Right
        // Heavy Trapezoidal Desk Stand Base
        {x: -0.42, y: -0.65, z: -0.05}, // 4: Base Front Left
        {x: -0.06, y: -0.65, z: -0.05}, // 5: Base Front Right
        {x: -0.08, y: -0.65, z:  0.22}, // 6: Base Back Right
        {x: -0.40, y: -0.65, z:  0.22}  // 7: Base Back Left
      ]
    },
    // PC Tower Cabinet (with modern chamfered glass front-left corner)
    cabinet: {
      box: [
        {x: 0.84, y: -0.65, z: -0.20}, // 0: Bottom Front-Left Inner (chamfer start)
        {x: 1.12, y: -0.65, z: -0.20}, // 1: Bottom Front-Right
        {x: 1.12, y: -0.65, z:  0.35}, // 2: Bottom Back-Right
        {x: 0.78, y: -0.65, z:  0.35}, // 3: Bottom Back-Left
        {x: 0.78, y: -0.65, z: -0.12}, // 4: Bottom Front-Left Outer (chamfer end)
        
        {x: 0.84, y:  0.20, z: -0.20}, // 5: Top Front-Left Inner
        {x: 1.12, y:  0.20, z: -0.20}, // 6: Top Front-Right
        {x: 1.12, y:  0.20, z:  0.35}, // 7: Top Back-Right
        {x: 0.78, y:  0.20, z:  0.35}, // 8: Top Back-Left
        {x: 0.78, y:  0.20, z: -0.12}  // 9: Top Front-Left Outer
      ],
      // GPU inside the glass panel
      gpu: [
        {x: 0.80, y: -0.38, z:  0.02}, // 0
        {x: 1.08, y: -0.38, z:  0.02}, // 1
        {x: 1.08, y: -0.28, z:  0.02}, // 2
        {x: 0.80, y: -0.28, z:  0.02}, // 3
        
        {x: 0.80, y: -0.38, z:  0.18}, // 4
        {x: 1.08, y: -0.38, z:  0.18}, // 5
        {x: 1.08, y: -0.28, z:  0.18}, // 6
        {x: 0.80, y: -0.28, z:  0.18}  // 7
      ],
      // Cooling fans (front-facing)
      fans: [
        {x: 0.98, y: -0.12, z: -0.20}, // Fan 1 (Front top)
        {x: 0.98, y: -0.42, z: -0.20}  // Fan 2 (Front bottom)
      ],
      // Top Radiator Exhaust Fans
      topFans: [
        {x: 0.95, y: 0.20, z: 0.05},
        {x: 0.95, y: 0.20, z: 0.22}
      ],
      // GPU cooling fans (facing outwards)
      gpuFans: [
        {x: 0.88, y: -0.28, z:  0.09},
        {x: 1.00, y: -0.28, z:  0.09}
      ]
    },
    // Mechanical Keyboard
    keyboard: {
      plate: [
        {x: -0.52, y: -0.65, z: -0.52}, // 0: TL
        {x:  0.12, y: -0.65, z: -0.52}, // 1: TR
        {x:  0.08, y: -0.65, z: -0.28}, // 2: BR
        {x: -0.48, y: -0.65, z: -0.28}  // 3: BL
      ]
    },
    // Gaming Mouse & Mouse Pad
    mousePad: [
      {x: 0.16, y: -0.65, z: -0.54}, // TL
      {x: 0.38, y: -0.65, z: -0.54}, // TR
      {x: 0.36, y: -0.65, z: -0.30}, // BR
      {x: 0.14, y: -0.65, z: -0.30}  // BL
    ],
    mouse: {
      center: {x: 0.28, y: -0.65, z: -0.42},
      sizeOffset: {x: 0.05, y: 0, z: 0.07}
    }
  };

  // 3D Rising code/particle nodes
  const particles3D = [];
  for (let i = 0; i < 7; i++) {
    particles3D.push({
      x: Math.random() * 0.8 - 0.4,
      y: -0.65 - Math.random() * 0.3,
      z: Math.random() * 0.5 - 0.25,
      speed: 0.003 + Math.random() * 0.004,
      char: ["0", "1", "<>", "{ }", "[ ]", "JS", "SYS", "OK"][Math.floor(Math.random() * 8)]
    });
  }

  // Drag interaction state
  let rotX = 0.12; 
  let rotY = 0.35; 
  let velocityX = 0;
  let velocityY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    canvas.style.cursor = 'grabbing';
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    velocityX = deltaX * 0.005;
    velocityY = deltaY * 0.005;
    
    rotY += velocityX;
    rotX += velocityY;
    rotX = Math.max(-0.4, Math.min(0.5, rotX));
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });
  
  canvas.addEventListener('touchstart', (e) => {
    isDragging = true;
    const touch = e.touches[0];
    previousMousePosition = { x: touch.clientX, y: touch.clientY };
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - previousMousePosition.x;
    const deltaY = touch.clientY - previousMousePosition.y;
    
    velocityX = deltaX * 0.005;
    velocityY = deltaY * 0.005;
    
    rotY += velocityX;
    rotX += velocityY;
    rotX = Math.max(-0.4, Math.min(0.5, rotX));
    previousMousePosition = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  
  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Helpers
  function interpolate(p1, p2, t) {
    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t,
      z: p1.z + (p2.z - p1.z) * t
    };
  }

  // Perspective 3D -> 2D Projection
  function project(v, angleX, angleY, centerX, centerY, sizeFactor) {
    // Rotate X (pitch)
    let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
    let y1 = v.y * cosX - v.z * sinX;
    let z1 = v.y * sinX + v.z * cosX;
    
    // Rotate Y (yaw)
    let cosY = Math.cos(angleY), sinY = Math.sin(angleY);
    let x2 = v.x * cosY - z1 * sinY;
    let z2 = v.x * sinY + z1 * cosY;
    
    // Perspective scale
    let distance = 2.0;
    let scale = 1 / (z2 + distance);
    
    return {
      x: x2 * scale * sizeFactor + centerX,
      y: -y1 * scale * sizeFactor + centerY - (sizeFactor * 0.05),
      z: z2,
      scale: scale
    };
  }

  // Get a 3D coordinate point on the curved display mesh (s: horizontal 0-1, t: vertical 0-1)
  function getScreenPoint(s, t) {
    let Left = interpolate(components.monitor.display[0], components.monitor.display[7], t);
    let MidLeft = interpolate(components.monitor.display[1], components.monitor.display[6], t);
    let MidRight = interpolate(components.monitor.display[2], components.monitor.display[5], t);
    let Right = interpolate(components.monitor.display[3], components.monitor.display[4], t);
    
    if (s < 0.33) {
      return interpolate(Left, MidLeft, s / 0.33);
    } else if (s < 0.66) {
      return interpolate(MidLeft, MidRight, (s - 0.33) / 0.33);
    } else {
      return interpolate(MidRight, Right, (s - 0.66) / 0.34);
    }
  }

  // Scrolling code terminal text lines (IDE contents)
  const sidebarLines = [
    "📁 PORTFOLIO",
    "  📁 src",
    "    📄 index.html",
    "    📄 styles.css",
    "    📄 script.js",
    "  📄 package.json"
  ];
  const editorCode = [
    "import { Mayank } from './dev';",
    "const developer = new Mayank({",
    "  role: 'Fullstack Systems',",
    "  location: 'India',",
    "  skills: ['React', 'Android', 'ML']",
    "});",
    "developer.mountPortfolio();",
    "// Compiling components successfully..."
  ];
  const terminalLogs = [
    "mayank@dev:~$ npm run dev",
    "Server active at http://localhost:3000",
    "Web3Forms submit API: CONNECTED",
    "[Sys Status: RUNNING PROD]"
  ];

  let textScrollTimer = 0;
  let textScrollIndex = 0;

  // Animation Loop
  let fanAngle = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    if (!isDragging) {
      // Easing momentum decay
      rotY += velocityX;
      rotX += velocityY;
      velocityX *= 0.96;
      velocityY *= 0.96;
      
      // Idle rotate back to default slowly
      rotY += (0.15 - rotY) * 0.004;
      rotX += (0.10 - rotX) * 0.004;
    }
    
    rotX = Math.max(-0.4, Math.min(0.5, rotX));
    fanAngle += 0.06;
    textScrollTimer += 1;
    if (textScrollTimer > 80) {
      textScrollTimer = 0;
      textScrollIndex = (textScrollIndex + 1) % terminalLogs.length;
    }
    
    const sizeFactor = Math.min(width, height) * 0.72;
    const centerX = width / 2 - (sizeFactor * 0.04);
    const centerY = height / 2;
    
    // Project all structures helper
    function projectGroup(pts) {
      return pts.map(p => project(p, rotX, rotY, centerX, centerY, sizeFactor));
    }
    
    // (Table legs removed for a clean floating look)

    // 2. Draw Tabletop Slab (filled glass panel)
    const pT = projectGroup(components.table.top);
    
    // Bottom thickness slab loop
    ctx.fillStyle = 'rgba(15, 15, 20, 0.9)';
    ctx.beginPath();
    ctx.moveTo(pT[4].x, pT[4].y);
    ctx.lineTo(pT[5].x, pT[5].y);
    ctx.lineTo(pT[6].x, pT[6].y);
    ctx.lineTo(pT[7].x, pT[7].y);
    ctx.closePath();
    ctx.fill();

    // Top surface
    let tableGrad = ctx.createLinearGradient(pT[0].x, pT[0].y, pT[2].x, pT[2].y);
    tableGrad.addColorStop(0, 'rgba(25, 25, 35, 0.96)');
    tableGrad.addColorStop(1, 'rgba(12, 12, 18, 0.98)');
    ctx.fillStyle = tableGrad;
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pT[0].x, pT[0].y);
    ctx.lineTo(pT[1].x, pT[1].y);
    ctx.lineTo(pT[2].x, pT[2].y);
    ctx.lineTo(pT[3].x, pT[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw grid stripes on tabletop
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 6; i++) {
      let t = i / 7;
      let left = interpolate(components.table.top[0], components.table.top[3], t);
      let right = interpolate(components.table.top[1], components.table.top[2], t);
      let pL = project(left, rotX, rotY, centerX, centerY, sizeFactor);
      let pR = project(right, rotX, rotY, centerX, centerY, sizeFactor);
      ctx.beginPath();
      ctx.moveTo(pL.x, pL.y);
      ctx.lineTo(pR.x, pR.y);
      ctx.stroke();
    }

    // Connect Top to Bottom tabletop slab edges
    ctx.fillStyle = 'rgba(15, 15, 20, 0.95)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
    ctx.beginPath();
    ctx.moveTo(pT[0].x, pT[0].y);
    ctx.lineTo(pT[1].x, pT[1].y);
    ctx.lineTo(pT[5].x, pT[5].y);
    ctx.lineTo(pT[4].x, pT[4].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 3. Draw Mechanical Keyboard & keys
    const pKb = projectGroup(components.keyboard.plate);
    
    // Keyboard backlight glow
    ctx.save();
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
    ctx.shadowColor = 'rgba(168, 85, 247, 0.7)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(pKb[0].x, pKb[0].y);
    ctx.lineTo(pKb[1].x, pKb[1].y);
    ctx.lineTo(pKb[2].x, pKb[2].y);
    ctx.lineTo(pKb[3].x, pKb[3].y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

    // Keyboard Plate base
    ctx.fillStyle = 'rgba(12, 12, 18, 0.9)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pKb[0].x, pKb[0].y);
    ctx.lineTo(pKb[1].x, pKb[1].y);
    ctx.lineTo(pKb[2].x, pKb[2].y);
    ctx.lineTo(pKb[3].x, pKb[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Keyboard Keycaps (Grid of rows and columns)
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.2)';
    ctx.lineWidth = 0.8;
    // Rows
    let keyRows = 5;
    for (let i = 1; i < keyRows; i++) {
      let t = i / keyRows;
      let left = interpolate(components.keyboard.plate[0], components.keyboard.plate[3], t);
      let right = interpolate(components.keyboard.plate[1], components.keyboard.plate[2], t);
      let pL = project(left, rotX, rotY, centerX, centerY, sizeFactor);
      let pR = project(right, rotX, rotY, centerX, centerY, sizeFactor);
      ctx.beginPath();
      ctx.moveTo(pL.x, pL.y);
      ctx.lineTo(pR.x, pR.y);
      ctx.stroke();
    }
    // Columns (Vertical keycaps dividers)
    let keyCols = 15;
    for (let j = 1; j < keyCols; j++) {
      let s = j / keyCols;
      let top = interpolate(components.keyboard.plate[0], components.keyboard.plate[1], s);
      let bottom = interpolate(components.keyboard.plate[3], components.keyboard.plate[2], s);
      let pT = project(top, rotX, rotY, centerX, centerY, sizeFactor);
      let pB = project(bottom, rotX, rotY, centerX, centerY, sizeFactor);
      ctx.beginPath();
      ctx.moveTo(pT.x, pT.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
    }
    
    // 3.5 Draw Mouse Pad
    const pPad = projectGroup(components.mousePad);
    ctx.fillStyle = 'rgba(15, 15, 22, 0.85)';
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pPad[0].x, pPad[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(pPad[i].x, pPad[i].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 4. Draw Mouse (Professional Gaming Mouse details)
    const pMouseCenter = project(components.mouse.center, rotX, rotY, centerX, centerY, sizeFactor);
    const pMouseSize = project({
      x: components.mouse.center.x + components.mouse.sizeOffset.x,
      y: components.mouse.center.y,
      z: components.mouse.center.z + components.mouse.sizeOffset.z
    }, rotX, rotY, centerX, centerY, sizeFactor);
    
    const mouseRadius = Math.abs(pMouseSize.x - pMouseCenter.x);
    
    // Mouse Main Shell
    ctx.fillStyle = 'rgba(10, 10, 15, 0.95)';
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(pMouseCenter.x, pMouseCenter.y, mouseRadius, mouseRadius * 1.5, Math.atan2(pMouseSize.y - pMouseCenter.y, pMouseSize.x - pMouseCenter.x), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Mouse details: Left/Right click division line
    let pMouseFront = project({x: components.mouse.center.x, y: components.mouse.center.y, z: components.mouse.center.z - 0.065}, rotX, rotY, centerX, centerY, sizeFactor);
    let pMouseMid = project({x: components.mouse.center.x, y: components.mouse.center.y, z: components.mouse.center.z}, rotX, rotY, centerX, centerY, sizeFactor);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
    ctx.beginPath();
    ctx.moveTo(pMouseFront.x, pMouseFront.y);
    ctx.lineTo(pMouseMid.x, pMouseMid.y);
    ctx.stroke();

    // Mouse details: Glowing Scroll Wheel
    let pWheelStart = project({x: components.mouse.center.x, y: components.mouse.center.y + 0.005, z: components.mouse.center.z - 0.05}, rotX, rotY, centerX, centerY, sizeFactor);
    let pWheelEnd = project({x: components.mouse.center.x, y: components.mouse.center.y + 0.005, z: components.mouse.center.z - 0.025}, rotX, rotY, centerX, centerY, sizeFactor);
    ctx.save();
    ctx.strokeStyle = '#22D3EE';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#22D3EE';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.moveTo(pWheelStart.x, pWheelStart.y);
    ctx.lineTo(pWheelEnd.x, pWheelEnd.y);
    ctx.stroke();
    ctx.restore();

    // 4.5 Draw Speakers (Studio Monitors on left and right)
    const drawSpeaker = (pts, wooferCenter, tweeterCenter) => {
      const pS = pts.map(p => project(p, rotX, rotY, centerX, centerY, sizeFactor));
      
      // Speaker Cabinet Box Fill & Stroke
      ctx.fillStyle = 'rgba(12, 12, 18, 0.95)';
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.5)';
      ctx.lineWidth = 1.2;
      
      // Bottom face
      ctx.beginPath();
      ctx.moveTo(pS[0].x, pS[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(pS[i].x, pS[i].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Top face
      ctx.beginPath();
      ctx.moveTo(pS[4].x, pS[4].y);
      for (let i = 5; i < 8; i++) ctx.lineTo(pS[i].x, pS[i].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Side/vertical pillars
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.moveTo(pS[i].x, pS[i].y);
        ctx.lineTo(pS[i+4].x, pS[i+4].y);
      }
      ctx.stroke();

      // Front face woofer and tweeter cones (parallel to XY plane)
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.lineWidth = 1.0;
      
      // Woofer cone
      ctx.beginPath();
      let steps = 10;
      for (let s = 0; s <= steps; s++) {
        let theta = (s / steps) * Math.PI * 2;
        let ringPt = {
          x: wooferCenter.x + 0.04 * Math.cos(theta),
          y: wooferCenter.y + 0.04 * Math.sin(theta),
          z: wooferCenter.z
        };
        let pRing = project(ringPt, rotX, rotY, centerX, centerY, sizeFactor);
        if (s === 0) ctx.moveTo(pRing.x, pRing.y);
        else ctx.lineTo(pRing.x, pRing.y);
      }
      ctx.stroke();

      // Tweeter cone
      ctx.beginPath();
      for (let s = 0; s <= steps; s++) {
        let theta = (s / steps) * Math.PI * 2;
        let ringPt = {
          x: tweeterCenter.x + 0.025 * Math.cos(theta),
          y: tweeterCenter.y + 0.025 * Math.sin(theta),
          z: tweeterCenter.z
        };
        let pRing = project(ringPt, rotX, rotY, centerX, centerY, sizeFactor);
        if (s === 0) ctx.moveTo(pRing.x, pRing.y);
        else ctx.lineTo(pRing.x, pRing.y);
      }
      ctx.stroke();
    };

    drawSpeaker(components.speakers.left, {x: -0.88, y: -0.56, z: -0.31}, {x: -0.88, y: -0.48, z: -0.31});
    drawSpeaker(components.speakers.right, {x: 0.62, y: -0.56, z: -0.31}, {x: 0.62, y: -0.48, z: -0.31});

    // 5. Draw Monitor Stand Base & Neck
    const pStand = projectGroup(components.monitor.stand);
    ctx.fillStyle = 'rgba(15, 15, 20, 0.88)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.6)';
    ctx.lineWidth = 1.5;
    
    // Stand base
    ctx.beginPath();
    ctx.moveTo(pStand[4].x, pStand[4].y);
    ctx.lineTo(pStand[5].x, pStand[5].y);
    ctx.lineTo(pStand[6].x, pStand[6].y);
    ctx.lineTo(pStand[7].x, pStand[7].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Stand neck
    ctx.beginPath();
    ctx.moveTo(pStand[0].x, pStand[0].y);
    ctx.lineTo(pStand[2].x, pStand[2].y);
    ctx.lineTo(pStand[3].x, pStand[3].y);
    ctx.lineTo(pStand[1].x, pStand[1].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 6. Draw PC Tower Cabinet (CPU with chamfered glass front-left corner)
    const pCab = projectGroup(components.cabinet.box);
    ctx.fillStyle = 'rgba(10, 10, 15, 0.8)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.65)';
    ctx.lineWidth = 1.5;
    
    // Bottom cover fill (5-sided polygon due to chamfered front-left corner)
    ctx.beginPath();
    ctx.moveTo(pCab[0].x, pCab[0].y);
    ctx.lineTo(pCab[1].x, pCab[1].y);
    ctx.lineTo(pCab[2].x, pCab[2].y);
    ctx.lineTo(pCab[3].x, pCab[3].y);
    ctx.lineTo(pCab[4].x, pCab[4].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Top cover fill (5-sided polygon)
    ctx.beginPath();
    ctx.moveTo(pCab[5].x, pCab[5].y);
    ctx.lineTo(pCab[6].x, pCab[6].y);
    ctx.lineTo(pCab[7].x, pCab[7].y);
    ctx.lineTo(pCab[8].x, pCab[8].y);
    ctx.lineTo(pCab[9].x, pCab[9].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Vertical structural pillars (5 pillars)
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      ctx.moveTo(pCab[i].x, pCab[i].y);
      ctx.lineTo(pCab[i+5].x, pCab[i+5].y);
    }
    ctx.stroke();

    // 6.2 Motherboard and RAM outline (Vertical tray at x = 1.10)
    const mb = [
      {x: 1.10, y:  0.18, z: -0.15}, // TL
      {x: 1.10, y:  0.18, z:  0.30}, // TR
      {x: 1.10, y: -0.55, z:  0.30}, // BR
      {x: 1.10, y: -0.55, z: -0.15}  // BL
    ];
    const pMb = mb.map(p => project(p, rotX, rotY, centerX, centerY, sizeFactor));
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.22)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(pMb[0].x, pMb[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(pMb[i].x, pMb[i].y);
    ctx.closePath();
    ctx.stroke();

    // Glowing RGB RAM modules (4 sticks next to CPU socket area)
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)'; // purple RGB RAM
    ctx.shadowColor = 'rgba(168, 85, 247, 0.6)';
    ctx.shadowBlur = 4;
    for (let r = 0; r < 4; r++) {
      let ramZ = 0.04 + (r * 0.02);
      let pRamTop = project({x: 1.10, y: 0.04, z: ramZ}, rotX, rotY, centerX, centerY, sizeFactor);
      let pRamBot = project({x: 1.10, y: -0.10, z: ramZ}, rotX, rotY, centerX, centerY, sizeFactor);
      ctx.beginPath();
      ctx.moveTo(pRamTop.x, pRamTop.y);
      ctx.lineTo(pRamBot.x, pRamBot.y);
      ctx.stroke();
    }
    ctx.shadowBlur = 0; // reset

    // 6.25 CPU Liquid Cooler (AIO Block & Glowing Coolant Tubes)
    let pCpuBlock = project({x: 1.10, y: -0.18, z: 0.12}, rotX, rotY, centerX, centerY, sizeFactor);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.85)';
    ctx.fillStyle = 'rgba(12, 12, 18, 0.9)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(pCpuBlock.x, pCpuBlock.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // AIO Tubes
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.7)';
    ctx.lineWidth = 2.0;
    
    let tube1_start = {x: 1.10, y: -0.18, z: 0.12};
    let tube1_cp1 = {x: 0.96, y: -0.18, z: 0.25};
    let tube1_cp2 = {x: 0.86, y: 0.08, z: 0.25};
    let tube1_end = {x: 0.92, y: 0.20, z: 0.12};
    
    let pT1_s = project(tube1_start, rotX, rotY, centerX, centerY, sizeFactor);
    let pT1_c1 = project(tube1_cp1, rotX, rotY, centerX, centerY, sizeFactor);
    let pT1_c2 = project(tube1_cp2, rotX, rotY, centerX, centerY, sizeFactor);
    let pT1_e = project(tube1_end, rotX, rotY, centerX, centerY, sizeFactor);
    
    ctx.beginPath();
    ctx.moveTo(pT1_s.x, pT1_s.y);
    ctx.bezierCurveTo(pT1_c1.x, pT1_c1.y, pT1_c2.x, pT1_c2.y, pT1_e.x, pT1_e.y);
    ctx.stroke();

    let tube2_start = {x: 1.10, y: -0.15, z: 0.10};
    let tube2_cp1 = {x: 0.96, y: -0.15, z: 0.22};
    let tube2_cp2 = {x: 0.86, y: 0.10, z: 0.22};
    let tube2_end = {x: 0.95, y: 0.20, z: 0.10};
    
    let pT2_s = project(tube2_start, rotX, rotY, centerX, centerY, sizeFactor);
    let pT2_c1 = project(tube2_cp1, rotX, rotY, centerX, centerY, sizeFactor);
    let pT2_c2 = project(tube2_cp2, rotX, rotY, centerX, centerY, sizeFactor);
    let pT2_e = project(tube2_end, rotX, rotY, centerX, centerY, sizeFactor);
    
    ctx.beginPath();
    ctx.moveTo(pT2_s.x, pT2_s.y);
    ctx.bezierCurveTo(pT2_c1.x, pT2_c1.y, pT2_c2.x, pT2_c2.y, pT2_e.x, pT2_e.y);
    ctx.stroke();

    // Top Radiator Exhaust Fans
    components.cabinet.topFans.forEach(fCenter => {
      let pCenter = project(fCenter, rotX, rotY, centerX, centerY, sizeFactor);
      
      // Fan outer ring (XZ plane)
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      let steps = 12;
      for (let s = 0; s <= steps; s++) {
        let theta = (s / steps) * Math.PI * 2;
        let ringPt = {
          x: fCenter.x + 0.05 * Math.cos(theta),
          y: fCenter.y,
          z: fCenter.z + 0.05 * Math.sin(theta)
        };
        let pRing = project(ringPt, rotX, rotY, centerX, centerY, sizeFactor);
        if (s === 0) ctx.moveTo(pRing.x, pRing.y);
        else ctx.lineTo(pRing.x, pRing.y);
      }
      ctx.stroke();

      // Rotating blades
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.2;
      for (let j = 0; j < 3; j++) {
        let angle = fanAngle + (j * (Math.PI * 2 / 3));
        let bladeEnd = {
          x: fCenter.x + 0.045 * Math.cos(angle),
          y: fCenter.y,
          z: fCenter.z + 0.045 * Math.sin(angle)
        };
        let pEnd = project(bladeEnd, rotX, rotY, centerX, centerY, sizeFactor);
        ctx.beginPath();
        ctx.moveTo(pCenter.x, pCenter.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.stroke();
      }
    });

    // 6.3 GPU Outline inside Cabinet
    const pGpu = projectGroup(components.cabinet.gpu);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.05)';
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.lineWidth = 1.0;
    // GPU Bottom
    ctx.beginPath();
    ctx.moveTo(pGpu[0].x, pGpu[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(pGpu[i].x, pGpu[i].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // GPU Top
    ctx.beginPath();
    ctx.moveTo(pGpu[4].x, pGpu[4].y);
    for (let i = 5; i < 8; i++) ctx.lineTo(pGpu[i].x, pGpu[i].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // GPU Verticals
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.moveTo(pGpu[i].x, pGpu[i].y);
      ctx.lineTo(pGpu[i+4].x, pGpu[i+4].y);
    }
    ctx.stroke();

    // 6.4 GPU cooling fans (facing upwards on the top surface of the GPU block)
    components.cabinet.gpuFans.forEach(fCenter => {
      let pCenter = project(fCenter, rotX, rotY, centerX, centerY, sizeFactor);
      
      // Fan outer ring in 3D
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      let steps = 12;
      for (let s = 0; s <= steps; s++) {
        let theta = (s / steps) * Math.PI * 2;
        let ringPt = {
          x: fCenter.x + 0.045 * Math.cos(theta),
          y: fCenter.y,
          z: fCenter.z + 0.045 * Math.sin(theta)
        };
        let pRing = project(ringPt, rotX, rotY, centerX, centerY, sizeFactor);
        if (s === 0) ctx.moveTo(pRing.x, pRing.y);
        else ctx.lineTo(pRing.x, pRing.y);
      }
      ctx.stroke();

      // Rotating blades in 3D
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 1.2;
      for (let j = 0; j < 3; j++) {
        let angle = -fanAngle + (j * (Math.PI * 2 / 3)); // rotating backwards for style
        let bladeEnd = {
          x: fCenter.x + 0.04 * Math.cos(angle),
          y: fCenter.y,
          z: fCenter.z + 0.04 * Math.sin(angle)
        };
        let pEnd = project(bladeEnd, rotX, rotY, centerX, centerY, sizeFactor);
        ctx.beginPath();
        ctx.moveTo(pCenter.x, pCenter.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.stroke();
      }
    });

    // 7. Rotating Cooling Fans in Cabinet (Front intake fans)
    components.cabinet.fans.forEach((fCenter, fanIdx) => {
      let pCenter = project(fCenter, rotX, rotY, centerX, centerY, sizeFactor);
      
      // Fan outer ring in 3D
      ctx.strokeStyle = fanIdx === 0 ? 'rgba(34, 211, 238, 0.65)' : 'rgba(124, 58, 237, 0.65)';
      ctx.shadowColor = fanIdx === 0 ? 'rgba(34, 211, 238, 0.5)' : 'rgba(124, 58, 237, 0.5)';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      let steps = 12;
      for (let s = 0; s <= steps; s++) {
        let theta = (s / steps) * Math.PI * 2;
        let ringPt = {
          x: fCenter.x + 0.08 * Math.cos(theta),
          y: fCenter.y + 0.08 * Math.sin(theta),
          z: fCenter.z
        };
        let pRing = project(ringPt, rotX, rotY, centerX, centerY, sizeFactor);
        if (s === 0) ctx.moveTo(pRing.x, pRing.y);
        else ctx.lineTo(pRing.x, pRing.y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Rotating blades in 3D
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.65)';
      ctx.lineWidth = 2;
      for (let j = 0; j < 3; j++) {
        let angle = fanAngle + (j * (Math.PI * 2 / 3));
        let bladeEnd = {
          x: fCenter.x + Math.cos(angle) * 0.07,
          y: fCenter.y + Math.sin(angle) * 0.07,
          z: fCenter.z
        };
        let pEnd = project(bladeEnd, rotX, rotY, centerX, centerY, sizeFactor);
        ctx.beginPath();
        ctx.moveTo(pCenter.x, pCenter.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.stroke();
      }
    });

    // 8. Draw Monitor back cover (solid styling)
    const pMonBack = projectGroup(components.monitor.back);
    ctx.fillStyle = 'rgba(20, 20, 25, 0.9)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.25)';
    ctx.beginPath();
    ctx.moveTo(pMonBack[0].x, pMonBack[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pMonBack[i].x, pMonBack[i].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fill bezel thickness
    const pMonFront = projectGroup(components.monitor.front);
    ctx.fillStyle = 'rgba(124, 58, 237, 0.08)';
    for (let i = 0; i < 8; i++) {
      let next = (i + 1) % 8;
      ctx.beginPath();
      ctx.moveTo(pMonFront[i].x, pMonFront[i].y);
      ctx.lineTo(pMonBack[i].x, pMonBack[i].y);
      ctx.lineTo(pMonBack[next].x, pMonBack[next].y);
      ctx.lineTo(pMonFront[next].x, pMonFront[next].y);
      ctx.closePath();
      ctx.fill();
    }

    // 9. Draw Screen display gradient face
    const pDisplay = projectGroup(components.monitor.display);
    let grad = ctx.createLinearGradient(pDisplay[0].x, pDisplay[0].y, pDisplay[4].x, pDisplay[4].y);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.85)'); // dark slate background
    grad.addColorStop(1, 'rgba(10, 10, 15, 0.95)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(pDisplay[0].x, pDisplay[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pDisplay[i].x, pDisplay[i].y);
    ctx.closePath();
    ctx.fill();

    // Front bezel outline
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.85)';
    ctx.lineWidth = 2.2;
    ctx.shadowColor = '#7C3AED';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(pMonFront[0].x, pMonFront[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pMonFront[i].x, pMonFront[i].y);
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // 10. Draw Curved Screen IDE Editor Interface
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // Vertical sidebar divider line at s = 0.24
    let dividerStart = project(getScreenPoint(0.24, 0.0), rotX, rotY, centerX, centerY, sizeFactor);
    let dividerEnd = project(getScreenPoint(0.24, 1.0), rotX, rotY, centerX, centerY, sizeFactor);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(dividerStart.x, dividerStart.y);
    ctx.lineTo(dividerEnd.x, dividerEnd.y);
    ctx.stroke();

    // Horizontal console divider line at t = 0.65 (from sidebar s = 0.24 to right s = 1.0)
    let termDivStart = project(getScreenPoint(0.24, 0.65), rotX, rotY, centerX, centerY, sizeFactor);
    let termDivEnd = project(getScreenPoint(1.0, 0.65), rotX, rotY, centerX, centerY, sizeFactor);
    ctx.beginPath();
    ctx.moveTo(termDivStart.x, termDivStart.y);
    ctx.lineTo(termDivEnd.x, termDivEnd.y);
    ctx.stroke();

    // A. Render Sidebar (File Tree)
    sidebarLines.forEach((textLine, i) => {
      let t_pos = 0.12 + (i * 0.09);
      let pt = getScreenPoint(0.06, t_pos);
      let pStart = project(pt, rotX, rotY, centerX, centerY, sizeFactor);
      let pEnd = project(getScreenPoint(0.22, t_pos), rotX, rotY, centerX, centerY, sizeFactor);
      
      let slantAngle = Math.atan2(pEnd.y - pStart.y, pEnd.x - pStart.x);
      let fontSize = Math.max(6, Math.round(sizeFactor * 0.025 * pStart.scale));
      
      ctx.save();
      ctx.translate(pStart.x, pStart.y);
      ctx.rotate(slantAngle);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      
      // Sidebar font color (faint blue-gray)
      ctx.fillStyle = i === 4 ? '#22D3EE' : 'rgba(255, 255, 255, 0.45)'; // highlight active file
      ctx.fillText(textLine, 0, 0);
      ctx.restore();
    });

    // B. Render Code Editor Pane (Syntax Highlighted Lines)
    editorCode.forEach((codeLine, i) => {
      let t_pos = 0.10 + (i * 0.07);
      let pt = getScreenPoint(0.26, t_pos);
      let pStart = project(pt, rotX, rotY, centerX, centerY, sizeFactor);
      let pEnd = project(getScreenPoint(0.94, t_pos), rotX, rotY, centerX, centerY, sizeFactor);
      
      let slantAngle = Math.atan2(pEnd.y - pStart.y, pEnd.x - pStart.x);
      let fontSize = Math.max(6, Math.round(sizeFactor * 0.026 * pStart.scale));
      
      ctx.save();
      ctx.translate(pStart.x, pStart.y);
      ctx.rotate(slantAngle);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      
      // Color-coding lines for realistic IDE highlight
      if (codeLine.startsWith("import")) {
        ctx.fillStyle = '#C084FC'; // purple imports
      } else if (codeLine.startsWith("const") || codeLine.startsWith("developer.")) {
        ctx.fillStyle = '#38BDF8'; // blue declarations
      } else if (codeLine.includes("//")) {
        ctx.fillStyle = '#4ADE80'; // green comments
      } else {
        ctx.fillStyle = '#F1F5F9'; // white standard
      }
      
      ctx.fillText(codeLine, 0, 0);
      ctx.restore();
    });

    // C. Render Terminal Console logs (scrolling upward)
    for (let i = 0; i < 3; i++) {
      let logIdx = (textScrollIndex + i) % terminalLogs.length;
      let logText = terminalLogs[logIdx];
      let t_pos = 0.72 + (i * 0.08);
      
      let pt = getScreenPoint(0.26, t_pos);
      let pStart = project(pt, rotX, rotY, centerX, centerY, sizeFactor);
      let pEnd = project(getScreenPoint(0.94, t_pos), rotX, rotY, centerX, centerY, sizeFactor);
      
      let slantAngle = Math.atan2(pEnd.y - pStart.y, pEnd.x - pStart.x);
      let fontSize = Math.max(5, Math.round(sizeFactor * 0.022 * pStart.scale));
      
      ctx.save();
      ctx.translate(pStart.x, pStart.y);
      ctx.rotate(slantAngle);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = i === 2 ? '#22D3EE' : 'rgba(34, 211, 238, 0.6)'; // cyan logs
      ctx.fillText(logText, 0, 0);
      ctx.restore();
    }

    // 11. 3D Rising code/particle nodes (Hex / Binary bits floating up)
    particles3D.forEach(p => {
      p.y += p.speed;
      if (p.y > 0.4) {
        p.y = -0.65;
        p.x = Math.random() * 0.8 - 0.4;
        p.z = Math.random() * 0.5 - 0.25;
      }
      
      let pt = project(p, rotX, rotY, centerX, centerY, sizeFactor);
      let alpha = (0.4 - p.y) / 1.05;
      alpha = Math.max(0, Math.min(0.55, alpha));
      
      ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
      ctx.font = `bold ${Math.max(6, Math.round(11 * pt.scale))}px 'JetBrains Mono', monospace`;
      ctx.fillText(p.char, pt.x, pt.y);
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
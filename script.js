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
      const formData = new FormData(form);
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

  // Define components in 3D space
  const components = {
    // Ultrawide curved monitor screen (front and back)
    monitor: {
      // Front bezel points (ends curve forward in Z)
      front: [
        {x: -0.80, y:  0.42, z: -0.15}, // 0: Top-left
        {x: -0.28, y:  0.42, z: -0.04}, // 1: Top-mid-left
        {x:  0.28, y:  0.42, z: -0.04}, // 2: Top-mid-right
        {x:  0.80, y:  0.42, z: -0.15}, // 3: Top-right
        {x:  0.80, y: -0.32, z: -0.15}, // 4: Bottom-right
        {x:  0.28, y: -0.32, z: -0.04}, // 5: Bottom-mid-right
        {x: -0.28, y: -0.32, z: -0.04}, // 6: Bottom-mid-left
        {x: -0.80, y: -0.32, z: -0.15}  // 7: Bottom-left
      ],
      back: [
        {x: -0.80, y:  0.42, z: -0.05}, // 8: Top-left back
        {x: -0.28, y:  0.42, z:  0.06}, // 9: Top-mid-left back
        {x:  0.28, y:  0.42, z:  0.06}, // 10: Top-mid-right back
        {x:  0.80, y:  0.42, z: -0.05}, // 11: Top-right back
        {x:  0.80, y: -0.32, z: -0.05}, // 12: Bottom-right back
        {x:  0.28, y: -0.32, z:  0.06}, // 13: Bottom-mid-right back
        {x: -0.28, y: -0.32, z:  0.06}, // 14: Bottom-mid-left back
        {x: -0.80, y: -0.32, z: -0.05}  // 15: Bottom-left back
      ],
      // Screen contents display frame (inside bezel)
      display: [
        {x: -0.76, y:  0.38, z: -0.14}, // 0: TL
        {x: -0.26, y:  0.38, z: -0.04}, // 1: TML
        {x:  0.26, y:  0.38, z: -0.04}, // 2: TMR
        {x:  0.76, y:  0.38, z: -0.14}, // 3: TR
        {x:  0.76, y: -0.28, z: -0.14}, // 4: BR
        {x:  0.26, y: -0.28, z: -0.04}, // 5: BMR
        {x: -0.26, y: -0.28, z: -0.04}, // 6: BML
        {x: -0.76, y: -0.28, z: -0.14}  // 7: BL
      ],
      stand: [
        // Neck joints
        {x: -0.08, y: -0.32, z:  0.03}, // 0: Neck Top L
        {x:  0.08, y: -0.32, z:  0.03}, // 1: Neck Top R
        {x: -0.06, y: -0.68, z:  0.15}, // 2: Neck Bot L
        {x:  0.06, y: -0.68, z:  0.15}, // 3: Neck Bot R
        // V-base tips
        {x: -0.35, y: -0.72, z: -0.15}, // 4: Left tip
        {x:  0.35, y: -0.72, z: -0.15}, // 5: Right tip
        {x:  0.0,  y: -0.72, z:  0.25}  // 6: Back foot
      ]
    },
    // PC Tower Cabinet (placed on the right side)
    cabinet: {
      box: [
        {x: 0.90, y: -0.72, z: -0.20}, // 0: Bottom-left-front
        {x: 1.25, y: -0.72, z: -0.20}, // 1: Bottom-right-front
        {x: 1.25, y: -0.72, z:  0.35}, // 2: Bottom-right-back
        {x: 0.90, y: -0.72, z:  0.35}, // 3: Bottom-left-back
        
        {x: 0.90, y:  0.20, z: -0.20}, // 4: Top-left-front
        {x: 1.25, y:  0.20, z: -0.20}, // 5: Top-right-front
        {x: 1.25, y:  0.20, z:  0.35}, // 6: Top-right-back
        {x: 0.90, y:  0.20, z:  0.35}  // 7: Top-left-back
      ],
      // GPU inside the glass panel
      gpu: [
        {x: 0.92, y: -0.38, z:  0.02}, // 0
        {x: 1.18, y: -0.38, z:  0.02}, // 1
        {x: 1.18, y: -0.30, z:  0.02}, // 2
        {x: 0.92, y: -0.30, z:  0.02}, // 3
        
        {x: 0.92, y: -0.38, z:  0.18}, // 4
        {x: 1.18, y: -0.38, z:  0.18}, // 5
        {x: 1.18, y: -0.30, z:  0.18}, // 6
        {x: 0.92, y: -0.30, z:  0.18}  // 7
      ],
      // Glowing cooling fan centers
      fans: [
        {x: 1.075, y: -0.10, z: -0.20}, // Fan 1 (Front top)
        {x: 1.075, y: -0.40, z: -0.20}  // Fan 2 (Front bottom)
      ]
    },
    // Keyboard and mousepad in front
    keyboard: {
      plate: [
        {x: -0.55, y: -0.72, z: -0.60}, // 0: TL
        {x:  0.20, y: -0.72, z: -0.60}, // 1: TR
        {x:  0.16, y: -0.72, z: -0.30}, // 2: BR
        {x: -0.50, y: -0.72, z: -0.30}  // 3: BL
      ]
    },
    mousepad: {
      plate: [
        {x:  0.26, y: -0.72, z: -0.55}, // 0
        {x:  0.50, y: -0.72, z: -0.55}, // 1
        {x:  0.46, y: -0.72, z: -0.32}, // 2
        {x:  0.22, y: -0.72, z: -0.32}  // 3
      ],
      mouse: [
        {x:  0.34, y: -0.72, z: -0.44}, // Center
        {x:  0.37, y: -0.72, z: -0.44}  // Size offset
      ]
    }
  };

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
    let distance = 2.3;
    let scale = 1 / (z2 + distance);
    
    return {
      x: x2 * scale * sizeFactor + centerX,
      y: -y1 * scale * sizeFactor + centerY + (sizeFactor * 0.12),
      z: z2,
      scale: scale
    };
  }

  // Get a 3D coordinate point on the curved screen mesh (s: horizontal 0-1, t: vertical 0-1)
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

  // Scrolling code terminal text lines
  const mockCode = [
    "const portfolio = new Developer('Mayank');",
    "await portfolio.connectSystem();",
    "portfolio.status = 'ACTIVE';",
    "portfolio.skills = ['Web', 'Android', 'ML'];",
    "console.log('INIT VOLCANIC SETUP...');",
    "for (let item of portfolio.skills) {",
    "  console.log('Mounting ' + item + '...');",
    "}",
    "// System online. Deploy target: Vercel.",
    "fetch('https://api.web3forms.com/submit')",
    "  .then(res => res.json())",
    "  .then(sys => sys.verified = true);",
    "// CPU Temp: 38C | RAM: 14.2GB / 32GB"
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
      rotY += (0.15 - rotY) * 0.005;
      rotX += (0.10 - rotX) * 0.005;
    }
    
    rotX = Math.max(-0.4, Math.min(0.5, rotX));
    fanAngle += 0.06;
    textScrollTimer += 1;
    if (textScrollTimer > 60) {
      textScrollTimer = 0;
      textScrollIndex = (textScrollIndex + 1) % mockCode.length;
    }
    
    const centerX = width / 2;
    const centerY = height / 2;
    const sizeFactor = Math.min(width, height) * 0.42;
    
    // Project all structures helper
    function projectGroup(pts) {
      return pts.map(p => project(p, rotX, rotY, centerX, centerY, sizeFactor));
    }
    
    // 1. Draw Mousepad
    const pPad = projectGroup(components.mousepad.plate);
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pPad[0].x, pPad[0].y);
    ctx.lineTo(pPad[1].x, pPad[1].y);
    ctx.lineTo(pPad[2].x, pPad[2].y);
    ctx.lineTo(pPad[3].x, pPad[3].y);
    ctx.closePath();
    ctx.stroke();

    // 2. Draw Keyboard Plate & Keys
    const pKb = projectGroup(components.keyboard.plate);
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(pKb[0].x, pKb[0].y);
    ctx.lineTo(pKb[1].x, pKb[1].y);
    ctx.lineTo(pKb[2].x, pKb[2].y);
    ctx.lineTo(pKb[3].x, pKb[3].y);
    ctx.closePath();
    ctx.stroke();

    // Draw keyboard grid
    let rows = 4, cols = 8;
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.12)';
    for (let i = 1; i < rows; i++) {
      let t = i / rows;
      let left = interpolate(components.keyboard.plate[0], components.keyboard.plate[3], t);
      let right = interpolate(components.keyboard.plate[1], components.keyboard.plate[2], t);
      let pL = project(left, rotX, rotY, centerX, centerY, sizeFactor);
      let pR = project(right, rotX, rotY, centerX, centerY, sizeFactor);
      ctx.beginPath();
      ctx.moveTo(pL.x, pL.y);
      ctx.lineTo(pR.x, pR.y);
      ctx.stroke();
    }
    for (let i = 1; i < cols; i++) {
      let t = i / cols;
      let top = interpolate(components.keyboard.plate[0], components.keyboard.plate[1], t);
      let bottom = interpolate(components.keyboard.plate[3], components.keyboard.plate[2], t);
      let pT = project(top, rotX, rotY, centerX, centerY, sizeFactor);
      let pB = project(bottom, rotX, rotY, centerX, centerY, sizeFactor);
      ctx.beginPath();
      ctx.moveTo(pT.x, pT.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
    }

    // 3. Draw Mouse
    const pMouseCenter = project(components.mousepad.mouse[0], rotX, rotY, centerX, centerY, sizeFactor);
    const pMouseSize = project(components.mousepad.mouse[1], rotX, rotY, centerX, centerY, sizeFactor);
    const mouseRadius = Math.abs(pMouseSize.x - pMouseCenter.x);
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(pMouseCenter.x, pMouseCenter.y, mouseRadius, mouseRadius * 1.5, Math.atan2(pMouseSize.y - pMouseCenter.y, pMouseSize.x - pMouseCenter.x), 0, Math.PI * 2);
    ctx.stroke();

    // 4. Draw Monitor Stand
    const pStand = projectGroup(components.monitor.stand);
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.6)';
    ctx.lineWidth = 1.5;
    // Base V prongs
    ctx.beginPath();
    ctx.moveTo(pStand[4].x, pStand[4].y);
    ctx.lineTo(pStand[6].x, pStand[6].y);
    ctx.lineTo(pStand[5].x, pStand[5].y);
    ctx.stroke();
    // Neck vertical pillars
    ctx.beginPath();
    ctx.moveTo(pStand[0].x, pStand[0].y);
    ctx.lineTo(pStand[2].x, pStand[2].y);
    ctx.lineTo(pStand[6].x, pStand[6].y);
    ctx.moveTo(pStand[1].x, pStand[1].y);
    ctx.lineTo(pStand[3].x, pStand[3].y);
    ctx.lineTo(pStand[6].x, pStand[6].y);
    ctx.stroke();

    // 5. Draw Ultrawide Monitor curved screen (bezel)
    const pMonFront = projectGroup(components.monitor.front);
    const pMonBack = projectGroup(components.monitor.back);
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.85)';
    
    // Front bezel loop
    ctx.beginPath();
    ctx.moveTo(pMonFront[0].x, pMonFront[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pMonFront[i].x, pMonFront[i].y);
    ctx.closePath();
    ctx.stroke();

    // Back cover loop
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.3)';
    ctx.beginPath();
    ctx.moveTo(pMonBack[0].x, pMonBack[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pMonBack[i].x, pMonBack[i].y);
    ctx.closePath();
    ctx.stroke();

    // Connect front-back depth lines
    ctx.beginPath();
    for (let i = 0; i < 8; i += 2) {
      ctx.moveTo(pMonFront[i].x, pMonFront[i].y);
      ctx.lineTo(pMonBack[i].x, pMonBack[i].y);
    }
    ctx.stroke();

    // 6. Curved Display Contents (scrolling code and neon overlay)
    const pDisplay = projectGroup(components.monitor.display);
    
    // Faint grid lines on screen following curvature
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.05)';
    ctx.lineWidth = 1;
    let gridRows = 8;
    for (let i = 1; i < gridRows; i++) {
      let t = i / gridRows;
      let left = project(getScreenPoint(0.0, t), rotX, rotY, centerX, centerY, sizeFactor);
      let midL = project(getScreenPoint(0.33, t), rotX, rotY, centerX, centerY, sizeFactor);
      let midR = project(getScreenPoint(0.66, t), rotX, rotY, centerX, centerY, sizeFactor);
      let right = project(getScreenPoint(1.0, t), rotX, rotY, centerX, centerY, sizeFactor);
      
      ctx.beginPath();
      ctx.moveTo(left.x, left.y);
      ctx.lineTo(midL.x, midL.y);
      ctx.lineTo(midR.x, midR.y);
      ctx.lineTo(right.x, right.y);
      ctx.stroke();
    }
    let gridCols = 8;
    for (let i = 1; i < gridCols; i++) {
      let s = i / gridCols;
      let top = project(getScreenPoint(s, 0.0), rotX, rotY, centerX, centerY, sizeFactor);
      let mid = project(getScreenPoint(s, 0.5), rotX, rotY, centerX, centerY, sizeFactor);
      let bottom = project(getScreenPoint(s, 1.0), rotX, rotY, centerX, centerY, sizeFactor);
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.quadraticCurveTo(mid.x, mid.y, bottom.x, bottom.y);
      ctx.stroke();
    }

    // Dynamic Scrolling Text drawing
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 6;
    
    for (let i = 0; i < 5; i++) {
      let lineIdx = (textScrollIndex + i) % mockCode.length;
      let lineText = mockCode[lineIdx];
      let t_pos = 0.18 + (i * 0.15); // vertical lines spacing
      
      // Calculate rotation and position in 3D
      let ptStart = getScreenPoint(0.08, t_pos);
      let ptEnd = getScreenPoint(0.92, t_pos);
      let pStart = project(ptStart, rotX, rotY, centerX, centerY, sizeFactor);
      let pEnd = project(ptEnd, rotX, rotY, centerX, centerY, sizeFactor);
      
      let slantAngle = Math.atan2(pEnd.y - pStart.y, pEnd.x - pStart.x);
      let fontSize = Math.max(7, Math.round(sizeFactor * 0.038 * pStart.scale));
      
      ctx.save();
      ctx.translate(pStart.x, pStart.y);
      ctx.rotate(slantAngle);
      
      ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
      
      // Gradient glow coloring
      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.fillText(lineText, 0, 0);
      
      ctx.restore();
    }
    ctx.shadowBlur = 0; // reset

    // Glowing CPU oscilloscope status graph on screen bottom-right
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
    ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i <= 20; i++) {
      let s = 0.58 + (i / 20) * 0.35;
      // Sine wave modulated over time
      let sine = Math.sin((Date.now() * 0.006) + i * 0.6) * Math.cos(Date.now() * 0.002);
      let val = 0.78 + (sine * 0.08); // center vertically at t = 0.78
      let pt = project(getScreenPoint(s, val), rotX, rotY, centerX, centerY, sizeFactor);
      if (i === 0) {
        ctx.moveTo(pt.x, pt.y);
      } else {
        ctx.lineTo(pt.x, pt.y);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 7. Draw PC Tower Cabinet
    const pCab = projectGroup(components.cabinet.box);
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.75)';
    ctx.lineWidth = 1.5;
    
    // Bottom Loop
    ctx.beginPath();
    ctx.moveTo(pCab[0].x, pCab[0].y);
    ctx.lineTo(pCab[1].x, pCab[1].y);
    ctx.lineTo(pCab[2].x, pCab[2].y);
    ctx.lineTo(pCab[3].x, pCab[3].y);
    ctx.closePath();
    ctx.stroke();

    // Top Loop
    ctx.beginPath();
    ctx.moveTo(pCab[4].x, pCab[4].y);
    ctx.lineTo(pCab[5].x, pCab[5].y);
    ctx.lineTo(pCab[6].x, pCab[6].y);
    ctx.lineTo(pCab[7].x, pCab[7].y);
    ctx.closePath();
    ctx.stroke();

    // Verticals
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.moveTo(pCab[i].x, pCab[i].y);
      ctx.lineTo(pCab[i+4].x, pCab[i+4].y);
    }
    ctx.stroke();

    // Internal components (GPU outline)
    const pGpu = projectGroup(components.cabinet.gpu);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)';
    ctx.lineWidth = 1;
    // GPU Bottom Loop
    ctx.beginPath();
    ctx.moveTo(pGpu[0].x, pGpu[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(pGpu[i].x, pGpu[i].y);
    ctx.closePath();
    ctx.stroke();
    // GPU Top Loop
    ctx.beginPath();
    ctx.moveTo(pGpu[4].x, pGpu[4].y);
    for (let i = 5; i < 8; i++) ctx.lineTo(pGpu[i].x, pGpu[i].y);
    ctx.closePath();
    ctx.stroke();
    // GPU connecting pillars
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      ctx.moveTo(pGpu[i].x, pGpu[i].y);
      ctx.lineTo(pGpu[i+4].x, pGpu[i+4].y);
    }
    ctx.stroke();

    // 8. Dynamic Rotating Cooling Fans inside Cabinet
    components.cabinet.fans.forEach((fCenter, fanIdx) => {
      const pCenter = project(fCenter, rotX, rotY, centerX, centerY, sizeFactor);
      
      // Calculate circle scaling in perspective
      const offsetPt = project({x: fCenter.x, y: fCenter.y + 0.10, z: fCenter.z}, rotX, rotY, centerX, centerY, sizeFactor);
      const fanRadius = Math.sqrt(Math.pow(offsetPt.x - pCenter.x, 2) + Math.pow(offsetPt.y - pCenter.y, 2));
      
      // Draw outer glowing ring of the fan
      ctx.strokeStyle = fanIdx === 0 ? 'rgba(34, 211, 238, 0.65)' : 'rgba(124, 58, 237, 0.65)';
      ctx.shadowColor = fanIdx === 0 ? 'rgba(34, 211, 238, 0.5)' : 'rgba(124, 58, 237, 0.5)';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(pCenter.x, pCenter.y, fanRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw 3 rotating fan blades
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2.2;
      for (let j = 0; j < 3; j++) {
        let angle = fanAngle + (j * (Math.PI * 2 / 3));
        // Project outer point of the fan blade
        let bladeEnd = {
          x: fCenter.x + Math.cos(angle) * 0.09,
          y: fCenter.y + Math.sin(angle) * 0.09,
          z: fCenter.z
        };
        let pEnd = project(bladeEnd, rotX, rotY, centerX, centerY, sizeFactor);
        ctx.beginPath();
        ctx.moveTo(pCenter.x, pCenter.y);
        ctx.lineTo(pEnd.x, pEnd.y);
        ctx.stroke();
      }
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
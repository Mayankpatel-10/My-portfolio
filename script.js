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

  // Define components in 3D space (perfectly centered around X=0)
  const components = {
    monitor: {
      // Curved screen bezel front (ends curve forward in Z)
      front: [
        {x: -0.75, y:  0.42, z: -0.08}, // 0: Top-left
        {x: -0.25, y:  0.42, z:  0.02}, // 1: Top-mid-left
        {x:  0.25, y:  0.42, z:  0.02}, // 2: Top-mid-right
        {x:  0.75, y:  0.42, z: -0.08}, // 3: Top-right
        {x:  0.75, y: -0.25, z: -0.08}, // 4: Bottom-right
        {x:  0.25, y: -0.25, z:  0.02}, // 5: Bottom-mid-right
        {x: -0.25, y: -0.25, z:  0.02}, // 6: Bottom-mid-left
        {x: -0.75, y: -0.25, z: -0.08}  // 7: Bottom-left
      ],
      // Back bezel cover
      back: [
        {x: -0.75, y:  0.42, z:  0.02}, // 8: Top-left back
        {x: -0.25, y:  0.42, z:  0.12}, // 9: Top-mid-left back
        {x:  0.25, y:  0.42, z:  0.12}, // 10: Top-mid-right back
        {x:  0.75, y:  0.42, z:  0.02}, // 11: Top-right back
        {x:  0.75, y: -0.25, z:  0.02}, // 12: Bottom-right back
        {x:  0.25, y: -0.25, z:  0.12}, // 13: Bottom-mid-right back
        {x: -0.25, y: -0.25, z:  0.12}, // 14: Bottom-mid-left back
        {x: -0.75, y: -0.25, z:  0.02}  // 15: Bottom-left back
      ],
      // Screen contents display mesh
      display: [
        {x: -0.71, y:  0.38, z: -0.07}, // 0: TL
        {x: -0.24, y:  0.38, z:  0.02}, // 1: TML
        {x:  0.24, y:  0.38, z:  0.02}, // 2: TMR
        {x:  0.71, y:  0.38, z: -0.07}, // 3: TR
        {x:  0.71, y: -0.21, z: -0.07}, // 4: BR
        {x:  0.24, y: -0.21, z:  0.02}, // 5: BMR
        {x: -0.24, y: -0.21, z:  0.02}, // 6: BML
        {x: -0.71, y: -0.21, z: -0.07}  // 7: BL
      ],
      stand: [
        // Neck
        {x: -0.06, y: -0.25, z:  0.07}, // 0: neck top left
        {x:  0.06, y: -0.25, z:  0.07}, // 1: neck top right
        {x: -0.05, y: -0.62, z:  0.15}, // 2: neck bottom left
        {x:  0.05, y: -0.62, z:  0.15}, // 3: neck bottom right
        // Trapezoidal Desk Base
        {x: -0.22, y: -0.65, z: -0.10}, // 4: base front left
        {x:  0.22, y: -0.65, z: -0.10}, // 5: base front right
        {x:  0.18, y: -0.65, z:  0.22}, // 6: base back right
        {x: -0.18, y: -0.65, z:  0.22}  // 7: base back left
      ]
    },
    keyboard: {
      plate: [
        {x: -0.52, y: -0.65, z: -0.55}, // 0: TL
        {x:  0.52, y: -0.65, z: -0.55}, // 1: TR
        {x:  0.48, y: -0.65, z: -0.25}, // 2: BR
        {x: -0.48, y: -0.65, z: -0.25}  // 3: BL
      ]
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
    let distance = 1.6;
    let scale = 1 / (z2 + distance);
    
    return {
      x: x2 * scale * sizeFactor + centerX,
      y: -y1 * scale * sizeFactor + centerY + (sizeFactor * 0.08),
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
    textScrollTimer += 1;
    if (textScrollTimer > 60) {
      textScrollTimer = 0;
      textScrollIndex = (textScrollIndex + 1) % mockCode.length;
    }
    
    const centerX = width / 2;
    const centerY = height / 2;
    const sizeFactor = Math.min(width, height) * 0.85;
    
    // Project all structures helper
    function projectGroup(pts) {
      return pts.map(p => project(p, rotX, rotY, centerX, centerY, sizeFactor));
    }
    
    // 1. Draw glowing ambient desk light ring (LED ring under stand)
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.22)';
    ctx.shadowColor = '#7C3AED';
    ctx.shadowBlur = 15;
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2; a += 0.2) {
      let pt = project({x: Math.cos(a) * 0.62, y: -0.65, z: 0.1 + Math.sin(a) * 0.52}, rotX, rotY, centerX, centerY, sizeFactor);
      if (a === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow for other renders

    // 2. Draw Keyboard
    const pKb = projectGroup(components.keyboard.plate);
    ctx.fillStyle = 'rgba(10, 10, 15, 0.65)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pKb[0].x, pKb[0].y);
    ctx.lineTo(pKb[1].x, pKb[1].y);
    ctx.lineTo(pKb[2].x, pKb[2].y);
    ctx.lineTo(pKb[3].x, pKb[3].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw keyboard key stripes
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
    let keyRows = 4;
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

    // 3. Draw Monitor Stand
    const pStand = projectGroup(components.monitor.stand);
    ctx.fillStyle = 'rgba(15, 15, 20, 0.85)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.6)';
    ctx.lineWidth = 1.5;
    
    // Base loop
    ctx.beginPath();
    ctx.moveTo(pStand[4].x, pStand[4].y);
    ctx.lineTo(pStand[5].x, pStand[5].y);
    ctx.lineTo(pStand[6].x, pStand[6].y);
    ctx.lineTo(pStand[7].x, pStand[7].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Neck loop
    ctx.beginPath();
    ctx.moveTo(pStand[0].x, pStand[0].y);
    ctx.lineTo(pStand[2].x, pStand[2].y);
    ctx.lineTo(pStand[3].x, pStand[3].y);
    ctx.lineTo(pStand[1].x, pStand[1].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // 4. Draw Monitor back cover (solid solid-feeling back panel)
    const pMonBack = projectGroup(components.monitor.back);
    ctx.fillStyle = 'rgba(20, 20, 25, 0.9)';
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.25)';
    ctx.beginPath();
    ctx.moveTo(pMonBack[0].x, pMonBack[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pMonBack[i].x, pMonBack[i].y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Fill bezel depth thickness
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

    // 5. Draw screen glass panel gradient fill
    const pDisplay = projectGroup(components.monitor.display);
    let grad = ctx.createLinearGradient(pDisplay[0].x, pDisplay[0].y, pDisplay[4].x, pDisplay[4].y);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.85)'); // dark sleek background
    grad.addColorStop(1, 'rgba(10, 10, 15, 0.95)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(pDisplay[0].x, pDisplay[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pDisplay[i].x, pDisplay[i].y);
    ctx.closePath();
    ctx.fill();

    // Draw front glowing bezel stroke
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.85)';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#7C3AED';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(pMonFront[0].x, pMonFront[0].y);
    for (let i = 1; i < 8; i++) ctx.lineTo(pMonFront[i].x, pMonFront[i].y);
    ctx.closePath();
    ctx.stroke();
    ctx.shadowBlur = 0; // reset

    // 6. Draw curved display mesh grid
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

    // 7. Dynamic Scrolling Code on Monitor screen
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
      ctx.fillStyle = '#22D3EE';
      ctx.shadowColor = '#22D3EE';
      ctx.fillText(lineText, 0, 0);
      
      ctx.restore();
    }
    ctx.shadowBlur = 0; // reset

    // Glowing CPU wave status graph (glowing red)
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.85)';
    ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    for (let i = 0; i <= 20; i++) {
      let s = 0.58 + (i / 20) * 0.35;
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

    // 8. Draw 3D Rising code/particle nodes (Hex / Binary bits floating up)
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
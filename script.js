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
  
  const vertices = [
    // --- Monitor Cabinet ---
    {x: -0.85, y:  0.55, z: -0.15}, // 0
    {x:  0.85, y:  0.55, z: -0.15}, // 1
    {x:  0.85, y: -0.45, z: -0.15}, // 2
    {x: -0.85, y: -0.45, z: -0.15}, // 3
    {x: -0.65, y:  0.45, z:  0.25}, // 4
    {x:  0.65, y:  0.45, z:  0.25}, // 5
    {x:  0.65, y: -0.35, z:  0.25}, // 6
    {x: -0.65, y: -0.35, z:  0.25}, // 7
    
    // --- Screen Face ---
    {x: -0.78, y:  0.48, z: -0.16}, // 8
    {x:  0.78, y:  0.48, z: -0.16}, // 9
    {x:  0.78, y: -0.38, z: -0.16}, // 10
    {x: -0.78, y: -0.38, z: -0.16}, // 11
    
    // --- Neck / Stand ---
    {x: -0.12, y: -0.45, z:  0.05}, // 12
    {x:  0.12, y: -0.45, z:  0.05}, // 13
    {x: -0.1,  y: -0.75, z:  0.15}, // 14
    {x:  0.1,  y: -0.75, z:  0.15}, // 15
    
    // --- Stand Foot Base ---
    {x: -0.35, y: -0.77, z: -0.35}, // 16
    {x:  0.35, y: -0.77, z: -0.35}, // 17
    {x:  0.3,  y: -0.77, z:  0.25}, // 18
    {x: -0.3,  y: -0.77, z:  0.25}, // 19
    
    // --- Keyboard Plate ---
    {x: -0.75, y: -0.78, z: -0.7},  // 20
    {x:  0.75, y: -0.78, z: -0.7},  // 21
    {x:  0.68, y: -0.78, z: -0.22}, // 22
    {x: -0.68, y: -0.78, z: -0.22}  // 23
  ];
  
  const lines = [
    // Outer Cabinet
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
    
    // Screen Bezel
    [8, 9], [9, 10], [10, 11], [11, 8],
    
    // Stand
    [12, 14], [13, 15], [14, 15],
    
    // Foot base
    [16, 17], [17, 18], [18, 19], [19, 16],
    
    // Keyboard plate
    [20, 21], [21, 22], [22, 23], [23, 20]
  ];
  
  let rotX = 0.15; // starting tilt
  let rotY = 0.5;  // starting angle
  let velocityX = 0;
  let velocityY = 0;
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  
  // Mouse drag listeners
  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    canvas.style.cursor = 'grabbing';
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousMousePosition.x;
    const deltaY = e.clientY - previousMousePosition.y;
    
    velocityX = deltaX * 0.006;
    velocityY = deltaY * 0.006;
    
    rotY += velocityX;
    rotX += velocityY;
    
    // Clamp pitch (rotX)
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    
    previousMousePosition = { x: e.clientX, y: e.clientY };
  });
  
  window.addEventListener('mouseup', () => {
    isDragging = false;
    canvas.style.cursor = 'grab';
  });
  
  // Touch drag listeners for mobile
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
    
    velocityX = deltaX * 0.006;
    velocityY = deltaY * 0.006;
    
    rotY += velocityX;
    rotX += velocityY;
    
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    
    previousMousePosition = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  
  window.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  function interpolate(p1, p2, t) {
    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t
    };
  }
  
  function animate() {
    const time = Date.now();
    ctx.clearRect(0, 0, width, height);
    
    if (!isDragging) {
      // Apply momentum decay
      rotY += velocityX;
      rotX += velocityY;
      
      velocityX *= 0.95;
      velocityY *= 0.95;
    }
    
    // Double check constraints
    rotX = Math.max(-0.6, Math.min(0.6, rotX));
    
    let angleY = rotY;
    let angleX = rotX;
    
    let centerX = width / 2;
    let centerY = height / 2;
    let sizeFactor = Math.min(width, height) * 0.45;
    
    // Project vertices
    let projected = [];
    vertices.forEach(v => {
      // Rotate X
      let cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      let y1 = v.y * cosX - v.z * sinX;
      let z1 = v.y * sinX + v.z * cosX;
      
      // Rotate Y
      let cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      let x2 = v.x * cosY - z1 * sinY;
      let z2 = v.x * sinY + z1 * cosY;
      
      // Perspective scale
      let distance = 2.4;
      let scale = 1 / (z2 + distance);
      
      projected.push({
        x: x2 * scale * sizeFactor + centerX,
        y: -y1 * scale * sizeFactor + centerY + (sizeFactor * 0.1),
        z: z2
      });
    });
    
    // Draw keyboard grid
    const p20 = projected[20], p21 = projected[21], p22 = projected[22], p23 = projected[23];
    ctx.strokeStyle = 'rgba(124, 58, 237, 0.18)';
    ctx.lineWidth = 1;
    let keyRows = 5;
    for (let i = 1; i < keyRows; i++) {
      let t = i / keyRows;
      let kLeft = interpolate(p20, p23, t);
      let kRight = interpolate(p21, p22, t);
      ctx.beginPath();
      ctx.moveTo(kLeft.x, kLeft.y);
      ctx.lineTo(kRight.x, kRight.y);
      ctx.stroke();
    }
    let keyCols = 8;
    for (let i = 1; i < keyCols; i++) {
      let t = i / keyCols;
      let kTop = interpolate(p23, p22, t);
      let kBottom = interpolate(p20, p21, t);
      ctx.beginPath();
      ctx.moveTo(kTop.x, kTop.y);
      ctx.lineTo(kBottom.x, kBottom.y);
      ctx.stroke();
    }
    
    // Draw Screen Contents
    const p8 = projected[8], p9 = projected[9], p10 = projected[10], p11 = projected[11];
    
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
    let gridDivs = 8;
    for (let i = 1; i < gridDivs; i++) {
      let t = i / gridDivs;
      let hLeft = interpolate(p8, p11, t);
      let hRight = interpolate(p9, p10, t);
      ctx.beginPath();
      ctx.moveTo(hLeft.x, hLeft.y);
      ctx.lineTo(hRight.x, hRight.y);
      ctx.stroke();
      
      let vTop = interpolate(p8, p9, t);
      let vBottom = interpolate(p11, p10, t);
      ctx.beginPath();
      ctx.moveTo(vTop.x, vTop.y);
      ctx.lineTo(vBottom.x, vBottom.y);
      ctx.stroke();
    }
    
    let scrCenter = {
      x: (p8.x + p9.x + p10.x + p11.x) / 4,
      y: (p8.y + p9.y + p10.y + p11.y) / 4
    };
    
    let textAngle = Math.atan2(p9.y - p8.y, p9.x - p8.x);
    
    ctx.save();
    ctx.translate(scrCenter.x, scrCenter.y);
    ctx.rotate(textAngle);
    
    ctx.fillStyle = '#22D3EE';
    ctx.shadowColor = '#22D3EE';
    ctx.shadowBlur = 10;
    
    let fontSize = Math.max(8, Math.round(sizeFactor * 0.04));
    ctx.font = `bold ${fontSize}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    
    let items = [
      "MAYANK.DEV",
      "SYS: OK",
      "CPU: 32%",
      "AI: ONLINE"
    ];
    let scrollIdx = Math.floor(time / 1000) % items.length;
    
    ctx.fillText(items[scrollIdx], 0, -fontSize * 0.2);
    ctx.font = `${fontSize * 0.8}px 'JetBrains Mono', monospace`;
    ctx.fillStyle = '#7C3AED';
    ctx.shadowColor = '#7C3AED';
    ctx.fillText("PORTAL ENGINE", 0, fontSize * 0.8);
    ctx.restore();
    
    // Draw wireframe lines
    lines.forEach(line => {
      let pA = projected[line[0]];
      let pB = projected[line[1]];
      
      let gradient = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
      gradient.addColorStop(0, 'rgba(124, 58, 237, 0.85)');
      gradient.addColorStop(1, 'rgba(34, 211, 238, 0.85)');
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.3)';
      ctx.shadowBlur = 4;
      
      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);
      ctx.stroke();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
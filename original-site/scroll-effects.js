// Scroll Effects JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Scroll Indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    
    // Chrome-like smooth scroll with momentum
    let scrollVelocity = 0;
    let lastScrollY = 0;
    let scrollMomentum = 0;
    
    // Update scroll indicators with smooth animation
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = Math.min((scrollTop / scrollHeight) * 100, 100);
        
        // Calculate scroll velocity for momentum effects
        scrollVelocity = scrollTop - lastScrollY;
        lastScrollY = scrollTop;
        scrollMomentum = scrollVelocity * 0.3;
        
        if (scrollIndicator) {
            scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
            scrollIndicator.style.transition = 'transform 0.1s ease-out';
        }
        
        if (scrollProgressBar) {
            scrollProgressBar.style.transform = `scaleY(${scrollPercent / 100})`;
            scrollProgressBar.style.transition = 'transform 0.1s ease-out';
        }
    }
    
    // Chrome-like scroll reveal with staggered animations
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        const revealsLeft = document.querySelectorAll('.reveal-left');
        const revealsRight = document.querySelectorAll('.reveal-right');
        const revealsScale = document.querySelectorAll('.reveal-scale');
        const staggerItems = document.querySelectorAll('.stagger-item');
        
        function checkReveal(elements, className) {
            elements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    // Add staggered delay for Chrome-like effect
                    const delay = index * 100;
                    element.style.transitionDelay = `${delay}ms`;
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }
        
        checkReveal(reveals, 'reveal');
        checkReveal(revealsLeft, 'reveal-left');
        checkReveal(revealsRight, 'reveal-right');
        checkReveal(revealsScale, 'reveal-scale');
        checkReveal(staggerItems, 'stagger-item');
    }
    
    // Enhanced parallax with smooth easing
    function parallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            const ease = 0.08; // Chrome-like easing
            const currentY = parseFloat(element.style.transform.replace('translateY(', '').replace('px)', '') || 0);
            const targetY = currentY + (yPos - currentY) * ease;
            
            element.style.transform = `translateY(${targetY}px)`;
        });
    }
    
    // Chrome-like floating effect with sine wave
    function floatingEffect() {
        const floatingElements = document.querySelectorAll('.floating-element');
        const scrolled = window.pageYOffset;
        const time = Date.now() * 0.001;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const amplitude = 15 + (index * 5);
            const frequency = 0.002 + (index * 0.0005);
            const yPos = Math.sin((scrolled * frequency) + (time * speed)) * amplitude;
            const rotation = Math.cos((scrolled * frequency) + (time * speed)) * 2;
            
            element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            element.style.transition = 'transform 0.3s ease-out';
        });
    }
    
    // Chrome-like scroll-based blur and opacity effects
    function scrollBasedEffects() {
        const sections = document.querySelectorAll('section');
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const distanceFromCenter = Math.abs(windowHeight / 2 - sectionCenter);
            const maxDistance = windowHeight / 2;
            
            // Blur effect based on distance from viewport center
            const blurAmount = Math.max(0, (distanceFromCenter / maxDistance) * 2);
            const opacity = Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.3);
            
            if (section.classList.contains('hero')) {
                // Apply subtle blur to hero when scrolling
                section.style.filter = `blur(${Math.min(blurAmount * 0.5, 1)}px)`;
                section.style.opacity = opacity;
            }
        });
    }
    
    // Chrome-like smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const startPosition = window.pageYOffset;
                const targetPosition = target.offsetTop - 100;
                const distance = targetPosition - startPosition;
                const duration = 800; // Chrome-like duration
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    
                    // Chrome easing function (ease-in-out cubic)
                    const easeProgress = progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                    
                    window.scrollTo(0, startPosition + distance * easeProgress);
                    
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
    
    // Enhanced scroll event listener with throttling for performance
    let ticking = false;
    
    function updateScrollEffects() {
        updateScrollProgress();
        revealElements();
        parallaxEffect();
        floatingEffect();
        scrollBasedEffects();
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollEffects();
                ticking = true;
            });
        }
    });
    // Initial calls
    updateScrollProgress();
    revealElements();
    
    // Add reveal classes to elements
    function addRevealClasses() {
        // Section titles
        document.querySelectorAll('.section-title').forEach(el => {
            el.classList.add('reveal');
        });
        
        // Section labels
        document.querySelectorAll('.section-label').forEach(el => {
            el.classList.add('reveal');
        });
        
        // About card
        const aboutCard = document.querySelector('.about-card-inner');
        if (aboutCard) aboutCard.classList.add('reveal-left');
        
        // Stat mini cards
        document.querySelectorAll('.stat-mini-card').forEach((el, index) => {
            el.classList.add('stagger-item');
        });
        
        // Skill cards
        document.querySelectorAll('.skill-3d-card').forEach((el, index) => {
            el.classList.add('stagger-item');
        });
        
        // Project cards
        document.querySelectorAll('.project-3d-card').forEach((el, index) => {
            el.classList.add('stagger-item');
        });
        
        // Contact cards
        document.querySelectorAll('.contact-3d-inner').forEach((el, index) => {
            el.classList.add('stagger-item');
        });
        
        // Hero elements
        document.querySelector('.hero-tag')?.classList.add('reveal');
        document.querySelector('.hero-name')?.classList.add('reveal-scale');
        document.querySelector('.hero-desc')?.classList.add('reveal');
        document.querySelector('.hero-cta')?.classList.add('reveal');
        
        // Stats container
        document.querySelector('.stats-3d-container')?.classList.add('reveal');
        
        // Hero visual
        document.querySelector('.hero-visual')?.classList.add('reveal-right');
    }
    
    addRevealClasses();
    
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        document.querySelectorAll('.mouse-parallax').forEach(element => {
            const speed = element.dataset.speed || 10;
            const x = mouseX * speed;
            const y = mouseY * speed;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Hide/show scroll progress on mobile
    function handleMobileScrollProgress() {
        const scrollProgress = document.querySelector('.scroll-progress');
        if (window.innerWidth < 768) {
            scrollProgress?.style.setProperty('display', 'none');
        } else {
            scrollProgress?.style.setProperty('display', 'block');
        }
    }
    
    window.addEventListener('resize', handleMobileScrollProgress);
    handleMobileScrollProgress();
});
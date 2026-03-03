// Fast & Dynamic Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Scroll progress indicators
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    
    // Fast Intersection Observer with lower threshold
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };
    
    // Fast scroll reveal observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const rect = element.getBoundingClientRect();
            const speed = element.dataset.speed || 0.3;
            const direction = element.dataset.direction || 'up';
            
            if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
                // Fast reveal with immediate effect
                element.classList.add('revealed');
                
                // Apply transform based on direction
                if (direction === 'up') {
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                } else if (direction === 'left') {
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = '1';
                } else if (direction === 'right') {
                    element.style.transform = 'translateX(0)';
                    element.style.opacity = '1';
                } else if (direction === 'scale') {
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '1';
                }
            } else if (!entry.isIntersecting) {
                // Reset when out of view
                element.classList.remove('revealed');
                if (direction === 'up') {
                    element.style.transform = 'translateY(30px)';
                    element.style.opacity = '0';
                } else if (direction === 'left') {
                    element.style.transform = 'translateX(-30px)';
                    element.style.opacity = '0';
                } else if (direction === 'right') {
                    element.style.transform = 'translateX(30px)';
                    element.style.opacity = '0';
                } else if (direction === 'scale') {
                    element.style.transform = 'scale(0.9)';
                    element.style.opacity = '0';
                }
            }
        });
    }, observerOptions);
    
    // Fast staggered animation observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            const element = entry.target;
            if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
                // Very fast stagger - 50ms delay
                setTimeout(() => {
                    element.classList.add('stagger-revealed');
                }, index * 50);
            } else {
                element.classList.remove('stagger-revealed');
            }
        });
    }, { threshold: 0.05 });
    
    // Update scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        if (scrollIndicator) {
            scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
        }
        
        if (scrollProgressBar) {
            scrollProgressBar.style.transform = `scaleY(${scrollPercent / 100})`;
        }
        
        // Update scroll-based CSS variables
        document.documentElement.style.setProperty('--scroll-percent', scrollPercent);
        document.documentElement.style.setProperty('--scroll-y', scrollTop);
    }
    
    // Fast parallax effect
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.2;
            const yPos = -(scrolled * speed);
            
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }
    
    // Fast floating elements
    function updateFloatingElements() {
        const scrolled = window.pageYOffset;
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.002 + (index * 0.0003);
            const amplitude = 15 + (index * 3);
            const yPos = Math.sin(scrolled * speed) * amplitude;
            
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Fast mouse-based parallax
    function updateMouseParallax(e) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        document.querySelectorAll('.mouse-parallax').forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 8;
            const x = mouseX * speed;
            const y = mouseY * speed;
            
            element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    }
    
    // Fast smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fast scroll event listeners with better throttling
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    function updateScrollEffects() {
        updateScrollProgress();
        updateParallax();
        updateFloatingElements();
        ticking = false;
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    document.addEventListener('mousemove', updateMouseParallax, { passive: true });
    
    // Initialize observers
    function initializeObservers() {
        // Add reveal classes
        document.querySelectorAll('[data-reveal]').forEach(element => {
            revealObserver.observe(element);
        });
        
        // Add staggered classes
        document.querySelectorAll('[data-stagger]').forEach(element => {
            staggerObserver.observe(element);
        });
    }
    
    // Auto-assign classes to elements
    function assignScrollClasses() {
        // Hero elements
        const heroTag = document.querySelector('.hero-tag');
        if (heroTag) {
            heroTag.setAttribute('data-reveal', '');
            heroTag.setAttribute('data-direction', 'up');
        }
        
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            heroName.setAttribute('data-reveal', '');
            heroName.setAttribute('data-direction', 'scale');
        }
        
        const heroDesc = document.querySelector('.hero-desc');
        if (heroDesc) {
            heroDesc.setAttribute('data-reveal', '');
            heroDesc.setAttribute('data-direction', 'up');
        }
        
        const heroCTA = document.querySelector('.hero-cta');
        if (heroCTA) {
            heroCTA.setAttribute('data-reveal', '');
            heroCTA.setAttribute('data-direction', 'up');
        }
        
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.setAttribute('data-reveal', '');
            heroVisual.setAttribute('data-direction', 'right');
        }
        
        // Section titles and labels
        document.querySelectorAll('.section-title').forEach(el => {
            el.setAttribute('data-reveal', '');
            el.setAttribute('data-direction', 'up');
        });
        
        document.querySelectorAll('.section-label').forEach(el => {
            el.setAttribute('data-reveal', '');
            el.setAttribute('data-direction', 'up');
        });
        
        // About section
        const aboutCard = document.querySelector('.about-card-inner');
        if (aboutCard) {
            aboutCard.setAttribute('data-reveal', '');
            aboutCard.setAttribute('data-direction', 'left');
        }
        
        // Stats
        document.querySelectorAll('.stat-box-3d').forEach((el, index) => {
            el.setAttribute('data-stagger', '');
            el.style.transitionDelay = `${index * 0.05}s`;
        });
        
        document.querySelectorAll('.stat-mini-card').forEach((el, index) => {
            el.setAttribute('data-stagger', '');
            el.style.transitionDelay = `${index * 0.05}s`;
        });
        
        // Skills
        document.querySelectorAll('.skill-3d-card').forEach((el, index) => {
            el.setAttribute('data-stagger', '');
            el.style.transitionDelay = `${index * 0.05}s`;
        });
        
        // Projects
        document.querySelectorAll('.project-3d-card').forEach((el, index) => {
            el.setAttribute('data-stagger', '');
            el.style.transitionDelay = `${index * 0.05}s`;
        });
        
        // Contact
        document.querySelectorAll('.contact-3d-inner').forEach((el, index) => {
            el.setAttribute('data-stagger', '');
            el.style.transitionDelay = `${index * 0.05}s`;
        });
        
        // Add parallax to hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.setAttribute('data-parallax', '');
            hero.setAttribute('data-speed', '0.2');
        }
        
        // Add floating to skill floats
        document.querySelectorAll('.skill-float').forEach(el => {
            el.classList.add('floating-element');
        });
        
        // Add mouse parallax to orbit container
        const orbitContainer = document.querySelector('.orbit-container');
        if (orbitContainer) {
            orbitContainer.classList.add('mouse-parallax');
            orbitContainer.setAttribute('data-speed', '5');
        }
    }
    
    // Initialize everything
    assignScrollClasses();
    initializeObservers();
    updateScrollProgress();
    
    // Add fast CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        [data-reveal] {
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        [data-reveal][data-direction="up"] {
            transform: translateY(30px);
        }
        
        [data-reveal][data-direction="left"] {
            transform: translateX(-30px);
        }
        
        [data-reveal][data-direction="right"] {
            transform: translateX(30px);
        }
        
        [data-reveal][data-direction="scale"] {
            transform: scale(0.9);
        }
        
        [data-stagger] {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        [data-stagger].stagger-revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .floating-element {
            transition: transform 0.2s ease-out;
        }
        
        .mouse-parallax {
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
});

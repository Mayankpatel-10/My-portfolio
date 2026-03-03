// Scroll Effects JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Scroll Indicator
    const scrollIndicator = document.getElementById('scrollIndicator');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    
    // Update scroll indicators
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
    }
    
    // Scroll reveal animations
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        const revealsLeft = document.querySelectorAll('.reveal-left');
        const revealsRight = document.querySelectorAll('.reveal-right');
        const revealsScale = document.querySelectorAll('.reveal-scale');
        const staggerItems = document.querySelectorAll('.stagger-item');
        
        function checkReveal(elements, className) {
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
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
    
    // Parallax effect
    function parallaxEffect() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Floating animation on scroll
    function floatingEffect() {
        const floatingElements = document.querySelectorAll('.floating-element');
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = Math.sin(scrolled * 0.01 * speed) * 20;
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll event listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        revealElements();
        parallaxEffect();
        floatingEffect();
    });
    
    // Initial call
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

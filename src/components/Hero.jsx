import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { animate } from 'animejs';
import Lanyard from './Lanyard';

const Hero = () => {
  const [typedText, setTypedText] = useState('Fullstack Engineer');
  const nameRef = useRef(null);

  // Stats block data
  const stats = [
    { number: '15+', label: 'PROJECTS', icon: 'fa-code' },
    { number: '4', label: 'HACKATHONS', icon: 'fa-trophy' },
    { number: '12+', label: 'TECH', icon: 'fa-layer-group' },
    { number: '25+', label: 'CONTRIB', icon: 'fa-star' },
  ];

  // Anime.js Glitch Effect
  useEffect(() => {
    const nameEl = nameRef.current;
    if (!nameEl) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.75) {
        animate(nameEl, {
          skewX: () => Math.random() * 16 - 8,
          translateX: () => Math.random() * 8 - 4,
          translateY: () => Math.random() * 4 - 2,
          duration: 100,
          easing: 'easeInOutQuad',
          onComplete: () => {
            animate(nameEl, {
              skewX: 0,
              translateX: 0,
              translateY: 0,
              duration: 50,
              easing: 'easeOutQuad'
            });
          }
        });
      }
    }, 1800);

    return () => clearInterval(glitchInterval);
  }, []);

  // Anime.js Typing Effect
  useEffect(() => {
    const words = ['Fullstack Engineer', 'Android Developer', 'ML Enthusiast', 'UI/UX Designer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const typeEffect = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingTimeout = setTimeout(typeEffect, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingTimeout = setTimeout(typeEffect, 500);
      } else {
        typingTimeout = setTimeout(typeEffect, isDeleting ? 40 : 80);
      }
    };

    typingTimeout = setTimeout(typeEffect, 1000);

    return () => clearTimeout(typingTimeout);
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      const navHeight = window.innerWidth <= 900 ? 80 : 100;
      window.scrollTo({
        top: projectsEl.offsetTop - navHeight,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const navHeight = window.innerWidth <= 900 ? 80 : 100;
      window.scrollTo({
        top: contactEl.offsetTop - navHeight,
        behavior: 'smooth',
      });
    }
  };

  // Framer Motion reveal options
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 14 }
    }
  };

  return (
    <section className="hero" id="home">
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-tag" variants={itemVariants}>
          {typedText}
        </motion.p>

        <motion.h1 
          className="hero-name glitch" 
          ref={nameRef}
          variants={itemVariants}
        >
          <span className="line1">Mayank</span>
          <span className="line2">Patel</span>
        </motion.h1>

        <motion.p className="hero-desc" variants={itemVariants}>
          I design and build <strong>scalable web systems</strong>, develop <strong>AI-powered machine learning solutions</strong>, and craft <strong>high-performance Android applications</strong>.
        </motion.p>

        <motion.div className="hero-cta" variants={itemVariants}>
          <a href="#projects" className="btn-primary" onClick={handleScrollToProjects}>
            <span>Explore My Work</span>
          </a>
          <a href="#contact" className="btn-outline" onClick={handleScrollToContact}>
            Let's Connect
          </a>
        </motion.div>

        {/* 3D stats list container */}
        <motion.div className="stats-3d-container" variants={itemVariants}>
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              className="stat-box-3d"
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
              <div className="stat-box-inner">
                <div className="stat-icon">
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
                <div className="stat-shine"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero Visual Three.js render frame */}
      <div className="hero-visual">
        <Lanyard position={[0, 0, 13.5]} gravity={[0, -35, 0]} fov={14.5} lanyardWidth={1.08} />
      </div>
    </section>
  );
};

export default Hero;

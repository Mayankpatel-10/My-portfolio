import React, { useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Internship from './components/Internship';
import LeetCodeStats from './components/LeetCodeStats';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Sync page scroll progression indicators and document properties
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

      const scrollIndicator = document.getElementById('scrollIndicator');
      const scrollProgressBar = document.getElementById('scrollProgressBar');

      if (scrollIndicator) {
        scrollIndicator.style.transform = `scaleX(${scrolled / 100})`;
      }
      if (scrollProgressBar) {
        scrollProgressBar.style.transform = `scaleY(${scrolled / 100})`;
      }

      document.documentElement.style.setProperty('--scroll-percent', scrolled);
      document.documentElement.style.setProperty('--scroll-y', winScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Dynamic 2D Canvas background particle connection mesh */}
      <ParticleBackground />

      {/* Futuristic screen scanline static overlays */}
      <div className="noise"></div>

      {/* Screen edge progress trackers */}
      <div className="scroll-indicator" id="scrollIndicator"></div>
      <div className="scroll-progress">
        <div className="scroll-progress-bar" id="scrollProgressBar"></div>
      </div>

      {/* Main Navigation */}
      <Navbar />

      {/* Portfolio sections */}
      <Hero />
      <About />
      <Skills />
      <Internship />
      <LeetCodeStats />
      <Projects />
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;

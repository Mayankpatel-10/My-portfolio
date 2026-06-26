import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const miniCards = [
    { num: '50+', label: 'Repos', icon: 'fa-rocket' },
    { num: '2000+', label: 'Hours', icon: 'fa-clock' },
    { num: '15+', label: 'Countries', icon: 'fa-globe' },
    { num: '8', label: 'Certs', icon: 'fa-award' },
  ];

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90 } },
  };

  return (
    <section id="about">
      <div className="container">
        <motion.p 
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.p>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Engineer • Builder • Innovator
        </motion.h2>

        <div className="about-3d-grid">
          {/* Main profile description card */}
          <motion.div 
            className="about-3d-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 60 }}
          >
            <div className="about-card-inner">
              <i className="fas fa-quote-right quote-icon"></i>
              <p className="about-text">
                I'm a <strong>Fullstack & Android Developer</strong> exploring the power of{' '}
                <strong>Machine Learning & AI systems</strong>. I create scalable web platforms and intelligent applications.
              </p>
              <p className="about-text">
                From database architecture to training ML models — I build complete, end-to-end systems that solve real problems.
              </p>
              <p className="about-text highlight">
                My goal: build technology that's efficient, scalable, and future-ready.
              </p>
            </div>
          </motion.div>

          {/* Mini-stats side grid */}
          <motion.div 
            className="about-3d-stats"
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {miniCards.map((card, i) => (
              <motion.div 
                key={i} 
                className="stat-mini-card"
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <i className={`fas ${card.icon}`}></i>
                <div>
                  <span className="stat-mini-num">{card.num}</span>
                  <span className="stat-mini-label">{card.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

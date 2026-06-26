import React from 'react';
import { motion } from 'framer-motion';

const Internship = () => {
  const highlights = [
    'Built responsive frontend with React & Tailwind CSS',
    'Implemented interactive features for students and teachers',
    'Designed user-friendly interface with modern UI/UX',
    'Optimized performance and cross-browser compatibility',
  ];

  return (
    <section id="internship">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Experience
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          INTERNSHIP
        </motion.h2>

        <motion.div
          className="internship-3d-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 50 }}
        >
          <div className="internship-card-inner">
            <div className="internship-header">
              <div className="company-logo">
                <i className="fas fa-building"></i>
              </div>
              <div className="company-info">
                <h3>Kogniti Minds Private Limited</h3>
                <p className="internship-role">Web Developer Intern</p>
                <p className="internship-duration">2024</p>
              </div>
            </div>

            <div className="internship-content">
              <div className="internship-project">
                <h4>
                  <i className="fas fa-school"></i> School Website Development
                </h4>
                <p>
                  Developed a comprehensive school management website with modern features and responsive design.
                </p>

                <div className="project-highlights">
                  {highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="tech-used">
                  <span className="tech-badge">
                    <i className="fab fa-react"></i> React
                  </span>
                  <span className="tech-badge">
                    <i className="fas fa-wind"></i> Tailwind CSS
                  </span>
                  <span className="tech-badge">
                    <i className="fab fa-js"></i> JavaScript
                  </span>
                  <span className="tech-badge">
                    <i className="fas fa-code"></i> HTML5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Internship;

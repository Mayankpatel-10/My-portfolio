import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'School Website',
      desc: 'Modern responsive school website built with React & Tailwind.',
      frontIcons: ['fab fa-react', 'fas fa-bolt', 'fas fa-wind'],
      year: '2024',
      github: 'https://github.com/Mayankpatel-10/School-website',
      demo: 'https://school-website-six-psi.vercel.app/',
      icon: 'fa-school'
    },
    {
      title: 'Dynamic Load Balancer (ML)',
      desc: 'ML-based cloud load balancing system deployed on AWS.',
      frontIcons: ['fab fa-python', 'fas fa-brain', 'fab fa-aws'],
      year: '2024',
      github: 'https://github.com/Mayankpatel-10/Dynamic-load-balancing-in-cloud-using-machine-learning',
      icon: 'fa-cloud'
    },
    {
      title: 'Student Performance Prediction',
      desc: 'Machine learning model to predict academic performance.',
      frontIcons: ['fab fa-python', 'fas fa-brain', 'fab fa-js'],
      year: '2024',
      github: 'https://github.com/Mayankpatel-10/Predicting-Student-Performance',
      icon: 'fa-chart-line'
    },
    {
      title: 'Smart Traffic Management',
      desc: 'AI-based traffic control system using OpenCV & TensorFlow.',
      frontIcons: ['fab fa-python', 'fas fa-eye', 'fas fa-robot'],
      year: '2024',
      github: 'https://github.com/0fficialAnkit/SmartTrafficManagement',
      icon: 'fa-traffic-light'
    },
    {
      title: 'Mind Care',
      desc: 'Mental wellness web app built using React & Tailwind.',
      frontIcons: ['fab fa-react', 'fas fa-wind'],
      year: '2024',
      github: 'https://github.com/Mayankpatel-10/Mind-Care-React',
      demo: 'https://mind-care-react.vercel.app/',
      icon: 'fa-heart'
    },
    {
      title: 'GYM Website',
      desc: 'Modern fitness website with interactive UI built using HTML, CSS & JS.',
      frontIcons: ['fab fa-html5', 'fab fa-css3-alt', 'fab fa-js'],
      year: '2024',
      github: 'https://github.com/Mayankpatel-10/Gym-website',
      demo: 'https://mad-about-fitness.vercel.app/',
      icon: 'fa-dumbbell'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 13 },
    },
  };

  return (
    <section id="projects">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Work
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          FEATURED PROJECTS
        </motion.h2>

        <motion.div
          className="projects-3d-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              className="project-3d-card"
              variants={cardVariants}
              whileHover={{ y: -6 }}
            >
              <div className="project-3d-inner">
                {/* Front Surface */}
                <div className="project-3d-front">
                  <div className="project-icon">
                    <i className={`fas ${proj.icon}`}></i>
                  </div>
                  <h3>{proj.title}</h3>
                  <p>{proj.desc}</p>
                  <div className="project-tech-icons">
                    {proj.frontIcons.map((ic, iIdx) => (
                      <i key={iIdx} className={ic}></i>
                    ))}
                  </div>
                </div>

                {/* Back Surface */}
                <div className="project-3d-back">
                  <span className="project-year">{proj.year}</span>
                  <div className="project-links">
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" title="View Source Code">
                        <i className="fab fa-github"></i>
                      </a>
                    )}
                    {proj.demo && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" title="View Live Demo">
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

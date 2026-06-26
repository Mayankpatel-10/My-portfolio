import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skillCategories = [
    {
      title: 'FRONTEND',
      icon: 'fa-code',
      skills: [
        { name: 'React', icon: 'fab fa-react' },
        { name: 'JavaScript', icon: 'fab fa-js' },
        { name: 'Angular', icon: 'fab fa-angular' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap' },
      ],
    },
    {
      title: 'BACKEND',
      icon: 'fa-server',
      skills: [
        { name: 'Node.js', icon: 'fab fa-node' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Java', icon: 'fab fa-java' },
        { name: 'SQL', icon: 'fas fa-database' },
        { name: 'FastAPI', icon: 'fas fa-bolt' },
      ],
    },
    {
      title: 'ANDROID',
      icon: 'fab fa-android',
      skills: [
        { name: 'Kotlin', icon: 'fab fa-android' },
        { name: 'Java', icon: 'fab fa-java' },
        { name: 'Jetpack', icon: 'fas fa-mobile-alt' },
      ],
    },
    {
      title: 'DATABASE',
      icon: 'fa-database',
      skills: [
        { name: 'MongoDB', icon: 'fas fa-database' },
        { name: 'PostgreSQL', icon: 'fas fa-database' },
        { name: 'MySQL', icon: 'fas fa-database' },
        { name: 'Firebase', icon: 'fas fa-database' },
      ],
    },
    {
      title: 'DEVOPS',
      icon: 'fa-cloud',
      skills: [
        { name: 'Docker', icon: 'fab fa-docker' },
        { name: 'AWS', icon: 'fab fa-aws' },
        { name: 'Actions', icon: 'fab fa-github' },
        { name: 'Linux', icon: 'fab fa-linux' },
      ],
    },
    {
      title: 'TOOLS',
      icon: 'fa-tools',
      skills: [
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'VS Code', icon: 'fas fa-code' },
        { name: 'Studio', icon: 'fas fa-mobile-alt' },
        { name: 'Postman', icon: 'fas fa-flask' },
      ],
    },
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
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Tech Stack
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          SKILLS & TOOLS
        </motion.h2>

        <motion.div
          className="skills-3d-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              className="skill-3d-card"
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <div className="skill-3d-header">
                <i className={`fas ${category.icon} skill-cat-icon`}></i>
                <h3>{category.title}</h3>
              </div>
              <div className="skill-icons-grid">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-icon-item">
                    <i className={skill.icon}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

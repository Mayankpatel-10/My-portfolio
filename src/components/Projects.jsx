import React from 'react';
import { motion } from 'framer-motion';
import ChromaGrid from './ChromaGrid';

import projectXrayImg from '../assets/project_xray.png';
import projectEdubotImg from '../assets/project_edubot.png';
import projectCollegeImg from '../assets/project_college.png';
import projectChatImg from '../assets/project_chat.png';
import projectSwiggyImg from '../assets/project_swiggy.png';
import projectNotesImg from '../assets/project_notes.png';
import projectSchoolImg from '../assets/project_school.png';
import projectLoadbalancerImg from '../assets/project_loadbalancer.png';
import projectPredictionImg from '../assets/project_prediction.png';
import projectTrafficImg from '../assets/project_traffic.png';
import projectMindcareImg from '../assets/project_mindcare.png';
import projectGymImg from '../assets/project_gym.png';

const Projects = () => {
  const projects = [
    {
      image: projectXrayImg,
      url: 'https://xray-mri-image-interpreter.vercel.app/',
      title: 'Xray & MRI Interpreter',
      handle: 'AI Medical Model',
      subtitle: 'AI medical assistant utilizing deep learning to interpret clinical scans.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectEdubotImg,
      url: 'https://edu-bot-wump4knzeankwxdck2nrt8.streamlit.app/',
      title: 'Edu Bot Assistant',
      handle: 'AI Assistant',
      subtitle: 'AI conversational chatbot designed to streamline and automate student learning.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectCollegeImg,
      url: 'https://college-discovery-platform-one-tawny.vercel.app/',
      title: 'College Discovery Platform',
      handle: 'Data Dashboard',
      subtitle: 'Web dashboard mapping search criteria to find relevant higher education institutions.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectChatImg,
      url: 'https://schatten-ashy.vercel.app/',
      title: 'Chat Messenger App',
      handle: 'Realtime Messenger',
      subtitle: 'Futuristic responsive chat application enabling real-time communications.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectSwiggyImg,
      url: 'https://github.com/Mayankpatel-10/Swiggy-Backend',
      title: 'Swiggy Backend API',
      handle: 'System Service',
      subtitle: 'API engine for food delivery logistics routing and database storage.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectNotesImg,
      url: 'https://notes-sharing-platform-iota.vercel.app/',
      title: 'Notes Sharing Platform',
      handle: 'Collaboration Hub',
      subtitle: 'Collaborative cloud platform to upload and share study guides and notes.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectSchoolImg,
      url: 'https://school-website-six-psi.vercel.app/',
      title: 'School Website',
      handle: 'Web Portal',
      subtitle: 'Modern responsive school portal built using React and Tailwind CSS.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectLoadbalancerImg,
      url: 'https://github.com/Mayankpatel-10/Dynamic-load-balancing-in-cloud-using-machine-learning',
      title: 'Dynamic Load Balancer',
      handle: 'Cloud Service',
      subtitle: 'ML-based dynamic load balancing system for high traffic cloud servers.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectPredictionImg,
      url: 'https://github.com/Mayankpatel-10/Predicting-Student-Performance',
      title: 'Student Performance',
      handle: 'Machine Learning',
      subtitle: 'Supervised ML model predicting student academic score distributions.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectTrafficImg,
      url: 'https://github.com/0fficialAnkit/SmartTrafficManagement',
      title: 'Smart Traffic Manager',
      handle: 'Computer Vision',
      subtitle: 'Real-time street traffic controller using OpenCV cameras and TensorFlow.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectMindcareImg,
      url: 'https://mind-care-react.vercel.app/',
      title: 'Mind Care',
      handle: 'Wellness Application',
      subtitle: 'Mental health and self-improvement tool with structured exercises.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    },
    {
      image: projectGymImg,
      url: 'https://mad-about-fitness.vercel.app/',
      title: 'GYM Website',
      handle: 'Web Portal',
      subtitle: 'Modern landing and membership platform for athletic gym centers.',
      borderColor: '#ffffff',
      gradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), #000000)'
    }
  ];

  return (
    <section id="projects" style={{ padding: '6rem 0', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <div className="container" style={{ width: '90%', maxWidth: '1200px', margin: '0 auto' }}>
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
          style={{ marginBottom: '1rem' }}
        >
          FEATURED PROJECTS
        </motion.h2>

        {/* Interactive ChromaGrid Component */}
        <ChromaGrid 
          items={projects} 
          radius={260} 
          columns={3} 
          rows={4} 
          damping={0.4} 
          fadeOut={0.5} 
        />
      </div>
    </section>
  );
};

export default Projects;

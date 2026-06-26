import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [logs, setLogs] = useState(['> Ready... Please fill out the form to send a message.']);
  const [submitting, setSubmitting] = useState(false);
  const [btnText, setBtnText] = useState('SEND MESSAGE');
  const [showModal, setShowModal] = useState(false);
  const [modalTime, setModalTime] = useState('');

  // Form Fields State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const addLogLine = (line, status = '') => {
    setLogs((prev) => [...prev, line]);
    setTimeout(() => {
      const logContainer = document.getElementById('terminalLog');
      if (logContainer) logContainer.scrollTop = logContainer.scrollHeight;
    }, 50);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setLogs([]); // clear log terminal
    setBtnText('CONNECTING...');

    const name = formState.name;
    const bodyData = new FormData();
    bodyData.append('access_key', '98729351-85ca-4e89-9cfb-37ac40ea61dd');
    bodyData.append('name', formState.name);
    bodyData.append('email', formState.email);
    bodyData.append('subject', formState.subject);
    bodyData.append('message', formState.message);

    // Sequence of console simulations
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await delay(200);
    addLogLine('> Starting connection...');

    await delay(400);
    addLogLine('> Verifying details...');

    await delay(400);
    addLogLine('> Connection established.');

    await delay(400);
    addLogLine('> Packaging your message...');

    await delay(400);
    addLogLine(`> Securing message for '${name}'...`);

    await delay(400);
    addLogLine('> Sending message to secure relay...');
    setBtnText('SENDING...');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: bodyData,
      });

      const result = await response.json();

      if (result.success) {
        addLogLine('> Success! Your message has been sent successfully.', 'success');
        setBtnText('MESSAGE SENT!');

        await delay(600);
        setModalTime(new Date().toLocaleTimeString());
        setShowModal(true);
      } else {
        addLogLine('> Error: Transmission rejected by server.', 'error');
        addLogLine(`> Reason: ${result.message || 'Invalid Access Key'}`, 'error');
        addLogLine('> Action: Please check/update your Access Key.');
        setBtnText('SEND MESSAGE');
        setSubmitting(false);
      }
    } catch (error) {
      addLogLine('> Error: Connection lost. Failed to connect to server.', 'error');
      addLogLine('> Action: Please check your internet connection and try again.');
      setBtnText('SEND MESSAGE');
      setSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormState({ name: '', email: '', subject: '', message: '' });
    setSubmitting(false);
    setBtnText('SEND MESSAGE');
    setLogs(['> Ready... Please fill out the form to send a message.']);
  };

  const contactItems = [
    { label: 'Mail', val: 'mayankpatelmehta@gmail.com', href: 'mailto:mayankpatelmehta@gmail.com', icon: 'fa-envelope' },
    { label: 'Phone', val: '+91 98780 89375', href: 'tel:+919878089375', icon: 'fa-phone' },
    { label: 'GitHub', val: 'Mayankpatel-10', href: 'https://github.com/Mayankpatel-10', icon: 'fab fa-github', external: true },
    { label: 'LinkedIn', val: 'mayank-patel10', href: 'https://www.linkedin.com/in/mayank-patel10', icon: 'fab fa-linkedin-in', external: true },
    { label: 'LeetCode', val: 'mynk_1002', href: 'https://leetcode.com/u/mynk_1002/', icon: 'fas fa-code', external: true },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Connect
        </motion.p>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          GET IN TOUCH
        </motion.h2>

        <div className="contact-layout">
          {/* Left: Terminal Contact Form */}
          <div className="contact-form-container glass-card">
            <div className="tech-corner tl"></div>
            <div className="tech-corner tr"></div>
            <div className="tech-corner bl"></div>
            <div className="tech-corner br"></div>

            <div className="form-header">
              <span className="sys-status">[SYS: ONLINE]</span>
              <h3>SEND A MESSAGE</h3>
            </div>

            {/* Terminal log outputs */}
            <div className="terminal-log" id="terminalLog" style={{ overflowY: 'auto', maxHeight: '120px' }}>
              {logs.map((logLine, index) => (
                <div 
                  key={index} 
                  className={`log-line ${logLine.includes('Success') ? 'success' : logLine.includes('Error') ? 'error' : ''}`}
                >
                  {logLine}
                </div>
              ))}
            </div>

            <form className="futuristic-form" id="contactForm" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder=" "
                  autoComplete="off"
                  disabled={submitting}
                  value={formState.name}
                  onChange={handleInputChange}
                />
                <label htmlFor="name">Your Name</label>
                <span className="focus-border"></span>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder=" "
                  autoComplete="off"
                  disabled={submitting}
                  value={formState.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">Your Email</label>
                <span className="focus-border"></span>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder=" "
                  autoComplete="off"
                  disabled={submitting}
                  value={formState.subject}
                  onChange={handleInputChange}
                />
                <label htmlFor="subject">Subject</label>
                <span className="focus-border"></span>
              </div>

              <div className="form-group">
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder=" "
                  rows="4"
                  disabled={submitting}
                  value={formState.message}
                  onChange={handleInputChange}
                ></textarea>
                <label htmlFor="message">Your Message...</label>
                <span className="focus-border"></span>
              </div>

              <button type="submit" className="btn-transmit" disabled={submitting}>
                <span className="btn-text">{btnText}</span>
                <span className="btn-glitch"></span>
              </button>
            </form>
          </div>

          {/* Right: Contact 3D Grid */}
          <div className="contact-grid-container">
            <div className="contact-3d-grid">
              {contactItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="contact-3d-item"
                >
                  <div className="contact-3d-inner glass-card">
                    <i className={item.icon.startsWith('fa') ? `fas ${item.icon}` : item.icon}></i>
                    <div>
                      <span className="contact-type">{item.label}</span>
                      <span className="contact-val">{item.val}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal overlay */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="success-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div
              className="success-modal glass-card"
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <div className="tech-corner tl"></div>
              <div className="tech-corner tr"></div>
              <div className="tech-corner bl"></div>
              <div className="tech-corner br"></div>

              <div className="modal-icon">
                <i className="fas fa-satellite-dish"></i>
              </div>
              <h3>MESSAGE SENT</h3>
              <p>Thank you! Your message has been sent to Mayank. I'll get back to you soon.</p>
              <div className="modal-meta">[Sent at {modalTime}]</div>
              <button className="modal-close-btn btn-primary" onClick={handleCloseModal}>
                <span>CLOSE</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;

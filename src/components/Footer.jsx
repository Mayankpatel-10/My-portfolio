import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-text">
        &copy; {new Date().getFullYear()} <span>MAYANK PATEL</span> &mdash; Fullstack & Android Developer
      </div>
    </footer>
  );
};

export default Footer;

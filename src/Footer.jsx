import React from 'react';
import './App.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} TicketHub. All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
        <a href="/terms-of-service" className="footer-link">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-container" style={{ 
      background: '#333', 
      color: '#fff', 
      textAlign: 'center', 
      padding: '10px 20px', 
      position: 'fixed', 
      left: '0', 
      bottom: '0', 
      width: '100%', 
      boxShadow: '0 -2px 5px rgba(0,0,0,0.2)' 
    }}>
      <p>© 2024 YourCompany, Inc. All rights reserved.</p>
      <div>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', marginRight: '10px' }}>
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', marginRight: '10px' }}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;

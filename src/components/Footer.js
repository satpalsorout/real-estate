import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import dealerConfig from '../data/dealerConfig.json';

const Footer = ({ isDarkMode }) => {
  const [config, setConfig] = useState({});

  useEffect(() => {
    setConfig(dealerConfig);
  }, []);

  return (
    <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{config.dealer?.name}</h3>
            <div className="contact-details">
              <p><FontAwesomeIcon icon={faPhone} /> {config.dealer?.phone}</p>
              <p><FontAwesomeIcon icon={faEnvelope} /> {config.dealer?.email}</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> {config.dealer?.address}</p>
            </div>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            {config.customizationOptions?.showSocialLinks && (
              <div className="social-links">
                <a href={config.dealer?.socialLinks?.facebook} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href={config.dealer?.socialLinks?.twitter} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href={config.dealer?.socialLinks?.linkedin} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {config.dealer?.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
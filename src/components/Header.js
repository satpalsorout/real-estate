import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faPhone, faEnvelope, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import dealerConfig from '../data/dealerConfig.json';

const Header = ({ toggleTheme, isDarkMode, setCurrentView, isLoggedIn, onAdminClick }) => {
  const [config, setConfig] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setConfig(dealerConfig);
  }, []);

  const handleNavClick = (view) => {
    if (view === 'admin') {
      setCurrentView(view);
      window.history.replaceState(null, null, '#admin');
    } else {
      setCurrentView('home');
      window.history.replaceState(null, null, `#${view}`);
      setTimeout(() => {
        if (view === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(view);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 100);
    }
  };

  return (
    <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <div className="logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <img src={config.dealer?.logo} alt={config.dealer?.name} />
          <h1>{config.dealer?.websiteName}</h1>
        </div>
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul>
            <li><button onClick={() => { handleNavClick('home'); setIsMenuOpen(false); }}>Home</button></li>
            <li><button onClick={() => { handleNavClick('projects'); setIsMenuOpen(false); }}>Projects</button></li>
            <li><button onClick={() => { handleNavClick('about'); setIsMenuOpen(false); }}>About</button></li>
            <li><button onClick={() => { handleNavClick('growth'); setIsMenuOpen(false); }}>Market</button></li>
            <li><button onClick={() => { handleNavClick('contact'); setIsMenuOpen(false); }}>Contact</button></li>
            <li><button onClick={() => { onAdminClick(); setIsMenuOpen(false); }}>{isLoggedIn ? 'Admin' : 'Login'}</button></li>
          </ul>
        </nav>
        <div className="contact-info">
          <a href={`tel:${config.dealer?.phone}`}><FontAwesomeIcon icon={faPhone} /> {config.dealer?.phone}</a>
          <a href={`mailto:${config.dealer?.email}`}><FontAwesomeIcon icon={faEnvelope} /> {config.dealer?.email}</a>
        </div>
        {config.theme?.allowThemeToggle && (
          <button onClick={toggleTheme} className="theme-toggle">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
import React, { useContext, useState, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Header from './components/Header';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import dealerConfig from './data/dealerConfig.json';
import './App.css';

function AppContent() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('admin');
  };

  const handleAdminClick = () => {
    if (isLoggedIn) {
      setCurrentView('admin');
    } else {
      setCurrentView('login');
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home isDarkMode={isDarkMode} />;
      case 'admin':
        return isLoggedIn ? <Admin isDarkMode={isDarkMode} /> : <Login onLogin={handleLogin} isDarkMode={isDarkMode} />;
      case 'login':
        return <Login onLogin={handleLogin} isDarkMode={isDarkMode} />;
      default:
        return <Home isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} setCurrentView={setCurrentView} isLoggedIn={isLoggedIn} onAdminClick={handleAdminClick} />
      {renderView()}
      <Footer isDarkMode={isDarkMode} />
      {dealerConfig.customizationOptions?.enableChatbot && (
        <Chatbot isDarkMode={isDarkMode} />
      )}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

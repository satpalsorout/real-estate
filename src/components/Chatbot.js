import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import dealerConfig from '../data/dealerConfig.json';

const Chatbot = ({ isDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: dealerConfig.dealer?.chatMessage || "Hello! How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [inactivityTimer, setInactivityTimer] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, {
          text: "For more personalized assistance, you can reach us directly on WhatsApp!",
          sender: 'bot',
          whatsappLink: true
        }]);
      }, 2000);
      setInactivityTimer(timer);
    } else {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    }

    return () => {
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [isOpen]);

  const resetInactivityTimer = () => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "For more personalized assistance, you can reach us directly on WhatsApp!",
        sender: 'bot',
        whatsappLink: true
      }]);
    }, 2000);
    setInactivityTimer(timer);
  };

  const responses = {
    "hello": "Hi there! Welcome to Elite Realty. How can I assist you?",
    "properties": "We have a variety of properties available. Check out our featured listings on the homepage!",
    "contact": "You can contact us at +1-234-567-8900 or info@eliterealty.com",
    "location": "Our office is located at 123 Main Street, Downtown City.",
    "default": "I'm here to help with any questions about our properties or services. What would you like to know?"
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      setInput('');

      const lowerInput = input.toLowerCase();
      let response = responses.default;

      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        response = responses.hello;
      } else if (lowerInput.includes('property') || lowerInput.includes('house') || lowerInput.includes('apartment')) {
        response = responses.properties;
      } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
        response = responses.contact;
      } else if (lowerInput.includes('location') || lowerInput.includes('address')) {
        response = responses.location;
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
        resetInactivityTimer();
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {!isOpen && (
        <div className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <FontAwesomeIcon icon={faComments} />
        </div>
      )}
      {isOpen && (
        <div className={`chatbot ${isDarkMode ? 'dark' : 'light'}`}>
          <div className="chatbot-header">
            <span>Chat with us</span>
            <button onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
                {msg.whatsappLink && (
                  <div style={{ marginTop: '5px' }}>
                    <a
                      href={`https://wa.me/${dealerConfig.dealer?.whatsapp?.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: '#25D366',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '12px'
                      }}
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
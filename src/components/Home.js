import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faRulerCombined, faMap, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import propertiesData from '../data/properties.json';
import dealerConfig from '../data/dealerConfig.json';
import seoText from '../data/seoText.json';

const Home = ({ isDarkMode }) => {
  const [properties, setProperties] = useState([]);
  const [config, setConfig] = useState({});

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || propertiesData;
    setProperties(storedProperties);
    setConfig(dealerConfig);
  }, []);

  return (
    <>
      <Helmet>
        <title>{seoText.homepage?.title}</title>
        <meta name="description" content={seoText.homepage?.description} />
        <meta name="keywords" content={seoText.homepage?.keywords} />
        <meta property="og:title" content={seoText.homepage?.ogTitle} />
        <meta property="og:description" content={seoText.homepage?.ogDescription} />
      </Helmet>
      <main className={`home ${isDarkMode ? 'dark' : 'light'}`}>
        <section className="hero" style={{ backgroundImage: `url(${config.dealer?.heroBg})` }}>
        <div className="hero-content">
          <h1>Welcome to {config.dealer?.websiteName}</h1>
          <p>Your trusted partner in finding the perfect property.</p>
          <a href="#projects" className="cta-button">Explore Properties</a>
        </div>
      </section>

      <section id="projects" className="properties-section">
        <div className="container">
          <h2>Featured Properties</h2>
          <div className="properties-grid">
            {properties.map(property => (
              <div key={property.id} className="property-card">
                <div className="property-images">
                  <img src={property.images[0]} alt={property.title} />
                </div>
                <div className="property-info">
                  <h3>{property.title}</h3>
                  <p className="location">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {property.location}
                  </p>
                  <p className="description">{property.description}</p>
                  <div className="property-details">
                    <span><FontAwesomeIcon icon={faRulerCombined} /> {property.area}</span>
                    <span>{property.type}</span>
                  </div>
                  <div className="property-features">
                    {property.features.slice(0, 3).map(feature => (
                      <span key={feature} className="feature">{feature}</span>
                    ))}
                  </div>
                  <div className="property-footer">
                    <span className="price">{property.price}</span>
                    <a href={property.googleLocation} target="_blank" rel="noopener noreferrer" className="view-map">
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
        <div className="container">
          <h2>About {config.dealer?.name}</h2>
          <p>{config.dealer?.description}</p>
          <div className="about-details">
            <div className="detail">
              <h3>Location</h3>
              <p>{config.dealer?.location}, {config.dealer?.area}</p>
            </div>
            <div className="detail">
              <h3>Contact</h3>
              <p>{config.dealer?.phone}</p>
              <p>{config.dealer?.email}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="growth" className="growth-section">
        <div className="container">
          <h2>Why Invest in Faridabad?</h2>
          <p style={{ marginBottom: '2rem' }}>Faridabad is experiencing unprecedented growth due to major infrastructure developments that are transforming the region into a prime investment destination.</p>
          <div className="growth-drivers">
            <div className="driver">
              <h3>Delhi-Mumbai Expressway</h3>
              <p>The Delhi-Mumbai Expressway, India's first Greenfield expressway, will significantly reduce travel time between Delhi and Mumbai. This connectivity boost is expected to drive commercial and residential development in Faridabad, increasing property values by connecting the region to major business hubs.</p>
            </div>
            <div className="driver">
              <h3>Jewar Airport</h3>
              <p>The upcoming Jewar International Airport, India's largest airport, will be located just 40 km from Faridabad. This mega-project will position Faridabad as an aviation hub, attracting businesses, tourism, and high-net-worth individuals, leading to substantial appreciation in property rates.</p>
            </div>
            <div className="driver">
              <h3>FNG (Faridabad-Noida-Gurugram) Highway</h3>
              <p>The FNG highway is a major infrastructure project connecting Faridabad, Noida, and Gurugram, providing seamless connectivity and boosting economic development. This highway corridor is driving commercial and residential growth in Faridabad, increasing property values through improved accessibility and development opportunities.</p>
            </div>
          </div>
          <div className="growth-summary">
            <p>These developments are creating a perfect storm for property appreciation in Faridabad. With improved connectivity, aviation access, and urban development, property rates are expected to grow significantly in the coming years. Invest now to benefit from this growth trajectory.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <p style={{ marginTop: '10px' }}>Get in touch with our team for all your real estate needs. Whether you're buying, selling, or investing in properties in Faridabad, we're here to provide expert guidance and personalized solutions.</p>
          <div className="contact-content">
            <div className="office-info">
              <h3>Our Office</h3>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Address:</strong> {config.dealer?.address}</p>
              <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> {config.dealer?.phone}</p>
              <p><FontAwesomeIcon icon={faWhatsapp} /> <strong>WhatsApp:</strong> <a href={`https://wa.me/${config.dealer?.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">{config.dealer?.whatsapp}</a></p>
              <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {config.dealer?.email}</p>
              <p><FontAwesomeIcon icon={faMap} /> <strong>Location:</strong> {config.dealer?.location}, {config.dealer?.area}</p>
              <a href={config.dealer?.googleLocation} target="_blank" rel="noopener noreferrer" className="view-map">
                View on Map
              </a>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Name" required />
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone" required />
              <textarea placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default Home;
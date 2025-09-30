import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faRulerCombined, faMap, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import propertiesData from '../data/properties.json';
import dealerConfig from '../data/dealerConfig.json';
import seoText from '../data/seoText.json';

const Home = ({ isDarkMode, isLoggedIn }) => {
  const [properties, setProperties] = useState([]);
  const [config, setConfig] = useState({});
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || propertiesData;
    setProperties(storedProperties);
    setConfig(dealerConfig);
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, message } = contactForm;
    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/${config.dealer?.whatsapp?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
                  {property.images.map((image, index) => (
                    <img key={index} src={image} alt={`${property.title} ${index + 1}`} />
                  ))}
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
                      Location
                    </a>
                    {isLoggedIn && (
                      <button className="edit-button" onClick={() => alert('Edit functionality coming soon')}>
                        Edit
                      </button>
                    )}
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
              <p><a href="https://www.google.com/maps/search/Sector+65,+Faridabad,+Haryana,+India" target="_blank" rel="noopener noreferrer">{config.dealer?.location}, {config.dealer?.area}</a></p>
            </div>
            <div className="detail">
              <h3>Contact</h3>
              <p><a href={`tel:${config.dealer?.phone}`}>{config.dealer?.phone}</a></p>
              <p><a href={`mailto:${config.dealer?.email}`}>{config.dealer?.email}</a></p>
            </div>
          </div>
        </div>
      </section>

      <section id="growth" className="growth-section">
        <div className="container">
          <h2>Why Invest in Faridabad?</h2>
          <p style={{ marginBottom: '2rem' }}>Faridabad is experiencing unprecedented growth due to major infrastructure developments that are transforming the region into a prime investment destination. As part of the Delhi National Capital Region (NCR), Faridabad benefits from its proximity to India's capital while offering more affordable property options and a burgeoning commercial landscape. The city's strategic location along key transportation corridors makes it an attractive hub for businesses, residents, and investors seeking high returns in a rapidly developing urban area.</p>
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
             <div className="driver">
               <h3>Proximity to Delhi</h3>
               <p>Faridabad's strategic location just 30-40 km from Delhi makes it an ideal residential and commercial hub. The upcoming Regional Rapid Transit System (RRTS) will further reduce commute times, integrating Faridabad into the Delhi NCR seamlessly and attracting businesses and residents alike.</p>
             </div>
             <div className="driver">
               <h3>Industrial and Economic Growth</h3>
               <p>Faridabad hosts several industrial estates and is home to major manufacturing units, contributing significantly to Haryana's economy. With ongoing industrial expansions and SEZ developments, the region offers strong rental yields and appreciation potential for commercial properties.</p>
             </div>
             <div className="driver">
               <h3>Educational and Healthcare Facilities</h3>
               <p>The presence of reputed institutions like Manav Rachna International Institute of Research and Studies, and healthcare facilities like Asian Institute of Medical Sciences, make Faridabad an attractive destination for families. This enhances its residential appeal and long-term property value.</p>
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
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Address:</strong> <a href={config.dealer?.googleLocation} target="_blank" rel="noopener noreferrer">{config.dealer?.address}</a></p>
              <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> <a href={`tel:${config.dealer?.phone}`}>{config.dealer?.phone}</a></p>
              <p><FontAwesomeIcon icon={faWhatsapp} /> <strong>WhatsApp:</strong> <a href={`https://wa.me/${config.dealer?.whatsapp?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">{config.dealer?.whatsapp}</a></p>
              <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> <a href={`mailto:${config.dealer?.email}`}>{config.dealer?.email}</a></p>
              <p><FontAwesomeIcon icon={faMap} /> <strong>Location:</strong> {config.dealer?.location}, {config.dealer?.area}</p>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input type="text" name="name" placeholder="Name" value={contactForm.name} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={contactForm.email} onChange={handleInputChange} required />
              <input type="tel" name="phone" placeholder="Phone" value={contactForm.phone} onChange={handleInputChange} required />
              <textarea name="message" placeholder="Message" value={contactForm.message} onChange={handleInputChange} required></textarea>
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
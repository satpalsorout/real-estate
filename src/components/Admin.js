import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../context/ThemeContext';
import propertiesData from '../data/properties.json';

const Admin = ({ isDarkMode }) => {
  const { toggleTheme } = useContext(ThemeContext);
  const [properties, setProperties] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    location: '',
    area: '',
    price: '',
    type: 'Residential',
    images: [''],
    features: [],
    googleLocation: '',
    status: 'Available'
  });

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || propertiesData;
    setProperties(storedProperties);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProperty = () => {
    const updatedProperties = [...properties, { ...newProperty, id: Date.now() }];
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    setIsAdding(false);
    setNewProperty({
      title: '',
      description: '',
      location: '',
      area: '',
      price: '',
      type: 'Residential',
      images: [''],
      features: [],
      googleLocation: '',
      status: 'Available'
    });
  };

  const handleDeleteProperty = (id) => {
    const updatedProperties = properties.filter(property => property.id !== id);
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  return (
    <div className={`admin ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <h1>Admin Panel</h1>
        <div className="admin-header">
          <button onClick={() => setIsAdding(!isAdding)} className="add-button">
            {!isAdding && <FontAwesomeIcon icon={faPlus} />} {isAdding ? 'Cancel' : 'Add New Property'}
          </button>
          <button onClick={toggleTheme} className="theme-toggle">
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
          </button>
        </div>

        {isAdding && (
          <div className="add-property-form">
            <h2>Add New Property</h2>
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={newProperty.title}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newProperty.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newProperty.location}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="area"
              placeholder="Area"
              value={newProperty.area}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={newProperty.price}
              onChange={handleInputChange}
            />
            <select name="type" value={newProperty.type} onChange={handleInputChange}>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
            </select>
            <input
              type="text"
              name="images"
              placeholder="Image URL (comma separated)"
              value={newProperty.images.join(', ')}
              onChange={(e) => setNewProperty(prev => ({
                ...prev,
                images: e.target.value.split(', ')
              }))}
            />
            <input
              type="text"
              name="features"
              placeholder="Features (comma separated)"
              value={newProperty.features.join(', ')}
              onChange={(e) => setNewProperty(prev => ({
                ...prev,
                features: e.target.value.split(', ')
              }))}
            />
            <input
              type="text"
              name="googleLocation"
              placeholder="Google Maps Link"
              value={newProperty.googleLocation}
              onChange={handleInputChange}
            />
            <button onClick={handleAddProperty} className="submit-button">Add Property</button>
          </div>
        )}

        <h2>Manage Properties</h2>
        <div className="properties-list">
          {properties.map(property => (
            <div key={property.id} className="property-item">
              <div className="item-info">
                <h3>{property.title}</h3>
                <p>{property.location}</p>
                <p>{property.price}</p>
              </div>
              <button onClick={() => handleDeleteProperty(property.id)} className="delete-button">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
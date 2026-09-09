import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../pages/header';
import Footer from '../pages/footer';
import { imageMap, flatNameToImageKey } from '../data/data';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [flats, setFlats] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState({ name: '', price: '', bath_no: '', location: '' });

  const navigate = useNavigate();

  // Fetch all flats on mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/flats/all')
      .then(res => setFlats(res.data))
      .catch(err => console.error('Error fetching flats:', err));
  }, []);

  // Navigate to contact page with flat data
  const handleContactClick = (flat) => {
    navigate('/contactPage', { state: { flat } });
  };

  // flat information data
  const handleFlatInfoClick = (flat) => {
    navigate('/flat-info', { state: { flat } });
  };

  // Filter flats based on search
  const filteredFlats = flats.filter(flat => {
    const matchesBHK = searchTerm.name ? flat.name === searchTerm.name : true;
    const matchesPrice = searchTerm.price ? flat.price === searchTerm.price : true;
    const matchesBathroom = searchTerm.bath_no ? flat.bath_no === searchTerm.bath_no : true;
    const matchesLocation = searchTerm.location ? flat.location === searchTerm.location : true;
    return matchesBHK && matchesPrice && matchesBathroom && matchesLocation;
  });

  return (
    <div className="container-home">
      <Header />

      {/* Summary Stats */}
      <div className="summary-stats" style={{ display: 'flex', justifyContent: 'space-around', margin: '4rem 0', textAlign: 'center' }}>
        <div>
          <h2 style={{ color: '#00bcd4' }}>{flats.length}+</h2>
          <p>Properties Listed</p>
        </div>
        <div>
          <h2 style={{ color: '#00bcd4' }}>{flats.filter(flat => flat.status === 'available').length}</h2>
          <p>Available Now</p>
        </div>
        <div>
          <h2 style={{ color: '#00bcd4' }}>100%</h2>
          <p>Verified Properties</p>
        </div>
      </div>

      <h2>Available Properties</h2>
      {/* Filters Label with Toggle */}
      <div style={{ margin: '0.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <i className="fas fa-filter" /> <strong>Filters:</strong>
        </div>
        <span onClick={() => setIsExpanded(prev => !prev)} style={{ color: '#00b3cbff', cursor: 'pointer', fontWeight: 'bold' }} >
          {isExpanded
            ? <><i className="fa-solid fa-sort-amount-up" /> Sort List</>
            : <><i className="fa-solid fa-arrow-down-short-wide" /> Sort List</>}
        </span>
      </div>

      {/* Filter Dropdowns - Conditional Render */}
      {isExpanded && (
        <div style={{ margin: '1rem 0 2rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap', transition: 'all 0.3s ease' }} >

          <select value={searchTerm.name} onChange={(e) => setSearchTerm(prev => ({ ...prev, name: e.target.value }))} >
            <option value="">All BHK</option>
            {[...new Set(flats.map(flat => flat.name))].map(bhk => (
              <option key={bhk} value={bhk}>{bhk}</option>
            ))}
          </select>

          <select value={searchTerm.location} onChange={(e) => setSearchTerm(prev => ({ ...prev, location: e.target.value }))}>
            <option value="">All Locations</option>
            {[...new Set(flats.map(flat => flat.location))].map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select value={searchTerm.bath_no} onChange={(e) => setSearchTerm(prev => ({ ...prev, bath_no: e.target.value }))} >
            <option value="">All Bathrooms</option>
            {[...new Set(flats.map(flat => flat.bath_no))].map(bath => (
              <option key={bath} value={bath}>{bath} Bathroom</option>
            ))}
          </select>

          <select value={searchTerm.price} onChange={(e) => setSearchTerm(prev => ({ ...prev, price: e.target.value }))} >
            <option value="">All Price</option>
            {[...new Set(flats.map(flat => flat.price))].map(rs => (
              <option key={rs} value={rs}>₹{Math.round(rs).toLocaleString("en-IN")}</option>
            ))}
          </select>
        </div>
      )}

      {/* Flat List or No Match Message */}
      {filteredFlats.length === 0 ? (
        <p>No flats match your search.</p>
      ) : (
        <ul className="flat-list">
          {filteredFlats.map(flat => (
            <li key={flat.id} className="flat-card">
              <div className="image-container">
                <img
                  src={imageMap[flatNameToImageKey[flat.name.toLowerCase()]] || 'https://i.pinimg.com/736x/35/39/b2/3539b2060040cfb10d6d0c6ce8b88bf5.jpg'}
                  alt={flat.name} className="flat-img"
                />

                <span className={`availability-badge ${flat.status === 'available' ? 'available' : 'not-available'}`}>
                  {flat.status === 'available' ? 'Available' : 'Not Available'}
                </span>
                <div className="price-tag">
                  ₹{Math.round(flat.price).toLocaleString("en-IN")} <small style={{ color: '#333' }}>/month</small>
                </div>
              </div>

              <div className="flat-info" onClick={() => handleFlatInfoClick(flat)} style={{ cursor: 'pointer' }} >
                <strong>{flat.name}</strong> <br />
                <small>F.NO: {flat.id}</small>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(flat.location)}`}
                  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} >
                  <i class="fas fa-map-marker-alt"></i> {flat.location}
                </a>

                <p><b>Area: </b>{flat.area} sq ft</p>
                <p><b>Description: </b> {flat.description ? flat.description.split(' ').slice(0, 9).join(' ') + ' ' : ''}{' '} .. </p>

                <div className="feature-tags">
                  <span><i class='fas fa-bath' /> {flat.bath_no} Bathroom</span>
                  <span><i class="fa-solid fa-utensils" /> Kitchen</span>
                  <span> <i class="fas fa-eye"></i> more </span>
                </div>
                {flat.status === 'available' ? (
                  <button onClick={(e) => { e.stopPropagation();   // ⛔ prevent parent click
                    handleContactClick(flat); }} className="contact-btn">
                    <i class="fas fa-phone"></i> Call Now!
                  </button>
                ) : (
                  <button className="contact-btn" style={{ cursor: 'not-allowed', backgroundColor: 'gray' }}>
                    {flat.status ? 'Already Booking' : ''}
                  </button>)}
              </div>
            </li>
          ))}
        </ul>
      )}
      <Footer />
    </div>
  );
};

export default Home;
// line 150
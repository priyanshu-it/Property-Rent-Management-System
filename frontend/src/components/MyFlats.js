import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const MyFlats = ({ token }) => {
  const [flats, setFlats] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMyFlats = useCallback(() => {
    axios
      .get('http://localhost:5000/api/flats/myflats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setFlats(res.data))
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    fetchMyFlats();
  }, [fetchMyFlats]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("❌ \n Are you sure you want to sell this flat?");
    if (!confirmed) {
      console.log("Action cancelled.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/flats/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchMyFlats();
      console.log("Flat deleted.");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleToggleStatus = async (flat) => {
    const newStatus = flat.status === 'available' ? 'not available' : 'available';
    alert(`✔ Changing status to: ${newStatus}`);

    try {
      await axios.put(`http://localhost:5000/api/flats/${flat.id}`, {
        ...flat,
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchMyFlats(); // Refresh after update
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const filteredFlats = flats.filter(flat => {
    const term = searchTerm.toLowerCase();
    return flat.id.toString().includes(term);
  });

  return (
    <div className="container-home">
      <h2>My Flats</h2>
      <input type="text" placeholder="Search by F.No" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
        style={{ margin: '1rem 0', padding: '0.6rem', width: '100%', maxWidth: '400px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      {filteredFlats.length === 0 ? (
        <p>No flats match your search.</p>
      ) : (
        <ul className="flat-list">
          {filteredFlats.map(flat => (
            <li key={flat.id} className="flat-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <img src="https://cdn-icons-png.flaticon.com/512/717/717940.png"
                    alt={flat.name} className="flat-img" style={{ width: '100px', height: '100px' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <button onClick={() => handleToggleStatus(flat)}
                    style={{ backgroundColor: flat.status === 'available' ? '#d19644ff' : '#7f7f7fff' }}>
                    {flat.status === 'available' ? 'BOOKING' : 'RENTED'}
                  </button>
                  <hr />
                  <button onClick={() => handleDelete(flat.id)}>
                    SELL | REMOVE
                  </button>
                </div>
              </div>

              <div className="flat-info">
                <h1><strong>{flat.name}</strong></h1>
                <hr />
                <i>F.No: {flat.id}</i> <br />
                <span><b>Status: </b> <b style={{ color: '#48b154ff' }}> {flat.status}</b></span> <br />
                <span><b>Rent: </b> ₹{flat.price}</span> <br />
                <span><b>Area: </b> {flat.area} sq ft</span> <br />
                <b>Address: </b> {flat.location} <br />
                {/* <em><b>Description: </b> {flat.description ? flat.description.split(' ').slice(0, 10).join(' ') + ' ' : ''}{'more'}</em> */}
                <b>Owner Name: </b>{flat.ownername} <br />
                <b>Owner No: </b> {flat.contact}
                <hr />
                <em><b>User's Details </b></ em>
                <span style={{ color: '#347e99ff' }}><b>Email Id: </b> {flat.user_email || 'N/A'}</span> <br />
                <span style={{ color: '#347fa2ff' }}><b>Contact Date: </b>
                  {flat.last_contact ? new Date(flat.last_contact).toLocaleDateString('en-GB') : 'N/A'}
                </span>
              </div>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyFlats;
// line 115
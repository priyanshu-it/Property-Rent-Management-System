import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [form, setForm] = useState({
    name: '', bath_no: '', area: '', price: '', description: '', location: '', contact: '', ownername: '', status: 'available'
  });

  const [message, setMessage] = useState('');
  
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/flats/add', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✔ Flat added successfully!');
      // Reset form fields
      setForm({
        name: '', bath_no: '', area: '', price: '', description: '', location: '', contact: '', ownername: '', status: 'available'
      });
      // Reset checkbox
      const termsCheckbox = document.getElementById('terms');
      if (termsCheckbox) termsCheckbox.checked = false;

    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to add flat');
    }
  };

  return (
    <div className="container">
      <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', gap: '14px' }}>
        <h2>Add New Flat</h2>
        <select name="status" onChange={handleChange} value={form.status} style={{ float: 'right', maxWidth: '120px', border: 'none' }} >
          <option value="available">Available</option>
        </select>
      </div>
      <p><b>* Fill in the details of the flat you want to add.</b></p>
      <form onSubmit={handleSubmit}>
        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between", gap: '14px' }}>
          <select name="name" onChange={handleChange} value={form.name} required>
            <option value="" disabled>Select No. of BHK</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
            <option value="4 BHK">4 BHK</option>
          </select>

          <select name="bath_no" onChange={handleChange} value={form.bath_no} required>
            <option value="" disabled>Select No. of Bathrooms</option>
            <option value="1">1 Bathroom</option>
            <option value="2">2 Bathroom</option>
            <option value="3">3 Bathroom</option>
          </select>
        </div>

        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between", gap: '14px' }}>
          <input name="area" type="number" placeholder="Flat Area (e.g. 1000 sq ft)" onChange={handleChange} value={form.area} required />
          <input name="price" type="number" placeholder="Rent Price (e.g. Rs 20,000)" onChange={handleChange} value={form.price} required />
        </div>

        <input name="location" placeholder="Current Address (e.g. 123 SBS_City | Greater Noida)" onChange={handleChange} value={form.location} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} value={form.description} required ></textarea>

        <b>* Owner Details</b>
        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-between", gap: '14px' }}>
          <input name="ownername" type="text" placeholder="Owner Name" onChange={handleChange} value={form.ownername} required />
          <input name="contact" type="tel" placeholder="Owner Contact Number" onChange={handleChange} value={form.contact} pattern="\d{10}" maxLength={10} required />
        </div>

        {!message && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', maxWidth: '100px' }}>
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I accept the terms of the Sure! Booking Flat.</label>
          </div>
        )}
        <button type="submit">Register Flat</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Dashboard;
// line 90
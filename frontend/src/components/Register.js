import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { data } from '../data/data'; // assumes data.ids is an array of valid IDs

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [usersdata, setUsersdata] = useState('');
  const [message, setMessage] = useState('');
  const [idVerified, setIdVerified] = useState(null);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUsersdataChange = e => setUsersdata(e.target.value);

  const handleCheck = () => {
    if (data.ids.includes(usersdata)) {
      setIdVerified(true);
    } else {
      setIdVerified(false);
      setForm({ username: '', email: '', password: '' });
      setUsersdata('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!idVerified) {
      setMessage('Please verify your ID first.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      setMessage('Registration successful! Please login.');
      setForm({ username: '', email: '', password: '' });
      setUsersdata('');
      setIdVerified(null);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="container">
      <h2>Register (Property Owner)</h2>
      <p> Create a new account to purchase an ID.<br />
        <i>*This is step 1: Check your ID below</i>
        <Link style={{ paddingRight: '10px', float: 'right', textDecoration: 'none' }} to="/contact"> ( ✔ )</Link></p>
      <form onSubmit={handleSubmit}>
        <input className="usersdata" name="usersdata" placeholder="Click on the contact information to purchase the ID."
          value={usersdata} onChange={handleUsersdataChange} onBlur={handleCheck} required
        />
        {idVerified === false && (
          <p style={{ color: 'red' }}>Invalid ID, please try again.</p>
        )}
        {idVerified === true && usersdata && (
          <p style={{ color: 'green' }}>ID verified successfully!</p>
        )}
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
// line 70
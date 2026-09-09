import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken, setUsername }) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      // Save token and username to localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', form.username); // or res.data.username if available

      setToken(res.data.token);
      setUsername(form.username);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <img src="https://cdn-icons-png.flaticon.com/256/14114/14114879.png" alt="Person" width="96" height="96" />
      <h2>Login (Property Owner)</h2>
      <p>Please enter your credentials to login.</p>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log-in'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
// line 40
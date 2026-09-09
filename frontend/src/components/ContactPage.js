import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ContactPage = () => {
  const location = useLocation();
  const { flat } = location.state || {};

  const [formData, setFormData] = useState({
    user_email: '', last_contact: '',
  });

  // Set last_contact to today's date on component load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    setFormData((prev) => ({
      ...prev, last_contact: today,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!flat) {
      alert('Flat not found');
      return;
    }

    // 24-hour contact restriction (timeDiff < 24 * 60 * 60 * 1000)
    if (flat.last_contact) {
      const now = new Date();
      const lastContactDate = new Date(flat.last_contact);
      const timeDiff = now.getTime() - lastContactDate.getTime();

      if (timeDiff < 24 * 60 * 60 * 1000) {
        alert('You are limited to registering once every 24 hours.\n \n Wait ..');
        return;
      }
    }

    try {
      await axios.put(`http://localhost:5000/api/flats/updateContact/${flat.id}`, formData);

      flat.user_email = formData.user_email;
      flat.last_contact = formData.last_contact;
      handleContactClick();

      // Reset last_contact to today's date again (optional)
      const today = new Date().toISOString().split('T')[0];
      setFormData((prev) => ({
        ...prev, last_contact: today,
      }));
    } catch (error) {
      console.error('Failed to submit contact info:', error);
      alert('Something went wrong while submitting.');
    }
  };

  const handleContactClick = () => {
    const w = window.open('', '_blank');
    if (!w || !flat) return;

    w.document.writeln(`
      <html>
        <head>
          <title>Contact Info</title>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
        </head>
        <body class="flex items-center justify-center min-h-screen bg-white">
          <div class="text-2xl text-gray-700 font-semibold text-center">
            <img class="mt-4 mx-auto w-40 h-40" 
                 src="https://i.pinimg.com/originals/86/27/8a/86278a85992a8b2dffdb38307459c5e7.gif" 
                 alt="Loading Gif" />
          </div>
          <script>
            setTimeout(() => {
              document.body.innerHTML = \`
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mt-10 p-4">
                    <i onclick="window.print()" title="Download/Print" 
                      class="fa fa-download text-blue-600 cursor-pointer absolute top-4  right-4 text-2xl">
                    </i>
                      <h2 class="text-3xl font-bold text-teal-700 mt-4 text-center absolute top-4 left-1/2 transform -translate-x-1/2">
                          <i class="fas fa-home text-green-300 text-2xl"></i> <br /> Welcome to Property Rent Management System <br />
                          <i class="text-gray-700 text-base"> 
                            Your one-stop platform to discover and rent flats in your desired location.
                          </i>
                      </h2>
                    
                  <div class="bg-green-50 p-6 rounded shadow border border-gray-200">
                      <h2 class="text-2xl font-bold text-gray-800">Property Details</h2>
                      <p class="text-sm text-gray-500 mb-4">Flat No: ${flat.id}</p>

                    <div class="flex items-center text-gray-500 mb-2">
                      <i class="fas fa-map-marker-alt mr-2"></i>
                      <span> ${flat.location}</span>
                    </div>

                      <p class="text-cyan-500 font-bold text-2xl">₹ ${flat.price}<span class="text-base font-normal text-gray-600">/month</span></p>
                      <h3 class="mt-4 font-semibold text-gray-800">Description</h3>
                      <p class="text-gray-600 text-sm">${flat.name}, ${flat.area} sq ft, ${flat.description}</p>
                      <h3 class="mt-4 font-semibold text-gray-800">Amenities</h3>
                      <ul class="list-disc list-inside text-gray-600 text-sm mt-1">
                        <li>${flat.bath_no} Bathrooms</li>
                        <li>Kitchen included</li>
                        <li>Additional amenities available</li>
                      </ul>
                  </div>

                  <div class="bg-green-10 p-6 rounded shadow border border-gray-200">
                    <h2 class="text-2xl font-bold text-gray-800 mb-2">Contact Owner</h2>
                    <p class="text-sm text-gray-600 mb-4">Contact directly for viewing and booking</p>
                      <div class="w-full py-3 font-semibold mb-4">
                        <div class="flex items-center mb-4">
                          <i class="fas fa-home text-gray-500 mr-3" style="font-size: 18px;"></i>
                          <div class="flex flex-col">
                            <span class="ml-2 font-bold text-black" style="font-size: 18px;">${flat.ownername}</span>
                            <span class="ml-2 text-gray-800" style="font-size: 14px;">Property Owner</span>
                          </div>
                        </div>
                        <div class="flex items-center">
                          <i class="fas fa-phone-alt text-gray-500 mr-3" style="font-size: 18px;"></i>
                          <span class="ml-2 text-blue-600" style="font-size: 18px;">+91 ${flat.contact}</span>
                        </div>
                      </div>

                      <div class="bg-blue-50 p-4 rounded text-sm">
                        <h3 class="font-semibold text-gray-800 mb-2">Viewing Tips</h3>
                        <ul class="list-disc list-inside text-gray-600 space-y-1">
                          <li>Schedule a viewing before making any payments</li>
                          <li>Verify all documents and agreements</li>
                        </ul>
                          Contacted by: <i class="mt-1 text-sm text-blue-700 "> ${flat.user_email}</i> <br />
                          Last contacted on: <i class="mt-1 text-sm text-blue-700 "> ${flat.last_contact}</i>
                          <p class="mt-1 text-sm text-gray-500">✔ First Valid Booking Confirmed – Offer/Slot Reserved for 24 Hours</p>
                      </div>
                  </div>
                  
                </div>
              \`;
            }, 6000);
          </script>
        </body>
      </html>
    `);
    w.document.close();
  };

  if (!flat) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        No flat data provided. Please go back and try again.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow">
      <form onSubmit={handleSubmit} className="container">
        <h2 className="text-2xl font-bold mb-4">Contact for Flat {flat.id}</h2>
        <label className="block text-sm font-medium mb-1">Your Email Id:</label>
        <input type="email" name="user_email" value={formData.user_email} onChange={handleChange} placeholder="Enter your email" required />
        <label className="block text-sm font-medium mb-1">Contact Date:</label>
        <input type="date" name="last_contact" value={formData.last_contact} readOnly />
        <button type="submit"> Submit | Free Book </button>
      </form>
    </div>
  );
};

export default ContactPage;
// line 170
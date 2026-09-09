import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FlatInfo() {
    const location = useLocation();
    const { flat } = location.state || {};
    const navigate = useNavigate();

    if (!flat) {
        return <p>No flat information available.</p>;
    }

    // Navigate to contact page with flat data
    const handleContactClick = (flat) => {
        navigate('/contactPage', { state: { flat } });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="container">
                <h2><i className="fas fa-home" /> Property Details</h2>
                <p><strong>Flat No:</strong> {flat?.id}</p>
                <p><i className="fas fa-building mr-2"></i> <strong> Badroom:</strong> {flat?.name}</p>
                <p><i className="fas fa-map-marker-alt mr-2"></i><strong> Address:</strong> {flat?.location}</p>
                <p><i class="fa-solid fa-indian-rupee-sign"></i><strong> Price:</strong> {flat?.price}<span>/month</span></p>
                <p><i className="fa-solid fa-images"></i><strong> Gallery:</strong> Visit to view photos</p>
                <p><i className="fa-solid fa-expand"></i><strong> Area:</strong> {flat?.area} sq ft</p>
                <hr />
                <h3><i className="fas fa-align-left mr-2"></i> Description</h3>
                <p>{flat?.description}</p>

                <h3>Amenities</h3>
                <ul style={{ display: 'flex', flexDirection: 'row' }}>
                    <li>
                        <i className="fas fa-bath mr-2"></i> {flat?.bath_no} Bathrooms
                    </li>
                    <li >
                        <i className="fas fa-utensils mr-2"></i> Kitchen included
                    </li>
                    <li>
                        <i className="fas fa-plus-circle mr-2"></i> Additional amenities available
                    </li>
                </ul>
            </div>
            <div className='container' >
                <h3><i className="fas fa-building mr-2"></i> Flat Booking</h3>
                <p>Contact Owner the Flat</p>
                {flat.status === 'available' ? (
                    <button onClick={() => handleContactClick(flat)} className="contact-btn">
                        <i class="fas fa-phone"></i> Contact
                    </button>
                ) : (
                    <button className="contact-btn" style={{ cursor: 'not-allowed', backgroundColor: 'gray' }}>
                        {flat.status ? 'Already Booking' : ''}
                    </button>)}
                <p>Terms of use | Privacy statement</p>
            </div>
        </div>
    );
}

export default FlatInfo;
// line 60
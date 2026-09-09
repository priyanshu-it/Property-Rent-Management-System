import React from 'react';

function Footer() {
    return (
        <>
            <footer className="footer">
                <h2 style={{ textAlign: 'center', textDecoration: 'underline' }}>About Us</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

                    {/* Step 1 - Purchase ID */}
                    <div style={{ flex: '1', textAlign: 'center', margin: '10px 0' }}>
                        <h3>Step 1: Purchase ID (Property Owner)</h3>
                        <p><b>Online / Offline</b></p>
                        <p>Phone: +91-234 567 890</p>
                        <p>WhatsApp: +91-123 654 789</p>
                        <p>Address: 123 Property Rent Management System, City Name, Country</p>
                        <p>-----</p>
                    </div>

                    {/* Step 2 - Support */}
                    <div style={{ flex: '1', textAlign: 'center', margin: '10px 0' }}>
                        <h3>Step 2: Support & Reporting</h3>
                        <p><strong>Report an Issue:</strong><br />
                            Email: <a href="mailto:support-society-space@gmail.com">support-society-space@gmail.com</a>
                        </p>
                        <p><strong>Technical Support:</strong><br />
                            Email: <a href="mailto:techsupport-society-space@gmail.com">techsupport-society-space@gmail.com</a>
                        </p>
                        <p>-----</p>
                    </div>
                    {/* step 3  */}
                    <div style={{ flex: '1', textAlign: 'center', margin: '10px 0' }}>
                        <h3>We're Here to Help</h3>
                        <p><strong>Urgent inquiries: </strong><br /> Please call us directly.</p>
                        <p><strong>Support Hours: </strong><br /> Mon - Fri, 9:00 AM - 6:00 PM (IST)</p>
                        <p>-----</p>
                    </div>
                    {/* step 4 */}
                    <div style={{ flex: '1', textAlign: 'center', margin: '10px 0' }}>
                        <h3>Application Developement</h3>
                        <p>👉🏻 Created By <strong>Priyanshu</strong></p> <p><strong>Social Media:</strong></p>
                        <p style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '1.2rem' }}>
                            <a href="https://github.com/Priyanshu-it" target="_blank" rel="noopener noreferrer" >
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/priyanshu-in" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin"></i>
                            </a>
                            <a href="https://www.instagram.com/priyanshu0391" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </p>
                        <p>-----</p>
                    </div>
                </div>

                <h3 style={{ textAlign: 'center' }}>Quick Links</h3>
                <dived style={{ display: 'flex', margin: '10px 0', justifyContent: 'center', gap: '24px' }}>
                    <a href="/" style={{ color: 'teal', textDecoration: 'none' }}>Home</a>
                    <a href="/contact" style={{ color: 'teal', textDecoration: 'none' }}>About Us</a>
                    <a href="/register" style={{ color: 'teal', textDecoration: 'none' }}>Register</a>
                    <a href="/login" style={{ color: 'teal', textDecoration: 'none' }}>Log-In</a>
                </dived>

                <hr />
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>© 2025 Property Rent Management System. All rights reserved.</p>
                </div>
            </footer >
        </>
    );
}

export default Footer;
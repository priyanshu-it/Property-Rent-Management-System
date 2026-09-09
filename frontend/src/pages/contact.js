import React from 'react';

function Contact() {
    const currentYear = new Date().getFullYear();
    const emailLinkStyle = { textDecoration: 'none', color: 'blue' };

    return (
        <main className="container-home" style={{ lineHeight: '1.6' }}>
            <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
            <p style={{ textAlign: 'center' }}>We’re here to help you with any questions or concerns you may have.</p>
            <br />
            <div className='flat-list'>
                {/* Purchase ID Section */}
                <section>
                    <h1>Step: 1 </h1>
                    <h2> Landlord (Property Owner)</h2>
                    <p>For inquiries or to request a purchase ID, reach out to us:</p>
                    <address>
                        <p>Phone: +91-234 567 890 / +91-987 654 321</p>
                        <p>WhatsApp: +91-123 654 789</p>
                        <p>Address: 123 Society Space, City Name, Country</p>
                    </address>
                    ---
                </section>
                {/* Support and Reporting Section */}
                <section>
                    <h1>Step: 2</h1>
                    <h2>Support & Reporting</h2>
                    <p>If you’re experiencing any issues or need assistance, we’re here to help.</p>

                    <h3>Report an Issue</h3>
                    <p>Please report any problems or concerns to us:</p>
                    <p>Email: <a href="mailto:support-society-space@gmail.com" style={emailLinkStyle}>support-society-space@gmail.com</a></p>

                    <h3>Technical Support</h3>
                    <p>Having trouble with our website or your rental dashboard?</p>
                    <p>Email: <a href="mailto:techsupport-society-space@gmail.com" style={emailLinkStyle}>techsupport-society-space@gmail.com</a></p>
                </section>
                {/* Urgent Help Section */}
                <section>
                    <h2>We're Here to Help</h2>
                    <p>Have any questions or need urgent help? Contact us by phone or email, and we’ll respond as quickly as possible.</p>
                    <p><strong>Urgent inquiries:</strong> Please call us directly.</p>
                    <h3>Support Hours:</h3>
                    <p>Monday to Friday, 9:00 AM - 6:00 PM (IST)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', margin: '10px 0', gap: '14px', fontSize: '1.4rem' }}>
                        <a href="https://github.com/Priyanshu-it" target="_blank" rel="noopener noreferrer" >
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/priyanshu-in" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://www.instagram.com/priyanshu0391" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </section>
            </div>
            {/* Footer */}
            <footer style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', marginTop: '250px' }}>
                <p>© {currentYear} Society-Space. All rights reserved.</p>
                <p>-- Created By Priyanshu --</p>
            </footer>
        </main>
    );
}

export default Contact;
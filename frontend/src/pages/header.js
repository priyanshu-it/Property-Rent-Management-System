import React from 'react';

function Header() {
    return (
        <>
            <header style={{ textAlign: "center", padding: "32px" }}>
                <button style={{ cursor: 'not-allowed' }} ><i class="fas fa-home"></i></button>
                <h1>Welcome to Property Rent Management System</h1>
                <p style={{color:'#555'}}>Your one-stop platform to discover and flats in your desired Location.</p>
            </header>
        </>
    );
}

export default Header;
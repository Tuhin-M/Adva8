import React, { useState } from "react";
import "./Home.css";
import { FaUserCircle } from "react-icons/fa";
// react-icons library required

function Home() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <>
      <div className="top-menu">
        <div className="logo">LOGO</div>
        <input type="text" className="search-bar" placeholder="Search..." />
        <nav className="nav-items">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/labs">Labs</a>
          <a href="/news">News</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="profile" onClick={toggleProfileMenu}>
          <FaUserCircle size={28} />
          {profileMenuOpen && (
            <div className="profile-dropdown">
              <a href="#login">Login</a>
              <a href="#signup">Sign Up</a>
              <a href="#edit-profile">Edit Profile</a>
            </div>
          )}
        </div>
      </div>
      <div className="background-image">
        <div className="search-section">
          <input
            type="text"
            className="location-input"
            placeholder="Enter location..."
          />
          <input type="date" className="appointment-date" />
          <button className="search-button">Search</button>
        </div>
      </div>
    </>
  );
}

export default Home;

// App.css

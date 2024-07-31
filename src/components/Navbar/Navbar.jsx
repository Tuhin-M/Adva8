// src/components/Navbar.js
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // If using React Router for navigation
import { useSelector } from "react-redux";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  return (
    <>
      <div className="top-menu">
        <div className="logo">LOGO</div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <nav className="nav-items">
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/listing">Services</a>
          <a href="/labs">Labs</a>
          <a href="/blog">Blogs</a>
          {/* <a href="contact">Contact</a> */}
        </nav>
        <div className="profile" onClick={toggleProfileMenu}>
          {isLoggedIn && currentUser?.avatar ? (
            <img src={currentUser?.avatar} />
          ) : (
            <FaUserCircle size={28} />
          )}
          {profileMenuOpen && (
            <div className="profile-dropdown">
              {!isLoggedIn ? (
                <>
                  <a href="login">Login</a>
                  <a href="signup">Sign Up</a>
                </>
              ) : (
                <a href="userprofile">User Profile</a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

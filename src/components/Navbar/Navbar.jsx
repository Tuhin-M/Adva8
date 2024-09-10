// src/components/Navbar.js
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"; // If using React Router for navigation
import { useSelector } from "react-redux";
import logo from "../../assets/ADVA8_SOLID_LOGO.png";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  const userRole = localStorage.getItem("userRole");
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  return (
    <>
      <div className="top-menu">
        <div className="logo">
          <img src={logo} alt="ADVA8" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <nav className="nav-items">
          {(userRole == undefined || userRole == 0) && <a href="/">Home</a>}
          {userRole == 1 && <a href="/labs-onboarding">Labs Onboarding</a>}
          {userRole == 1 && <a href="/lab-dashboard">Labs Dashboard</a>}
          {(userRole == undefined || userRole == 0) && (
            <a href="/listing">Services</a>
          )}
          <a href="/about">About Us</a>
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

import React, { useState } from "react";
import "./About.css"; // Assume styles are defined here for simplicity
import { FaUserCircle } from "react-icons/fa";
function About() {
  return (
    <>
      {/* <div className="top-menu">
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
      </div> */}
      <div className="about-us">
        <h1 className="about-us-heading">About Us</h1>
        <div className="about-us-content">
          <div className="about-us-photo">
            <img src=".react.svg" alt="About Us" className="photo" />
          </div>
          <div className="about-us-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              sed tincidunt nisl. Phasellus eu sapien dictum, porttitor quam
              sed, fermentum neque.
            </p>
            <p>
              Vivamus scelerisque velit ut purus consequat, sit amet tempor nunc
              pellentesque. Proin at blandit sem. Curabitur magna justo,
              tincidunt at urna et, vestibulum ullamcorper nisi.
            </p>
            <p>
              Sed sollicitudin mollis libero, a tempus arcu venenatis sed. Duis
              vehicula nisl at velit facilisis, ac fringilla odio molestie.
              Nullam eleifend luctus urna.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

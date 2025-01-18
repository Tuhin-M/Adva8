import React, { useState } from "react";
import "./About.css";
import { FaUserCircle } from "react-icons/fa";

function About() {
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
              Sed sollicitudin mollis libero, a tempor arcu venenatis sed. Duis
              vehicula nisl at velit facilisis, ac fringilla odio molestie.
              Nullam eleifend luctus urna.
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .top-menu {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: #f8f9fa;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .search-bar {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 200px;
        }

        .nav-items {
          display: flex;
          gap: 1.5rem;
        }

        .nav-items a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-items a:hover {
          color: #007bff;
        }

        .profile {
          position: relative;
          cursor: pointer;
        }

        .profile-dropdown {
          position: absolute;
          right: 0;
          top: 100%;
          background: white;
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.5rem 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .profile-dropdown a {
          display: block;
          padding: 0.5rem 1rem;
          text-decoration: none;
          color: #333;
        }

        .profile-dropdown a:hover {
          background-color: #f8f9fa;
        }

        .about-us {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .about-us-heading {
          text-align: center;
          color: #333;
          margin-bottom: 2rem;
        }

        .about-us-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
        }

        .about-us-photo img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .about-us-text p {
          margin-bottom: 1rem;
          line-height: 1.6;
          color: #666;
        }
      `}</style>
    </>
  );
}

export default About;
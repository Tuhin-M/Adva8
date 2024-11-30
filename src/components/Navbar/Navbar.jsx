import React, { useState } from "react";
import { FaUserCircle, FaSearch } from "react-icons/fa";
import { MenuOutlined } from "@ant-design/icons";
import { Drawer, Button } from "antd";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/ADVA8_SOLID_LOGO.png";
import "./Navbar.css";

const Navbar = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const { isLoggedIn, currentUser } = useSelector((state) => state.user);
  const userRole = localStorage.getItem("userRole");

  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);
  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

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

        <Button className="menu-button" type="text" icon={<MenuOutlined />} onClick={showDrawer} />

        <nav className="nav-items">
          {(userRole == undefined || userRole == 0) && <NavLink exact to="/" activeClassName="active">Home</NavLink>}
          {userRole == 1 && <NavLink to="/labs-onboarding" activeClassName="active">Labs Onboarding</NavLink>}
          {userRole == 1 && <NavLink to="/lab-dashboard" activeClassName="active">Labs Dashboard</NavLink>}
          {(userRole == undefined || userRole == 0) && <NavLink to="/listing" activeClassName="active">Services</NavLink>}
          <NavLink to="/about" activeClassName="active">About Us</NavLink>
          <NavLink to="/blog" activeClassName="active">Blogs</NavLink>
        </nav>

        <div className="profile" onClick={toggleProfileMenu}>
          {isLoggedIn && currentUser?.avatar ? (
            <img src={currentUser?.avatar} alt="Profile" />
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

      <Drawer
        title={<img src={logo} alt="ADVA8" className="drawer-logo" />}
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <ul className="drawer-menu">
          {(userRole == undefined || userRole == 0) && <li><a href="/" activeClassName="active">Home</a></li>}
          {userRole == 1 && <li><a href="/labs-onboarding" activeClassName="active">Labs Onboarding</a></li>}
          {userRole == 1 && <li><a href="/lab-dashboard" activeClassName="active">Labs Dashboard</a></li>}
          {(userRole == undefined || userRole == 0) && <li><a href="/listing" activeClassName="active">Services</a></li>}
          <li><a href="/about">About Us</a></li>
          <li><a href="/blog">Blogs</a></li>
          {!isLoggedIn ? (
                <>
                  <li><a href="login">Login</a></li>
                  <li><a href="signup">Sign Up</a></li>
                </>
              ) : (
                <li><a href="userprofile">User Profile</a></li>
              )}
        </ul>
      </Drawer>
    </>
  );
};

export default Navbar;

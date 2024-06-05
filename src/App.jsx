import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Signup/SignUp";
import About from "./Pages/About/About";

function App() {
  return (
    <>
      {/* <div className="top-menu">
        <div className="logo">LOGO</div>
        <input type="text" className="search-bar" placeholder="Search..." />
        <nav className="nav-items">
          <a href="home">Home</a>
          <a href="about">About Us</a>
          <a href="services">Services</a>
          <a href="labs">Labs</a>
          <a href="news">News</a>
          <a href="contact">Contact</a>
        </nav>
        <div className="profile" onClick={toggleProfileMenu}>
          <FaUserCircle size={28} />
          {profileMenuOpen && (
            <div className="profile-dropdown">
              <a href="login">Login</a>
              <a href="signup">Sign Up</a>
              <a href="edit-profile">Edit Profile</a>
            </div>
          )}
        </div>
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/login" element={<Appointments />} /> */}
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

// App.css

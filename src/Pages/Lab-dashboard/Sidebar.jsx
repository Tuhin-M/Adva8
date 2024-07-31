import React from "react";

const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <img src="path_to_logo_image" alt="Lab Logo" />
          <span>LAB 1 2 3</span>
        </div>
        <nav className="menu">
          <a href="/dashboard" className="menu-item active">
            Dashboard
          </a>
          {/* <a href="#" className="menu-item">
            Labs
          </a>
          <a href="#" className="menu-item">
            Support
          </a>
          <a href="#" className="menu-item">
            Patients
          </a> */}
          <a href="/bookings" className="menu-item">
            Bookings
          </a>
          <a href="/test" className="menu-item">
            Test Offered
          </a>
          {/* <a href="#" className="menu-item">
            Team
          </a>
          <a href="#" className="menu-item">
            Calendar
          </a> */}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

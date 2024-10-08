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
          <a href="/lab-dashboard" className="menu-item">
            Dashboard
          </a>
          <a href="/bookings" className="menu-item">
            Bookings
          </a>
          <a href="/labs" className="menu-item">
            My Labs
          </a>
          {/* <a href="#" className="menu-item">
            Support
          </a>
          <a href="#" className="menu-item">
            Patients
          </a>
          <a href="#" className="menu-item">
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

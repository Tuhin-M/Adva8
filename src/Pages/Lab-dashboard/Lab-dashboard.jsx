import React from "react";
import "./Lab-dashboard.css";
import Sidebar from "./Sidebar.jsx";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <aside className="sidebar">
        <div className="logo">
          <img src="path_to_logo_image" alt="Lab Logo" />
          <span>LAB 1 2 3</span>
        </div>
        <nav className="menu">
          <a href="#" className="menu-item active">
            Dashboard
          </a>
          <a href="#" className="menu-item">
            Labs
          </a>
          <a href="#" className="menu-item">
            Support
          </a>
          <a href="#" className="menu-item">
            Patients
          </a>
          <a href="/bookings" className="menu-item">
            Bookings
          </a>
          <a href="#" className="menu-item">
            Team
          </a>
          <a href="#" className="menu-item">
            Calendar
          </a>
        </nav>
      </aside> */}
      <Sidebar />
      <main className="main-content">
        <div className="stats">
          <div className="stat-card">
            <div className="stat-icon">🏨</div>
            <div className="stat-info">
              <span className="stat-number">25</span>
              <span className="stat-label">Bookings Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <span className="stat-number">300</span>
              <span className="stat-label">In Patient Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <span className="stat-number">300</span>
              <span className="stat-label">In Patient Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛌</div>
            <div className="stat-info">
              <span className="stat-number">89</span>
              <span className="stat-label">Relieved Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🧪</div>
            <div className="stat-info">
              <span className="stat-number">52</span>
              <span className="stat-label">Reports to be delivered</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🧪</div>
            <div className="stat-info">
              <span className="stat-number">52</span>
              <span className="stat-label">Reports to be delivered</span>
            </div>
          </div>
        </div>
        <div className="appointments">
          <h3>Upcoming Appointments</h3>
          <div className="appointment ongoing">
            <div className="appointment-info">
              <img src="path_to_patient_image" alt="Patient" />
              <div>
                <span className="patient-name">Patient Name</span>
                <span className="test-name">Test name</span>
              </div>
            </div>
            <span className="appointment-status">Ongoing</span>
          </div>
          <div className="appointment">
            <div className="appointment-info">
              <img src="path_to_patient_image" alt="Patient" />
              <div>
                <span className="patient-name">Patient Name</span>
                <span className="test-name">Test name</span>
              </div>
            </div>
            <span className="appointment-time">10:30 AM</span>
          </div>
          <div className="appointment">
            <div className="appointment-info">
              <img src="path_to_patient_image" alt="Patient" />
              <div>
                <span className="patient-name">Patient Name</span>
                <span className="test-name">Test name</span>
              </div>
            </div>
            <span className="appointment-time">11:10 AM</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

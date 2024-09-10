import React, { useState, useEffect } from "react";
import "./Lab-dashboard.css";
import Sidebar from "./Sidebar.jsx";

const LabDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    bookingToday: 10,
    patientIn: 10,
    patientRel: 10,
    relievedToday: 10,
    reportsToDeliver: 10,
    reportsDelivered: 10,
    appointments: [],
    labDetails: {},
  });

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch("your_api_endpoint");
        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <div className="stats">
          <div className="stat-card">
            <div className="stat-icon">🏨</div>
            <div className="stat-info">
              <span className="stat-number">{dashboardData.bookingToday}</span>
              <span className="stat-label">Bookings Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <span className="stat-number">{dashboardData.patientIn}</span>
              <span className="stat-label">In Patient Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏥</div>
            <div className="stat-info">
              <span className="stat-number">{dashboardData.patientRel}</span>
              <span className="stat-label">Patient Relatives</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛌</div>
            <div className="stat-info">
              <span className="stat-number">{dashboardData.relievedToday}</span>
              <span className="stat-label">Relieved Today</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🧪</div>
            <div className="stat-info">
              <span className="stat-number">
                {dashboardData.reportsToDeliver}
              </span>
              <span className="stat-label">Reports to be delivered</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🧪</div>
            <div className="stat-info">
              <span className="stat-number">
                {dashboardData.reportsDelivered}
              </span>
              <span className="stat-label">Reports Delivered</span>
            </div>
          </div>
        </div>
        <div className="appointments">
          <h3>Upcoming Appointments</h3>
          {dashboardData.appointments.map((appointment, index) => (
            <div
              key={index}
              className={`appointment ${index === 0 ? "ongoing" : ""}`}
            >
              <div className="appointment-info">
                <img src={appointment.image} alt="Patient" />
                <div>
                  <span className="patient-name">
                    {appointment.patientName}
                  </span>
                  <span className="test-name">{appointment.testName}</span>
                </div>
              </div>
              {index === 0 ? (
                <span className="appointment-status">Ongoing</span>
              ) : (
                <span className="appointment-time">{appointment.time}</span>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LabDashboard;

import React, { useState } from "react";
import "./Bookings.css";
import Sidebar from "./Sidebar";

const bookings = [
  {
    name: "Patient Name",
    testName: "Test name",
    status: "Waiting",
    time: "12:30",
    imageUrl: "path_to_patient_image",
  },
  {
    name: "Patient Name",
    testName: "Test name",
    status: "Waiting",
    time: "12:30",
    imageUrl: "path_to_patient_image",
  },
  {
    name: "Patient Name",
    testName: "Test name",
    status: "Waiting",
    time: "12:30",
    imageUrl: "path_to_patient_image",
  },
  {
    name: "Patient Name",
    testName: "Test name",
    status: "Declined",
    time: "12:30",
    imageUrl: "path_to_patient_image",
  },
  {
    name: "Patient Name",
    testName: "Test name",
    status: "Confirmed",
    time: "12:30",
    imageUrl: "path_to_patient_image",
  },
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <div className="bookings-log">
            {bookings.map((booking, index) => (
              <div key={index} className="booking-entry">
                <img
                  src={booking.imageUrl}
                  alt="Patient"
                  className="patient-image"
                />
                <div className="booking-info">
                  <p>
                    <strong>{booking.name}</strong>
                  </p>
                  <p>{booking.testName}</p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  <p>{booking.time}</p>
                </div>
                <div className="booking-actions">
                  {booking.status === "Waiting" ? (
                    <>
                      <button className="accept-button">Accept</button>
                      <button className="decline-button">Decline</button>
                    </>
                  ) : (
                    <span className={`status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  )}
                </div>
                <div className="view-details">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        );
      case "inout":
        return (
          <div className="in-out-track">
            {" "}
            {bookings.map((booking, index) => (
              <div key={index} className="booking-entry">
                <img
                  src={booking.imageUrl}
                  alt="Patient"
                  className="patient-image"
                />
                <div className="booking-info">
                  <p>
                    <strong>{booking.name}</strong>
                  </p>
                  <p>{booking.testName}</p>
                  <p>
                    <strong>Status:</strong> {booking.status}
                  </p>
                  <p>{booking.time}</p>
                </div>
                <div className="view-details">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        );
      case "missed":
        return <div className="missed-out">Missed Out content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <>
      <Sidebar />
      <div className="lab-details-container">
        <div className="lab-details-header">
          <img src="path_to_logo_image" alt="Lab Logo" className="lab-logo" />
          <div>
            <h2>Lab Details</h2>
            <p>
              <strong>Name:</strong> Lab Name Detailed
            </p>
            <p>
              <strong>Date of Joining:</strong> 20 Apr 2023
            </p>
            <p>
              <strong>Lab Owner Name:</strong> Owner Name
            </p>
            <p>
              <strong>Contact Number:</strong> +91 99999 99999
            </p>
            <p>
              <strong>Emergency Contact Number:</strong> +91 98765 98765
            </p>
            <p>
              <strong>Email Address:</strong> vishakha345@gmail.com
            </p>
          </div>
        </div>
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            Bookings Log
          </button>
          <button
            className={`tab-button ${activeTab === "inout" ? "active" : ""}`}
            onClick={() => setActiveTab("inout")}
          >
            In / Out Track
          </button>
          <button
            className={`tab-button ${activeTab === "missed" ? "active" : ""}`}
            onClick={() => setActiveTab("missed")}
          >
            Missed Out
          </button>
        </div>
        {renderContent()}
        <button className="export-data-button">Export Data</button>
      </div>
    </>
  );
};

export default Bookings;

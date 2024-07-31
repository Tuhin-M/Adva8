import React, { useState, useEffect } from "react";
import "./Bookings.css";
import Sidebar from "./Sidebar";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [data, setData] = useState({
    bookingsLog: [
      {
        image: "https://example.com/patient1.jpg",
        patientName: "John Doe",
        TestName: "Blood Test",
        status: "Waiting",
        time: "10:30 AM",
      },
      {
        image: "https://example.com/patient2.jpg",
        patientName: "Jane Smith",
        TestName: "X-Ray",
        status: "Confirmed",
        time: "11:45 AM",
      },
      {
        image: "https://example.com/patient3.jpg",
        patientName: "Mike Johnson",
        TestName: "MRI Scan",
        status: "Declined",
        time: "2:15 PM",
      },
    ],
    inOutTrack: [
      {
        image: "https://example.com/patient4.jpg",
        patientName: "Emily Brown",
        TestName: "CT Scan",
        time: "9:00 AM",
      },
      {
        image: "https://example.com/patient5.jpg",
        patientName: "David Wilson",
        TestName: "Ultrasound",
        time: "1:30 PM",
      },
    ],
    missedOut: [
      {
        image: "https://example.com/patient6.jpg",
        patientName: "Sarah Davis",
        TestName: "ECG",
        time: "3:45 PM",
      },
    ],
    labDetails: {
      name: "HealthCare Diagnostics",
      image: "https://example.com/lab-logo.png",
      doj: "15 Jan 2022",
      owner: "Dr. Robert Anderson",
      contact: "+1 (555) 123-4567",
      emergencyContact: "+1 (555) 987-6543",
      email: "info@healthcarediagnostics.com",
    },
  });

  useEffect(() => {
    // Simulating API call with dummy data
    const fetchData = async () => {
      try {
        // const response = await fetch('your_api_endpoint');
        // const apiData = await response.json();
        // setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <div className="bookings-log">
            {data.bookingsLog.map((booking, index) => (
              <div key={index} className="booking-entry">
                <img
                  src={booking.image}
                  alt="Patient"
                  className="patient-image"
                />
                <div className="booking-info">
                  <p>
                    <strong>{booking.patientName}</strong>
                  </p>
                  <p>{booking.TestName}</p>
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
            {data.inOutTrack.map((booking, index) => (
              <div key={index} className="booking-entry">
                <img
                  src={booking.image}
                  alt="Patient"
                  className="patient-image"
                />
                <div className="booking-info">
                  <p>
                    <strong>{booking.patientName}</strong>
                  </p>
                  <p>{booking.TestName}</p>
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
        return (
          <div className="missed-out">
            {data.missedOut.map((booking, index) => (
              <div key={index} className="booking-entry">
                <img
                  src={booking.image}
                  alt="Patient"
                  className="patient-image"
                />
                <div className="booking-info">
                  <p>
                    <strong>{booking.patientName}</strong>
                  </p>
                  <p>{booking.TestName}</p>
                  <p>{booking.time}</p>
                </div>
                <div className="view-details">
                  <button className="view-details-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Sidebar />
      <div className="lab-details-container">
        <div className="lab-details-header">
          <img
            src={data.labDetails.image}
            alt="Lab Logo"
            className="lab-logo"
          />
          <div>
            <h2>Lab Details</h2>
            <p>
              <strong>Name:</strong> {data.labDetails.name}
            </p>
            <p>
              <strong>Date of Joining:</strong> {data.labDetails.doj}
            </p>
            <p>
              <strong>Lab Owner Name:</strong> {data.labDetails.owner}
            </p>
            <p>
              <strong>Contact Number:</strong> {data.labDetails.contact}
            </p>
            <p>
              <strong>Emergency Contact Number:</strong>{" "}
              {data.labDetails.emergencyContact}
            </p>
            <p>
              <strong>Email Address:</strong> {data.labDetails.email}
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

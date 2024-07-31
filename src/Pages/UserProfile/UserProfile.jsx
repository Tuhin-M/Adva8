import React, { useState, useEffect } from "react";
import "./UserProfile.css";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labBookings, setLabBookings] = useState([]);

  useEffect(() => {
    // Simulating API calls with dummy data
    setUserData({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, Anytown, USA 12345",
      profilePicture: "https://via.placeholder.com/150",
    });

    setPrescriptions([
      {
        date: "2023-07-15",
        doctorName: "Dr. Jane Smith",
        medicines: ["Amoxicillin", "Ibuprofen"],
        fileUrl: "https://example.com/prescription1.pdf",
      },
      {
        date: "2023-06-30",
        doctorName: "Dr. Mike Johnson",
        medicines: ["Lisinopril", "Metformin"],
        fileUrl: "https://example.com/prescription2.pdf",
      },
    ]);

    setLabBookings([
      {
        date: "2023-07-10",
        testName: "Complete Blood Count",
        labName: "HealthCare Lab",
        status: "Completed",
      },
      {
        date: "2023-06-25",
        testName: "Lipid Profile",
        labName: "City Diagnostics",
        status: "Completed",
      },
    ]);
  }, []);

  const handleLogout = () => {
    alert("User logged out");
    // In a real app, you would clear user session and redirect to login page
  };

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-profile">
      <header className="profile-header">
        <img
          src={userData.profilePicture}
          alt={userData.name}
          className="profile-picture"
        />
        <h1>{userData.name}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="profile-content">
        <section className="user-details card">
          <h2>Personal Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address:</span>
              <span className="info-value">{userData.address}</span>
            </div>
          </div>
        </section>

        <section className="prescriptions card">
          <h2>Previous Prescriptions</h2>
          {prescriptions.length > 0 ? (
            <ul className="prescription-list">
              {prescriptions.map((prescription, index) => (
                <li key={index} className="prescription-item">
                  <div className="prescription-header">
                    <span className="prescription-date">
                      {prescription.date}
                    </span>
                    <a
                      href={prescription.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-button"
                    >
                      View
                    </a>
                  </div>
                  <p className="prescription-doctor">
                    {prescription.doctorName}
                  </p>
                  <p className="prescription-medicines">
                    {prescription.medicines.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No previous prescriptions found.</p>
          )}
        </section>

        <section className="lab-bookings card">
          <h2>Previous Lab Test Bookings</h2>
          {labBookings.length > 0 ? (
            <ul className="booking-list">
              {labBookings.map((booking, index) => (
                <li key={index} className="booking-item">
                  <div className="booking-header">
                    <span className="booking-date">{booking.date}</span>
                    <span
                      className={`booking-status status-${booking.status.toLowerCase()}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <p className="booking-test">{booking.testName}</p>
                  <p className="booking-lab">{booking.labName}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No previous lab test bookings found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfile;

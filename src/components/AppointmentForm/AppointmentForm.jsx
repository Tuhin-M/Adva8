// src/AppointmentForm.js
import React, { useState } from "react";
import "./AppointmentForm.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";

const AppointmentForm = () => {
  const [activeTab, setActiveTab] = useState("General");

  const tabs = ["General", "Speciality Labs", "Blood Bank", "Radiologist"];

  return (
    <div className="appointment-form">
      <h2>Book Appointment Now</h2>
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="form-content">
        <div className="input-group">
          <label>
            <FaMapMarkerAlt className="icon" />
            <input type="text" placeholder="Address, Area, City" />
          </label>
        </div>
        <div className="input-group">
          <label>
            <button className="tab-button">
              <FaCalendarAlt className="icon" />
            </button>
            <input type="text" placeholder="DD-Month, 20YY" />
          </label>
        </div>
        <button className="search-button">
          <FaSearch />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default AppointmentForm;

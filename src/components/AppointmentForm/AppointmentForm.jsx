// src/AppointmentForm.js
import React, { useState, useEffect } from "react";
import "./AppointmentForm.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";

const AppointmentForm = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const tabs = ["General", "Speciality Labs", "Blood Bank", "Radiologist"];

  useEffect(() => {
    console.log("appointement useeffect running");
    const fetchListings = async () => {
      setLoading(true);
      // setShowMore(false);
      //const searchQuery = urlParams.toString();
      const res = await fetch(`http://localhost:3000/api/booking/get`);
      const data = await res.json();
      console.log("booking data - ", data);
      if (data.length > 8) {
        // setShowMore(true);
      } else {
        // setShowMore(false);
      }
      setData(data);
      setLoading(false);
    };

    fetchListings();
    // return () => {
    //   second
    // }
  }, []);

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
            <input type="text" placeholder="Select City" />
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

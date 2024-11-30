// src/AppointmentForm.js
import React, { useState, useEffect } from "react";
import "./AppointmentForm.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { Row, Col, Button } from "antd";

const AppointmentForm = () => {
  const [activeTab, setActiveTab] = useState("General");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const tabs = ["General", "Speciality Labs", "Blood Bank", "Radiologist"];

  useEffect(() => {
    console.log("appointement useeffect running");
    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch(`/api/booking/get`);
      const data = await res.json();
      // console.log("booking data - ", data);
      if (data.length > 8) {
      } else {
      }
      setData(data);
      setLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <div className="appointment-form">
      <Row>
        <Col xs={22} sm={22} md={22} lg={20} xl={20}>
          <h2>Book Appointment Now</h2>
          <Row gutter={[16, 16]} className="tabs">
            {tabs.map((tab) => (
              <Col key={tab} xs={12} sm={6}>
                <Button
                  type={activeTab === tab ? "primary" : "default"}
                  block
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]} className="form-content">
            <Col xs={24} sm={24} md={8}>
              <div className="input-group">
                <label>
                  <FaMapMarkerAlt className="icon" />
                  <input type="text" placeholder="Select City" />
                </label>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <div className="input-group">
                <label>
                  <Button className="tab-button" icon={<FaCalendarAlt className="icon" />} />
                  <input type="text" placeholder="DD-Month, 20YY" />
                </label>
              </div>
            </Col>
            <Col xs={24} sm={24} md={4}>
              <a href="/listing">
                <Button type="primary" className="search-button" block icon={<FaSearch />}>
                  Search
                </Button>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AppointmentForm;
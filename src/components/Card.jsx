import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./Slider/Slider.css";
import { Link } from "react-router-dom";
import { Col } from "antd";

function Card() {
  const [defaultImage, setDefaultImage] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/lab/get");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {data && data.length
        ? data.map((item, index) => (
          <Col xs={24} sm={12} lg={6} className="card-column">
            <Link
              className="card-body hover:shadow-lg transition-shadow duration-300"
              id="RouterNavLink"
              to={`/details/${item._id}`}
              key={index}
              style={{ 
                marginBottom: "40px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                height: "100%",
                display: "block"
              }}
            >
              <section style={{ margin: "0", height: "100%", display: "flex", flexDirection: "column" }}>
                <div className="card-top">
                  <img 
                    src={item.labImageUrls} 
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px 12px 0 0"
                    }}
                  />
                  <div className="lab-info-listing" style={{
                    padding: "15px",
                    backgroundColor: "rgba(0, 0, 0, 0.05)"
                  }}>
                    <span style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#2d3748"
                    }}>{item.labName}</span>
                  </div>
                </div>
                <div className="card-bottom" style={{ padding: "15px", flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <section className="location" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "15px"
                  }}>
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      className="mr-2"
                      style={{ color: "#e53e3e" }}
                    />
                    <p style={{
                      margin: "0",
                      fontSize: "14px",
                      color: "#4a5568"
                    }}>
                      {item.labAddress}, {item.labCity}, {item.labState},{" "}
                      {item.labPin}
                    </p>
                  </section>
                  <button 
                    className="tests"
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#4299e1",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      ":hover": {
                        backgroundColor: "#3182ce"
                      }
                    }}
                  >
                    View Tests and Packages
                  </button>
                </div>
              </section>
            </Link>
          </Col>
        ))
        : null}
    </>
  );
}

export default Card;
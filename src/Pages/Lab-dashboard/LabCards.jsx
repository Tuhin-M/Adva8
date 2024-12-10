import { IconBase } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

function LabCards() {
  const [defaultImage, setDefaultImage] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/lab/lab/owner");
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
      <div className="lab-cards">
      <Sidebar />
        <Row gutter={[24, 24]}>
          {data && data.length
            ? data.map((item, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index} style={{ display: 'flex' }}>
                  <Link
                    id="RouterNavLink"
                    to={`/details/${item._id}`}
                    style={{ width: '100%' }}
                  >
                    <Card hoverable style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <div className="card-top" style={{ flex: '0 0 auto' }}>
                        <img src={item.labImageUrls} alt={item.labName} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                        <div className="lab-info-listing">
                          <span>{item.labName}</span>
                        </div>
                      </div>
                      <div className="card-bottom" style={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <section className="location">
                          <div className="location-icon">
                            <FontAwesomeIcon icon={faLocationArrow} />
                          </div>
                          <p>
                            {item.labAddress}, {item.labCity}, {item.labState},{" "}
                            {item.labPin}
                          </p>
                        </section>
                        <a href="details">
                          <button className="tests">Get Details</button>
                        </a>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))
            : null}
        </Row>
      </div>
    </>
  );
}

export default LabCards;
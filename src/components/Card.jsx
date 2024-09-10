import { IconBase } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import "./Slider/Slider.css";
import { Link } from "react-router-dom";

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
            <Link
              className="card"
              id="RouterNavLink"
              to={`/details/${item._id}`}
              key={index}
              style={{ marginBottom: "40px" }}
            >
              <section style={{ margin: "0" }}>
                <div className="card-top">
                  <img src={item.labImageUrls} height={10} />
                  <div className="lab-info-listing">
                    <span>{item.labName}</span>
                  </div>
                </div>
                <div className="card-bottom">
                  <section className="location">
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      className="mr-2 color-red"
                    />
                    <p>
                      {item.labAddress}, {item.labCity}, {item.labState},{" "}
                      {item.labPin}
                    </p>
                  </section>
                  <a href="details">
                    <button className="tests">View Tests and Packages</button>
                  </a>
                </div>
              </section>
            </Link>
          ))
        : null}
    </>
  );
}

export default Card;

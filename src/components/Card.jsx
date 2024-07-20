import { IconBase } from "react-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import dt from "../db/data";
import React, { useState } from "react";
import "./Slider/Slider.css";

function Card() {
  const [defaultImage, setDefaultImage] = useState({});
  return (
    <>
      {dt.map((item, index) => (
        <section className="card" key={index}>
          <div className="card-top">
            <img src={item.imageUrls} height={10} />
            <div className="lab-info-listing">
              <span>
                {item.name}
                <br /> {item.type}
              </span>
            </div>
          </div>
          <div className="card-bottom">
            <section className="location">
              <div className="location-icon">
                <FontAwesomeIcon icon={faLocationArrow} />
              </div>
              <p>{item.address}</p>
            </section>
            <a href="details">
              <button className="tests">View Tests and Packages</button>
            </a>
          </div>
        </section>
      ))}
    </>
  );
}

export default Card;

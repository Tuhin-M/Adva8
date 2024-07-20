import React, { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Slider.css";
import dt from "../../db/data";

function Sp() {
  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="homeSlider">
      <Slider {...settings}>
        {dt.map((item, index) => (
          <section className="slider-card" key={index}>
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
      </Slider>
    </section>
  );
}

export default Sp;

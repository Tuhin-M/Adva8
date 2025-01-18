import React, { useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./Slider.css";
import { Link } from "react-router-dom";

function Sp({ data }) {
  const [defaultImage, setDefaultImage] = useState({});
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: data.length > 3 ? 4 : 3,
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
        {data && data.length
          ? data.map((item, index) => (
              <Link to={`/details/${item._id}`} key={index}>
                <section className="slider-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                  <div className="card-top">
                    <img src={item.labImageUrls} height={200} style={{ width: '100%', objectFit: 'cover' }} />
                    <div className="lab-info-listing">
                      <span>{item.labName}</span>
                    </div>
                  </div>
                  <div className="card-bottom" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <section className="location">
                      <div className="location-icon">
                        <FontAwesomeIcon icon={faLocationArrow} />
                      </div>
                      <p>
                        {item.labAddress}, {item.labCity}, {item.labState},{" "}
                        {item.labPin}
                      </p>
                    </section>
                    <button className="tests">View Tests and Packages</button>
                  </div>
                </section>
              </Link>
            ))
          : null}
      </Slider>
    </section>
  );
}

export default Sp;
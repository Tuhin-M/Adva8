// src/components/Testimonial.js

import React from "react";
import "./Testimonial.css";

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      <div className="testimonial-content">
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          placerat scelerisque tortor ornare ornare. Quisque placerat
          scelerisque felis vitae tortor augue. Velit nascetur Consequat
          faucibus porttitor enim et."
        </p>
        <h4>John Doe</h4>
      </div>
      <div className="testimonial-nav">
        <span className="nav-dot active"></span>
        <span className="nav-dot"></span>
        <span className="nav-dot"></span>
      </div>
    </div>
  );
};

export default Testimonial;

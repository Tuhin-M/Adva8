// src/components/Testimonial.js

import React from "react";
import "./Testimonial.css";

const Testimonial = () => {
  return (
    <div className="testimonial-container">
      <div className="testimonial-content">
        <p>
          "ADVA8 is an intuitive lab management system where users can easily
          book blood tests and other body tests online. The site offers a
          seamless booking process, detailed test descriptions, and quick
          results delivery. Its user-friendly interface and efficient customer
          support make it a reliable choice for managing lab appointments and
          accessing test results. However, the website could benefit from more
          payment options and enhanced mobile compatibility."
        </p>
        <h4>Akash Naskar</h4>
      </div>
      <div className="testimonial-nav">
        <span className="nav-dot active"></span>
        {/* <span className="nav-dot"></span>
        <span className="nav-dot"></span> */}
      </div>
    </div>
  );
};

export default Testimonial;

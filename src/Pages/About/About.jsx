import React, { useState } from "react";
import "./About.css"; // Assume styles are defined here for simplicity
import { FaUserCircle } from "react-icons/fa";
function About() {
  return (
    <>
      <div className="about-us">
        <div className="about-us-content">
          <div className="about-us-photo"></div>
          <div className="about-us-text">
            <h1 className="about-us-heading">About Adva8</h1>
            <p>
              Adva8 is a leading healthcare startup that specializes in helping
              clients find, book, and track their health checkups in the most
              desirable neighborhoods. Our team of experienced agents is
              dedicated to providing exceptional service and making the
              healthcare process as smooth as possible.
            </p>
            <p> we are here to help you every step of the way.</p>
            <p>
              Our team has a wealth of experience and knowledge in the health
              care industry, and we are committed to providing the highest level
              of service to our clients. We believe that health care services
              should not be a painful but exciting and rewarding experience, and
              we are dedicated to making it a reality for each and every person.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

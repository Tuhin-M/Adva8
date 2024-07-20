import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa"; // react-icons library required
import OtpValidation from "../../components/OtpValidation/OtpValidation";
import "./Home.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";
import { FaSearch } from "react-icons/fa";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import Testimonial from "../../components/Testimonial/Testimonial";

const Home = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  return (
    <>
      <Navbar />

      <div className="background-image">
        <AppointmentForm />
      </div>

      <br></br>
      <br></br>

      <div className="card-slider">
        <center>
          <h1>Recent Lab List</h1>
        </center>
        <Slider />
      </div>
      <br></br>
      <br></br>
      <br></br>
      {/* <div className="card-slider">
        <center>
          <h1>Labs based on your preference</h1>
        </center>
        <Slider />
      </div> */}
      <br></br>
      <br></br>
      <br></br>
      <Testimonial />
    </>
  );
};

export default Home;

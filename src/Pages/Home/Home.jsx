import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // react-icons library required
import OtpValidation from "../../components/OtpValidation/OtpValidation";
import "./Home.css";
import { Link } from "react-router-dom";
import Slider from "../../components/Slider/Slider";
import { FaSearch } from "react-icons/fa";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import Testimonial from "../../components/Testimonial/Testimonial";

import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listingData, setListingData] = useState([]);

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  useEffect(() => {
    console.log("useeffect running homepage");
    const fetchListings = async () => {
      setLoading(true);
      // setShowMore(false);
      //const searchQuery = urlParams.toString();
      try {
        const res = await fetch(`/api/lab/get`);
        //const res = await fetch(`/api/listing/get`);
        const data = await res.json();
        console.log("data - ", data);
        setListingData(data);
        if (data.length > 8) {
          // setShowMore(true);
        } else {
          // setShowMore(false);
        }
        // const res1 = await fetch(
        //   `http://localhost:3000/api/listing/get/669ff9c4274cfb5b9f6d927f`
        // );
        // const data1 = await res.json();
        // console.log("user spefic get api - ", data1);
      } catch {
        setListingData([]);
      }
      setLoading(false);
    };

    fetchListings();
    // return () => {
    //   second
    // }
  }, []);

  return (
    <>
      <div className="background-image">
        <AppointmentForm />
      </div>
      <br></br>
      <br></br>

      <div className="card-slider">
        <center>
          <h1>Recent Lab List</h1>
        </center>
        <Slider data={listingData} />
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
      {/* <OtpValidation mobileNumber={"1234567890"} /> */}
      <Testimonial />
      <br></br>
      <br></br>
      <br></br>
      {/* <Slider data={listingData} /> */}
    </>
  );
};

export default Home;

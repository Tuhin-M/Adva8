import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Slider from "../../components/Slider/Slider";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaClock,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { Navigation } from "swiper/modules";
import TestOffered from "../Lab-dashboard/Test-offered/TestOffered";

function Details() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const isLabOwner = localStorage.getItem("userRole");
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/lab/get/${params?.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params?.listingId]);
  const currentLabId = params?.listingId;
  return (
    <div className="details">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing?.labImageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="labs-details">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-teal-600">
                  {listing.labName}
                </h2>
                <p className="text-gray-600 flex items-center mt-2">
                  <FaMapMarkerAlt className="mr-2" />
                  {listing.labAddress}, {listing.labCity}, {listing.labState},{" "}
                  {listing.labPin}
                </p>
              </div>
              {isLabOwner == 0 && (
                <a href={"/make-booking/" + params?.listingId}>
                  <button className="px-6 py-2 bg-teal-500 text-white rounded-md">
                    Make Booking
                  </button>
                </a>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <p className="text-gray-700">{listing.description}</p>

              <div className="contact-info space-y-2">
                <p className="flex items-center">
                  <FaPhone className="mr-2" />
                  <span>Phone: {listing.labPhoneNumber}</span>
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <span>Email: {listing.labEmail}</span>
                </p>
                <p className="flex items-center">
                  <FaGlobe className="mr-2" />
                  <span>Website: {listing.labWebsite}</span>
                </p>
                <p className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>
                    Operating Hours: {listing.labOpeningTime} -{" "}
                    {listing.labClosingTime}
                  </span>
                </p>
                <div className="operating-days">
                  <p className="font-semibold">Operating Days:</p>
                  <ul className="list-disc pl-8">
                    {listing.labOperatingDays.map((day, index) => (
                      <li key={index}>{day}</li>
                    ))}
                  </ul>
                </div>
                {/* <p className="flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>Coordinates: {listing.labLatLong}</span>
                </p> */}
              </div>
            </div>
          </div>
          {isLabOwner == 1 && isLabOwner != undefined && (
            <TestOffered labId={currentLabId} />
          )}
        </div>
      )}
    </div>
  );
}
export default Details;

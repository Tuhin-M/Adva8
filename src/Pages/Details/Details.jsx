import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css"; // Assume styles are defined here for simplicity
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import Slider from "../../components/Slider/Slider";
import { FaMapMarkerAlt } from "react-icons/fa";
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
    console.log("paraams - ", params);
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
          {/* <div className="background-image"></div> */}
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
                <a href="/make-booking">
                  <button className="px-6 py-2 bg-teal-500 text-white rounded-md">
                    Make Booking
                  </button>
                </a>
              )}
            </div>
            <p className="mt-6 text-gray-700">{listing.description}</p>
            {/* <div className="max-w-md mx-auto mt-10 p-8 border border-blue-500 rounded-md">
          <form>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name*"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
              />
              <input
                type="email"
                placeholder="Your E-mail"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Subject*"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Type Your Message*"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
                rows="4"
              ></textarea>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full bg-teal-500 text-white p-2 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-opacity-50"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div> */}
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

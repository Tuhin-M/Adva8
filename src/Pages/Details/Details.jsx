import React, { useState } from "react";
import "./Details.css"; // Assume styles are defined here for simplicity
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
function Details() {
  return (
    <>
      <div className="background-image"></div>
      <div className="labs-details">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-teal-600">LABS 1</h2>
            <p className="text-gray-600 flex items-center mt-2">
              <FaMapMarkerAlt className="mr-2" />
              Lorem ipsum dolor sit amet consectetur Address, Area, City
            </p>
          </div>
          <a href="/make-booking">
            <button className="px-6 py-2 bg-teal-500 text-white rounded-md">
              Make Booking
            </button>
          </a>
        </div>
        <p className="mt-6 text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Nunc quis vel nunc facilisis
          interdum egestas. Est nunc gravida pulvinar at mauris sagittis
          facilisis. Accumsan quisque ornare nibh eget malesuada aliquet id. Non
          id est sed adipiscing odio lectus velit euismod justo. Ultrices
          rhoncus nascetur in massa lorem molestie.
        </p>
        <p className="mt-4 text-gray-700">
          In sit rutrum nunc praesent commodo. A amet semper volutpat
          ullamcorper mauris. Ultrices a viverra eget id. Ultrices tortor quis
          luctus lobortis enim leo. Iaculis lectus diam nisl nulla proin
          bibendum scelerisque.
        </p>
        <div className="max-w-md mx-auto mt-10 p-8 border border-blue-500 rounded-md">
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
        </div>
      </div>
    </>
  );
}

export default Details;

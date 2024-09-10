import React from "react";
import "./MakeBooking.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "../../components/MakeBooking/TestPopup";
import { storage } from "../../../firebaseConfig";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

function MakeBooking() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [timeSlots, setTimeSlots] = useState({
    "9AM - 10AM": false,
    "10AM - 11AM": false,
    "11AM - 12PM": false,
    "12PM - 1PM": false,
    "1PM - 2PM": false,
    "2PM - 3PM": false,
    "3PM - 4PM": false,
    "4PM - 5PM": false,
    "5PM - 6PM": false,
    "6PM - 7PM": false,
  });
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [additionalFeatures, setAdditionalFeatures] = useState({
    expressService: false,
    onlineReports: false,
  });

  useEffect(() => {
    fetchSelectedTests();
    fetchUploadedFiles();
  }, []);

  const fetchSelectedTests = async () => {
    try {
      const response = await axios.get("/api/selected-tests");
      setSelectedTests(response.data);
    } catch (error) {
      console.error("Error fetching selected tests:", error);
      setSelectedTests([]);
    }
  };

  const fetchUploadedFiles = async () => {
    const filesListRef = ref(storage, "medical_reports/");
    try {
      const response = await listAll(filesListRef);
      const filesPromises = response.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { name: item.name, url };
      });
      const files = await Promise.all(filesPromises);
      setUploadedFiles(files);
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
    }
  };

  const deleteTest = async (testId) => {
    try {
      await axios.delete(`/api/selected-tests/${testId}`);
      setSelectedTests(selectedTests.filter((test) => test.id !== testId));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleClickForDayChange = (day) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const handleClickForTimeChange = (slot) => {
    setTimeSlots((prevTimeSlots) => ({
      ...prevTimeSlots,
      [slot]: !prevTimeSlots[slot],
    }));
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedFiles.length <= 3) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    } else {
      alert("You can only upload up to 3 files.");
    }
  };

  const handleFileUpload = async () => {
    const uploadPromises = selectedFiles.map(async (file) => {
      const fileRef = ref(storage, `medical_reports/${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        console.log(`File ${file.name} uploaded successfully`);
        const url = await getDownloadURL(fileRef);
        return { name: file.name, url };
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        return null;
      }
    });

    try {
      const uploadedFiles = await Promise.all(uploadPromises);
      const validFiles = uploadedFiles.filter((file) => file !== null);
      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }

    fetchUploadedFiles();
  };

  const handleFileDelete = async (fileName) => {
    const fileRef = ref(storage, `medical_reports/${fileName}`);
    try {
      await deleteObject(fileRef);
      console.log("File deleted successfully");
      setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleUserDetailsChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      gender: e.target.id,
    }));
  };

  const handleAdditionalFeaturesChange = (e) => {
    const { id, checked } = e.target;
    setAdditionalFeatures((prevFeatures) => ({
      ...prevFeatures,
      [id]: checked,
    }));
  };

  const handleProceedToPayment = async () => {
    const selectedDays = Object.keys(days).filter((day) => days[day]);
    const selectedTimeSlots = Object.keys(timeSlots).filter(
      (slot) => timeSlots[slot]
    );

    const payload = {
      userDetails,
      uploadedFiles: uploadedFiles.map((file) => file.url),
      selectedTests,
      availability: {
        days: selectedDays,
        timeSlots: selectedTimeSlots,
      },
      additionalFeatures,
      totalTests: selectedTests.length,
      totalPrice: selectedTests
        .reduce((total, test) => total + parseFloat(test.price.slice(1)), 0)
        .toFixed(2),
    };

    console.log("Full payload:", payload);

    try {
      const response = await axios.post("/api/make-booking", payload);
      console.log("Booking successful:", response.data);
      // Handle successful booking (e.g., show success message, redirect to confirmation page)
    } catch (error) {
      console.error("Error making booking:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="MakeBooking">
      <div className="section user-details">
        <h2>User Details</h2>
        <p>Please provide your information</p>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                value={userDetails.fullName}
                onChange={handleUserDetailsChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                value={userDetails.dateOfBirth}
                onChange={handleUserDetailsChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  checked={userDetails.gender === "male"}
                  onChange={handleGenderChange}
                />
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  checked={userDetails.gender === "female"}
                  onChange={handleGenderChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  checked={userDetails.gender === "other"}
                  onChange={handleGenderChange}
                />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Contact Information</label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={userDetails.phoneNumber}
                onChange={handleUserDetailsChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={userDetails.email}
                onChange={handleUserDetailsChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                value={userDetails.address}
                onChange={handleUserDetailsChange}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="section medical-reports">
        <h2>Medical Reports</h2>
        <p>Upload any previous medical reports</p>
        <input
          type="file"
          onChange={handleFileSelect}
          className="upload-button"
        />
        {selectedFiles.length > 0 && (
          <div>
            <h3>Selected Files:</h3>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <button onClick={handleFileUpload} className="upload-button">
              Upload Selected Files
            </button>
          </div>
        )}
        <ul className="file-list">
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <span className="file-icon">📄</span>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
              <button
                onClick={() => handleFileDelete(file.name)}
                className="delete-file-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <h2>Test Selection</h2>
        <div className="test-popup">
          <button className="primary-button" onClick={() => setPopupOpen(true)}>
            Add Test
          </button>
          <Popup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            onTestsSelected={(newTests) =>
              setSelectedTests((prevTests) => [...prevTests, ...newTests])
            }
          />
        </div>
        <div className="test-cards">
          {Array.isArray(selectedTests) &&
            selectedTests.map((test) => (
              <div className="test-card" key={test.id}>
                <div
                  className="delete-button"
                  onClick={() => deleteTest(test.id)}
                >
                  ✕
                </div>
                <h3>{test.name}</h3>
                <p>{test.description}</p>
                <p>{test.price}</p>
              </div>
            ))}
        </div>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label>Availability</label>
              <div className="date-container">
                {Object.keys(days).map((day) => {
                  return (
                    <div
                      key={day}
                      className={`days ${days[day] ? "active" : ""}`}
                      onClick={() => handleClickForDayChange(day)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Available Time slots</label>
              <div className="time-slots-container">
                {Object.keys(timeSlots).map((slot) => {
                  return (
                    <div
                      key={slot}
                      className={`timeSlots ${timeSlots[slot] ? "active" : ""}`}
                      onClick={() => handleClickForTimeChange(slot)}
                    >
                      {slot}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Additional Features</label>
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="expressService"
                  checked={additionalFeatures.expressService}
                  onChange={handleAdditionalFeaturesChange}
                />
                <label htmlFor="expressService">Express Service</label>
                <input
                  type="checkbox"
                  id="onlineReports"
                  checked={additionalFeatures.onlineReports}
                  onChange={handleAdditionalFeaturesChange}
                />
                <label htmlFor="onlineReports">Online Reports</label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="section booking-summary">
        <h2>Bookings Summary</h2>
        <div className="summary-details">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="totalTests">Total Tests</label>
              <input
                type="text"
                id="totalTests"
                value={selectedTests.length}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="totalPrice">Total Price</label>
              <input
                type="text"
                id="totalPrice"
                value={`${selectedTests
                  .reduce(
                    (total, test) => total + parseFloat(test.price.slice(1)),
                    0
                  )
                  .toFixed(2)}`}
                readOnly
              />
            </div>
          </div>
          <button
            type="button"
            className="primary-button"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeBooking;

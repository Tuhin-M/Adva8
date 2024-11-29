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
import { useParams } from "react-router-dom";

function MakeBooking() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const params = useParams();
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
      const response = await axios.get("/api/tests");
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

  const handleDeleteTest = async (testId) => {
    setSelectedTests(selectedTests.filter((test) => test.id !== testId));
  };

  const handleClickForDayChange = (day) => {
    setSelectedDay(day);
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

  const handleProceedToPayment = async () => {
    let selectedTestData = selectedTests.map((test) => {
      return {
        id: test.testId,
        name: test.name,
        price: test.price,
        description: test.description,
      };
    });
    const payload = {
      userDetails,
      uploadedFiles: [uploadedFiles[0].url],
      selectedTests: selectedTestData,
      availability: {
        day: selectedDay,
        timeSlot: selectedTimeSlot,
      },
      additionalFeatures,
      totalTests: selectedTests.length,
      totalPrice: selectedTests
        .reduce((total, test) => total + parseFloat(test.price.slice(1)), 0)
        .toFixed(2),
      labRef: params.listingId,
    };

    console.log(JSON.stringify(payload));

    try {
      const response = await axios.post("/api/order/create", payload);
      console.log("Booking successful:", response.data);

      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Booking successful",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/home";
          }
        });
      }
    } catch (error) {
      console.error("Error making booking:", error);
      popToaster("Error making booking", "error");
    }
  };
  const [timeSlots, setTimeSlots] = useState([
    "9AM - 10AM",
    "10AM - 11AM",
    "11AM - 12PM",
    "12PM - 1PM",
    "1PM - 2PM",
    "2PM - 3PM",
    "3PM - 4PM",
    "4PM - 5PM",
    "5PM - 6PM",
    "6PM - 7PM",
  ]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const handleClickForTimeChange = (slot) => {
    console.log("Clicked time slot:", slot);
    setSelectedTimeSlot(slot);
  };

  const handleAdditionalFeaturesChange = (e) => {
    const { id, checked } = e.target;

    const featureId =
      id === "Express Service"
        ? "expressService"
        : id === "Online Reports"
        ? "onlineReports"
        : id;
    setAdditionalFeatures((prevFeatures) => ({
      ...prevFeatures,
      [featureId]: checked,
    }));
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
          multiple
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
            <button
              onClick={() => handleFileDelete(file.name)}
              className="delete-file-button"
            >
              Delete
            </button>
          </div>
        )}
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
          {Array.isArray(selectedTests) && selectedTests.length > 0 && (
            <table className="test-table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {selectedTests.map((test) => (
                  <tr key={test.id}>
                    <td>{test.name}</td>
                    <td>{test.description}</td>
                    <td>{test.price}</td>
                    <td>
                      <a
                        href="#"
                        style={{ color: "red" }}
                        onClick={() => handleDeleteTest(test.id)}
                      >
                        ✕
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {selectedTests.length > 0 && (
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>Availability</label>
                <div className="date-container">
                  {selectedTests[0]?.availability.map((day) => {
                    return (
                      <div
                        key={day}
                        className={`days ${
                          day === selectedDay ? "active" : ""
                        }`}
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
                  {timeSlots.map((slot) => {
                    return (
                      <div
                        key={slot}
                        className={`timeSlots ${
                          slot === selectedTimeSlot ? "active" : ""
                        }`}
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
                  {selectedTests[0]?.features.map((feature) => (
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      key={feature}
                    >
                      <input
                        type="checkbox"
                        id={feature}
                        checked={
                          additionalFeatures[
                            feature === "Express Service"
                              ? "expressService"
                              : "onlineReports"
                          ]
                        }
                        onChange={handleAdditionalFeaturesChange}
                      />
                      <label htmlFor={feature}>{feature}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      {selectedTests.length > 0 && (
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
                      (total, test) => total + parseFloat(test.price.slice(0)),
                      0
                    )
                    .toFixed(2)}`}
                  readOnly
                />
              </div>
            </div>
            <button
              disabled={!selectedDay || !selectedTimeSlot}
              type="button"
              className="primary-button"
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default MakeBooking;

import React, { useEffect, useState } from "react";
import "./Labs-onboarding.css";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function LabsOnboarding() {
  const [labDetails, setLabDetails] = useState({
    labName: "",
    labAddress: "",
    labState: "",
    labCity: "",
    labPin: "",
    labLatLong: "",
    labPhoneNumber: "",
    labEmail: "",
    labWebsite: "",
    labOperatingDays: [],
    labImageUrls: [],
    labOpeningTime: "",
    labClosingTime: "",
  });

  const [days, setDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const [imageUrl, setImageUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLabDetails({
      ...labDetails,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls = [...labDetails.labImageUrls];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 1024 * 1024) {
        alert(`File size exceeds 1MB limit for file: ${file.name}`);
        continue; // Skip the file if it's too large
      }

      try {
        const storageRef = ref(storage, `lab-images/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);

        uploadedUrls.push(url);
      } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
      }
    }

    setLabDetails((prevDetails) => ({
      ...prevDetails,
      labImageUrls: uploadedUrls,
    }));

    setImageUrl(uploadedUrls); // Set the uploaded URLs to display
  };

  const handleClickForDayChange = (day) => {
    setDays({
      ...days,
      [day]: !days[day],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...labDetails,
      labOperatingDays: Object.keys(days).filter((day) => days[day]),
    };

    console.log("Payload:", payload);

    try {
      const response = await fetch(`/api/lab/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log("Success:", data);
      alert("Lab created successfully");
      // Redirect to the lab-dashboard page after successful submission
      window.location.href = "/lab-dashboard";
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="LabsOnboarding">
      <section className="lab-information">
        <h2>Lab Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="column">
              <label>Lab Name</label>
              <input
                type="text"
                name="labName"
                value={labDetails.labName}
                onChange={handleInputChange}
                placeholder="Enter Lab Name"
                required
              />
            </div>
            <div className="column">
              <label>Website</label>
              <input
                type="text"
                name="labWebsite"
                value={labDetails.labWebsite}
                onChange={handleInputChange}
                placeholder="Enter Website URL"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Phone Number</label>
              <input
                type="number"
                name="labPhoneNumber"
                value={labDetails.labPhoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
                required
              />
            </div>
            <div className="column">
              <label>Email</label>
              <input
                type="email"
                name="labEmail"
                value={labDetails.labEmail}
                onChange={handleInputChange}
                placeholder="Enter Email"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Lab Address</label>
              <input
                type="text"
                name="labAddress"
                value={labDetails.labAddress}
                onChange={handleInputChange}
                placeholder="Enter Lab Address"
                required
              />
            </div>
            <div className="column">
              <label>State</label>
              <input
                type="text"
                name="labState"
                value={labDetails.labState}
                onChange={handleInputChange}
                placeholder="Enter State"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>City</label>
              <input
                type="text"
                name="labCity"
                value={labDetails.labCity}
                onChange={handleInputChange}
                placeholder="Enter City"
              />
            </div>
            <div className="column">
              <label>Pin Code</label>
              <input
                type="number"
                name="labPin"
                value={labDetails.labPin}
                onChange={handleInputChange}
                placeholder="Enter Pin Code"
              />
            </div>
            <div className="column">
              <label>Lat/Long</label>
              <input
                type="text"
                name="labLatLong"
                value={labDetails.labLatLong}
                onChange={handleInputChange}
                placeholder="Enter Lab Lat/Long"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Opening Time</label>
              <div className="time-slots-container">
                <TimePickerDropdown
                  keyName="labOpeningTime"
                  labDetails={labDetails}
                  setLabDetails={setLabDetails}
                />
              </div>
            </div>
            <div className="column">
              <label>Closing Time</label>
              <div className="time-slots-container">
                <TimePickerDropdown
                  keyName="labClosingTime"
                  labDetails={labDetails}
                  setLabDetails={setLabDetails}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Upload Lab Images</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
              <p>Maximum file size: 1MB</p>
              {imageUrl &&
                imageUrl.map((url, index) => (
                  <div key={index}>
                    <p>Image {index + 1} uploaded successfully!</p>
                    <img
                      src={url}
                      alt={`Uploaded lab image ${index + 1}`}
                      style={{ width: "200px" }}
                    />
                  </div>
                ))}
            </div>
            <div className="column">
              <label>Operating Days</label>
              <div className="date-container">
                {Object.keys(days).map((day) => (
                  <div
                    key={day}
                    className={`days ${days[day] ? "active" : ""}`}
                    onClick={() => handleClickForDayChange(day)}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <center>
            <button type="submit" className="submit-button">
              Save Details
            </button>
          </center>
        </form>
      </section>
    </div>
  );
}

const TimePickerDropdown = ({ keyName, labDetails, setLabDetails }) => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [timePeriod, setTimePeriod] = useState("AM");

  useEffect(() => {
    const formattedTime = `${hour}:${minute} ${timePeriod}`;
    setLabDetails((prevDetails) => ({
      ...prevDetails,
      [keyName]: formattedTime,
    }));
  }, [hour, minute, timePeriod, keyName, setLabDetails]);

  return (
    <div className="time-picker">
      <select
        name="hour"
        className="time-dropdown"
        value={hour}
        onChange={(e) => setHour(e.target.value)}
      >
        {Array.from({ length: 12 }, (_, i) => {
          const hourValue = (i + 1).toString().padStart(2, "0");
          return (
            <option key={hourValue} value={hourValue}>
              {hourValue}
            </option>
          );
        })}
      </select>
      <span className="colon">:</span>
      <select
        name="minute"
        className="time-dropdown"
        value={minute}
        onChange={(e) => setMinute(e.target.value)}
      >
        {Array.from({ length: 60 }, (_, i) => {
          const minuteValue = i.toString().padStart(2, "0");
          return (
            <option key={minuteValue} value={minuteValue}>
              {minuteValue}
            </option>
          );
        })}
      </select>
      <select
        name="timePeriod"
        className="time-dropdown"
        value={timePeriod}
        onChange={(e) => setTimePeriod(e.target.value)}
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default LabsOnboarding;

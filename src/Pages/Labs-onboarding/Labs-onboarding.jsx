import React, { useEffect, useState } from "react";
import "./Labs-onboarding.css";
import { storage } from "../../../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function LabsOnboarding() {
  const [labDetails, setLabDetails] = useState({
    labName: "",
    labAddress: "",
    state: "",
    city: "",
    pin: "",
    latlong: "",
    phoneNumber: "",
    email: "",
    website: "",
    operatingDays: [],
    availableTimeSlots: [],
    labImages: null,
    openingTime: "HH:MM AM",
    closingTime: "HH:MM AM",
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

  const [imageUrl, setImageUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLabDetails({
      ...labDetails,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("File size exceeds 1MB limit");
      return;
    }

    setLabDetails({ ...labDetails, labImages: file });

    try {
      const storageRef = ref(storage, `lab-images/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);

      setImageUrl(url);
      setLabDetails((prevDetails) => ({
        ...prevDetails,
        labImages: url,
      }));

      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleClickForDayChange = (day) => {
    setDays({
      ...days,
      [day]: !days[day],
    });
  };

  const handleClickForTimeChange = (slot) => {
    setTimeSlots({
      ...timeSlots,
      [slot]: !timeSlots[slot],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      labDetails: {
        ...labDetails,
        operatingDays: Object.keys(days).filter((day) => days[day]),
        availableTimeSlots: Object.keys(timeSlots).filter(
          (slot) => timeSlots[slot]
        ),
        labImages: imageUrl,
      },
    };

    console.log("Payload:", payload);

    // Replace with your POST request logic
    fetch("https://your-api-endpoint.com/save-lab-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    // try {
    //   if (formData.imageUrls.length < 1)
    //     return setError('You must upload at least one image');
    //   if (+formData.regularPrice < +formData.discountPrice)
    //     return setError('Discount price must be lower than regular price');
    //   setLoading(true);
    //   setError(false);
    //   const res = await fetch('/api/listing/create', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       ...formData,
    //       userRef: currentUser._id,
    //     }),
    //   });
    //   const data = await res.json();
    //   setLoading(false);
    //   if (data.success === false) {
    //     setError(data.message);
    //   }
    //   navigate(`/listing/${data._id}`);
    // } catch (error) {
    //   setError(error.message);
    //   setLoading(false);
    // }
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
              />
            </div>
            <div className="column">
              <label>Website</label>
              <input
                type="text"
                name="website"
                value={labDetails.website}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Website URL"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={labDetails.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter Phone Number"
              />
            </div>
            <div className="column">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={labDetails.email}
                onChange={handleInputChange}
                placeholder="Enter Email"
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
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Lab Address"
              />
            </div>
            <div className="column">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={labDetails.state}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Select state"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={labDetails.city}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter City"
              />
            </div>
            <div className="column">
              <label>Pin Code</label>
              <input
                type="text"
                name="pin"
                value={labDetails.pin}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Pin Code"
              />
            </div>
            <div className="column">
              <label>Lat/Long</label>
              <input
                type="text"
                name="latlong"
                value={labDetails.latlong}
                onChange={(e) =>
                  handleInputChange(e, setLabDetails, labDetails)
                }
                placeholder="Enter Lab Lat/Long"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Opening Time</label>
              <div className="time-slots-container">
                <TimePickerDropdown
                  keyName="openingTime"
                  setLabDetails={setLabDetails}
                />
              </div>
            </div>
            <div className="column">
              <label>Closing Time</label>
              <div className="time-slots-container">
                <TimePickerDropdown
                  keyName="closingTime"
                  setLabDetails={setLabDetails}
                />
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="column">
              <label>Upload Lab Images</label>
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <p>Maximum file size: 1MB</p>
              {imageUrl && (
                <div>
                  <p>Image uploaded successfully!</p>
                  <img
                    src={imageUrl}
                    alt="Uploaded lab image"
                    style={{ width: "200px" }}
                  />
                </div>
              )}
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

const TimePickerDropdown = (keyName, setLabDetails) => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [timePeriod, setTimePeriod] = useState("AM");
  const [totalTime, setTotalTime] = useState("HH:MM XX");
  const handleHourChange = (event) => {
    setHour(event.target.value);
    let time = totalTime.split(":")[0];
    time = totalTime.replace(time, event.target.value);
    setTotalTime(time);
    console.log("time - ", time);
    //setLabDetails()
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);

    let time = totalTime.split(":")[1]?.split(" ")[0];
    time = totalTime.replace(time, event.target.value);
    setTotalTime(time);

    console.log("time - ", time);
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);

    let time = totalTime.split(" ")[1];
    time = totalTime.replace(time, event.target.value);
    setTotalTime(time);

    console.log("time - ", time);
  };

  const renderOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      const value = i.toString().padStart(2, "0");
      options.push(
        <option key={value} value={value}>
          {value}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="labTime">
      <label htmlFor="hour-select">Hour: </label>
      <select
        id="hour-select"
        value={hour}
        onChange={handleHourChange}
        name="HH"
      >
        {renderOptions(1, 12)}
      </select>

      <label htmlFor="minute-select">Minute: </label>
      <select
        id="minute-select"
        value={minute}
        onChange={handleMinuteChange}
        name="MM"
      >
        {renderOptions(0, 59)}
      </select>
      <label htmlFor="am-pm-select">AM/PM: </label>
      <select
        id="am-pm-select"
        value={timePeriod}
        onChange={handleTimePeriodChange}
        name="XX"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
};

export default LabsOnboarding;
